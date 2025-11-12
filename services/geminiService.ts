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
  isFaceLockEnabled: boolean,
  quality: string
): Promise<string> {
  const base64Data = await fileToBase64(imageFile);
  
  const promptParts: string[] = [];
  if (stylePrompt) {
    promptParts.push(`- **Clothing Change:** Modify the person's suit to be ${stylePrompt}. Also, ensure any visible inner clothing (like a shirt, waistcoat, or tie) is appropriately adjusted to complement the new suit style and color for a complete, cohesive look.`);
  }
  if (backgroundPrompt) {
    promptParts.push(`- **Background Change:** Place the person in the following setting: ${backgroundPrompt}.`);
  }
  if (lightingPrompt) {
    promptParts.push(`- **Lighting Change:** Adjust the overall lighting of the scene to create the following mood: ${lightingPrompt}. This new lighting must affect both the person and the background consistently for a seamless, realistic integration.`);
  }
  if (shoePrompt) {
    promptParts.push(`- **Footwear Change:** If shoes are visible, change them to be ${shoePrompt}.
    **Crucial Details for Footwear:**
    - **Visibility:** The new shoes must be fully and clearly visible. Do not crop the feet or shoes unnaturally.
    - **Realism:** Render the shoe material (e.g., leather, suede) with hyper-realistic texture, reflections, and sheen.
    - **Style Accuracy:** The style must be an accurate depiction of the prompt (e.g., Oxford, Loafer).
    - **Integration:** The shoes must be stylistically appropriate and perfectly match the color palette and formality of the suit.`);
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

    prompt = `You are a master photorealistic editor. Your single most important instruction is to flawlessly edit the provided image according to the user's request while maintaining a 100% perfect, unchanged match of the person's identity. You must act as if you are using advanced face recognition technology to lock, isolate, and protect every pixel of the person's head from any alteration.

**ABSOLUTE CORE DIRECTIVE: PRESERVE IDENTITY (100% MATCH - NO EXCEPTIONS)**
This is not a guideline, it is a strict, unbreakable rule. Failure to adhere to this means the entire task is a failure.
- **Face, Head, and Hair:** The person's entire head, including their face, facial features (eyes, nose, mouth, etc.), skin tone, texture, facial expression, and hairstyle MUST remain absolutely UNCHANGED. Do not 'enhance' or 'retouch' them. It must be a pixel-perfect replication from the original photo.
- **Body and Pose:** Do NOT alter the person's body shape, proportions, height, weight, pose, or position within the frame.
- **Recognizability:** The person in the final image must be instantly and perfectly recognizable as the same person from the original photo. Any change that makes them look even slightly different is a critical failure.

**NEGATIVE CONSTRAINTS (WHAT NOT TO DO):**
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

Remember: Your primary goal is identity preservation. The edit is secondary. If you cannot perform the edit without changing the person, prioritize keeping the person identical to the original.`;
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