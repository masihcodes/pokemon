# 🎮 PokéVault (DevStack Arena) — Full-Stack Pokédex, Team Roster & Battle Engine

<div align="left">
  <img src="https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black" alt="Drizzle ORM" />
  <img src="https://img.shields.io/badge/Neon_Postgres-00E599?style=for-the-badge&logo=postgresql&logoColor=black" alt="Neon Postgres" />
  <img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" />
  <img src="https://img.shields.io/badge/Zustand-430098?style=for-the-badge&logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>

<br />

**PokéVault** is an interactive, gamified Full-Stack web application built with **Next.js 15 App Router** and **TypeScript**. It combines real-time data integration from the **PokéAPI** with a relational database backbone powered by **Neon Serverless Postgres** and **Drizzle ORM**.

Users can explore over 1,300 Pokémon, recruit up to six tactical allies into their personal roster, engage in turn-based combat inside the Battle Arena, and compete for XP and global ranking on the Hall of Fame Leaderboard.

---

## 🏗️ Engineering & Architectural Highlights

This project demonstrates advanced full-stack engineering, combining third-party REST API integration with robust database transactions and complex client-side state machines:

### 1. ⚡ Concurrent API Fetching & Performance Optimization
* **Eliminating Waterfall Requests:** Paginating through Pokémon requires fetching individual statistical details (HP, Attack, Defense, Speed, and Sprites) for each card. Instead of slow sequential requests, the application implements custom concurrent fetching (`makePromiseArray` + `Promise.all`) in `pokeAPI.ts`, drastically reducing page load latency and improving UX.

### 2. ⚔️ Turn-Based Combat Engine & Client State Machine
* **Dynamic Damage Math:** The `/battle` arena is powered by a custom client-side state machine (`BattleBoard.tsx`). Damage is dynamically computed using real Pokémon base stats (Attack vs. Defense ratios) combined with randomized critical variance (RNG).
* **Tactical Turn Mechanics:** Features automated timed counter-attacks from AI opponents, turn locks, and defensive mechanics such as "Turtle Mode" (cutting incoming damage by 50%). Color-coded health bars dynamically track HP depletion in real time.

### 3. 🛡️ Server-Side Business Logic & Data Integrity
* **Roster Constraints:** Enforces strict gameplay integrity via Next.js Server Actions (`addAllyAction`). Server-side checks prevent users from recruiting duplicate Pokémon or exceeding the strict 6-ally team limit before executing Drizzle ORM database insertions.
* **Automated XP & Progression:** Battle outcomes directly trigger server-side database mutations (`updateUserScore`), automatically awarding +100/150 XP for victories or penalizing -50 XP for defeats while recording achievement timestamps.

### 4. 🎛️ URL-Driven Pagination & Filtering
* **Shareable Pokedex State:** Pokedex pagination (`?offset=`) and real-time name filtering (`?filter=`) are fully synchronized with URL search parameters using Next.js navigation hooks (`useRouter`, `usePathname`, `useSearchParams`), enabling server-side rendering (SSR) of search results without client page reloads.

### 5. 🔐 Cookie-Based Auth & Runtime Validation
* **Type-Safe Security:** Uses **Zod** schemas (`SignupSchema`) for runtime form validation. Manages user authentication sessions securely using HTTP-only cookies (`user_token`) to protect roster modifications and battle rewards.

---

## ✨ Key Features

* **🔍 Pokedex Explorer:** Browse through 1,340+ Pokémon with instant name filtering, custom pagination, and detailed statistical breakdowns (HP, Attack, Defense, Speed).
* **🛡️ My Allies Roster:** Assemble a customized fighting team of up to 6 Pokémon. View combined roster stats or jump directly into the arena with your chosen champion.
* **⚔️ Interactive Battle Arena:** Engage in turn-based combat against randomized wild Pokémon. Choose between offensive strikes, defensive blocks, or tactical retreats.
* **🏆 Hall of Fame Leaderboard:** Compete against other trainers globally. View top trainers ranked by accumulated battle XP with custom medals and timestamps.
* **🎨 Sci-Fi Gamified UI:** Styled with **Tailwind CSS** featuring glowing neon health bars, animated battle sprites, and custom victory/defeat dialog modals.

---

## 🛠️ Quick Start & Setup

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
```

### 3. Run Database Migrations / Push Schema
```bash
npx drizzle-kit migrate
npx drizzle-kit push
```

### 4. Start the App
```bash
npm run dev
```

###  📁 Complete Project Architecture & File Structure

```bash
├── src/
│   ├── app/
│   │   ├── allies/
│   │   │   ├── action.ts           # Server Action for removing a Pokémon ally from the database
│   │   │   └── page.tsx            # Team Roster Route (Fetches user allies and calculates slots)
│   │   ├── auth/
│   │   │   └── action.ts           # Authentication Server Actions (Sign In, Sign Up, Sign Out)
│   │   ├── battle/
│   │   │   ├── action.ts           # Server Actions for incrementing/decrementing user XP scores
│   │   │   └── page.tsx            # Battle Arena Route (Validates ally ownership and initializes combat)
│   │   ├── leaderboard/
│   │   │   └── page.tsx            # Hall of Fame Route (Fetches top 10 trainers via Drizzle ORM)
│   │   ├── action.ts               # Global Server Action for adding an ally (enforces 6-slot limit)
│   │   ├── layout.tsx              # Root Layout (JetBrains Mono setup, Navbar, Footer, Sonner Toaster)
│   │   └── page.tsx                # Explore Page (SSR Pokedex with URL-driven search and pagination)
│   │
│   ├── components/
│   │   ├── db/
│   │   │   ├── neon.ts             # Drizzle ORM database connection, auth helpers, and XP queries
│   │   │   └── schema.ts           # PostgreSQL schema definitions (users and allies relational tables)
│   │   ├── modals/
│   │   │   ├── FleeModal.tsx       # Tactical retreat dialog preserving user XP score
│   │   │   ├── LoseModal.tsx       # Defeat dialog triggering score penalties (-50 XP)
│   │   │   ├── PokemonModal.tsx    # Detailed statistical modal with "Add to Roster" action
│   │   │   ├── SignInModal.tsx     # User login dialog powered by React 19 useActionState
│   │   │   ├── SignUpModal.tsx     # User registration dialog with Zod validation feedback
│   │   │   └── WinModal.tsx        # Victory dialog triggering score rewards (+150 XP)
│   │   ├── AlliesCard.tsx          # Roster Card UI with inline stat breakdown and battle launch triggers
│   │   ├── BattleBoard.tsx         # Core turn-based combat engine and HP math state machine
│   │   ├── Filter.tsx              # Debounced search input syncing with URL search parameters
│   │   ├── Footer.tsx              # Sticky responsive application footer
│   │   ├── Navbar.tsx              # Navigation bar displaying user XP status and route indicators
│   │   ├── Pagination.tsx          # URL-driven page navigation controls (24 items per page)
│   │   ├── PokemonCard.tsx         # Individual Pokedex card displaying sprites and type badges
│   │   ├── pokeAPI.ts              # External PokéAPI integration with Promise.all concurrent fetching
│   │   ├── types.ts                # Shared TypeScript interfaces, database types, and Zod schemas
│   │   └── usePokemonStore.ts      # Zustand global store managing modal visibility and battle states
│
├── .env.local                      # Environment variables (Neon Database Connection URL)
├── drizzle.config.ts               # Drizzle Kit migration and database tooling configuration
├── next.config.mjs                 # Next.js project configuration and remote image domains
├── package.json                    # Project dependencies and npm scripts
├── tsconfig.json                   # TypeScript compiler options and strict typing rules
└── tailwind.config.js              # Tailwind CSS and custom styling design system
```
