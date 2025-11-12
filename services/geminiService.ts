import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from "../utils/fileUtils";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function editImageWithGemini(
  imageFile: File,
  stylePrompt: string,
  backgroundPrompt: string,
  lightingPrompt: string,
  shoePrompt: string,
  shirtPrompt: string,
  tiePrompt: string,
  handbagPrompt: string,
  targetPersonPrompt: string,
  posturePrompt: string,
  isFaceLockEnabled: boolean,
  quality: string
): Promise<string> {
  const base64Data = await fileToBase64(imageFile);
  
  const promptParts: string[] = [];
  const targetPrefix = targetPersonPrompt ? `For the ${targetPersonPrompt}, ` : `For the main person, `;
  
  if (stylePrompt) {
    promptParts.push(`- **Main Attire:** ${targetPrefix}change their main attire to be ${stylePrompt}.`);
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
  if (backgroundPrompt) {
    promptParts.push(`- **Background Change:** Place the person/people in the following setting: ${backgroundPrompt}.`);
  } else {
    // Add an explicit instruction to keep the original background if no new one is selected.
    promptParts.push(`- **Background Preservation:** The background of the image MUST NOT be changed. Keep the original background exactly as it is, maintaining all original details, objects, and composition.`);
  }
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

  if (isFaceLockEnabled) {
    const highQualityReqs = `- **Quality Matching:** The output image's resolution, sharpness, and overall fidelity MUST match or exceed the quality of the original uploaded photo. There should be no perceivable degradation.
- **Hyper-Realism:** The final image must be hyper-realistic and high-resolution, suitable for professional use.
- **Seamless Integration:** The lighting on the person's original head and body must be adjusted to blend seamlessly and photorealistically with the new clothing and background.
- **Detail Fidelity:** Pay extreme attention to detail in textures, fabrics, and lighting, ensuring they are rendered with utmost clarity.
- **Artifact-Free:** Avoid any digital artifacts, compression noise, blurriness, or distortions. The edit must be absolutely undetectable.`;

    const standardQualityReqs = `- The final image must be realistic and clear.
- The lighting on the person's original head and body must be adjusted to blend seamlessly with the new clothing and background.
- Avoid any obvious digital artifacts, blurriness, or distortions.`;
    
    const qualityRequirements = quality === 'high' ? highQualityReqs : standardQualityReqs;

    prompt = `You are a master photorealistic editor. Your single most important instruction is to flawlessly edit the provided image according to the user's request while maintaining a 100% perfect, unchanged match of the specified person's identity. You must act as if you are using advanced face recognition technology to lock, isolate, and protect every pixel of that person's head from any alteration.

**ABSOLUTE CORE DIRECTIVE: PRESERVE IDENTITY (100% MATCH - NO EXCEPTIONS)**
This is not a guideline, it is a strict, unbreakable rule. Failure to adhere to this means the entire task is a failure.
- **Targeted Person:** The following rules apply ONLY to the person targeted by the user's edits.
- **Face, Head, and Hair:** The person's entire head, including their face, facial features (eyes, nose, mouth, etc.), skin tone, texture, facial expression, and hairstyle MUST remain absolutely UNCHANGED. Do not 'enhance' or 'retouch' them. It must be a pixel-perfect replication from the original photo.
- **Body and Pose:** Do NOT alter the person's body shape, proportions, height, weight, pose, or position within the frame UNLESS a specific posture change is requested. Even with a posture change, the head and face must remain identical.
- **Proportional Integrity:** The person's height and body proportions MUST remain consistent with the original image and its environment. For example, if a person is standing next to a door in the original, their height relative to that door must be maintained. Do not artificially increase their height.
- **Recognizability:** The person in the final image must be instantly and perfectly recognizable as the same person from the original photo. Any change that makes them look even slightly different is a critical failure.

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
- Blend the new elements seamlessly with the original image's subject, creating a cohesive masterpiece.`;
    const standardQualityCreativeReqs = `- The final image should be high-quality, artistic, and visually appealing.
- Blend the new elements seamlessly with the original image's subject.`;
    
    const creativeQualityReqs = quality === 'high' ? highQualityCreativeReqs : standardQualityCreativeReqs;

    prompt = `You are a creative and skilled digital artist. Your task is to reimagine the person in the photo with a new style.
  
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

export async function generateVideoWithVeo(
  imageFile: File,
  prompt: string,
  aspectRatio: '16:9' | '9:16'
): Promise<string> {
  // Create a new instance to ensure it uses the latest key from the selection dialog
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const base64Data = await fileToBase64(imageFile);

  const finalPrompt = `Your most important instruction is to preserve the person's face, identity, and features from the original image with 100% accuracy. Do not change their facial expression unless specifically asked. The person in the video must be perfectly recognizable as the same person in the photo. With that strict rule in mind, animate the image based on the following description: "${prompt}"`;

  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: finalPrompt,
    image: {
      imageBytes: base64Data,
      mimeType: imageFile.type,
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
    throw new Error("Video generation succeeded but no download link was provided.");
  }
  
  // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
  // FIX: Robustly append the API key query parameter with '?' or '&' as needed.
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