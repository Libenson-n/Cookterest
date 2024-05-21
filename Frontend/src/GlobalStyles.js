import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        background-color: rgba(255, 255, 255, 1);
        --accent-color: rgba(255, 230, 154);
        --button-color: rgb(146, 180, 236);
        --primary-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        --primary-border: rgba(0, 0, 0, 0.1);
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        min-height: 100%;
        display: flex;
        flex-direction: column;
        font-family: "Reddit Sans Condensed", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        color: #333333;
   
        button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: var(--button-color);
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
}
`;

export default GlobalStyles;
