# 🎮 Full-Stack Pokédex, Team Roster & Battle Engine

<div align="left">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/JWT_Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT Auth" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/Neon_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black" alt="Neon Postgres" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Zustand-430098?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br />

**PokéVault** is a full-stack, web app built with **Next.js 15**, **TypeScript**, and **Neon Postgres**. 
It lets users explore 1,300+ Pokémon, build a tactical 6-team roster, battle against enemies in a turn-based arena.


### 🏗️ Engineering Highlights

This project focuses on clean code, performance, and real-world full-stack architecture:

* **🔐 Silent Token Rotation (JWT):** Built a secure auth system using Access and Refresh tokens. If a session expires mid-game, the server silently issues new `HttpOnly` cookies in the background without interrupting the user's battle. Passwords are securely hashed with `bcrypt`.
* **⚡ Concurrent API Fetching:** Used `Promise.all` to fetch detailed Pokémon stats in parallel (`pokeAPI.ts`). This eliminates slow sequential requests and drastically cuts page load times.
* **⚔️ Turn-Based Battle Engine:** Engineered a custom client-side state machine (`BattleBoard.tsx`) with real-time damage math based on actual Pokémon stats, RNG critical hits, defense maneuvers, and automated AI counter-attacks.
* **🛡️ Server-Side Integrity:** Used Next.js Server Actions to enforce strict business rules (like the 6-ally team limit) and securely update XP scores and rankings in the database via Drizzle ORM.
* **🎛️ URL-Driven State:** Search filters and pagination sync directly to URL search parameters (`?filter=&offset=`), making pages bookmarkable and fully optimized for Server-Side Rendering (SSR).
* **🧹 Clean Code & Strict Types:** Used flat control flows (avoiding deeply nested `try...catch` blocks) combined with **Zod** schemas for strict runtime form validation and instant error feedback.

<br>

### ✨ Key Features

* **🔍 Pokédex Explorer:** Search, filter, and view base stats (HP, Attack, Defense, Speed) for 1,340+ Pokémon.
* **🛡️ Tactical Roster:** Build, manage, and inspect a custom fighting team of up to 6 allies.
* **⚔️ Battle Arena:** Engage in tactical turn-based combat with dynamic health bars and combat logs.
* **🏆 Hall of Fame:** Climb the global leaderboard by earning XP through battle victories.
* **🎨 Gamified UI:** A responsive, sci-fi themed interface with animated sprites built using Tailwind CSS.

<br>

---

### Live Demo: https://pokemon-one-zeta.vercel.app/

---

<br>

### 🛠️ Quick Start & Setup

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/masihcodes/pokemon.git
cd pokemon
npm install
```

### 2. Configure Environment Variables

Create a .env.local file in the root directory and add your Neon Serverless Postgres connection string:

```bash
DATABASE_URL="postgresql://user:password@ep-silent-shadow-a2xxxxx.eu-central-1.aws.neon.tech/neondb?sslmode=require"
ACCESS_JWT_SECRET="your_super_secret_access_key_here"
REFRESH_JWT_SECRET="your_super_secret_refresh_key_here"
ACCESS_TOKEN_TTL=3600 # 60 * 60 -> 1hour
REFRESH_TOKEN_TTL=604800 # 7 * 24 * 60 * 60 1week
```

### 3. Run Database Migrations / Push Schema

```bash
npx drizzle-kit push
```

### 4. Start the App

```bash
npm run dev
```

### 📁 Complete Project Architecture & File Structure

```bash
├── src/
│   ├── app/
│   │   ├── allies/
│   │   │   ├── action.ts           # Server Action for removing a Pokémon ally from the database
│   │   │   └── page.tsx            # Team Roster Route (Fetches user allies and calculates empty slots)
│   │   ├── auth/
│   │   │   └── action.ts           # Auth Server Actions (Bcrypt hashing, JWT signing, Sign In/Up/Out)
│   │   ├── battle/
│   │   │   ├── action.ts           # Server Actions for incrementing/decrementing user XP scores
│   │   │   └── page.tsx            # Battle Arena Route (Validates ally ownership and initializes combat)
│   │   ├── leaderboard/
│   │   │   └── page.tsx            # Hall of Fame Route (Fetches top 10 trainers via Drizzle ORM)
│   │   ├── action.ts               # Global Server Action for adding an ally (enforces 6-slot limit)
│   │   ├── layout.tsx              # Root Layout (JetBrains Mono setup, Navbar, Footer, Sonner Toaster)
│   │   └── page.tsx                # Explore Page (SSR Pokédex with URL-driven search and pagination)
│   │
│   ├── components/
│   │   ├── db/
│   │   │   ├── neon.ts             # Drizzle ORM setup, JWT verification, Silent Token Rotation logic
│   │   │   └── schema.ts           # PostgreSQL schema definitions (users and allies relational tables)
│   │   ├── modals/
│   │   │   ├── FleeModal.tsx       # Tactical retreat dialog preserving user XP score
│   │   │   ├── LoseModal.tsx       # Defeat dialog triggering score penalties (-50 XP)
│   │   │   ├── PokemonModal.tsx    # Detailed statistical modal with "Add to Roster" action
│   │   │   ├── SignInModal.tsx     # User login dialog powered by React 19 useActionState & Zod
│   │   │   ├── SignUpModal.tsx     # User registration dialog with Zod runtime error feedback
│   │   │   └── WinModal.tsx        # Victory dialog triggering score rewards (+150 XP)
│   │   ├── AlliesCard.tsx          # Roster Card UI with inline stat breakdown and battle launch triggers
│   │   ├── BattleBoard.tsx         # Core turn-based combat engine and HP math state machine
│   │   ├── Filter.tsx              # Debounced search input syncing with URL search parameters
│   │   ├── Footer.tsx              # Sticky responsive application footer
│   │   ├── Navbar.tsx              # Navigation bar displaying user XP status and route indicators
│   │   ├── Pagination.tsx          # URL-driven page navigation controls (24 items per page)
│   │   ├── PokemonCard.tsx         # Individual Pokédex card displaying sprites and type badges
│   │   ├── pokeAPI.ts              # External PokéAPI integration with Promise.all concurrent fetching
│   │   ├── types.ts                # Shared TypeScript interfaces, database types, and Zod schemas
│   │   └── usePokemonStore.ts      # Zustand global store managing modal visibility and battle states
│
├── .env.example                    # Template for required environment variables
├── .env.local                      # Local environment variables (Git ignored)
├── drizzle.config.ts               # Drizzle Kit migration and database tooling configuration
├── next.config.mjs                 # Next.js project configuration and remote image domains
├── package.json                    # Project dependencies and npm scripts
├── tsconfig.json                   # TypeScript compiler options and strict typing rules
└── tailwind.config.js              # Tailwind CSS and custom styling design system
```
