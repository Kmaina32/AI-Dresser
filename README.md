
# Geo Studio AI 🦁✨

**The Ultimate Neural Design Engine.**

![Geo Studio](https://storage.googleapis.com/aistudio-project-files/assets/screenshot.png)

Welcome to **Geo Studio**, an experimental generative AI platform that bridges the gap between imagination and photorealism. Powered by Google's cutting-edge **Gemini 2.5** models, this application goes far beyond simple face-swapping. It is a comprehensive design suite for Fashion, Automotive, Politics, and Cinema.

---

## 🚀 The Modules

### 1. 👔 Apparel Studio
Experience bespoke tailoring like never before.
- **Global Wardrobe:** From Nigerian Agbada and Indian Sherwanis to Italian Suits and Streetwear.
- **Identity Lock:** Preserves facial features and body physique with 100% accuracy using semantic segmentation prompts.
- **Custom Accessories:** Add eyewear, headwear, and luxury handbags.

### 2. 🏎️ Automotive Works
A complete virtual garage for car enthusiasts.
- **Wraps & Paint:** Visualize vinyl wraps, color-shifting paints, and commercial branding.
- **Parts Modification:** Install body kits, spoilers, diffusers, and custom rims (JDM, Euro, Muscle).
- **Geometry Lock:** Preserves the exact perspective and model of the vehicle while applying modifications.
- **License Plate Protection:** Ensures original plates remain legible.

### 3. 🗳️ Campaign Bureau
Rapid content generation for political and brand campaigns.
- **Poster Generator:** Create high-impact election posters with slogans and party branding.
- **Vehicle Branding:** Automatically wrap campaign vehicles with party colors and symbols.
- **Kenyan Context:** Pre-loaded with major Kenyan political party assets.

### 4. 🎬 Veo Cinema
Bring still images to life.
- **Motion Synthesis:** Generate cinematic video clips from your static designs using the **Veo** model.
- **Control:** Adjust aspect ratios and prompt specifically for movement types (zoom, pan, breeze).

### 5. 🎵 Music Poster & Session
- **Duo Composition:** Merge two separate artist photos into a single cohesive album cover or studio session.
- **Atmosphere Control:** Set the lighting, background, and typography.

---

## 🛠️ Tech Stack

-   **Frontend:** [React 18](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for glassmorphism and responsiveness.
-   **AI Core:** [Google GenAI SDK](https://www.npmjs.com/package/@google/genai)
    -   `gemini-2.5-flash-image` for high-speed image editing.
    -   `veo` models for video generation.

---

## ⚙️ Setup & Installation

1.  **Clone the Repository.**
2.  **Environment Variables:**
    You must provide a valid Google Gemini API Key.
    `API_KEY=your_key_here`
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Run Development Server:**
    ```bash
    npm start
    ```

---

## 🎨 UI/UX Philosophy

Geo Studio features a "Dark Glass" aesthetic inspired by high-end creative software and cyberpunk interfaces.
-   **Knob Scroller:** Mobile navigation utilizes a unique haptic rotary dial interface.
-   **Glassmorphism:** Heavy use of backdrop blur and translucent layers.
-   **Fluid Animations:** CSS transitions for all state changes.

---

## 📜 License

This project is licensed under the MIT License.