# Star Wars Explorer – Feathr Takehome Project  
**by Tristan Rais-Sherman**

## Overview  
A responsive, searchable Star Wars data explorer built with modern React tooling. This project demonstrates my engineering approach, architectural thinking, and attention to user experience. It uses the SWAPI and akabab APIs to load and display data on People, Planets, and Starships.

## Tech Stack  

- **React.js** + **TypeScript**
- **Vite**
- **Zustand** for state management
- **Styled Components** for CSS-in-JS styling
- **Radix UI** for accessible modals
- **Jest** + **React Testing Library** for testing
- **ESLint** + **Prettier** for code quality

## Setup Instructions  

```bash
# 1. Clone the repo
git clone https://github.com/your-username/starwars-feathr-trs.git
cd starwars-feathr-trs

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev
```

## Features

- Mobile and Desktop Responsive UI
- Search and Filter for People, Planets, and Starships (by name)
- Pagination Controls
- Modals for Detail Pages using Radix UI Components
- Generic Reusable Architecture: `EntityPage`, `EntityStore`, `EntityCard`
- Unit and Integration Tests for Major Components

## My Approach

Any time I start a new project, I use it as an opportunity to improve, challenge myself, use new technologies, and refine my approach.

### Zustand  
This was my first time using Zustand for state management. It proved to be a great fit — simple, lightweight, and flexible.  

### Abstraction  
As the app grew, I noticed a lot of repetition across People, Planets, and Starships. I refactored into a generic `EntityPage`, `EntityStore`, and `EntityCard` architecture to follow DRY principles and improve maintainability.

Each entity page, like `PlanetPage` or `PersonPage`, simply imports some functions and passes them to `EntityPage`, which handles loading and rendering. This results in highly readable, modular code.

The layout and visual styling is handled by components in `/renderers`.

I’m pleased with this approach — it's clean, simple, and easy to debug. It's possible I went a bit far with abstraction, but I find it elegant and effective for the problem.

## Challenges Faced

### Linting & Tooling Chaos  
I ran into major issues configuring ESLint with TypeScript and Prettier. My original lint setup silently broke after adding Prettier. I encountered:
- Conflicting ESLint/TS versions
- Thousands of false-positive lint errors from `node_modules`
- ESM vs. CommonJS confusion due to Vite's module system

### Abstraction vs. Simplicity  
It took some iteration to decide when abstraction was appropriate. Implementing `createEntityStore`, `EntityPage`, and other generic components required careful TypeScript design and architectural planning — especially while learning Zustand for the first time.

### Combining Data Sources  
SWAPI lacked image data. I enhanced the user experience by fetching from a second API (`akabab/starwars-api`). Matching characters and fetching images added complexity but made the app feel complete.

### Lightsaber Cursor & SFX (Unfinished)  
I experimented with a fun cursor effect that turned the user’s pointer into a lightsaber with sound effects. I ran out of time before polishing it, but it’s a direction I’d love to revisit.