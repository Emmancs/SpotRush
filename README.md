<<<<<<< HEAD
# SpotRush 🔍

**SpotRush** is an interactive, fast-paced "Spot the Difference" web game built with React, TypeScript, Vite, and Tailwind CSS. Players explore vibrant thematic worlds—from sun-drenched African savannas to deep coral reefs, enchanted castles, cozy kitchens, and cosmic star stations—identifying subtle anomalies before time runs out.

---

## 🌟 Features

- **5 Diverse Categories**:
  - 🦁 **Wild Animals**: Explore safari vistas and rainforest canopies.
  - ✨ **Mythic Fantasy**: Enchanted crystal towers, flying dragons, and magical fountain glades.
  - 🐠 **Deep Underwater**: Coral reefs, swimming sea turtles, clownfish, and sunken treasure chests.
  - 🍳 **Cozy Kitchen**: Master chef counters, bakeries, and pastry prep stations.
  - 🚀 **Cosmic Space**: Planetary orbits, spacewalking astronauts, and orbital stations.
- **Precision Difference Detection**:
  - Normalized relative coordinate system (percentage-based `0–100%`) ensuring responsiveness across any screen size and aspect ratio.
  - Euclidean tolerance distance detection.
  - Visual ripple markers and checkmark indicators on both original and modified images simultaneously upon discovery.
- **Intelligent Hint System**:
  - Spotlight beacon pulses over an unfound difference.
  - Strategic hint limit per level (3 hints default).
- **Dynamic Scoring & Stars Rating**:
  - Base points per difference found.
  - Speed bonus proportional to remaining time.
  - Accuracy bonus rewarding precision and penalizing misclicks.
  - 1-3 star performance rating saved to player profile.
- **Audio Experience**:
  - Melodic chimes on hit, failure buzzer, hint chimes, and victory fanfare.
  - Dual-layer audio engine: HTML5 Audio with Web Audio API procedural synthesis fallback.
  - Global audio mute/unmute control.
- **Persistent Progress**:
  - Automatically records cleared levels, high scores, fastest times, and total stars earned in local storage.

---

## 📂 Project Structure

```text
spotrush/
│
├── public/
│   ├── logo.svg
│   ├── favicon.ico
│   │
│   ├── puzzles/
│   │   ├── animals/
│   │   │   └── level-001/
│   │   │       ├── original.webp
│   │   │       └── modified.webp
│   │   │
│   │   ├── fantasy/
│   │   ├── underwater/
│   │   ├── kitchen/
│   │   └── space/
│   │
│   └── sounds/
│       ├── correct.mp3
│       └── complete.mp3
│
├── src/
│   │
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.tsx
│   │   │   └── Loading.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   └── CategoryCard.tsx
│   │   │   └── FeaturedLevels.tsx
│   │   │
│   │   └── game/
│   │       ├── GameHeader.tsx
│   │       ├── ImagePanel.tsx
│   │       ├── DifferenceMarker.tsx
│   │       ├── GameToolbar.tsx
│   │       ├── HintButton.tsx
│   │       └── CompletionModal.tsx
│   │
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── GamePage.tsx
│   │   ├── CategoriesPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── game/
│   │   ├── types.ts
│   │   ├── detection.ts
│   │   ├── scoring.ts
│   │   ├── hintSystem.ts
│   │   └── gameEngine.ts
│   │
│   ├── data/
│   │   ├── categories.ts
│   │   └── puzzles.ts
│   │
│   ├── hooks/
│   │   ├── useGame.ts
│   │   └── useProgress.ts
│   │
│   ├── utils/
│   │   └── storage.ts
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- `npm` (or `pnpm` / `yarn`)

### Installation

```bash
# Install all dependencies
npm install
```

### Development Server

```bash
# Start local development server with hot-reload
npm run dev
```

Open your browser at `http://localhost:3000`.

### Production Build

```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 🎮 How to Play

1. Choose a category or click **Quick Play** on the homepage.
2. Compare the **Original** and **Modified** images side by side.
3. Click or tap where you spot a difference.
4. If correct, a green marker locks into place on both images!
5. If you get stuck, click the **Hint** button to illuminate an unfound anomaly.
6. Find all differences before the countdown expires to win and earn up to 3 stars!

=======
# SpotRush
SpotRush is a colorful and relaxing Spot the Difference game. Compare two cartoon pictures, uncover hidden differences, explore exciting categories and challenge your observation skills. Play free, anytime, anywhere!
>>>>>>> 659472669eb95399ef5496bab7367a0aa757f10e
