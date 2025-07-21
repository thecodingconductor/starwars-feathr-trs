// styles/GlobalStyle.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body {
    margin: 0;
    padding: 0;
    overscroll-behavior: none;
    overflow-x: hidden;
    font-family: ${({ theme }) => theme.fontFamily}, system-ui, sans-serif;
    background-color: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: background 0.3s ease, color 0.3s ease;
    min-height: 100vh;
  }

  #root {
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.headingFont}, sans-serif;
    margin: 0;
  }

  a {
    color: ${({ theme }) => theme.link};
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.6em 1.2em;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: ${({ theme }) => theme.accent};
    color: ${({ theme }) => theme.text};
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

export default GlobalStyle;
