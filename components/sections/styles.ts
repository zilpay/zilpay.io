import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;

  width: 100%;
  height: 100%;

  margin-bottom: 20vh;
  margin-top: 20vh;
`;
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  max-width: 1200px;
  width: 100%;
  height: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
    flex-wrap: nowrap;
  }
`;
export const HeaderWrapper = styled.div`
  width: 100%;
  text-indent: 10vw;
`;