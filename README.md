# AI Bespoke Styler ✨

**Experience bespoke tailoring like never before. Upload a photo, select your desired style, and let our AI create your perfect look in seconds.**

![AI Bespoke Styler Screenshot](https://storage.googleapis.com/aistudio-project-files/assets/screenshot.png) <!--- This is a placeholder for a real screenshot of the app --->

Welcome to AI Bespoke Styler, a revolutionary application that brings the tailor's shop to your fingertips. Powered by Google's advanced Gemini AI, our tool allows you to visualize yourself in a vast collection of exquisite attire from around the world without ever leaving your home.

---

## 🚀 Key Features

-   **📸 Easy Photo Upload:** Simply upload a photo or drag and drop an image to get started.
-   **🌍 Diverse Style Catalog:** Explore a rich collection of styles across various categories:
    -   **African Bespoke:** From Nigerian Senator styles to Maasai Shuka patterns.
    -   **Indian Regal:** Classic Sherwanis, Jodhpuri suits, and more.
    -   **Arabic Attire:** Elegant Thobes, Bishts, and Kanduras.
    -   **Western Classics:** Timeless tuxedos, pinstripes, and modern fits.
-   **🎨 Full Customization:** Fine-tune your look with options for:
    -   **Backgrounds:** Place yourself in a conference hall, at a wedding, or next to a luxury car.
    -   **Lighting:** Set the mood with studio, golden hour, or dramatic evening light.
    -   **Footwear:** Complete your outfit with the perfect pair of shoes, from classic Oxfords to suede loafers.
-   **🔒 Face Lock Technology:** Our unique "Face Lock" feature ensures your facial features, expression, and identity are preserved with 100% accuracy, providing a realistic and believable result.
-   **💎 High-Quality Renders:** Choose between Standard and High quality to generate stunning, photorealistic images suitable for professional use.
-   **⬇️ Instant Download:** Download your final creation with a single click and share it with the world.
-   **📱 Fully Responsive:** A sleek, modern, and responsive UI that works beautifully on both desktop and mobile devices.

---

## 🛠️ Tech Stack

This project is built with a modern frontend stack, leveraging the power of generative AI.

-   **Frontend:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Generative AI:** [Google Gemini API](https://ai.google.dev/gemini-api) (`gemini-2.5-flash-image` model)

---

## ⚙️ How It Works

AI Bespoke Styler uses the multimodal capabilities of the **Google Gemini API**.

1.  When you upload an image and select your customization options (suit, background, lighting, etc.), the application constructs a detailed text prompt.
2.  The original image and the detailed prompt are sent to the Gemini API (`gemini-2.5-flash-image` model).
3.  The model processes this request, performing an image-to-image edit based on the instructions. The "Face Lock" feature is a key part of the prompt, instructing the AI to isolate and protect the user's head and face from any alteration.
4.  The API returns a new, high-quality image, which is then displayed in the app for you to view and download.

---

## 🔧 Getting Started

To run this project, you'll need to set up your environment.

### Prerequisites

-   A modern web browser.
-   A Google Gemini API key.

### Setup

1.  **Download the project files.**

2.  **Set up your API Key:**
    The application requires a Google Gemini API key to function. You must set this key as an environment variable named `API_KEY`. How you set this variable will depend on your operating system and development environment.

3.  **Open the App:**
    Simply open the `index.html` file in your web browser to launch the application.

---

## 📁 Project Structure

The project is organized into a clear and modular structure:

```
/
├── components/         # Reusable React components (Uploader, Selectors, Icons, etc.)
├── pages/              # Page components (HomePage, GalleryPage, AboutPage)
├── services/           # Service files for API calls (geminiService.ts)
├── utils/              # Utility functions (fileUtils.ts)
├── constants.ts        # All constant data (style options, prompts, etc.)
├── App.tsx             # Main app component with routing logic
├── index.tsx           # Entry point for the React application
└── index.html          # The main HTML file
```

---

## 📜 License

This project is licensed under the MIT License.
