/*
Tamaños:
- celular: ancho: 300px - 420px, alto: 80px,
  SP: 635
- tablet:  ancho: 350px - 470px, alto: 400px,
  SP: 1100
- desktop: ancho: 400px - 520px, alto: 350px,
*/

import dayjs from "dayjs";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import {
//   setCurrentScreen,
//   startDeletingGame,
//   unloadDetailedGame,
// } from "../../actions/main.actions";
import { backgroundColor, textColor } from "../../global-styles";

const Container = styled.div`
  background-color: ${backgroundColor.primary.normal};
  min-width: 300px;
  max-width: 400px;
  min-height: 350px;
  max-height: 400px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 7px rgba(250, 250, 250, 0.5);
  position: relative;
  transition: all 0.4s;
  &:hover {
    transform: scale(1.02);
  }
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-rows: 10% 1fr 12% auto;
  grid-template-areas:
    "rls rtg"
    "img img"
    "ttl ttl"
    "gnr gnr";
`;

const ImageSection = styled.div`
  grid-area: img;
  background-color: cyan;
  min-width: 40%;
  min-height: 40%;
  width: 100%;
  height: 100%;
  background-color: ${backgroundColor.primary.dark};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 2px solid ${backgroundColor.primary.light};
  border-bottom: 2px solid ${backgroundColor.primary.light};
  img {
    max-height: 100%;
    filter: brightness(70%);
    box-shadow: 0px 0px 10px rgba(250, 250, 250, 0.5);
  }
`;

const Title = styled.div`
  grid-area: ttl;
  place-self: center stretch;
  color: ${textColor.primary.light};
  opacity: 1;
  font-size: 24px;
  padding: 0 10px;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  display: block;
  overflow: hidden;
`;

const SpanLink = styled(Link)`
  cursor: pointer;
  color: ${textColor.primary.light};
  text-decoration: none;
  /* background-color: red; */
`;

const Released = styled.div`
  grid-area: rls;
  flex-grow: 1;
  /* width: 85%; */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  /* background-color: thistle; */
  padding: 0 10px;
  h5 {
    font-size: 12px;
    /* margin-bottom: 5px; */
    font-weight: 400;
    color: ${backgroundColor.primary.light};
    margin-right: 10px;
  }
  span {
    padding: 0;
    font-size: 14px;
    padding: 2px 6px;
    border-radius: 4px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    background-image: linear-gradient(180deg, #fff, #cfc);
    color: #000;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
const Rating = styled.div`
  grid-area: rtg;

  width: 100%;
  display: flex;
  padding-right: 10px;
  /* flex-direction: column; */
  align-items: center;
  justify-content: flex-end;
  /* background-color: dodgerblue; */
  h5 {
    font-size: 12px;
    /* margin-bottom: 5px; */
    font-weight: 400;
    color: ${backgroundColor.primary.light};
    /* color: ${textColor.primary.dark}; */
    /* background-color: gray; */
    margin-right: 10px;
  }
  span {
    padding: 0;
    font-size: 14px;
    padding: 2px 6px;
    border-radius: 4px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
    background-image: ${(props) => props.ratingColor};
    color: ${textColor.primary.light};
    /* background-color: yellow; */
  }
`;
const Genres = styled.div`
  grid-area: gnr;

  padding: 0 10px;
  /* background-color: lime; */

  h5 {
    color: ${backgroundColor.primary.light};
    font-size: 12px;
    margin-bottom: 5px;
    font-weight: 400;
  }
`;

const GenresTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  /* overflow-x: visible; */
  span {
    margin: 0 10px 7px 0;
    font-size: 14px;
    color: ${textColor.primary.light};
    text-decoration: underline;
  }
`;

const Hr = styled.hr`
  margin-bottom: 5px;
  background-color: ${textColor.primary.dark};
`;

const color = "#e91e63";

const DeleteButton = styled.button`
  position: absolute;
  bottom: 7px;
  right: 7px;
  border-radius: 50%;
  /* background-color: ${backgroundColor.secondary.normal}; */
  background-color: #e91e63;
  filter: brightness(90%);

  border: none;
  /* box-shadow: 0px 0px 7px rgba(128, 128, 128, 0.9); */
  box-shadow: 0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color};
  /* 0 0 60px ${color}, 0 0 80px ${color}, 0 0 100px ${color}; */
  color: white;
  padding: 10px 11px;
  transition: all 0.2s;
  font-family: "Roboto", sans-serif, Helvetica, Arial;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    /* background-color: ${backgroundColor.secondary.light}; */
    background-color: #ff6291;

    transform: scale(1.04);
  }
`;

const Card = memo(
  ({ id, image, name, released, rating, genres, setElement, enableDelete }) => {
    const dispatch = useDispatch();
    const handleDeleteGame = (e) => {
      e.stopPropagation();
      // dispatch(startDeletingGame(id));
    };
    const ratingColor =
      rating >= 4.5
        ? "linear-gradient(180deg, #b4ec51, #429321)"
        : rating >= 3
        ? "linear-gradient(180deg, #649bff, #4354b9)"
        : "linear-gradient(180deg, #ff5764, #f11a2a)";

    const handleClearDetailedGame = () => {
      console.log("clear detailed");
      if (id.toString().startsWith("own")) {
        // dispatch(setCurrentScreen("detail-own"));
      } else {
        // dispatch(setCurrentScreen("detail"));
      }

      // dispatch(unloadDetailedGame());
    };

    return (
      <Container ref={setElement}>
        <ImageSection>
          <img src={image} alt="ima" />
        </ImageSection>
        <Title>
          <SpanLink
            onClick={handleClearDetailedGame}
            to={`/games/detail/${id}`}
          >
            {name}
          </SpanLink>
        </Title>
        <Released>
          <h5>Released</h5>
          <span>{dayjs(released).format("MMMM D, YYYY")}</span>
        </Released>
        <Genres>
          <Hr />
          <h5>Genres</h5>
          <GenresTags>
            {genres.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </GenresTags>
        </Genres>
        <Rating ratingColor={ratingColor}>
          <h5>Rating</h5>
          <span>{rating}</span>
        </Rating>
        {enableDelete && (
          <DeleteButton onClick={handleDeleteGame}>
            <i className="fas fa-minus fa-2x"></i>
          </DeleteButton>
        )}
      </Container>
    );
  }
);

export default Card;
