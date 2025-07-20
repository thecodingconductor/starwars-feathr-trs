import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  * {
      box-sizing: border-box;
    }

  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: ${({ theme }) => theme.fontFamily};
    transition: background 0.3s, color 0.3s;
  }

  h1, h2, h3 {
    font-family: ${({ theme }) => theme.headingFont};
  }
`

export default GlobalStyle
