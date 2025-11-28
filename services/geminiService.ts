
import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils.ts";
import { PoliticalParty } from "../constants.ts";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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
  vehicleLightingPrompt?: string,
  environmentImageFile?: File
): Promise<string> {
  const base64Data = await fileToBase64(imageFile);
  
  const promptParts: string[] = [];
  
  // Special handling for Custom Environment
  if (environmentImageFile) {
       promptParts.push(`
          **TASK: SUBJECT PLACEMENT INTO CUSTOM ENVIRONMENT**
          - The FIRST image is the SUBJECT (Person).
          - The SECOND image is the TARGET ENVIRONMENT (Background).
          - **ACTION:** seamlessly integrate the person from the first image into the scene of the second image.
          - **PLACEMENT:** Scan the environment image for any seating areas (chairs, sofas, benches, stools). If found, generate the person SITTING on one of them naturally. If no seats are obvious, place them standing naturally in the scene.
          - **ENVIRONMENT PRESERVATION:** You MUST strictly preserve the background details, furniture, and layout of the second image. Do not remove objects or alter the room.
          - **LIGHTING MATCH:** Adjust the person's lighting and shadows to match the environment's lighting perfectly.
      `);
  }

  // Base instruction based on mode
  if (mode === 'apparel') {
      const targetPrefix = targetPersonPrompt ? `For the ${targetPersonPrompt}, ` : `For the main person, `;
      
      if (stylePrompt) {
        let attirePrompt = stylePrompt;
        if (color && color !== 'automatic') {
          attirePrompt = `${stylePrompt}. The primary color of this attire MUST be the hex color ${color}.`;
        }
        promptParts.push(`- **Main Attire:** ${targetPrefix}change their main attire to be ${attirePrompt}.`);
      }
      
      // Only apply posture prompt if we aren't using the specific "sit on seat" logic from the custom env, or if the user explicitly asked for something else
      if (posturePrompt && !environmentImageFile) {
          promptParts.push(`- **Posture:** ${targetPrefix}change their posture to be '${posturePrompt}'.`);
      } else if (environmentImageFile) {
           promptParts.push(`- **Posture:** Adapt the person's posture to sit or stand naturally within the provided environment image.`);
      }

      if (shirtPrompt) promptParts.push(`- **Shirt:** ${targetPrefix}change their shirt to be ${shirtPrompt}.`);
      if (tiePrompt) promptParts.push(`- **Neckwear:** ${targetPrefix}have them wear ${tiePrompt}.`);
      if (handbagPrompt) promptParts.push(`- **Accessory:** ${targetPrefix}add a handbag: ${handbagPrompt}.`);
      if (eyewearPrompt) promptParts.push(`- **Eyewear:** ${targetPrefix}add eyewear: ${eyewearPrompt}.`);
      if (headwearPrompt) promptParts.push(`- **Headwear:** ${targetPrefix}add headwear: ${headwearPrompt}.`);
  } 
  else if (mode === 'vehicle') {
      promptParts.push(`- **Vehicle Modification:** Transform the vehicle in the image. Apply the following BASE STYLE: ${stylePrompt}.`);
      if (color && color !== 'automatic') {
          promptParts.push(`- **Paint Color:** The vehicle paint should be the hex color ${color}.`);
      }
      
      if (rimsPrompt) promptParts.push(`- **Wheels/Rims:** Change wheels to: ${rimsPrompt}. Ensure proper fitment and perspective.`);
      if (aeroPrompt) promptParts.push(`- **Body Aero:** Install ${aeroPrompt}.`);
      if (vehicleInteriorPrompt) promptParts.push(`- **Interior:** Update visible interior to: ${vehicleInteriorPrompt}.`);
      if (vehicleLightingPrompt) promptParts.push(`- **Lighting & Accessories:** Apply the following modifications (e.g. window tint, underglow, lights): ${vehicleLightingPrompt}.`);

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

  // Background handling
  if (environmentImageFile) {
     promptParts.push(`- **Background:** DO NOT GENERATE A NEW BACKGROUND. USE THE PROVIDED SECOND IMAGE AS THE SCENE.`);
  } else if (backgroundPrompt) {
    promptParts.push(`- **Background:** Place the subject in the following setting: ${backgroundPrompt}.`);
  } else {
    promptParts.push(`- **Background:** YOU MUST RETAIN THE ORIGINAL BACKGROUND UNLESS INSTRUCTED OTHERWISE.`);
  }

  if (lightingPrompt && !environmentImageFile) {
    promptParts.push(`- **Lighting:** Adjust the lighting to create this mood: ${lightingPrompt}.`);
  }

  const finalEdits = promptParts.join('\n');
  
  let preservationDirective = "";
  
  if (mode === 'apparel') {
      preservationDirective = `
      **CORE DIRECTIVE: IDENTITY & PHYSIQUE LOCK**
      - You MUST preserve the face, head, and identity of the person 100% perfectly.
      - You MUST preserve the person's exact body shape and physique. Do not make them thinner or more muscular.
      ${!environmentImageFile && !backgroundPrompt ? '- If the background is not specified, preserve the original background perfectly.' : ''}
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

  // Prepare contents parts
  const parts: any[] = [
      { inlineData: { data: base64Data, mimeType: imageFile.type } }
  ];

  if (environmentImageFile) {
      const envBase64 = await fileToBase64(environmentImageFile);
      parts.push({ inlineData: { data: envBase64, mimeType: environmentImageFile.type } });
  }

  parts.push({ text: prompt });

  // Standard editing uses flash image model
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: parts,
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
  aspectRatio: string,
  additionalPrompt?: string
): Promise<string> {
    const base64Person1 = await fileToBase64(person1File);
    const base64Person2 = await fileToBase64(person2File);

    const prompt = `
    SYSTEM_DIRECTIVE: YOU ARE A PHOTOREALISTIC COMPOSITING ENGINE.
    PRIMARY_OBJECTIVE: MERGE TWO SUBJECTS INTO A SINGLE COHESIVE PHOTO.
    CONSTRAINT_LEVEL: MAXIMUM (IDENTITY PRESERVATION)

    **INPUT MAPPING:**
    - IMAGE 1 provided = SUBJECT A (Person 1)
    - IMAGE 2 provided = SUBJECT B (Person 2)

    **SCENE CONFIGURATION:**
    - **Scenario:** ${scenarioPrompt}
    - **Pose/Action:** ${posePrompt}
    - **Environment:** ${backgroundPrompt}
    - **Lighting:** ${lightingPrompt}
    - **User Notes:** ${additionalPrompt || "None"}
    - **Format:** ${aspectRatio}

    **EXECUTION RULES (STRICT):**
    1. **FACE LOCK:** You must conceptually "copy and paste" the faces from the input images.
       - Subject A's face MUST match Image 1 exactly.
       - Subject B's face MUST match Image 2 exactly.
       - DO NOT generate generic faces.
       - DO NOT blend the features of A and B.
    
    2. **REALISM:**
       - Skin texture must be natural (not waxy).
       - Lighting must interact realistically with both subjects.
       - Shadows must be consistent.

    3. **OUTPUT:**
       - A single high-resolution photograph.
       - No text, no borders, no artifacts.
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

export async function generateManifestoText(
    topics: string,
    partyName: string,
    candidateName: string
): Promise<string> {
    const prompt = `
    Write a short, punchy, and professional political manifesto summary.
    
    **Inputs:**
    - Candidate: ${candidateName}
    - Party: ${partyName}
    - Topics/Agenda: ${topics}
    
    **Output Format:**
    - Return ONLY a list of 3-4 short bullet points.
    - IMPORTANT: You MUST use the '•' symbol (dot) for bullet points. 
    - STRICTLY FORBIDDEN: Do NOT use asterisks (*).
    - Each point should be 1 concise sentence.
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });

    let text = response.text || "• Dedicated to service.\n• Committed to growth.\n• Vision for the future.";
    return text.replace(/\*/g, '•');
}

export async function generateCampaignMaterial(
    imageFile: File,
    mode: 'poster' | 'vehicle' | 'manifesto',
    party: PoliticalParty,
    position: string,
    slogan: string,
    wrapStyle?: string,
    campaignMods?: string[],
    templatePrompt?: string,
    candidateName?: string,
    location?: string,
    partyLogoFile?: File,
    backgroundColor?: string,
    backgroundOpacity?: number,
    quality: string = 'standard',
    manifestoPoints?: string,
    manifestoFormat?: string
): Promise<string> {
    // UPGRADE: Use Gemini 3 Pro for campaign materials to ensure High Text Fidelity
    const modelName = 'gemini-3-pro-image-preview';
    
    const base64Data = await fileToBase64(imageFile);
    
    const parts: any[] = [
        { inlineData: { data: base64Data, mimeType: imageFile.type } }
    ];

    let logoInstruction = `- **Symbol:** Prominently feature the party symbol: ${party.symbol}.`;

    if (partyLogoFile) {
        const base64Logo = await fileToBase64(partyLogoFile);
        parts.push({ inlineData: { data: base64Logo, mimeType: partyLogoFile.type } });
        logoInstruction = `- **OFFICIAL LOGO PROVIDED:** I have provided a second image which is the OFFICIAL PARTY LOGO. You MUST use this exact logo in the design.`;
    }
    
    let prompt = "";
    // Force high quality instruction for this model
    const qualityInstruction = "**RESOLUTION: 4K ULTRA HD.** Text must be razor-sharp and perfectly legible. No artifacts.";
    
    let backgroundInstruction = "";
    if (backgroundColor) {
        if (backgroundOpacity === 100) {
            backgroundInstruction = `- **Background:** Change the background to a solid or gradient using the hex color ${backgroundColor}.`;
        } else {
            backgroundInstruction = `- **Background Overlay:** Maintain the original background but apply a color overlay or tint using ${backgroundColor} with approximately ${backgroundOpacity}% intensity.`;
        }
    }

    if (mode === 'poster') {
        const nameText = candidateName ? candidateName.toUpperCase() : "";
        const positionText = position.toUpperCase();
        const locationText = location ? location.toUpperCase() : "";
        const sloganText = slogan.replace(/\*/g, '•');

        prompt = `
        Design a high-impact political campaign poster.
        
        **STRICT TEXT CONTENT (COPY CHARACTERS EXACTLY):**
        - **Candidate Name:** "${nameText}" (Main Heading, Boldest Typography).
        - **Position:** "${positionText}" 
        - **Location:** "${locationText}"
        - **Slogan:** "${sloganText}"
        - **Party:** "${party.fullName}"
        
        **Design Directives:**
        - **Typography:** Swiss Style. Clean, bold, hierarchical.
        - **Name Placement:** The Candidate Name must be the HERO text.
        - **Style Directive:** ${templatePrompt || "Clean, bold, presidential"}.
        - **Color Palette:** Dominant theme colors MUST be ${party.colors}.
        ${backgroundInstruction}
        ${logoInstruction}
        
        **Core Directives:**
        - **SPELLING CHECK:** Double check spelling of "${party.fullName}" and "${nameText}".
        - **PRESERVE IDENTITY:** Preserve the candidate's face and identity 100%.
        
        ${qualityInstruction}
        `;
    } else if (mode === 'manifesto') {
         const nameText = candidateName ? candidateName.toUpperCase() : "THE CANDIDATE";
         // Clean points: Remove existing bullets (*, -, •) to avoid duplication, then add standard dots
         const rawPoints = manifestoPoints || "Dedicated to service.\nIntegrity.\nDevelopment.";
         const pointsCleaned = rawPoints.replace(/\*/g, '•');

         const isSpread = manifestoFormat?.includes('Spread');
         const layoutMode = isSpread ? "Two-Page Spread (Left: Image, Right: Text)" : "Single Page Layout";
         
         prompt = `
        Design a High Modern Campaign Manifesto Document / Booklet.
        
        **FORMAT SPECIFICATION:**
        - Format: ${manifestoFormat || "A4 Vertical Document"}
        - Layout Mode: ${layoutMode}

        **MANDATORY TEXT CONTENT (COPY-PASTE EXACTLY):**
        1. **HEADLINE NAME:** "${nameText}" (Massive, Bold, High-Contrast).
        2. **PARTY:** "${party.fullName}".
        3. **SLOGAN:** "${slogan}".
        
        **VISION POINTS (BODY TEXT):**
        RENDER THE FOLLOWING TEXT EXACTLY. DO NOT SUMMARIZE.
        """
        ${pointsCleaned}
        """
        
        **DESIGN & LAYOUT RULES (CRITICAL):**
        - **NO TANGLING:** Text must be placed inside a SOLID COLOR CONTAINER (Sidebar or Text Box) with 100% opacity. 
        - **CONTRAST:** Dark text on Light block, or Light text on Dark block. NEVER text directly on a busy photo.
        - **TYPOGRAPHY:** Use a Swiss International Style (Helvetica/Inter). Clean, grid-based, highly legible.
        - **NAME:** The candidate's name should be the "Hero" visual element.
        - **THEME MATCHING:** Match the exact visual style of the campaign posters. Use the official party colors (${party.colors}) and theme as the dominant structural elements.

        **Style Directive:**
        ${templatePrompt || "High Modern Swiss Style. Strong grid, bold typography."}
        ${backgroundInstruction}
        ${logoInstruction}
        
        **Core Directives:**
        - **TEXT FIDELITY:** Copy the vision points word-for-word. Use the '•' symbol for bullets.
        - **PRESERVE IDENTITY:** You MUST preserve the candidate's face and identity 100%.
        
        ${qualityInstruction}
        `;
    } else {
        // Vehicle Mode
        prompt = `
        Apply a photorealistic ${wrapStyle || 'full body'} political campaign vinyl wrap to the vehicle.
        
        **Branding Assets:**
        - **Party:** ${party.fullName}.
        - **Candidate Name:** "${candidateName ? candidateName.toUpperCase() : ""}".
        - **Slogan:** "${slogan}".
        - **Position:** ${position}.
        
        **Design Specs:**
        - **Primary Colors:** ${party.colors} (Use strictly).
        ${logoInstruction}
        
        **Wrap Style - ${wrapStyle || 'Full Branding'}:**
        ${getWrapStyleDescription(wrapStyle || 'full')}

        **Vehicle Modifications:**
        ${campaignMods && campaignMods.length > 0 ? campaignMods.map(m => `- Install: ${m}`).join('\n') : ''}

        **Technical Execution:**
        - **Geometry:** Graphics MUST contour perfectly to the vehicle's shape.
        - **Number Plates:** RETAIN ORIGINAL NUMBER PLATES EXACTLY.
        
        ${qualityInstruction}
        `;
    }
    
    parts.push({ text: prompt });

    const response = await ai.models.generateContent({
        model: modelName, // Using Pro model
        contents: {
            parts: parts
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
    // Mock implementation for demonstration
    await new Promise(resolve => setTimeout(resolve, 3000)); 
    return "https://storage.googleapis.com/aistudio-project-files/assets/video_mock.mp4"; 
}
