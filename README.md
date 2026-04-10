# Lifeline Worker Cloudflare

Cloudflare Worker API for:

- serving objects from the `storage` R2 bucket
- creating signed upload URLs for the `storage` bucket
- deleting objects from the `storage` bucket
- running cleanup tasks from a health route

## Routes Overview

- `GET /health`
- `GET /storage-object?url=<object-url-or-key>`
- `POST /upload-sign-url`
- `POST /delete-storage-object`

## Health Cleanup Behavior

`GET /health` runs two cleanup tasks:

1. On `emergency` bucket:
- delete objects older than 24 hours (based on custom metadata `uploadDate` or `upload-date`, or fallback to `uploaded` time)
- delete objects larger than 60MB

2. On `storage` bucket:
- delete `.webp` objects larger than 1MB

Response:

- `{"status":"okay"}` if at least one object was deleted
- `{"status":"success"}` if nothing was deleted

## Auth Model

Protected routes (`/upload-sign-url`, `/delete-storage-object`) require token header auth.

Allowed headers:

- `Authorization: Bearer <token>`
- `x-upload-token: <token>`

Token is never accepted in request body.

Validation flow:

1. JWE decrypt using `CLOUD_JWE_SECRET`
2. JWS verify using `CLOUD_JWS_SECRET`
3. Required claims: `sub`, `iat`, `exp`, `iss`
4. Expiry must be valid (`exp > now`)
5. Optional strict issuer check if `UPLOAD_TOKEN_ISSUER` is set

## Upload Sign Route

`POST /upload-sign-url`

Body JSON:

```json
{
	"extension": ".webp",
	"expiresInSeconds": 300,
	"contentType": "image/webp"
}
```

Rules:

- `extension` is required
- allowed values: `.webp`, `.mp4`, `.md`, `.xml`
- generated object name format: `<uuid><extension>`

Success response example:

```json
{
	"ok": true,
	"objectName": "550e8400-e29b-41d4-a716-446655440000.webp",
	"uploadUrl": "https://...",
	"method": "PUT",
	"expiresInSeconds": 300,
	"contentType": "image/webp"
}
```

## Storage Fetch Route

`GET /storage-object?url=<object-url-or-key>`

- public route (no token)
- accepts either full URL or object key in `url`
- returns object body stream and metadata headers

Example:

```bash
curl "http://127.0.0.1:8787/storage-object?url=my-file.webp"
```

## Delete Storage Object Route

`POST /delete-storage-object`

Body JSON can include one of:

- `url`
- `key`
- `name`
- `objectName`

Example request:

```json
{
	"objectName": "550e8400-e29b-41d4-a716-446655440000.webp"
}
```

Success response:

```json
{
	"ok": true,
	"deletedKey": "550e8400-e29b-41d4-a716-446655440000.webp"
}
```

## Environment and Bindings

Configured in `wrangler.toml`:

- `storage` bucket binding -> bucket `storage`
- `emergency` bucket binding -> bucket `emergency`

Required secrets:

- `CLOUD_JWE_SECRET`
- `CLOUD_JWS_SECRET`

Optional secret/var:

- `UPLOAD_TOKEN_ISSUER`

Set secrets:

```bash
wrangler secret put CLOUD_JWE_SECRET
wrangler secret put CLOUD_JWS_SECRET
wrangler secret put UPLOAD_TOKEN_ISSUER
```

## Local Development

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Deploy:

```bash
npm run publish
```
