# Star Wars Explorer – Feathr Takehome Project  
**by Tristan Rais-Sherman**

## 🧠 Overview  
A responsive, searchable Star Wars data explorer built with modern React tooling. This project demonstrates my engineering approach, architectural thinking, and attention to user experience. It uses the SWAPI and akabab APIs to load and display data on People, Planets, and Starships.

## 🧪 Tech Stack  

- **React.js** + **TypeScript**
- **Vite**
- **Zustand** for state management
- **Styled Components** for CSS-in-JS styling
- **Radix UI** for accessible modals
- **Jest** + **React Testing Library** for testing
- **ESLint** + **Prettier** for code quality

## 🚀 Setup Instructions  

1. Clone the repo:  
   ```bash
   git clone https://github.com/your-username/starwars-feathr-trs.git
   cd starwars-feathr-trs

2. Install dependencies:
  ```bash 
  npm install

3. Run the development server:
  ```bash
  npm run dev



# Approach

Any time I start a new project, I use it as an opporunity to improve, challenge myself, and use new technologies, libraries, and approaches.

- Zustand
  I have never used Zustand in a project, so this was a great opportunity to try it out to manage app state.
- Abstraction
  As I got further into building out the application, and writing logic to manage fetching People, Planets, and Starships, adding filtering and sorting capabilities, I discvored I was rewriting a lot of similar code.

  Each page in this app did similar things for each Entity type. So I thought to make a generic EntityPage, and a generic EntityStore, to follow DRY principles.

  I'm very happy with this approach, and feel like each component does simple tasks, the files are clean and easy to debug. Each entity page, like PlanetPage, PersonPage, simply pulls in some functions, and passes them to the EntityPage component, which handles loading and rendering the data.

  The layout and styling itself is handled by the renderers in /renderers

  It is certainly possible I went too far and got too cute with it, but I find this easy to read and digest for review.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```
