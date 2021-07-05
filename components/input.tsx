import styled from 'styled-components';
import { StyleFonts } from 'config/fonts';
import { Colors } from 'config/colors';

type Prop = {
  fontSize?: number | string;
  fontVariant?: StyleFonts | string;
  fontColors?: Colors | string;
  color?: Colors | string;
  css?: string;
};

export const Input = styled.input`
  font-family: ${(props: Prop) => props.fontVariant};
  font-size: ${(props: Prop) => props.fontSize};
  color: ${(props: Prop) => props.fontColors};

  padding: 0.8rem;
  min-width: 142px;
  background: transparent;
  border: solid 1px ${(props: Prop) => props.color};
  user-select: none;

  :focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgb(41 204 196 / 25%);
  }

  ${(props: Prop) => props.css}
`;

Input.defaultProps = {
  fontVariant: StyleFonts.Regular,
  fontColors: Colors.Secondary,
  color: Colors.Secondary,
  fontSize: `14px`,
  css: ``,
};
