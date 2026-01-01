
import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils.ts";
import { PoliticalParty } from "../constants/campaign.ts";

const handleGenAIError = (error: any, context: string) => {
    console.error(`Error in ${context}:`, error);
    const message = error?.message || "";
    if (message.includes("403") || message.includes("permission")) {
        throw new Error("PERMISSION_DENIED: Your API key does not have access to this model. Please select a paid API key.");
    }
    if (message.includes("429") || message.includes("quota")) {
        throw new Error("RESOURCE_EXHAUSTED: Quota exceeded for this model. Please select a paid API key or try again later.");
    }
    if (message.includes("Requested entity was not found")) {
        throw new Error("NOT_FOUND: Requested entity was not found. Please re-select your API key.");
    }
    throw new Error(`${context} failed: ${message || "Unknown error"}`);
};

function getWrapStyleDescription(style: string): string {
    if (style === 'full') return "Full vehicle wrap covering all painted surfaces.";
    if (style === 'door') return "Decals applied to driver and passenger doors only.";
    return "Custom branding placement.";
}

export async function editImageWithGemini(
    imageFile: File,
    prompt: string,
    color: string,
    background: string,
    lighting: string,
    shoePrompt: string,
    shirtPrompt: string,
    tiePrompt: string,
    handbagPrompt: string,
    eyewearPrompt: string,
    headwearPrompt: string,
    targetPerson: string,
    posturePrompt: string,
    isLockEnabled: boolean,
    quality: string,
    mode: 'apparel' | 'vehicle' | 'interior' | 'landscape',
    rimsPrompt?: string,
    aeroPrompt?: string,
    interiorPrompt?: string,
    vehicleLightingPrompt?: string,
    envImageFile?: File
): Promise<string> {
    try {
        // Initialize AI client inside function to pick up latest API key
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = quality === 'high' ? 'gemini-3-pro-image-preview' : 'gemini-2.5-flash-image';
        
        const base64Image = await fileToBase64(imageFile);
        const parts: any[] = [
            { inlineData: { data: base64Image, mimeType: imageFile.type } }
        ];

        let finalPrompt = `
        Edit this image.
        Task: ${mode === 'vehicle' ? 'Modify vehicle' : 'Change attire/style'}.
        
        Style Directive: ${prompt}
        `;

        if (mode === 'apparel') {
            finalPrompt += `
            - Target: ${targetPerson || 'The main subject'}.
            - Attire Color: ${color === 'automatic' ? 'Match style' : color}.
            - Accessories: ${shoePrompt} ${shirtPrompt} ${tiePrompt} ${handbagPrompt} ${eyewearPrompt} ${headwearPrompt}.
            - Posture: ${posturePrompt}.
            `;
            if (isLockEnabled) finalPrompt += " IDENTITY LOCK: PRESERVE FACE EXACTLY.";
        } else if (mode === 'vehicle') {
            finalPrompt += `
            - Mods: ${rimsPrompt} ${aeroPrompt} ${interiorPrompt} ${vehicleLightingPrompt}.
            `;
            if (isLockEnabled) finalPrompt += " GEOMETRY LOCK: PRESERVE VEHICLE SHAPE EXACTLY.";
        } else if (mode === 'interior') {
             if (isLockEnabled) finalPrompt += " ARCHITECTURE LOCK: PRESERVE ROOM LAYOUT AND WINDOWS.";
        } else if (mode === 'landscape') {
             if (isLockEnabled) finalPrompt += " TERRAIN LOCK: PRESERVE TOPOGRAPHY.";
        }

        if (envImageFile) {
            const base64Env = await fileToBase64(envImageFile);
            parts.push({ inlineData: { data: base64Env, mimeType: envImageFile.type } });
            finalPrompt += " Use the second image as the Environment/Background. Composite the subject into this scene naturally.";
        } else {
            finalPrompt += `
            - Background: ${background}.
            - Lighting: ${lighting}.
            `;
        }

        parts.push({ text: finalPrompt });

        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: parts },
            config: {
                responseModalities: [Modality.IMAGE],
                imageConfig: quality === 'high' ? { imageSize: '4K' } : undefined
            }
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
        throw new Error("No image generated.");

    } catch (error) {
        handleGenAIError(error, 'editImageWithGemini');
        return "";
    }
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
    manifestoFormat?: string,
    aspectRatio: string = '1:1',
    customBackgroundFile?: File,
    customMessage?: string
): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const primaryModel = 'gemini-3-pro-image-preview';
        const fallbackModel = 'gemini-2.5-flash-image';
        const imageSize = quality === 'high' ? '4K' : '2K';
        
        const base64Data = await fileToBase64(imageFile);
        const isGreetingMode = !!customMessage && !!customBackgroundFile;

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
        const qualityInstruction = "**RESOLUTION: 4K ULTRA HD.** Text must be razor-sharp and perfectly legible. No artifacts.";
        
        let backgroundInstruction = "";
        
        if (customBackgroundFile) {
             const base64Bg = await fileToBase64(customBackgroundFile);
             parts.push({ inlineData: { data: base64Bg, mimeType: customBackgroundFile.type } });
             
             if (isGreetingMode) {
                 backgroundInstruction = `
                 - **MAIN VISUAL (RECIPIENT):** The provided background image (Image 2) contains the person being congratulated. This person must be the dominantly visible HERO of the poster.
                 - **VISIBILITY:** The HERO person must have NO transparency. They must be clearly visible, sharp, and the focal point of the composition. 
                 - **CANDIDATE PLACEMENT (SENDER):** The first image provided is the CANDIDATE (Sender). Place them in a professional sub-element like a circular badge, a framed corner inset, or a "From the desk of..." style signature footer.
                 `;
             } else {
                 backgroundInstruction = `- **CUSTOM BACKGROUND:** Use the provided background image. Composite the subject into this scene.`;
                 if (backgroundColor && backgroundOpacity && backgroundOpacity < 100) {
                     backgroundInstruction += ` Apply a ${backgroundColor} color tint at ${backgroundOpacity}% opacity to the background.`;
                 }
             }
        } else if (backgroundColor) {
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
            
            let posterSpecifics = "";
            
            if (isGreetingMode) {
                posterSpecifics = `
                **GREETING / CONGRATULATIONS MODE:**
                - **Primary Custom Message:** "${customMessage}" (Render this in prominent, elegant, celebratory typography across the hero image).
                - **Sender Details:** "From: ${nameText}, ${positionText}" (Place neatly near the candidate's badge or signature area).
                - **Theme:** Professional commendation / warm celebration.
                `;
            } else {
                posterSpecifics = `
                **STRICT TEXT CONTENT (COPY CHARACTERS EXACTLY):**
                - **Candidate Name:** "${nameText}" (Main Heading, Boldest Typography).
                - **Position:** "${positionText}" 
                - **Location:** "${locationText}"
                - **Slogan:** "${sloganText}"
                - **Party:** "${party.fullName}"
                
                **Name Placement:** The Candidate Name must be the HERO text.
                `;
            }

            prompt = `
            Design a high-impact professional poster.
            
            ${posterSpecifics}
            
            **Design Directives:**
            - **Typography:** Swiss Style / Modern Editorial. Clean, bold, hierarchical.
            - **Style Directive:** ${templatePrompt || "Clean, bold, professional"}.
            - **Color Palette:** Dominant theme colors MUST be ${party.colors}.
            ${backgroundInstruction}
            ${logoInstruction}
            
            **Core Directives:**
            - **SPELLING:** Use text exactly as provided.
            - **PRESERVE IDENTITY:** Preserve facial features of all subjects clearly.
            
            ${qualityInstruction}
            `;
        } else if (mode === 'manifesto') {
             const nameText = candidateName ? candidateName.toUpperCase() : "THE CANDIDATE";
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

        try {
            const response = await ai.models.generateContent({
                model: primaryModel, 
                contents: { parts: parts },
                config: { 
                    imageConfig: {
                        aspectRatio: aspectRatio,
                        imageSize: imageSize
                    }
                }
            });

            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
            throw new Error("Pro model returned no image.");

        } catch (error) {
            console.warn("Primary model failed, attempting fallback...", error);
            
            const response = await ai.models.generateContent({
                model: fallbackModel,
                contents: { parts: parts },
                config: { 
                    responseModalities: [Modality.IMAGE]
                }
            });

            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
            }
            
            throw new Error("No image generated (Fallback failed).");
        }
    } catch (error) {
        handleGenAIError(error, 'generateCampaignMaterial');
        return "";
    }
}

export async function generateVideoWithVeo(
    imageFile: File | null,
    prompt: string,
    aspectRatio: '16:9' | '9:16',
    isExtended: boolean,
    referenceImages: File[] = []
): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'veo-3.1-generate-preview';
        
        let config: any = {
            numberOfVideos: 1,
            aspectRatio: aspectRatio,
            resolution: '720p'
        };

        const imagePart = imageFile ? {
            imageBytes: await fileToBase64(imageFile),
            mimeType: imageFile.type
        } : undefined;

        if (referenceImages.length > 0) {
             const refPayload = [];
             for (const ref of referenceImages) {
                 refPayload.push({
                     image: {
                         imageBytes: await fileToBase64(ref),
                         mimeType: ref.type
                     },
                     referenceType: 'ASSET'
                 });
             }
             config.referenceImages = refPayload;
        }

        let operation = await ai.models.generateVideos({
            model: model,
            prompt: prompt,
            image: imagePart,
            config: config
        });

        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000));
            operation = await ai.operations.getVideosOperation({operation: operation});
        }

        const videoUri = operation.response?.generatedVideos?.[0]?.video?.uri;
        if (!videoUri) throw new Error("Video generation failed, no URI returned.");
        
        return `${videoUri}&key=${process.env.API_KEY}`;

    } catch (error) {
        handleGenAIError(error, 'generateVideoWithVeo');
        return "";
    }
}

export async function generateMusicPoster(
    artist1File: File,
    artist2File: File,
    pose: string,
    aspectRatio: string,
    title: string,
    names: string,
    background: string,
    lighting: string,
    poseDetails: string,
    fontStyle: string,
    iconStyle: string
): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const img1 = await fileToBase64(artist1File);
        const img2 = await fileToBase64(artist2File);

        const prompt = `
        Design a music album poster.
        Title: "${title}".
        Artist Names: "${names}".
        Composition: Two artists posing together.
        Pose: ${pose} (${poseDetails}).
        Background: ${background}.
        Lighting: ${lighting}.
        Typography: ${fontStyle}.
        Icon: Include ${iconStyle}.
        Use high quality photorealistic rendering.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [
                    { inlineData: { data: img1, mimeType: artist1File.type } },
                    { inlineData: { data: img2, mimeType: artist2File.type } },
                    { text: prompt }
                ]
            },
            config: {
                imageConfig: { aspectRatio: aspectRatio, imageSize: '2K' }
            }
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
        return "";
    } catch (e) {
        handleGenAIError(e, 'generateMusicPoster');
        return "";
    }
}

export async function generateStudioSession(
    person1File: File,
    person2File: File,
    scenario: string,
    pose: string,
    background: string,
    lighting: string,
    aspectRatio: string,
    extraDetails: string
): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const img1 = await fileToBase64(person1File);
        const img2 = await fileToBase64(person2File);

        const prompt = `
        Create a photorealistic studio photo of two people.
        Scenario: ${scenario}.
        Pose: ${pose}.
        Background: ${background}.
        Lighting: ${lighting}.
        Details: ${extraDetails}.
        Preserve facial features of both subjects.
        `;

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: {
                parts: [
                    { inlineData: { data: img1, mimeType: person1File.type } },
                    { inlineData: { data: img2, mimeType: person2File.type } },
                    { text: prompt }
                ]
            },
            config: {
                imageConfig: { aspectRatio: aspectRatio, imageSize: '2K' }
            }
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
        return "";
    } catch (e) {
        handleGenAIError(e, 'generateStudioSession');
        return "";
    }
}

export async function generateManifestoText(points: string, party: string, candidate: string): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
        Write a concise, punchy political manifesto section for ${candidate} running under the ${party} party.
        Key Points: ${points}.
        Style: Inspiring, action-oriented, professional. 
        Format: Bullet points using '•' symbol. Max 50 words total.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });
        
        return response.text || "";
    } catch (e) {
        handleGenAIError(e, 'generateManifestoText');
        return "";
    }
}

export async function generateArchitecturalDesign(
    width: string,
    length: string,
    sqm: string,
    floors: string,
    style: string,
    view: string,
    requirements: string,
    scale: string,
    sketchFile?: File
): Promise<string> {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `
        Architectural Rendering.
        Specs: ${width}m x ${length}m plot, ${sqm} sqm area, ${floors} floors.
        Style: ${style}.
        View: ${view}.
        Scale: ${scale}.
        Requirements: ${requirements}.
        High quality, detailed blueprint or 3D render style as requested.
        `;

        const parts: any[] = [{ text: prompt }];
        if (sketchFile) {
            const base64Sketch = await fileToBase64(sketchFile);
            parts.push({ inlineData: { data: base64Sketch, mimeType: sketchFile.type } });
        }

        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: { parts: parts },
            config: {
                imageConfig: { aspectRatio: '16:9', imageSize: '2K' }
            }
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
        return "";
    } catch (e) {
        handleGenAIError(e, 'generateArchitecturalDesign');
        return "";
    }
}
