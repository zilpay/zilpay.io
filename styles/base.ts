import { createGlobalStyle } from 'styled-components';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

export const BaseStyles = createGlobalStyle`
  @font-face {
    font-family: ${StyleFonts.FiraSansBold};
    src: url('/fonts/FiraSans-Bold.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.FiraSansSemiBold};
    src: url('/fonts/FiraSans-SemiBold.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.FiraSansMedium};
    src: url('/fonts/FiraSans-Medium.ttf');
  }
  @font-face {
    font-family: ${StyleFonts.FiraSansRegular};
    src: url('/fonts/FiraSans-Regular.ttf');
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

  @keyframes load {
    from {
        left: -150px;
    }
    to   {
        left: 100%;
    }
  }
`;
