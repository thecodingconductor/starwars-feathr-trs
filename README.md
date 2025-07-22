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

1. Clone the repo:  
   ```bash
   git clone https://github.com/your-username/starwars-feathr-trs.git
   cd starwars-feathr-trs
   ```

2. Install dependencies:  
   ```bash 
   npm install
   ```

3. Run the development server:  
   ```bash
   npm run dev
   ```

# Features

- Mobile and Desktop Responsive UI
- Search and Filter for People, Planets, and Starships (by name)
- Pagination Controls
- Modals for Detail Pages using Radix UI Components
- Generic Reusable architecture such as EntityPage, EntityStore, EntityCard...
- Unit and Integration tests for major components

# My Approach

Any time I start a new project, I use it as an opportunity to improve, challenge myself, use new technologies, libraries, and consider new approaches.

- ## Zustand  
  I have never used Zustand in a project, so this was a great opportunity to try it out to manage app state.

-  ## Abstraction  
  As I got further into building out the application, writing logic to manage fetching People, Planets, and Starships, adding filtering and sorting capabilities, I discovered I was rewriting a lot of code.

  Each page in this app did similar things for each Entity type. So I thought to make a generic EntityPage, and a generic EntityStore, and EntityCard to follow DRY principles.

  I'm very happy with this approach, and feel like each component does simple tasks, the files are clean and easy to debug. Each entity page, like PlanetPage, PersonPage, simply pulls in some functions, and passes them to the EntityPage component, which handles loading and rendering the data.

  The layout and styling itself is handled by the renderers in /renderers

  It is certainly possible I went too far with it, but I find this easy to read and digest for review.

# Challenges 

- ## Linting and Tooling  
  Towards the end of the project, I found myself wrestling with some cascading issues around the interactions between TS, ESLint, and Prettier.

- ## Abstraction vs. Simplicity  
  One of the main challenges that occupied my thinking was when Abstraction was needed, and how much. As the app grew, I noticed that I was re-writing a lot of similar code. Rethinking my approach here and moving towards a more generic style with createEntityStore and EntityPage. I liked what I ended up with, but it required some thought. 

  I was using Zustand for the first time, and so finding the best way of writing a generic store, as well as using the correct types took some time. 

- ## Combining Data Sources  
  The SWAPI API does not return any image data, but I really felt that if it were possible, including images would go a long way to enhancing the user experience. I was able to find another Star Wars character API that did in fact return image data. So I had to come up with an approach to finding related data - and making a second API call to pull in image data. This took some time and effort to get done well. 

- ## Unfinished Lightsaber / Sound effect  
  I had a cool effect where I turned the users cursor into a lightsaber, and attempted to use a few different audio files to emulate the sounds of the lightsaber turning on, waving around, etc.
  I got pretty close, but struggled getting the "wave" data working correctly with the audio. Given the time constraints, I was unable to finish this feature, which I thought would have been a really nice touch.