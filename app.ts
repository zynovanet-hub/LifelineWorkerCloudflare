type Env = {
  storage: R2Bucket;
  emergency: R2Bucket;
  UPLOAD_SIGN_TOKEN?: string;
};

const DEFAULT_UPLOAD_EXPIRY_SECONDS = 300;
const MAX_UPLOAD_EXPIRY_SECONDS = 3600;
const MAX_EMERGENCY_SIZE_BYTES = 60 * 1024 * 1024;
const MAX_EMERGENCY_AGE_MS = 24 * 60 * 60 * 1000;

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function normalizeObjectKey(input: string) {
  const trimmed = input.trim();
  if (!trimmed) {
    return '';
  }

  try {
    const parsed = new URL(trimmed);
    return decodeURIComponent(parsed.pathname).replace(/^\/+/, '');
  } catch {
    return trimmed.replace(/^\/+/, '');
  }
}

function extractToken(request: Request) {
  const auth = request.headers.get('Authorization') || request.headers.get('x-upload-token') || '';
  if (!auth) return '';
  return auth.startsWith('Bearer ') ? auth.slice(7).trim() : auth.trim();
}

function buildObjectName(source: string) {
  const normalized = normalizeObjectKey(source);
  const lastSegment = normalized.split('/').filter(Boolean).pop() || 'upload.bin';
  const safeName = lastSegment.replace(/[^a-zA-Z0-9._-]/g, '_') || 'upload.bin';
  return `uploads/${crypto.randomUUID()}-${safeName}`;
}

async function createUploadSignedUrl(
  bucket: R2Bucket,
  objectName: string,
  expiresInSeconds: number,
  contentType?: string,
) {
  const bucketWithSignedUrl = bucket as unknown as {
    createPresignedUrl?: (...args: unknown[]) => Promise<unknown>;
  };

  if (typeof bucketWithSignedUrl.createPresignedUrl !== 'function') {
    throw new Error('R2 presigned URL support is not available in this runtime');
  }

  const headers = contentType ? { 'content-type': contentType } : undefined;
  let signedResult: unknown;

  try {
    signedResult = await bucketWithSignedUrl.createPresignedUrl({
      method: 'PUT',
      key: objectName,
      expiresIn: expiresInSeconds,
      headers,
    });
  } catch {
    signedResult = await bucketWithSignedUrl.createPresignedUrl(objectName, {
      method: 'PUT',
      expiresIn: expiresInSeconds,
      headers,
    });
  }

  if (typeof signedResult === 'string') {
    return signedResult;
  }
  if (signedResult instanceof URL) {
    return signedResult.toString();
  }

  if (signedResult && typeof signedResult === 'object' && 'url' in signedResult) {
    const possibleUrl = (signedResult as { url?: unknown }).url;
    if (typeof possibleUrl === 'string') {
      return possibleUrl;
    }
    if (possibleUrl instanceof URL) {
      return possibleUrl.toString();
    }
  }

  throw new Error('Failed to build signed upload URL');
}

function parseUploadDateFromMetadata(object: R2Object) {
  const objectWithMeta = object as unknown as {
    customMetadata?: Record<string, string>;
  };

  const meta = objectWithMeta.customMetadata;
  const rawUploadDate = meta?.uploadDate || meta?.['upload-date'] || '';
  if (rawUploadDate) {
    const parsed = Date.parse(rawUploadDate);
    if (!Number.isNaN(parsed)) {
      return parsed;
    }
  }

  return object.uploaded.getTime();
}

async function cleanupEmergencyBucket(bucket: R2Bucket) {
  const now = Date.now();
  let cursor: string | undefined;
  const deletedKeys: string[] = [];

  let scanned = 0;
  let deletedOld = 0;
  let deletedLarge = 0;

  do {
    const listed = await bucket.list({ cursor });
    cursor = listed.truncated ? listed.cursor : undefined;

    for (const object of listed.objects) {
      scanned += 1;

      const tooLarge = object.size > MAX_EMERGENCY_SIZE_BYTES;
      const uploadTime = parseUploadDateFromMetadata(object);
      const tooOld = now - uploadTime > MAX_EMERGENCY_AGE_MS;

      if (!tooLarge && !tooOld) {
        continue;
      }

      await bucket.delete(object.key);
      deletedKeys.push(object.key);

      if (tooLarge) {
        deletedLarge += 1;
      }
      if (tooOld) {
        deletedOld += 1;
      }
    }
  } while (cursor);

  return {
    scanned,
    deleted: deletedKeys.length,
    deletedLarge,
    deletedOld,
    deletedKeys,
  };
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    if (pathname === '/health' && request.method === 'GET') {
      try {
        const cleanup = await cleanupEmergencyBucket(env.emergency);
        if (cleanup.deleted > 0) {
          return jsonResponse({ status: 'okay' });
        }
        return jsonResponse({ status: 'success' });
      } catch (error) {
        console.error('Emergency bucket cleanup failed:', error);
        return jsonResponse({ ok: false, error: 'Emergency cleanup failed' }, 500);
      }
    }

    if (pathname === '/storage-object' && request.method === 'POST') {
      let rawInput = '';
      try {
        rawInput = await request.text();
      } catch {
        return new Response('Invalid request body', { status: 400 });
      }

      const key = normalizeObjectKey(rawInput || url.searchParams.get('url') || '');
      if (!key) {
        return new Response('Missing object URL or key', { status: 400 });
      }

      const object = await env.storage.get(key);
      if (!object) {
        return new Response('Object not found', { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);

      return new Response(object.body, {
        status: 200,
        headers,
      });
    }

    if (pathname === '/storage-object' && request.method === 'GET') {
      const key = normalizeObjectKey(url.searchParams.get('url') || '');
      if (!key) {
        return jsonResponse({ ok: false, error: 'Provide ?url=<object-url-or-key>' }, 400);
      }

      const object = await env.storage.get(key);
      if (!object) {
        return new Response('Object not found', { status: 404 });
      }

      const headers = new Headers();
      object.writeHttpMetadata(headers);
      headers.set('etag', object.httpEtag);

      return new Response(object.body, {
        status: 200,
        headers,
      });
    }

    if (pathname === '/upload-sign-url' && request.method === 'POST') {
      if (!env.UPLOAD_SIGN_TOKEN) {
        return new Response('Server misconfigured (UPLOAD_SIGN_TOKEN missing)', { status: 500 });
      }

      const token = extractToken(request);
      if (!token || token !== env.UPLOAD_SIGN_TOKEN) {
        return new Response('Invalid token', { status: 401 });
      }

      let body: Record<string, unknown> = {};
      try {
        body = (await request.json()) as Record<string, unknown>;
      } catch {
        return new Response('Invalid JSON body', { status: 400 });
      }

      const source =
        (typeof body.url === 'string' && body.url) ||
        (typeof body.key === 'string' && body.key) ||
        (typeof body.name === 'string' && body.name) ||
        (typeof body.objectName === 'string' && body.objectName) ||
        '';

      if (!source.trim()) {
        return jsonResponse(
          { ok: false, error: 'Provide one of: url, key, name, or objectName in the JSON body' },
          400,
        );
      }

      const expiresCandidate = Number(body.expiresInSeconds);
      const expiresInSeconds = Number.isFinite(expiresCandidate)
        ? Math.max(1, Math.min(MAX_UPLOAD_EXPIRY_SECONDS, Math.floor(expiresCandidate)))
        : DEFAULT_UPLOAD_EXPIRY_SECONDS;

      const contentType = typeof body.contentType === 'string' ? body.contentType : undefined;
      const objectName = buildObjectName(source);

      try {
        const uploadUrl = await createUploadSignedUrl(env.storage, objectName, expiresInSeconds, contentType);

        return jsonResponse({
          ok: true,
          objectName,
          uploadUrl,
          method: 'PUT',
          expiresInSeconds,
          contentType: contentType || null,
        });
      } catch (error) {
        console.error('Failed to create upload signed URL:', error);
        return new Response('Failed to generate signed URL', { status: 500 });
      }
    }

    return new Response('Not found', { status: 404 });
  },
};
