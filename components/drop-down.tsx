import React from 'react';
import styled from 'styled-components';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

type ListType = {
  show: boolean;
};

const Button = styled.button`
  cursor: pointer;
  font-family: ${StyleFonts.SemiBold};
  font-size: 16px;
  color: ${Colors.Secondary};
  text-transform: uppercase;

  padding: 0.8rem;
  min-width: 160px;
  text-align: center;
  background-color: ${Colors.Dark};
  user-select: none;

  border-left: 1px solid ${Colors.Secondary};
  border-top: 1px solid ${Colors.Secondary};
  border-right: 1px solid ${Colors.Secondary};
  border-bottom: 1px solid ${(p: ListType) => p.show ? Colors.Dark : Colors.Secondary};

  :hover {
    color: ${Colors.White};
  }

  :disabled {
    opacity: 0.7;
  }
`;
const List = styled.ul`
  position: absolute;

  border-left: 1px solid ${Colors.Secondary};
  border-right: 1px solid ${Colors.Secondary};
  border-bottom: 1px solid ${Colors.Secondary};

  background-color: ${Colors.Dark};

  display: ${(p: ListType) => p.show ? 'block' : 'none'};
`;
const Item = styled.li`
  cursor: pointer;

  border-top: 1px solid ${Colors.Dark};
  border-bottom: 1px solid ${Colors.Dark};

  color: ${Colors.Text};
  font-family: ${StyleFonts.SemiBold};
  text-transform: uppercase;
  font-size: 16px;

  min-width: 133px;
  padding: 0.8rem;

  :hover {
    border-top: 1px solid ${Colors.Secondary};
    border-bottom: 1px solid ${Colors.Secondary};
    color: ${Colors.White};
  }
`;

type Prop = {
  items: {
    value: string | number;
    name: string;
  }[];
  selected: number;
  disabled?: boolean;
  onSelect: (index: number) => void;
};

export const DropDown: React.FC<Prop> = ({ items, selected, disabled, onSelect }) => {
  const [show, setShow] = React.useState(false);

  const handleOnSelect = React.useCallback((index: number) => {
    onSelect(index);
    setShow(false);
  }, []);

  return (
    <div>
      <Button
        show={show}
        disabled={Boolean(disabled)}
        onClick={() => setShow(!show)}
      >
        {items[selected].name}
      </Button>
      <List show={show}>
        {items.filter((el) => el.value >= 0).map((el, index) => (
          <Item
            key={el.value}
            onClick={() => handleOnSelect(index + 1)}
          >
            {el.name}
          </Item>
        ))}
      </List>
    </div>
  );
}

export default DropDown;
