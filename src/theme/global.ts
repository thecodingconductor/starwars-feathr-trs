import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: system-ui, sans-serif;
    transition: background 0.3s, color 0.3s;
  }
`;

export default GlobalStyle;