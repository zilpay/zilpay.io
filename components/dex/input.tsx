import { Colors } from "@/config/colors";
import styled from "styled-components";

import { Text } from 'components/text';
import { StyleFonts } from "@/config/fonts";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Container = styled.div`
  background: ${Colors.Black};
  border: 2px solid transparent;

  padding-top: 10px;
  padding-left: 16px;
  padding-right: 16px;

  :hover {
    border: 2px solid ${Colors.Muted};
  }
`;
const DropDown = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: space-between;

  min-width: 100px;
  height: 48px;
`;
const Input = styled.input`
  outline: none;
  border: 0;
  background: ${Colors.Black};
  color: ${Colors.White};
  font-size: 50px;

  width: 350px;
  height: 48px;

  :focus {
    outline: none;
  }
`;

export const FormInput: React.FC = () => {
  return (
    <label>
      <Container>
        <Wrapper>
          <Input />
          <DropDown>
            <img
              src="https://meta.viewblock.io/zilliqa.zil1zu72vac254htqpg3mtywdcfm84l3dfd9qzww8t/logo?t=light"
              alt="tokens-logo"
              height="40"
            />
            <Text
              fontColors={Colors.White}
              fontVariant={StyleFonts.Bold}
              css="font-size: 20px;padding-left: 5px;padding-right: 5px;"
            >
              XSGD
            </Text>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path
                d="M12.7121 7.40887C12.9717 7.14775 12.9705 6.72565 12.7094 6.46606C12.4483 6.20648 12.0261 6.20772 11.7666 6.46884L12.7121 7.40887ZM4.17192 6.73178C3.91157 6.47143 3.48946 6.47143 3.22911 6.73178C2.96876 6.99213 2.96876 7.41424 3.22911 7.67459L4.17192 6.73178ZM7.85072 11.3534L7.37932 11.8248C7.50458 11.9501 7.67455 12.0203 7.8517 12.0201C8.02886 12.0198 8.19862 11.949 8.32351 11.8234L7.85072 11.3534ZM3.22911 7.67459L7.37932 11.8248L8.32213 10.882L4.17192 6.73178L3.22911 7.67459ZM8.32351 11.8234L12.7121 7.40887L11.7666 6.46884L7.37793 10.8834L8.32351 11.8234Z"
                fill="white"
              />
            </svg>
          </DropDown>
        </Wrapper>
        <Wrapper>
          <Text>
            $73.569
          </Text>
          <Text>
            Balance: 0
          </Text>
        </Wrapper>
      </Container>
    </label>
  );
};
