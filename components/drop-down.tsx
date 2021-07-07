import React from 'react';
import styled from 'styled-components';

import { Colors } from '@/config/colors';
import { StyleFonts } from '@/config/fonts';

type ListType = {
  show: boolean;
};

const Button = styled.div`
  cursor: pointer;
  font-family: ${StyleFonts.SemiBold};
  font-size: 16px;
  color: ${Colors.Secondary};
  text-transform: uppercase;

  padding: 0.8rem;
  min-width: 142px;
  text-align: center;
  background-color: ${Colors.Dark};
  user-select: none;

  width: 142.5px;

  border-left: 1px solid ${Colors.Secondary};
  border-top: 1px solid ${Colors.Secondary};
  border-right: 1px solid ${Colors.Secondary};
  border-bottom: 1px solid ${(p: ListType) => p.show ? Colors.Dark : Colors.Secondary};

  :hover {
    color: ${Colors.White};
  }
`;
const List = styled.ul`
  position: absolute;

  width: 168px;

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

  padding: 10px;

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
  onSelect: (index: number) => void;
};

export const DropDown: React.FC<Prop> = ({ items, selected, onSelect }) => {
  const [show, setShow] = React.useState(false);

  const handleOnSelect = React.useCallback((index: number) => {
    onSelect(index);
    setShow(false);
  }, []);

  return (
    <div>
      <Button
        show={show}
        onClick={() => setShow(!show)}
      >
        {items[selected].name}
      </Button>
      <List show={show}>
        {items.filter((el) => el.value >= 0).map((el, index) => (
          <Item
            key={el.value}
            onClick={() => handleOnSelect(index)}
          >
            {el.name}
          </Item>
        ))}
      </List>
    </div>
  );
}

export default DropDown;
