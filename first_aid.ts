// Comprehensive First Aid Guide for Untrained Responders
import { EmergencyType } from './enums';

function normalizeEmergencyKey(value: any): any {
  // Example normalization: lowercase and trim
  if (typeof value === 'string') {
    return value.trim().toLowerCase();
  }
  return value;
}


export const FIRST_AID_GUIDES: Record<string, any> = {
  "Unresponsive Person": {
    "call_emergency": true,
    "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1774280288/2_uekyy2.webp",
    "description": "The person does not wake up when you shout or shake them",
    "donts": [
      {
        "step 1": "Don't assume they are just asleep",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/1_x2ujdw.png"
      },
      {
        "step 2": "Do not give them water or anything to eat",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/2_gehdwt.png"
      },
      {
        "step 3": "Don't stop giving first aid until help arrives or they wake up",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/3_zo7qij.png"
      }
    ],
    "dos": [
      {
        "step 1": "Tilt their head back and lift their chin to open the airway.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/4_jz3fp7.png"
      },
      {
        "step 2": "Check for breathing for 10 seconds.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/5_zipvp2.png"
      },
      {
        "step 3": "If not breathing, perform CPR.",
        "url": "https://youtu.be/Kdf1VfPBSuw?si=ASbOCJo11VKwfrE_&t=64"
      },
      {
        "step 4": "Get the patient to the nearest hospital.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/6_hv5db3.png"
      }
    ]
  },
  "Not Breathing or Gasping for Air": {
    "call_emergency": true,
    "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1774280291/1_iiuv9h.webp",
    "description": "The chest is not moving, or they are making occasional snoring gasps.",
    "donts": [
      {
        "step 1": "Don't Stop pushing until help arrives or they wake up.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/3_zo7qij.png"
      },
      {
        "step 2": "Do not check for a pulse if you are untrained—just focus on the chest.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783617/9_lqxyqw.png"
      }
    ],
    "dos": [
      {
        "step 1": "Push hard and fast in the center of the chest (at least 2 inches deep) to the beat of a fast song (100-120 compressions per minute).",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/7_w6l1g1.png"
      },
      {
        "step 2": "If trained, give rescue breaths after every 30 compressions (2 breaths). Get the patient to the nearest hospital.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/8_cettx2.png"
      }
    ]
  },
  "Severe Bleeding": {
    "call_emergency": true,
    "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1774280273/5_xsvh8e.webp",
    "description": "Blood is spurting out or soaking through cloth quickly.",
    "donts": [
      {
        "step 1": "Don't Remove the object if it's impaled in the wound",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783619/10_wrllsi.png"
      },
      {
        "step 2": "Don't give the patient anything to eat or drink",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/2_gehdwt.png"
      },
      {
        "step 3": "Don't wash the wound with water or anything",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783618/11_s3l22h.png"
      },
      {
        "step 4": "Don't stop giving first aid until help arrives or the bleeding is controlled",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/3_zo7qij.png"
      }
    ],
    "dos": [
      {
        "step 1": "Apply firm pressure directly on the wound with a clean cloth or bandage.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783620/12_qpwcsm.png"
      },
      {
        "step 2": "Use or make a tourniquet if the bleeding is severe and cannot be controlled with direct pressure or if bleeding from a limb.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772787803/34_wxbkkb.png"
      },
      {
        "step 3": "Get the patient to the nearest hospital immediately.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/6_hv5db3.png"
      }
    ]
  },
  "Choking": {
    "call_emergency": true,
    "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1774280259/8_xllexa.webp",
    "description": "The person cannot speak, cough, or breathe, and may be clutching their throat.",
    "donts": [
      {
        "step 1": "Don't wait to see if they can clear the obstruction on their own",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783621/13_vei8uf.png"
      },
      {
        "step 2": "Don't perform blind finger sweeps, which can push the object further down the airway",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783621/14_bdrzxe.png"
      },
      {
        "step 3": "Don't stop giving first aid until the obstruction is cleared or they become unresponsive",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/3_zo7qij.png"
      },
      {
        "step 4": "Don't give them anything to eat or drink",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/2_gehdwt.png"
      },
      {
        "step 5": "Don't perform abdominal thrusts on a pregnant woman or someone who is obese",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783622/15_mzazlx.png"
      }
    ],
    "dos": [
      {
        "step 1": "Encourage them to cough forcefully to try to expel the object.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783624/16_dgp1zc.png"
      },
      {
        "step 2": "If they cannot cough, speak, or breathe, perform the Heimlich maneuver (abdominal thrusts).",
        "url": "https://res.cloudinary.com/dmvhqkoal/video/upload/v1772790713/Lifeline_First_Aid_wxlyes.mp4"
      },
      {
        "step 3": "Get the patient to the nearest hospital immediately.",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/6_hv5db3.png"
      }
    ]
  },
  "Chest Pain or Pressure": {
    "call_emergency": true,
    "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1774280254/9_dx4qga.webp",
    "description": "Crushing chest tightness, pain spreading to jaw/arm, cold sweats",
    "donts": [
      {
        "step 1": "Dont Let them drive themselves to the hospital",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783625/18_hdunat.png"
      },
      {
        "step 2": "Dont Wait to see if the pain goes away",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783621/13_vei8uf.png"
      },
      {
        "step 3": "Dont Give them anything to eat or drink",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/2_gehdwt.png"
      }
    ],
    "dos": [
      {
        "step 1": "Help them sit up in a semi reclined position to ease breathing",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783626/19_f1kixb.png"
      },
      {
        "step 2": "loosen any tight clothing",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783628/20_kp11ti.png"
      },
      {
        "step 3": "Get the patient to the nearest hospital immediately",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/6_hv5db3.png"
      }
    ]
  },
  "Sudden Weakness (Stroke)": {
    "call_emergency": true,
    "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1774280286/3_zx5t5z.webp",
    "description": "Face drooping on one side, one arm drifting down, slurred speech.",
    "donts": [
      {
        "step 1": "Dont Wait to see if symptoms improve",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783621/13_vei8uf.png"
      },
      {
        "step 2": "Dont Let them drive themselves to the hospital",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783625/18_hdunat.png"
      },
      {
        "step 3": "Dont Give them anything to eat or drink",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/2_gehdwt.png"
      }
    ],
    "dos": [
      {
        "step 1": "Help them sit up in a semi reclined position to ease breathing",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783626/19_f1kixb.png"
      },
      {
        "step 2": "loosen any tight clothing",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783628/20_kp11ti.png"
      },
      {
        "step 3": "Get the patient to the nearest hospital immediately",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/6_hv5db3.png"
      }
    ]
  },
  "Seizures": {
    "call_emergency": true,
    "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1774280263/7_vz4zaj.webp",
    "description": "Uncontrollable shaking, loss of consciousness, possible tongue biting or incontinence.",
    "donts": [
      {
        "step 1": "Dont Restrain their movements",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783628/21_ksvfge.png"
      },
      {
        "step 2": "Dont Put anything in their mouth",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783630/22_uf0mxq.png"
      },
      {
        "step 3": "Dont Give them anything to eat or drink",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/2_gehdwt.png"
      }
    ],
    "dos": [
      {
        "step 1": "Clear the area around them to prevent injury",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783632/24_n5dnoh.png"
      },
      {
        "step 2": "Cushion their head with something soft",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783630/23_lj5nem.png"
      },
      {
        "step 3": "Time the seizure and get the patient to the nearest hospital immediately if it lasts more than 5 minutes or if they have multiple seizures without regaining consciousness",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783633/25_e0fage.png"
      }
    ]
  },
  "Severe Allergy": {
    "call_emergency": true,
    "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1774280268/6_awsh50.webp",
    "description": "Difficulty breathing, swelling of face/throat, hives.",
    "donts": [
      {
        "step 1": "Dont Wait to see if symptoms improve",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783621/13_vei8uf.png"
      },
      {
        "step 2": "Dont Let them drive themselves to the hospital",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783625/18_hdunat.png"
      },
      {
        "step 3": "Dont Give them anything to eat or drink",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783615/2_gehdwt.png"
      },
      {
        "step 4": "Dont Perform the Heimlich maneuver if they are choking on swelling",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783634/26_ro1yvx.png"
      },
      {
        "step 5": "Dont give them oral medicine if they are having trouble swallowing",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783635/27_jjz3ge.png"
      }
    ],
    "dos": [
      {
        "step 1": "Ask if they have an epinephrine auto-injector (EpiPen) and help them use it if they do. Check for it if they cannot talk",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783636/28_e2ixuq.png"
      },
      {
        "step 2": "hold orange side against outer thigh for 10 seconds",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783638/29_xpdyb4.png"
      },
      {
        "step 3": "Get them to the hospital immediately",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/6_hv5db3.png"
      }
    ]
  },
  "Sudden Confusion": {
    "call_emergency": true,
    "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1774280281/4_e7uoqy.webp",
    "description": "Acting strange, aggressive, drowsy, or \"not themselves.\"",
    "donts": [
      {
        "step 1": "Dont Assume they are drunk or on drugs",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783639/30_xgavao.png"
      },
      {
        "step 2": "Dont Wait to see if they improve",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783621/13_vei8uf.png"
      },
      {
        "step 3": "Dont leave them alone",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783639/31_bfj5j6.png"
      }
    ],
    "dos": [
      {
        "step 1": "If they are diabetic, give them something sugary like a juice box or candy",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783640/32_bnxlpi.png"
      },
      {
        "step 2": "If they are not diabetic or you are unsure, get them to the nearest hospital immediately",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783616/6_hv5db3.png"
      },
      {
        "step 3": "Stay with them and monitor their condition until help arrives",
        "url": "https://res.cloudinary.com/dmvhqkoal/image/upload/v1772783643/33_mxqly6.png"
      }
    ]
  }
};


export const EMERGENCY_TYPE_ALIASES: Record<string, string> = {
  [EmergencyType.SEVERE_BLEEDING]: "Severe Bleeding",
  [EmergencyType.UNCONSCIOUS]: "Unresponsive Person",
  [EmergencyType.DIFFICULTY_BREATHING]: "Not Breathing or Gasping for Air",
  [EmergencyType.CHEST_PAIN]: "Chest Pain or Pressure",
  [EmergencyType.STROKE_SYMPTOMS]: "Sudden Weakness (Stroke)",
  [EmergencyType.SEIZURE]: "Seizures",
  [EmergencyType.SEVERE_ALLERGIC_REACTION]: "Severe Allergy",
  [EmergencyType.HEART_ATTACK]: "Chest Pain or Pressure",
  [EmergencyType.ASTHMA_ATTACK]: "Not Breathing or Gasping for Air",
  [EmergencyType.CAR_ACCIDENT]: "Severe Bleeding",
  [EmergencyType.MOTORCYCLE_ACCIDENT]: "Severe Bleeding",
  [EmergencyType.GUNSHOT_WOUND]: "Severe Bleeding",
  [EmergencyType.STABBING_OR_MACHETE]: "Severe Bleeding",
  [EmergencyType.ELECTRIC_SHOCK]: "Unresponsive Person",
  [EmergencyType.DROWNING]: "Not Breathing or Gasping for Air",
  [EmergencyType.BUILDING_COLLAPSE]: "Unresponsive Person",
  [EmergencyType.FALL_FROM_HEIGHT]: "Unresponsive Person",
  [EmergencyType.DRUG_OVERDOSE]: "Unresponsive Person"
};

export const NORMALIZED_GUIDE_LOOKUP: Record<string, string> = Object.fromEntries(
  Object.keys(FIRST_AID_GUIDES).map((key) => [normalizeEmergencyKey(key), key])
);




function formatGuideForResponse(guide: any): any {
  const itemImageUrl = guide.image_url || '{{PLACEHOLDER_IMAGE_URL}}';
  function normalizeSteps(items: any[]): any[] {
    if (!items) return [];
    if (typeof items[0] === 'object') return items;
    return items.map((text, i) => ({ [`step ${i + 1}`]: text, url: itemImageUrl }));
  }
  return {
    ...guide,
    dos: normalizeSteps(guide.dos),
    donts: normalizeSteps(guide.donts),
  };
}


// Cloudflare Worker style route handlers
export function getFirstAidGuide(emergency_type: string) {
  const requestedType = emergency_type.trim();
  const aliasTarget = EMERGENCY_TYPE_ALIASES[requestedType] || requestedType;
  const guideKey = NORMALIZED_GUIDE_LOOKUP[normalizeEmergencyKey(aliasTarget)];
  if (!guideKey) {
    return new Response(
      JSON.stringify({ error: `First aid guide not found for emergency type: ${emergency_type}. Please use a valid emergency type.` }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }
  const guide = FIRST_AID_GUIDES[guideKey];
  const formattedGuide = formatGuideForResponse(guide);
  return new Response(
    JSON.stringify({
      emergency_type: guideKey,
      guide: formattedGuide,
      disclaimer: 'IMPORTANT: This information is for untrained first responders. This is not a substitute for professional medical training.',
      quick_reminder: 'Stay calm and follow the DOS while avoiding the DONTS until professional help arrives.'
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export function getAllGuides() {
  const formattedGuides: Record<string, any> = {};
  for (const [emergencyType, guide] of Object.entries(FIRST_AID_GUIDES)) {
    formattedGuides[emergencyType] = formatGuideForResponse(guide);
  }
  return new Response(
    JSON.stringify({
      guides: formattedGuides,
      total_guides: Object.keys(formattedGuides).length,
      disclaimer: 'IMPORTANT: This information is for untrained first responders. This is not a substitute for professional medical training.'
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export function getEmergencyTypes() {
  const withGuides = Object.keys(FIRST_AID_GUIDES);
  const allEnumTypes = Object.values(EmergencyType);
  const withoutGuides = allEnumTypes.filter(
    (e) => !withGuides.includes(e) && !Object.keys(EMERGENCY_TYPE_ALIASES).includes(e)
  );
  const allTypes = [...withGuides, ...withoutGuides];
  return new Response(
    JSON.stringify({
      available_emergency_types: allTypes,
      total_available: allTypes.length
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

