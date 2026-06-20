# PokéBattle Arena ⚡️

A modern, full-stack Pokémon roster and battle simulator built with Next.js and TypeScript.

This project is a showcase of modern frontend development and full-stack architecture, focusing on performance, clean code, and great user experience.

## 🚀 Key Features

- **Interactive Battle Engine:** A custom turn-based battle system with dynamic HP bars, defense mechanics, and combat logs.
- **Smart Pagination & Search:** Lightning-fast client-side filtering combined with efficient API data fetching for seamless exploration.
- **Database Integration:** Saving user rosters, battle scores, and a global Leaderboard using a real PostgreSQL database.
- **Protected Routes:** Safe navigation ensuring only logged-in users can access the battle arena and their personal roster.
- **Responsive UI:** Beautiful, animated, and fully responsive design using Tailwind CSS.

## 🛠️ Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Data Validation:** Zod
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **External API:** PokéAPI

## 💡 Engineering Highlights

- **Optimized API Calls:** Used `Promise.all` and Server-side caching to reduce load times and avoid rate limits.
- **Hydration Error Prevention:** Properly managed React lifecycles and state to sync server and client rendering perfectly.
- **Debounced Inputs:** Implemented custom debounce logic for the search bar to prevent unnecessary server requests.

## ⚙️ How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/masih-deutsch/pokemon.git
   ```
