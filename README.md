# AETHER | Digital Architecture

<div align="center">
<img width="1200" height="auto" alt="Aether Digital Architecture Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## 1. Project Identity & Vision

**AETHER** is a high-performance, avant-garde digital agency portfolio designed to demonstrate technical mastery and visual distinction. It rejects standard templates in favor of a "hand-coded" aesthetic that merges brutalist precision with organic fluidity.

*   **Core Philosophy:** "Visibility is Engineering."
*   **Aesthetic Language:** **Obsidian & Platinum**. Dark, immersive backgrounds (`#050505`) contrasted with sharp, platinum typography (`#EAEAEA`) and subtle, bioluminescent accents (Cyan/Violet auroras).
*   **User Experience:** heavily relies on "weighty" interactions—smooth scrolling with inertia, magnetic buttons, and a spotlight cursor—to create a premium, tactile feel.

## 2. Visual System & Interactions

The application implements a layered visual architecture to achieve depth and immersion:

### Layers (Z-Index Stack)
1.  **Base:** `bg-obsidian` (Deep Black).
2.  **Texture:** Perlin Noise Overlay (`mix-blend-overlay`, animated).
3.  **Grid:** Vertical architectural lines (`bg-grid-vertical`, low opacity).
4.  **Atmosphere:** Bioluminescent Aurora Orbs (Parallax-enabled, blurred gradients).
5.  **Content:** Main DOM elements (Text, Images).
6.  **Overlay:** Vignette & Spotlight (Mouse-tracking radial gradient).
7.  **Cursor:** Custom canvas-rendered dot & ring system with magnetic physics.

### Key Effects
-   **Scramble Text:** Hero titles decode themselves using random characters (`!<>-_`) before settling on the final text.
-   **Magnetic Buttons:** Buttons resist and snap to the mouse cursor within a threshold.
-   **Parallax-Staggered Reveal:** Expertise items cascade in with a staggered vertical slide and opacity fade.

## 3. Technical Architecture

This project utilizes a **Hybrid Architecture** designed for maximum initial load performance while retaining React's component modularity for complex views.

### Technology Stack
-   **Core Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (CDN-injected for rapid prototyping, Configured in `head`)
-   **Animation Engine:**
    -   [GSAP (GreenSock)](https://greensock.com/) - Orchestrates heavy timeline animations.
    -   [ScrollTrigger](https://greensock.com/scrolltrigger) - Triggers animations based on scroll position.
-   **Smooth Scroll:** [Lenis](https://lenis.studio/) - configured for "Heavy Landing" feel (Low lerp, high wheel multiplier).

### Directory Structure
```
/
├── components/          # React Components (Modular UI)
│   ├── Navbar.tsx      # Responsive Navigation
│   ├── Hero.tsx        # Entry Animations
│   ├── Expertise.tsx   # Service List
│   └── ...
├── index.html           # ENTRY POINT (Static + Hybrid Scripts)
├── App.tsx              # Main React Router/Layout Logic
├── index.tsx            # React Mount Point
└── vite.config.ts       # Build Configuration
```

> [!NOTE]
> **Hybrid State**: Currently, `index.html` contains semantic markup and inline scripts for immediate "Above the Fold" rendering, while `App.tsx` contains the React-driven state management. Future refactors will migrate the static HTML fully into the React Component tree (`components/`).

## 4. Setup & Development

**Prerequisites:** Node.js (v18+)

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Ensure `.env.local` exists (for any future API keys, currently not required for UI).

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```
    Access the app at `http://localhost:5173`.

4.  **Build for Production:**
    ```bash
    npm run build
    ```

## 5. Performance Optimization
-   **CSS Containment:** `will-change-transform` is strictly applied only to animating elements to prevent repaint checking.
-   **Lag Smoothing:** `gsap.ticker.lagSmoothing(0)` is used to prevent animation jumps during heavy main-thread blocking.
-   **Assets:** Fonts are preconnected (Inter, JetBrains Mono) to minimize FOUT (Flash of Unstyled Text).

---
*© 2025 Aether Agency. All Rights Reserved.*
