/*
Tamaños:
- celular: ancho: 300px - 420px, alto: 80px,
  SP: 635
- tablet:  ancho: 350px - 470px, alto: 400px,
  SP: 1100
- desktop: ancho: 400px - 520px, alto: 350px,
*/

import styled from "styled-components";

const Container = styled.div`
  /* outline: 1px solid black; */
  /* border-radius: 10px; */
  background-color: yellow;
  min-width: 300px;
  max-width: 400px;
  min-height: 350px;
  max-height: 400px;
  /* width: 320px; */
  /* height: 200px; */
  width: 100%;
  /* height: 100%; */
  padding: 10px;
  display: grid;
  /* place-self: center; */
  grid-template-columns: 70% 30%;
  grid-template-rows: 10% 1fr 15% 15%;
  grid-template-areas:
    "rls rtg"
    "img img"
    "ttl ttl"
    "gnr gnr";

  /* grid-template-columns: repeat(5, 60px); */
  /* grid-template-rows: repeat(1, calc(100% - 10px)); */
  /* grid-template-areas:
    "img img ttl ttl ttl"
    "img img ttl ttl ttl"
    "img img rls rls rtg"
    "img img gnr gnr gnr"
    "img img gnr gnr gnr"; */

  @media (min-width: 635px) and (orientation: portrait) {
    /* background-color: blue; */
    /* height: 440px; */
    /* grid-template-columns: repeat(4, 60px); */
    /* grid-template-rows: repeat(14, 30px); */
    /* grid-template-areas:
      "img img img img img"
      "img img img img img"
      "img img img img img"
      "img img img img img"
      "img img img img img" */
    /* "img img img img img" */
    /* "img img img img img" */
    /* "img img img img img"
      "img img img img img"
      "ttl ttl ttl ttl ttl"
      "ttl ttl ttl ttl ttl"
      "rls rls rls rtg rtg"
      "gnr gnr gnr gnr gnr"
      "gnr gnr gnr gnr gnr"; */
  }

  @media (min-width: 840px) and (orientation: landscape) {
    background-color: blue;
    /* height: 440px; */
    /* grid-template-columns: repeat(4, 60px); */
    /* grid-template-rows: repeat(14, 30px); */
    /* grid-template-areas:
      "rls rls rls rtg rtg"
      "img img img img img"
      "img img img img img"
      "img img img img img"
      "img img img img img" */
    /* "img img img img img" */
    /* "img img img img img" */
    /* "img img img img img" */
    /* "img img img img img" */
    /* "img img img img img"
      "ttl ttl ttl ttl ttl"
      "ttl ttl ttl ttl ttl"
      "gnr gnr gnr gnr gnr"
      "gnr gnr gnr gnr gnr"; */
  }

  @media (min-width: 1100px) {
    background-color: green;
  }
`;

const ImageSection = styled.div`
  grid-area: img;
  /* outline: 1px solid black; */
  /* border-radius: 8px; */
  background-color: cyan;
  min-width: 40%;
  min-height: 40%;
  /* @media (min-width: 635px) {
    background-color: blue;
  }
  @media (min-width: 1100px) {
    background-color: green;
  } */
`;

const Title = styled.div`
  grid-area: ttl;
  background-color: wheat;
`;
const Released = styled.div`
  grid-area: rls;
  background-color: thistle;
`;
const Rating = styled.div`
  grid-area: rtg;
  background-color: dodgerblue;
`;
const Genres = styled.div`
  grid-area: gnr;
  background-color: lime;
`;

export const Card = () => {
  return (
    <Container>
      <ImageSection></ImageSection>
      <Title></Title>
      <Released></Released>
      <Genres></Genres>
      <Rating></Rating>
    </Container>
  );
};
