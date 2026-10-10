# 🌿 GreenBreak — Touch Grass AI

> **The 30-Second Outdoor Dispatcher for Screen-Bound Developers**  
> *Break out of desk-lock. Disconnect in under 30 seconds. Reclaim your circadian rhythm and focus.*

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Gemma AI](https://img.shields.io/badge/Google_Gemma-2_27B-4285F4?style=flat&logo=google)](https://ai.google.dev/gemma)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/atlas)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Problem Statement

Software engineers, remote workers, and students spend **10+ hours a day locked to screens**. When they finally take a break, they often "screen-switch" — scrolling social media on their phones instead of resting their eyes and minds. Existing fitness and habit apps demand continuous phone interaction, GPS tracking, and screen engagement.

### 💡 The Core Innovation: Zero-Screen UX
**GreenBreak** inverts the paradigm. Users spend **under 30 seconds on the web app** to configure and receive a real-world, sensory micro-mission. The app immediately locks into an **OLED "Pocket Mode"** with an ambient countdown timer, instructing the user to step away from all devices. Upon returning, open-source **Gemma AI** evaluates their sensory reflection, awards nature badges, and logs their outdoor minutes into MongoDB.

---

## ✨ Key Features

- **⚡ 30-Second Launchpad Configurator:** Select break interval (5m, 15m, 30m), real-world setting (Balcony, Urban Sidewalk, Public Park), and physical recovery target (Eye Strain, Brain Fog, Stiff Muscles).
- **🧠 Google Gemma 2 27B AI Inference:** Synthesizes structured 3-step sensory outdoor micro-missions with NO maps, NO GPS, and NO apps required.
- **🌑 OLED Pocket Mode (Screen Zero):** Pitch-black `#0B0C0E` canvas with a pulsing countdown timer that commands developers to step outside.
- **🔔 Zero-Asset Web Audio Chime:** Native harmonic audio alert synthesized in-browser with the Web Audio API when time expires.
- **🌱 Mindful Sensory Debrief:** Enter a 1-sentence observation evaluated by Gemma for mindfulness, granting custom nature badges (e.g. *Canopy Gazer*, *Bark Tactician*).
- **📊 Dedicated Activity Log (`/history`):** User-specific session history with aggregate sunlight minutes, completed quests, and unlocked nature badge collections stored in MongoDB Atlas.
- **🎨 Positivus Neo-Brutalist Design System:** Distinctive lime green accents (`#B9FF66`), solid black borders (`#191A23`), `rounded-[40px]` cards, and crisp Space Grotesk typography.

---

## 🏗️ Architectural Flow

```text
[ 1. Launchpad Screen (<30s) ]
User enters Name, selects Duration (15m), Setting (Sidewalk), and Focus (Eye Strain)
                     │
                     ▼ User clicks "Dispatch Outdoor Break"
POST /api/dispatch
  ├── Gemma 2 27B: Synthesizes a structured 3-step sensory micro-mission
  └── MongoDB Atlas: Records new session as "in_progress"
                     │
                     ▼
[ 2. Actionable Mission Card ]
Displays 3 physical observation cues (e.g. look 20m into the furthest skyline)
                     │
                     ▼ User clicks "Lock Screen & Step Outside"
[ 3. OLED Pocket Mode (Screen Zero) ]
  - Ultra-dark black canvas (#0B0C0E)
  - Minimal pulsing countdown timer
  - Synthesized Web Audio alert chime plays at 00:00
                     │
                     ▼ User returns to desk
[ 4. The 30-Second Sensory Debrief ]
User enters 1-sentence reflection: "Noticed cold breeze and sparrows nesting under the roof beam."
                     │
                     ▼ User clicks "Log Reflection & Claim Badge"
POST /api/complete
  ├── Gemma 2 27B: Evaluates sensory observation & awards Mindful XP + Nature Badge
  └── MongoDB Atlas: Finalizes session to "completed" & aggregates total streak
                     │
                     ▼
[ 5. Celebration Scorecard ]
Confetti burst, unlocked badge showcase, and live stats logged to /history
```

---

## 🛠️ Tech Stack & Dependencies

- **Frontend & Framework:** [Next.js 15](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with Positivus Theme Tokens (`#B9FF66`, `#191A23`, `#F3F3F3`)
- **Typography:** Space Grotesk (via `next/font/google`)
- **UI Component System:** [shadcn/ui](https://ui.shadcn.com/) (`sheet`, `badge`, `button`, `tooltip`, `separator`)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) with cached client connection pool
- **AI Inference Engine:** Backboard API (Primary: Google Gemma 2 27B) + OpenRouter API (Fallback: Gemma 9B Free Tier)
- **Visuals & Effects:** `lucide-react`, `canvas-confetti`
- **Audio:** Browser Native Web Audio API (Harmonic dual-sine synthesis)

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Ankit-Kum-ar/greenbreak.git
cd greenbreak
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` or `.env` file in the root directory:

```env
# MongoDB Atlas Connection String
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/greenbreak?retryWrites=true&w=majority"

# Primary AI Provider (Backboard API)
BACKBOARD_API_KEY="your_backboard_api_key"

# Fallback AI Provider (OpenRouter API)
OPENROUTER_API_KEY="your_openrouter_api_key"
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
greenbreak/
├── app/
│   ├── api/
│   │   ├── complete/route.ts      # Gemma debrief evaluation & session finalization
│   │   ├── dispatch/route.ts      # Gemma mission generation & MongoDB session creation
│   │   ├── health/route.ts        # Database connection & provider health check
│   │   └── history/route.ts       # User-specific break history query
│   ├── history/
│   │   └── page.tsx               # Dedicated Activity Log & Badge Scorecard Page
│   ├── globals.css                # Positivus tokens, Space Grotesk, neo-brutalist shadows
│   ├── layout.tsx                 # Root layout with Space Grotesk & TooltipProvider
│   └── page.tsx                   # Modular Stage Orchestrator (<160 lines)
├── components/
│   ├── history/
│   │   └── HistorySheet.tsx       # Quick slide-out activity drawer
│   ├── layout/
│   │   └── PositivusHeader.tsx    # Header with Star Glyph & navigation
│   ├── positivus/
│   │   ├── PositivusHero.tsx      # Showcase Hero section
│   │   ├── PositivusOptionCard.tsx# Neo-brutalist option selector button
│   │   └── PositivusSectionHeading.tsx # Green highlight section badge
│   ├── stages/
│   │   ├── SetupStage.tsx         # Stage 1: The 20-second Dispatcher Studio
│   │   ├── MissionStage.tsx       # Stage 2: 3-step action card
│   │   ├── PocketStage.tsx        # Stage 3: OLED Pocket Mode
│   │   ├── DebriefStage.tsx       # Stage 4: 30s sensory debrief input
│   │   └── SummaryStage.tsx       # Stage 5: Celebration & score card
│   └── ui/                        # shadcn/ui components
├── constants/
│   └── break-options.ts           # Durations, environments & focus area presets
├── hooks/
│   ├── use-audio-chime.ts         # Native Web Audio API harmonic chime
│   └── use-break-timer.ts         # Countdown timer management hook
├── lib/
│   ├── ai-engine.ts               # Multi-provider Gemma inference pipeline
│   └── mongodb.ts                 # Cached global MongoClient pool
└── types/
    ├── break.ts                   # Mission, Evaluation & Option interfaces
    └── history.ts                 # BreakSession & History response interfaces
```

## 📄 License

This project is licensed under the [MIT License](LICENSE).
