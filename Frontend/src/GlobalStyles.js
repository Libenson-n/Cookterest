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
        font-family: "Reddit Sans Condensed", sans-serif;
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        color: dimgray;
        min-height: 100vh;
}
`;

export default GlobalStyles;
