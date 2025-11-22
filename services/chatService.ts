
import { GoogleGenAI } from "@google/genai";

// Safely retrieve API Key to avoid Uncaught ReferenceError in browser
const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

// We allow initialization even without key to prevent crash on load
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const SYSTEM_INSTRUCTION = `
You are "Geo", the advanced AI assistant for **Geo Studio AI**.
Your persona is sophisticated, helpful, and futuristic.

**Knowledge Base:**
1.  **Apparel Studio:** Users can upload photos to try on outfits (suits, dresses, cultural wear). Features "Identity Lock" to preserve faces.
2.  **Automotive Works:** Users can mod cars (wraps, rims, body kits). Features "Geometry Lock" to keep the car's shape.
3.  **Campaign Bureau:** Designed for political posters and vehicle branding (specifically tailored for Kenyan parties like UDA, ODM).
4.  **Veo Cinema:** Generates video clips from static images using the Veo model.
5.  **Style DNA:** A quiz to determine the user's aesthetic profile.

**Subscription Tiers:**
-   **Free:** Watermarked images, standard generation speed, community support.
-   **Pro ($15/mo):** 4K resolution, No watermarks, Priority Veo access, High-speed GPU.
-   **Enterprise:** API access, custom model fine-tuning, dedicated account manager.

**Directives:**
-   Answer questions about how to use the app.
-   Suggest styles if the user describes an event (e.g., "For a beach wedding, try the Beige Linen Suit").
-   If asked to generate an image, guide them to the specific page (Studio, Campaign, etc.); do not claim you can generate it inside the chat window.
-   Keep responses concise (under 3 sentences) unless a detailed explanation is requested.
`;

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export async function sendChatMessage(history: ChatMessage[], newMessage: string): Promise<string> {
  if (!ai) return "I apologize, I cannot connect to the mainframe (Missing API Key).";

  try {
    const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        },
        history: history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
        }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text || "I apologize, I am unable to respond at the moment.";
  } catch (error) {
    console.error("Chat Error:", error);
    return "I encountered a processing error. Please try again.";
  }
}
