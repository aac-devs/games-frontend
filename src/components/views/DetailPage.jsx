import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import dayjs from "dayjs";
// import {
//   clearArrays,
//   startLoadingDetailedGame,
// } from "../../actions/main.actions";
import { backgroundColor, textColor } from "../../global-styles";
import { useParams } from "react-router-dom";
import { startLoadingArrays } from "../../actions/games.actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 267px;
  max-width: 768px;
  height: 100%;
  margin: 0 auto;
  z-index: 1;
  padding: 15px;
`;

const Image = styled.div`
  position: fixed;
  background-color: transparent;
  background-image: linear-gradient(rgba(5, 5, 5, 0), rgb(0, 0, 0)),
    linear-gradient(rgba(72, 72, 72, 0), rgba(72, 72, 72, 0)),
    url(${(props) => props.url});
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  width: 100%;
  height: 90%;
  min-height: 300px;
  top: 0;
  left: 0;
  border: none;
`;

const Header = styled.div`
  z-index: 1;
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Released = styled.div`
  font-size: 14px;
  padding: 2px 8px;
  color: #000;
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
`;

const Rating = styled.div`
  font-size: 14px;
  color: #fff;
  display: flex;
  align-items: center;
  span {
    font-size: 18px;
    padding: 2px 6px;
    border-radius: 4px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    background-image: ${(props) => props.ratingColor};
  }
`;

const Title = styled.div`
  text-shadow: 5px 5px 5px #222;
  z-index: 1;
  text-align: center;
  font-size: 48px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  margin-top: 20%;
  @media (max-width: 568px) {
    margin-top: 35%;
    font-size: 28px;
  }
`;

const About = styled.div`
  z-index: 1;
  font-size: 20px;
  color: #fff;
  margin: 0 10px 5px 10px;
`;

const Description = styled.div`
  color: ${textColor.primary.normal};
  background-color: rgba(0, 0, 0, 0.5);
  max-height: 150px;
  min-height: 100px;
  padding: 3px 8px 0 5px;
  overflow-y: auto;
  z-index: 1;
  margin: 0 5px;
  border: 1px solid ${textColor.primary.dark};
  border-radius: 10px;
  p {
    line-height: 20px;
    font-size: 14px;
    padding: 0;
    text-align: justify;
    text-justify: inter-word;
    padding-left: 5px;
  }
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }
`;

const Footer = styled.div`
  margin-top: 15px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  padding: 0 10px;
`;

const GenPlatSection = styled.div`
  width: 50%;
  min-width: 267px;
  flex-grow: 1;
`;

const GenPlatTitle = styled.div`
  color: ${textColor.primary.dark};
  font-weight: 700;
  font-size: 14px;
  display: flex;
  flex-wrap: wrap;
`;

const GenPlatBody = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  div {
    color: #fff;
    font-size: 14px;
    margin-right: 5px;
    margin-bottom: 5px;
    background-color: ${backgroundColor.primary.normal};
    padding: 5px 10px;
    border-radius: 20px;
    border: 1px solid ${backgroundColor.primary.light};
  }
`;

const DetailPage = () => {
  let params = useParams();
  const dispatch = useDispatch();
  const { detailedGame } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(startLoadingArrays("detailedGame", `games/detail/${params.id}`));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!detailedGame[0]?.id) {
    return <></>;
  }

  const {
    image,
    name,
    released,
    rating,
    description,
    genres,
    platforms,
  } = detailedGame[0];
  const ratingColor =
    rating >= 4.5
      ? "linear-gradient(180deg, #b4ec51, #429321)"
      : rating >= 3
      ? "linear-gradient(180deg, #649bff, #4354b9)"
      : "linear-gradient(180deg, #ff5764, #f11a2a)";

  return (
    <Container>
      <Image url={image} />
      <Header>
        <Released>
          <span>{dayjs(released).format("MMMM D, YYYY")}</span>
        </Released>
        <Rating ratingColor={ratingColor}>
          Rating:&nbsp;<span>{rating}</span>
        </Rating>
      </Header>
      <Title>
        <div>{name}</div>
      </Title>
      <Image></Image>
      <About>About</About>
      <Description>
        <p> {description}</p>
      </Description>
      <Footer>
        <GenPlatSection>
          <GenPlatTitle>Platforms</GenPlatTitle>
          <GenPlatBody>
            {platforms.map((p) => (
              <div key={p.id}>{p.name}</div>
            ))}
          </GenPlatBody>
        </GenPlatSection>
        <GenPlatSection>
          <GenPlatTitle>Genres</GenPlatTitle>
          <GenPlatBody>
            {genres.map((g) => (
              <div key={g.id}>{g.name}</div>
            ))}
          </GenPlatBody>
        </GenPlatSection>
      </Footer>
    </Container>
  );
};

export default DetailPage;
