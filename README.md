# Lion's Apparel ✨

**Experience bespoke tailoring like never before. Upload a photo, select your desired style, and let our AI create your perfect look in seconds.**

![Lion's Apparel Screenshot](https://storage.googleapis.com/aistudio-project-files/assets/screenshot.png) <!--- This is a placeholder for a real screenshot of the app --->

Welcome to Lion's Apparel, a revolutionary application that brings the tailor's shop to your fingertips. Powered by Google's advanced Gemini AI, our tool allows you to visualize yourself in a vast collection of exquisite attire from around the world without ever leaving your home.

---

## 🚀 Key Features

-   **📸 Easy Photo Upload:** Simply upload a photo or drag and drop an image to get started.
-   **🔐 User Accounts:** Sign up and log in to manage your creations.
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
-   **✒️ Optional Watermark:** Choose to add the stylish "Lion's Apparel" logo to your downloaded images.
-   **⬇️ Instant Download:** Download your final creation with a single click and share it with the world.
-   **📱 Fully Responsive:** A sleek, modern, and responsive UI that works beautifully on both desktop and mobile devices.

---

## 🛠️ Tech Stack

This project is built with a modern frontend stack, leveraging the power of generative AI.

-   **Frontend:** [React](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Backend & Database:** [Supabase](https://supabase.com/)
-   **Generative AI:** [Google Gemini API](https://ai.google.dev/gemini-api) (`gemini-2.5-flash-image` model)

---

## ⚙️ How It Works

Lion's Apparel uses the multimodal capabilities of the **Google Gemini API** and **Supabase** for backend services.

1.  When you upload an image and select your customization options (suit, background, lighting, etc.), the application constructs a detailed text prompt.
2.  The original image and the detailed prompt are sent to the Gemini API (`gemini-2.5-flash-image` model).
3.  The model processes this request, performing an image-to-image edit based on the instructions. The "Face Lock" feature is a key part of the prompt, instructing the AI to isolate and protect the user's head and face from any alteration.
4.  The API returns a new, high-quality image, which is then displayed in the app.
5.  User authentication is handled by Supabase Auth. User data and generated images can be stored in the Supabase database.

---

## 🔧 Getting Started

To run this project, you'll need to set up your environment.

### Prerequisites

-   A modern web browser.
-   A Google Gemini API key.
-   A Supabase account.

### Setup

1.  **Download the project files.**

2.  **Set up your API Keys & Environment Variables:**
    The application requires API keys to function. You must make these keys available as environment variables. How you do this depends on your development environment. For many local setups, you can create a `.env` file in the root of your project.

    -   **Google Gemini API Key:**
        -   Get your key from [Google AI Studio](https://aistudio.google.com/app/apikey).
        -   Set the variable: `API_KEY=your_gemini_api_key`

    -   **Supabase Backend:**
        -   Create a new project on [Supabase](https://supabase.com/).
        -   Go to your project's "Settings" > "API".
        -   Find your Project URL and the `anon` public key.
        -   Set the variables:
            -   `SUPABASE_URL=your_supabase_project_url`
            -   `SUPABASE_ANON_KEY=your_supabase_anon_public_key`

3.  **Open the App:**
    Simply open the `index.html` file in your web browser to launch the application.

---

## 📁 Project Structure

The project is organized into a clear and modular structure:

```
/
├── components/         # Reusable React components (Uploader, Selectors, Icons, etc.)
├── contexts/           # React Context providers (e.g., AuthContext)
├── pages/              # Page components (HomePage, GalleryPage, AuthPage, etc.)
├── services/           # Service files for API calls (geminiService, supabaseClient)
├── utils/              # Utility functions (fileUtils.ts)
├── constants.ts        # All constant data (style options, prompts, etc.)
├── App.tsx             # Main app component with routing logic
├── index.tsx           # Entry point for the React application
└── index.html          # The main HTML file
```

---

## 📜 License

This project is licensed under the MIT License.