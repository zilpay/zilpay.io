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

  html {
    scroll-behavior: smooth;
  }

  body {
    background: ${Colors.Black};
    margin: 0;
    padding: 0;
  }

  .slick-slider {
    width: 100%;
    height: 100%;
  }

  .slick-dots li button:before {
    color: ${Colors.White};
  }
  .slick-dots li.slick-active button:before {
    color: ${Colors.White};
  }
  .slick-slide => div => a {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
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
