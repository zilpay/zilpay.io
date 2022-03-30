import React from "react";
import { useStore } from "effector-react";
import { useTranslation } from "next-i18next";
import styled from "styled-components";

import { Modal, ModalHeader } from "components/modal";
import { Text } from "components/text";

import { Colors } from "@/config/colors";
import { BLOCKS, SLIPPAGE } from "@/config/dex";
import { StyleFonts } from "@/config/fonts";

import { $settings, updateSettings } from "@/store/settings";

type Prop = {
  show: boolean;
  onClose: () => void;
};

const Container = styled.div`
  padding: 10px;
`;
const Wrapper = styled.div`
`;
const Row = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
`;
const InputWrapper = styled.label`
  font-family: ${StyleFonts.Light};
  background: ${Colors.Button};
  color: ${Colors.Text};
  border-radius: 16px;
  border: 1px solid transparent;
  padding: 7px;

  width: 200px;
  display: flex;
  justify-content: flex-end;

  margin: 5px;

  input {
    padding-right: 10px;
    text-align: right;
    width: 180px;
  }

  :hover {
    border: 1px solid ${Colors.Text};
  }
`;
const Button = styled.a`
  cursor: pointer;
  background: ${Colors.Button};
  border-radius: 16px;
  padding: 7px;
  margin: 5px;

  color: ${Colors.Primary};
  font-family: ${StyleFonts.Light};

  :hover {
    color: ${Colors.Button};
    background: ${Colors.Primary};
  }
`;

export var SwapSettingsModal: React.FC<Prop> = function ({
  show,
  onClose
}) {
  const common = useTranslation(`common`);
  const settings = useStore($settings);

  const hanldeResetSlippage = React.useCallback(() => {
    updateSettings({
      ...settings,
      slippage: SLIPPAGE
    });
  }, [settings]);
  const hanldeResetBlocks = React.useCallback(() => {
    updateSettings({
      ...settings,
      blocks: BLOCKS
    });
  }, [settings]);
  const hanldeInputSlippage = React.useCallback((event) => {
    updateSettings({
      ...settings,
      slippage: Number(event.target.value)
    });
  }, [settings]);
  const hanldeInputBlocks = React.useCallback((event) => {
    updateSettings({
      ...settings,
      blocks: Number(event.target.value)
    });
  }, [settings]);

  return (
    <Modal
      show={show}
      title={(
        <ModalHeader onClose={onClose}>
          {common.t(`settings`)}
        </ModalHeader>
      )}
      width="390px"
      onClose={onClose}
    >
      <Container>
        <Wrapper>
          <Text>
            Slippage tolerance
          </Text>
          <Row>
            <Button onClick={hanldeResetSlippage}>
              Auto
            </Button>
            <InputWrapper>
              <input
                type="number"
                value={settings.slippage}
                onInput={hanldeInputSlippage}
              />
              %
            </InputWrapper>
          </Row>
        </Wrapper>
        <br />
        <Wrapper>
          <Text>
            Transaction deadline
          </Text>
          <Row>
            <Button onClick={hanldeResetBlocks}>
              Auto
            </Button>
            <InputWrapper>
              <input
                type="number"
                value={settings.blocks}
                onInput={hanldeInputBlocks}
              />
              blacks
            </InputWrapper>
          </Row>
        </Wrapper>
      </Container>
    </Modal>
  );
};
