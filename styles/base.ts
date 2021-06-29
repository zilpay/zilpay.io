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

  body {
    background: ${Colors.Black};
    margin: 0;
    padding: 0;
  }
`;
