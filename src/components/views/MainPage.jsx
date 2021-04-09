import styled from "styled-components";
import { Card } from "../content/Card";

const Container = styled.div`
  /* background-color: pink; */
  height: 100%;
  display: grid;
  gap: 10px;
  padding: 10px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-template-rows: repeat(auto-fit, minmax(300px, 1fr));
  /* place-content: center; */
  justify-items: center;
  padding-top: 90px;

  @media (max-width: 768px) {
    padding-top: 70px;
  }
`;

export const MainPage = () => {
  const arrayCards = [];

  for (let i = 0; i < 10; i++) {
    arrayCards.push(<Card key={i} />);
  }

  return <Container>{arrayCards && arrayCards.map((a) => a)}</Container>;
};
