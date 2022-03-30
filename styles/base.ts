import { createGlobalStyle } from 'styled-components';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

export const BaseStyles = createGlobalStyle`
  @font-face {
    font-family: ${StyleFonts.Bold};
    src: url('/fonts/Poppins-Bold.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.SemiBold};
    src: url('/fonts/Poppins-SemiBold.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.Medium};
    src: url('/fonts/Poppins-Medium.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.Regular};
    src: url('/fonts/Poppins-Regular.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.Light};
    src: url('/fonts/Poppins-Light.ttf');
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  a:link,
  a:visited,
  a:hover,
  a:active {
    text-decoration: none;
    color: inherit;
  }

  input {
    outline: none;
    border: 0;
    background: transparent;
    font-family: ${StyleFonts.Light};
    color: ${Colors.Primary};
  }

  button {
    cursor: pointer;
    color: ${Colors.Primary};
    font-family: ${StyleFonts.Bold};
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background: ${Colors.Button};
    user-select: none;
    text-align: center;

    border-radius: 14px;

    transition: background-color 250ms linear;

    :disabled {
      pointer-events: none;
      cursor: default;
      opacity: 0.8;
    }
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${Colors.Background};
    margin: 0;
    padding: 0;
  }

  * {
    text-rendering: optimizeLegibility;
    font-kerning: normal;
    text-shadow:0 0 1px var(${Colors.Muted});
  }

  @keyframes fade {
    from {
      opacity: 0;
    }
  
    to {
      opacity: 0.5;
    }
  }
`;
