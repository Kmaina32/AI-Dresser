

import { GoogleGenAI, Modality, VideoGenerationReferenceImage, VideoGenerationReferenceType } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils.ts";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

// NOTE: A single, global instance is fine for non-VEO calls.
const ai = new GoogleGenAI({ apiKey: API_KEY });

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
  isFaceLockEnabled: boolean,
  quality: string
): Promise<string> {
  const base64Data = await fileToBase64(imageFile);
  
  const promptParts: string[] = [];
  const targetPrefix = targetPersonPrompt ? `For the ${targetPersonPrompt}, ` : `For the main person, `;
  
  if (stylePrompt) {
    let attirePrompt = stylePrompt;
    if (color && color !== 'automatic') {
      // Instruct the model to use the specific hex color for the attire.
      attirePrompt = `${stylePrompt}. The primary color of this attire MUST be the hex color ${color}.`;
    }
    promptParts.push(`- **Main Attire:** ${targetPrefix}change their main attire to be ${attirePrompt}.`);
  }
  if (posturePrompt) {
    promptParts.push(`- **Posture Change:** ${targetPrefix}change their posture to be '${posturePrompt}'. The new pose should look natural and appropriate for the chosen attire and background. This may involve significant changes to the body's position, but the person's identity and facial features should be preserved as much as possible.`);
  }
  if (shirtPrompt) {
    promptParts.push(`- **Shirt:** ${targetPrefix}change their shirt to be ${shirtPrompt}. It should be worn appropriately with the main attire.`);
  } else {
    // Explicit instruction for 'Automatic' shirt selection
    promptParts.push(`- **Shirt:** ${targetPrefix}wear a shirt that is stylistically perfect and culturally appropriate for the main attire. For formal Western suits, this is typically a dress shirt. For traditional African attire like an Agbada or Senator suit, it might be a matching tunic or no visible separate shirt at all. Make the most logical and fashionable choice.`);
  }
  if (tiePrompt) {
    promptParts.push(`- **Neckwear:** ${targetPrefix}have them wear ${tiePrompt}. This should be worn over the shirt.`);
  }
  if (handbagPrompt) {
    promptParts.push(`- **Accessory:** ${targetPrefix}add a handbag. It should be ${handbagPrompt}. The handbag should be held naturally or placed appropriately in the scene.`);
  }
  if (eyewearPrompt) {
    promptParts.push(`- **Eyewear:** ${targetPrefix}add eyewear. They should be wearing ${eyewearPrompt}. The eyewear must look realistic, fit their face naturally, and not obscure their eyes too much unless they are dark sunglasses.`);
  }
  if (headwearPrompt) {
    promptParts.push(`- **Headwear:** ${targetPrefix}add headwear. They should be wearing ${headwearPrompt}. The headwear must look realistic, fit their head naturally, cast appropriate shadows, and be styled correctly with their hair.`);
  }
  if (backgroundPrompt) {
    promptParts.push(`- **Background Change:** Place the person/people in the following setting: ${backgroundPrompt}.`);
  }
  // NOTE: Background preservation is now handled directly in the main prompt templates below.
  if (lightingPrompt) {
    promptParts.push(`- **Lighting Change:** Adjust the overall lighting of the scene to create the following mood: ${lightingPrompt}. This new lighting must affect both the person/people and the background consistently for a seamless, realistic integration.`);
  }
  if (shoePrompt) {
    promptParts.push(`- **Footwear Change:** ${targetPrefix}if their shoes are visible, change them to be ${shoePrompt}.
    **Crucial Details for Footwear:**
    - **Visibility:** The new shoes must be fully and clearly visible. Do not crop the feet or shoes unnaturally.
    - **Realism:** Render the shoe material (e.g., leather, suede) with hyper-realistic texture, reflections, and sheen.
    - **Style Accuracy:** The style must be an accurate depiction of the prompt (e.g., Oxford, Loafer, Pumps).
    - **Integration:** The shoes must be stylistically appropriate and perfectly match the color palette and formality of the outfit.`);
  }


  if (promptParts.length === 0) {
    // This case should be prevented by the UI, but as a fallback, return original image
    const dataUrl = `data:${imageFile.type};base64,${base64Data}`;
    const base64 = dataUrl.split(',')[1];
    return `data:${imageFile.type};base64,${base64}`;
  }

  const finalEdits = promptParts.join('\n');

  let prompt: string;
  
  const backgroundPreservationDirective = `
**CRITICAL RULE: PRESERVE ORIGINAL BACKGROUND (UNBREAKABLE RULE)**
This is a non-negotiable instruction.
- The background of the image MUST remain 100% IDENTICAL to the original photo.
- DO NOT generate a new background.
- DO NOT alter, blur, add to, or remove anything from the original background scenery.
- Every object, detail, and element of the original background must be perfectly preserved. Any change is a failure.
`;

  if (isFaceLockEnabled) {
    const highQualityReqs = `- **Quality Matching:** The output image's resolution, sharpness, and overall fidelity MUST match or exceed the quality of the original uploaded photo. There should be no perceivable degradation.
- **Hyper-Realism:** The final image must be hyper-realistic and high-resolution, suitable for professional use.
- **Realistic Shadows:** Generate physically accurate and realistic shadows cast by the person onto the background and onto their own body/clothing. These shadows MUST be consistent with the specified lighting conditions (e.g., 'Golden Hour' should produce long, soft shadows; 'Studio Lighting' should produce defined, clean shadows). The shadow's direction, softness, and intensity must be believable.
- **Seamless Integration:** The lighting on the person's original head and body must be adjusted to blend seamlessly and photorealistically with the new clothing and background.
- **Detail Fidelity:** Pay extreme attention to detail in textures, fabrics, and lighting, ensuring they are rendered with utmost clarity.
- **Artifact-Free:** Avoid any digital artifacts, compression noise, blurriness, or distortions. The edit must be absolutely undetectable.`;

    const standardQualityReqs = `- The final image must be realistic and clear.
- The lighting on the person's original head and body must be adjusted to blend seamlessly with the new clothing and background.
- **Consistent Shadows:** Add shadows to ground the person in the scene, ensuring they are consistent with the overall lighting.
- Avoid any obvious digital artifacts, blurriness, or distortions.`;
    
    const qualityRequirements = quality === 'high' ? highQualityReqs : standardQualityReqs;

    prompt = `You are a master photorealistic editor. Your single most important instruction is to flawlessly edit the provided image according to the user's request while maintaining a 100% perfect, unchanged match of the specified person's identity. You must act as if you are using advanced face recognition technology to lock, isolate, and protect every pixel of that person's head from any alteration.

**ABSOLUTE CORE DIRECTIVE: PRESERVE IDENTITY (100% MATCH - NO EXCEPTIONS)**
This is not a guideline, it is a strict, unbreakable rule. Failure to adhere to this means the entire task is a failure.
- **Targeted Person:** The following rules apply ONLY to the person targeted by the user's edits.
- **Face, Head, and Hair:** The person's entire head, including their face, facial features (eyes, nose, mouth, etc.), skin tone, texture, facial expression, and hairstyle MUST remain absolutely UNCHANGED. Do not 'enhance' or 'retouch' them. It must be a pixel-perfect replication from the original photo.
- **Body and Pose:** Do NOT alter the person's body shape, proportions, height, weight, pose, or position within the frame UNLESS a specific posture change is requested. Even with a posture change, the head and face must be identical.
- **Proportional Integrity:** The person's height and body proportions MUST remain consistent with the original image and its environment. For example, if a person is standing next to a door in the original, their height relative to that door must be maintained. Do not artificially increase their height.
- **Recognizability:** The person in the final image must be instantly and perfectly recognizable as the same person from the original photo. Any change that makes them look even slightly different is a critical failure.
${!backgroundPrompt ? backgroundPreservationDirective : ''}
**NEGATIVE CONSTRAINTS (WHAT NOT TO DO on the targeted person):**
- DO NOT generate a new face.
- DO NOT alter facial structure.
- DO NOT change skin color or add makeup.
- DO NOT modify the hair.
- DO NOT change the person's expression.
- DO NOT create a different person who merely resembles the original.

**EDITING TASK:**
With the absolute core directive in mind, apply ONLY the following modifications to the image:
${finalEdits}

**QUALITY REQUIREMENTS:**
${qualityRequirements}

Remember: Your primary goal is identity preservation for the specified person. The edit is secondary. If you cannot perform the edit without changing the person, prioritize keeping the person identical to the original.`;
  } else {
    const highQualityCreativeReqs = `- The final image should be of the highest artistic quality, with rich detail and professional-grade finish.
- **Artistic Shadows:** Integrate deep, realistic shadows that enhance the mood and dimensionality of the image. Shadows should be consistent with the lighting source and add a sense of realism and depth.
- Blend the new elements seamlessly with the original image's subject, creating a cohesive masterpiece.`;
    const standardQualityCreativeReqs = `- The final image should be high-quality, artistic, and visually appealing.
- **Believable Shadows:** Include believable shadows to ground the subject in the scene and enhance realism.
- Blend the new elements seamlessly with the original image's subject.`;
    
    const creativeQualityReqs = quality === 'high' ? highQualityCreativeReqs : standardQualityCreativeReqs;

    prompt = `You are a creative and skilled digital artist. Your task is to reimagine the person in the photo with a new style.
  ${!backgroundPrompt ? backgroundPreservationDirective : ''}
  **EDITING TASK:**
  Apply the following creative modifications to the image:
  ${finalEdits}

  **QUALITY GUIDELINES:**
  ${creativeQualityReqs}
  
  - Maintain realistic body proportions. Avoid unnaturally altering the person's height relative to their surroundings.
  - While you should aim for the person to be recognizable, some artistic interpretation and enhancement is encouraged.
  
  Produce a beautiful, stylized final image.`;
  }


  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: imageFile.type,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
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

    const isHighRes = aspectRatio.includes('hires');
    const finalAspectRatio = isHighRes ? aspectRatio.split('-')[0] : aspectRatio;

    const highResInstruction = isHighRes 
        ? `- **Resolution:** The final image must be very high resolution, at least 1400x1400 pixels, with sharp details.`
        : '';
    
    const poseDetailsInstruction = poseDetails ? `
    **Pose Refinements:**
    - Carefully apply the following specific instructions to refine the main pose: ${poseDetails}` : '';

    const textInstruction = (musicTitle || artistNames) ? `
4.  **Add Text (If Provided):**
    - If a Music Title is provided, add the text "${musicTitle}" to the poster. This should be a main title.
    - If Artist Names are provided, add the text "${artistNames}" to the poster, usually smaller than the title.
    - The text style should be: **${fontPrompt}**.
    - The text must be legible. Place it artfully so it doesn't obscure the artists' faces. If no text is provided, do not add any.` : '';

    const iconInstruction = iconPrompt ? `
5.  **Add Icon (If Provided):**
    - Include the following icon on the poster: **${iconPrompt}**. Place it appropriately, usually in a corner, without obscuring important details or faces.` : '';

    const prompt = `You are an expert graphic designer creating a promotional music poster. Your task is to create a single, new, cohesive, and hyper-realistic image featuring the two people from the two separate images provided.
- The person from the first image is Artist 1.
- The person from the second image is Artist 2.

**ABSOLUTE CORE DIRECTIVE: PRESERVE IDENTITY & PHYSIQUE (100% MATCH - NO EXCEPTIONS)**
This is a strict, unbreakable rule. Failure to adhere means the entire task is a failure.
1.  **Face, Head, and Hair:** For both Artist 1 and Artist 2, their entire head, including face, facial features (eyes, nose, mouth), skin tone, texture, facial expression, and hairstyle MUST remain absolutely UNCHANGED from their respective original photos. It must be a pixel-perfect replication. Use hyper-realistic skin textures and ensure lighting on the face is physically accurate and blends seamlessly.
2.  **Body Physique and Shape:** Do NOT alter the body shape, proportions, height, or weight of either artist. They must retain their original physique.
3.  **Recognizability:** Both individuals in the final image must be instantly and perfectly recognizable as the same people from their original photos.

**CREATIVE TASK:**
With the absolute core directive in mind, construct the poster with the following elements:
1.  **Combine Subjects:** Place both Artist 1 and Artist 2 into a brand new, unified scene. This must be a flawless, undetectable integration.
2.  **Set the Pose:** Arrange them in the following pose: "${posePrompt}". They should interact naturally in this pose.${poseDetailsInstruction}
3.  **Set the Scene:**
    - **Background:** The background of the scene should be: "${backgroundPrompt}".
    - **Lighting:** The lighting for the entire scene, affecting both artists and the background, should be: "${lightingPrompt}".
${textInstruction}
${iconInstruction}
6.  **Aesthetic & Quality:**
    - **HYPER-REALISM ONLY:** The final image MUST be hyper-realistic, indistinguishable from a professional photograph.
    - **NO FILTERS:** Do not apply any artistic filters, stylizations, cross-processing, or color grading that makes the image look unrealistic or "airbrushed". Maintain natural skin textures.
    - **Professional Quality:** The final image must have a professional, artistic, and high-quality aesthetic suitable for a real music poster. The lighting must be cinematic and unify both subjects seamlessly, creating consistent shadows and highlights.
7.  **Image Format:**
    - **Aspect Ratio:** The final image must have an aspect ratio of ${finalAspectRatio}.
    ${highResInstruction}

**NEGATIVE CONSTRAINTS (WHAT NOT TO DO):**
- DO NOT generate new faces or bodies.
- DO NOT change the artists' clothes unless absolutely necessary to make the pose look natural.
- DO NOT create a cartoon, painting, or stylized interpretation.
- DO NOT simply collage the two images. Create a new, single scene.
`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Artist1, mimeType: artist1File.type } },
            { inlineData: { data: base64Artist2, mimeType: artist2File.type } },
            { text: prompt },
          ],
        },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      const base64ImageBytes: string = part.inlineData.data;
      return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
    }
  }

  throw new Error("No image was generated by the API.");
}


export async function generateVideoWithVeo(
  imageFile: File | null,
  prompt: string,
  aspectRatio: '16:9' | '9:16',
  isExtendedLength: boolean,
  referenceImages: File[],
): Promise<string> {
  // Create a new instance to ensure it uses the latest key from the selection dialog
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const finalPrompt = `Your most important instruction is to preserve the person's face, identity, and features from the original image with 100% accuracy. Do not change their facial expression unless specifically asked. The person in the video must be perfectly recognizable as the same person in the photo. With that strict rule in mind, animate the image based on the following description: "${prompt}"`;

  const useAdvancedModel = isExtendedLength || referenceImages.length > 0;
  const model = useAdvancedModel ? 'veo-3.1-generate-preview' : 'veo-3.1-fast-generate-preview';
  const finalAspectRatio = referenceImages.length > 0 ? '16:9' : aspectRatio;
  const resolution = '720p'; // Extension and reference images require 720p

  // --- Build Initial Payload ---
  const initialPayload: any = {
    model: model,
    prompt: finalPrompt,
    config: {
      numberOfVideos: 1,
      resolution: resolution,
      aspectRatio: finalAspectRatio
    }
  };

  if (referenceImages.length > 0) {
    const referenceImagesPayload: VideoGenerationReferenceImage[] = [];
    for (const img of referenceImages) {
        referenceImagesPayload.push({
            image: {
                imageBytes: await fileToBase64(img),
                mimeType: img.type,
            },
            referenceType: VideoGenerationReferenceType.ASSET,
        });
    }
    initialPayload.config.referenceImages = referenceImagesPayload;
  } else if (imageFile) {
    initialPayload.image = {
      imageBytes: await fileToBase64(imageFile),
      mimeType: imageFile.type,
    };
  }
  
  // --- Initial Generation Call ---
  let operation = await ai.models.generateVideos(initialPayload);

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  // --- Looping Extension for 30s Video ---
  if (isExtendedLength) {
    const extensionsNeeded = 4; // Approx 4s initial + 4 * 7s extension = ~32s
    for (let i = 0; i < extensionsNeeded; i++) {
      const previousVideo = operation.response?.generatedVideos?.[0]?.video;
      if (!previousVideo) {
        throw new Error("Failed to get video from previous step for extension.");
      }
      
      const extensionPrompt = `Continue the previous scene naturally. ${prompt}`;

      operation = await ai.models.generateVideos({
        model: 'veo-3.1-generate-preview', // Extension requires the preview model
        prompt: extensionPrompt,
        video: previousVideo,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: finalAspectRatio,
        }
      });
      
      // Polling loop for the extension operation
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({operation: operation});
      }
    }
  }

  // --- Finalize and Return ---
  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
    throw new Error("Video generation succeeded but no download link was provided.");
  }
  
  const separator = downloadLink.includes('?') ? '&' : '?';
  const response = await fetch(`${downloadLink}${separator}key=${process.env.API_KEY}`);
  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Failed to download video:", errorBody);
    throw new Error(`Failed to download video: ${response.statusText}`);
  }
  const videoBlob = await response.blob();
  const videoUrl = URL.createObjectURL(videoBlob);
  return videoUrl;
}
