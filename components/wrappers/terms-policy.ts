import styled from 'styled-components';
import { Colors } from '@/config/colors';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;
export const Dummy = styled.div`
  width: 10vw;
  border-top: solid 1px ${Colors.Text};
  margin-top: 20px;

  @media (max-width: 1000px) {
    display: none;
  }
`;
export const Wrapper = styled.div`
  max-width: 900px;
  margin-bottom: 30px;
  padding-left: 5px;
  padding-right: 5px;

  @media (max-width: 1000px) {
    text-align: center;
  }
`;
