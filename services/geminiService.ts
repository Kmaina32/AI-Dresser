
import { GoogleGenAI, Modality, VideoGenerationReferenceImage, VideoGenerationReferenceType } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils.ts";
import { PoliticalParty } from "../constants.ts";

// Safely retrieve API Key to avoid Uncaught ReferenceError in browser
const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

// We allow initialization even without key to prevent crash on load
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

export type DesignMode = 'apparel' | 'vehicle' | 'interior' | 'landscape';

export async function editImageWithGemini(
  imageFile: File,
  stylePrompt: string,
  color: string,
  backgroundPrompt: string,
  lightingPrompt: string,
  shoePrompt: string,
  shirtPrompt: string,
  tiePrompt: string,
  handbagPrompt: string,
  eyewearPrompt: string,
  headwearPrompt: string,
  targetPersonPrompt: string,
  posturePrompt: string,
  isLockEnabled: boolean,
  quality: string,
  mode: DesignMode,
  rimsPrompt?: string,
  aeroPrompt?: string,
  vehicleInteriorPrompt?: string,
  vehicleLightingPrompt?: string
): Promise<string> {
  if (!ai) throw new Error("API Key is missing. Please check your environment variables.");
  
  const base64Data = await fileToBase64(imageFile);
  
  const promptParts: string[] = [];
  
  if (mode === 'apparel') {
      const targetPrefix = targetPersonPrompt ? `For the ${targetPersonPrompt}, ` : `For the main person, `;
      
      if (stylePrompt) {
        let attirePrompt = stylePrompt;
        if (color && color !== 'automatic') {
          attirePrompt = `${stylePrompt}. The primary color of this attire MUST be the hex color ${color}.`;
        }
        promptParts.push(`- **Main Attire:** ${targetPrefix}change their main attire to be ${attirePrompt}.`);
      }
      if (posturePrompt) promptParts.push(`- **Posture:** ${targetPrefix}change their posture to be '${posturePrompt}'.`);
      if (shirtPrompt) promptParts.push(`- **Shirt:** ${targetPrefix}change their shirt to be ${shirtPrompt}.`);
      if (tiePrompt) promptParts.push(`- **Neckwear:** ${targetPrefix}have them wear ${tiePrompt}.`);
      if (handbagPrompt) promptParts.push(`- **Accessory:** ${targetPrefix}add a handbag: ${handbagPrompt}.`);
      if (eyewearPrompt) promptParts.push(`- **Eyewear:** ${targetPrefix}add eyewear: ${eyewearPrompt}.`);
      if (headwearPrompt) promptParts.push(`- **Headwear:** ${targetPrefix}add headwear: ${headwearPrompt}.`);
  } 
  else if (mode === 'vehicle') {
      promptParts.push(`- **Vehicle Modification:** Transform the vehicle in the image. Apply the following style(s): ${stylePrompt}.`);
      if (color && color !== 'automatic') {
          promptParts.push(`- **Paint Color:** The vehicle paint should be the hex color ${color}.`);
      }
      
      if (rimsPrompt) promptParts.push(`- **Wheels/Rims:** Change wheels to: ${rimsPrompt}. Ensure proper fitment.`);
      if (aeroPrompt) promptParts.push(`- **Body Aero:** Install ${aeroPrompt}.`);
      if (vehicleInteriorPrompt) promptParts.push(`- **Interior:** Update visible interior to: ${vehicleInteriorPrompt}.`);
      if (vehicleLightingPrompt) promptParts.push(`- **Lighting/Grill:** Modify lighting/grill: ${vehicleLightingPrompt}.`);

      promptParts.push(`- **NUMBER PLATES:** RETAIN THE ORIGINAL NUMBER PLATES / LICENSE PLATES EXACTLY. DO NOT BLUR OR ALTER TEXT.`);
  }
  else if (mode === 'interior') {
      promptParts.push(`- **Interior Design:** Redesign the room's interior. Replace furniture and decor to match this style: ${stylePrompt}.`);
      if (color && color !== 'automatic') {
          promptParts.push(`- **Accent Color:** Use ${color} as a primary accent color for the decor.`);
      }
  }
  else if (mode === 'landscape') {
      promptParts.push(`- **Landscape Architecture:** Redesign the outdoor landscape/garden. Change the plants and hardscape to match this style: ${stylePrompt}.`);
  }

  if (backgroundPrompt) {
    promptParts.push(`- **Background:** Place the subject in the following setting: ${backgroundPrompt}.`);
  } else {
    promptParts.push(`- **Background:** YOU MUST RETAIN THE ORIGINAL BACKGROUND UNLESS INSTRUCTED OTHERWISE.`);
  }

  if (lightingPrompt) {
    promptParts.push(`- **Lighting:** Adjust the lighting to create this mood: ${lightingPrompt}.`);
  }

  const finalEdits = promptParts.join('\n');
  
  let preservationDirective = "";
  
  if (mode === 'apparel') {
      preservationDirective = `
      **CORE DIRECTIVE: IDENTITY & PHYSIQUE LOCK**
      - You MUST preserve the face, head, and identity of the person 100% perfectly.
      - You MUST preserve the person's exact body shape and physique. Do not make them thinner or more muscular.
      - If the background is not specified, preserve the original background perfectly.
      `;
  } else if (mode === 'vehicle') {
      preservationDirective = `
      **CORE DIRECTIVE: GEOMETRY & IDENTIFIER LOCK**
      - You MUST preserve the exact perspective, angle, and basic model geometry of the vehicle (unless body kit mods are requested).
      - You MUST RETAIN the original License Plate / Number Plate text legibility.
      - Keep the vehicle in the exact same position in the frame.
      - If the background is not specified, preserve the original background perfectly.
      `;
  } else if (mode === 'interior') {
      preservationDirective = `
      **CORE DIRECTIVE: ARCHITECTURAL LOCK**
      - You MUST preserve the structural shell of the room: walls, windows, ceiling, and floor plan.
      - Do NOT move windows or change the room's perspective.
      - ONLY change the furniture, decor, lighting, and surface finishes (flooring, wall paint).
      `;
  } else if (mode === 'landscape') {
       preservationDirective = `
      **CORE DIRECTIVE: TERRAIN LOCK**
      - You MUST preserve the main building structures (house, fences) and the topography of the land.
      - Do NOT change the architecture of the house.
      - ONLY change the vegetation, plants, flowers, walkways, and garden features.
      `;
  }

  const qualityReqs = quality === 'high' 
    ? "Output must be 4k resolution, hyper-realistic, professional photography grade." 
    : "Output must be realistic and clear.";

  const prompt = `
  You are an expert design AI specializing in ${mode} design.
  ${preservationDirective}
  
  **EDITING TASKS:**
  ${finalEdits}
  
  **QUALITY:**
  ${qualityReqs}
  
  Produce a seamless, photorealistic image.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType: imageFile.type } },
        { text: prompt },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image was generated by the API.");
}

export async function generateMusicPoster(
  artist1File: File,
  artist2File: File,
  posePrompt: string,
  aspectRatio: string,
  musicTitle: string,
  artistNames: string,
  backgroundPrompt: string,
  lightingPrompt: string,
  poseDetails: string,
  fontPrompt: string,
  iconPrompt: string
): Promise<string> {
     if (!ai) throw new Error("API Key is missing.");

     const base64Artist1 = await fileToBase64(artist1File);
     const base64Artist2 = await fileToBase64(artist2File);
     
     const prompt = `
     Create a professional music album poster.
     
     **Subjects:**
     - Combine the two provided images into a coherent scene.
     - Pose: ${posePrompt}. ${poseDetails}
     - PRESERVE THE FACES AND IDENTITIES of both artists.
     
     **Text:**
     - Title: "${musicTitle}" (Large, dominant text). Font Style: ${fontPrompt}.
     - Subtitle/Artist Names: "${artistNames}" (Smaller text below title).
     - Parental Advisory: ${iconPrompt ? 'Yes, add explicit content label.' : 'No.'}
     
     **Environment:**
     - Background: ${backgroundPrompt}.
     - Lighting: ${lightingPrompt}.
     
     **Quality:**
     - Aspect Ratio: ${aspectRatio}.
     - High resolution, cinematic composition, seamless blending.
     `; 
     
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: base64Artist1, mimeType: artist1File.type } },
                { inlineData: { data: base64Artist2, mimeType: artist2File.type } },
                { text: prompt }
            ]
        },
        config: { responseModalities: [Modality.IMAGE] }
     });
     
     for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
     }
     throw new Error("No image generated");
}

export async function generateStudioSession(
  person1File: File,
  person2File: File,
  scenarioPrompt: string,
  posePrompt: string,
  backgroundPrompt: string,
  lightingPrompt: string,
  aspectRatio: string
): Promise<string> {
    if (!ai) throw new Error("API Key is missing.");
    
    const base64Person1 = await fileToBase64(person1File);
    const base64Person2 = await fileToBase64(person2File);

    const prompt = `
    Generate a photorealistic studio session image merging these two subjects.
    
    **Context:**
    - Scenario: ${scenarioPrompt}
    - Pose: ${posePrompt}
    - Environment: ${backgroundPrompt}
    - Lighting: ${lightingPrompt}
    - Aspect Ratio: ${aspectRatio}

    **CORE DIRECTIVES:**
    1. **IDENTITY LOCK:** You MUST strictly preserve the facial features and identity of both subjects from the source images. Do not morph them into different people.
    2. **PHYSIQUE LOCK:** You MUST strictly preserve the body physique and build of both subjects. Do not make them skinnier, more muscular, or change their body type.
    3. **HARMONY:** Blend them seamlessly into the shared environment with matching lighting and shadows.
    
    Output a high-quality, professional photograph.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: base64Person1, mimeType: person1File.type } },
                { inlineData: { data: base64Person2, mimeType: person2File.type } },
                { text: prompt }
            ]
        },
        config: { responseModalities: [Modality.IMAGE] }
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
    throw new Error("No image generated");
}

export async function generateCampaignMaterial(
    imageFile: File,
    mode: 'poster' | 'vehicle',
    party: PoliticalParty,
    position: string,
    slogan: string,
    wrapStyle?: string,
    campaignMods?: string[]
): Promise<string> {
    if (!ai) throw new Error("API Key is missing.");

    const base64Data = await fileToBase64(imageFile);
    
    let prompt = "";
    
    if (mode === 'poster') {
        prompt = `
        Create a high-impact political campaign poster for this candidate.
        
        **Candidate Info:**
        - Candidate: The person in the uploaded image.
        - Party: ${party.fullName} (${party.name}).
        - Position: ${position}.
        - Slogan: "${slogan}".
        
        **Design Theme:**
        - **Colors:** Dominant theme colors MUST be ${party.colors}.
        - **Symbol:** Prominently feature the party symbol: ${party.symbol}.
        - **Style:** Patriotic, bold typography, professional portrait blending, Kenyan political poster aesthetic.
        - **Background:** Subtle gradient or crowd using party colors.
        
        **Directives:**
        - PRESERVE the candidate's face and identity 100%.
        - Place the candidate centrally and heroically.
        - Text should be legible and bold.
        `;
    } else {
        prompt = `
        Apply a photorealistic ${wrapStyle || 'full body'} political campaign vinyl wrap to the vehicle in the image.
        
        **Branding Assets:**
        - **Party Identity:** ${party.fullName} (${party.name}).
        - **Primary Colors:** ${party.colors} (Use strictly).
        - **Symbol:** ${party.symbol} (Feature accurately).
        - **Slogan:** "${slogan}" (Bold, legible typography).
        - **Candidate Position:** ${position}.
        
        **Wrap Style - ${wrapStyle || 'Full Branding'}:**
        ${getWrapStyleDescription(wrapStyle || 'full')}

        **Vehicle Modifications:**
        ${campaignMods && campaignMods.length > 0 ? campaignMods.map(m => `- Install: ${m}`).join('\n') : ''}

        **Technical Execution:**
        - **Materiality:** Render as high-quality automotive vinyl (gloss or matte).
        - **Geometry:** Graphics MUST contour perfectly to the vehicle's shape, door gaps, and fenders.
        - **Lighting:** Preserve all natural reflections and shadows on the car body.
        - **Number Plates:** RETAIN ORIGINAL NUMBER PLATES EXACTLY.
        - **Context:** If a person is present, DO NOT cover them. If they are leaning on the car, wrap around them. RETAIN BACKGROUND.
        `;
    }
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
            parts: [
                { inlineData: { data: base64Data, mimeType: imageFile.type } },
                { text: prompt }
            ]
        },
        config: { responseModalities: [Modality.IMAGE] }
    });

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
    }
    throw new Error("No image generated");
}

function getWrapStyleDescription(style: string): string {
    switch(style) {
        case 'minimal': return "- Apply a clean, minimal decal on the side doors and hood only. Keep the original car paint visible elsewhere.";
        case 'rally': return "- Design a rugged, rally-style livery with racing stripes, large numbers, and aggressive branding suited for a campaign convoy.";
        case 'soundtruck': return "- Transform this into a 'Sound Truck' style. Extremely bold, high-contrast text, designed to be seen from a distance. Full coverage.";
        case 'full': default: return "- Cover the entire vehicle body in the party colors. A complete color change wrap with integrated graphics.";
    }
}

export async function generateVideoWithVeo(
  imageFile: File | null,
  prompt: string,
  aspectRatio: '16:9' | '9:16',
  isExtendedLength: boolean,
  referenceImages: File[],
): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    return "https://storage.googleapis.com/aistudio-project-files/assets/video_mock.mp4"; 
}
