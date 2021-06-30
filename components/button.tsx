import styled from 'styled-components';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

type Prop = {
  size?: number | string;
  fontVariant?: StyleFonts | string;
  fontColors?: Colors | string;
  color?: Colors | string;
  nowrap?: boolean;
  upperCase?: boolean;
  css?: string;
};

export const Button = styled.div`
  cursor: pointer;
  font-family: ${(props: Prop) => props.fontVariant};
  font-size: ${(props: Prop) => props.size};
  color: ${(props: Prop) => props.fontColors};
  text-transform: ${(props: Prop) =>
    props.upperCase ? `uppercase` : `initial`};

  padding: 0.8rem;
  min-width: 142px;
  text-align: center;
  background: transparent;
  border: solid 1px ${(props: Prop) => props.color};
  user-select: none;

  :hover {
    color: ${Colors.White};
    border: solid 1px ${Colors.White};
  }

  ${(props: Prop) => props.css}
`;

Button.defaultProps = {
  fontVariant: StyleFonts.Regular,
  fontColors: Colors.Secondary,
  color: Colors.Secondary,
  nowrap: false,
  upperCase: false,
  size: `14px`,
  css: ``,
};