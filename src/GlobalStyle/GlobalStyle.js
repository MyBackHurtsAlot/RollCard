import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    html,body{
        font-family: 'Noto Sans TC','Ubuntu Condensed',sans-serif;
        font-size: 16px;
        background-color:${(props) => props.theme.colors.primary_Dark};
        color:${(props) => props.theme.colors.primary_white};
        margin:25px 0;
    }
`;
export default GlobalStyle;
