import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 87.5%;
  }

  body {
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.color};
  }

  body, input, textarea, button {
    font: 500 1rem 'PT Sans Narrow', sans-serif;
  }

  input {
    border: none;
    background-color: transparent;
    &:focus {
      outline: none;
    }
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    font-family: 'PT Sans Narrow', sans-serif;
  }

  h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }
`;
