import React, { memo } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { startDeletingGame } from '../actions/games.actions';
import { backgroundColor, textColor } from '../global-styles';

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
    'rls rtg'
    'img img'
    'ttl ttl'
    'gnr gnr';
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
`;

const Released = styled.div`
  grid-area: rls;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 0 10px;
  h5 {
    font-size: 12px;
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
  align-items: center;
  justify-content: flex-end;
  h5 {
    font-size: 12px;
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
    background-image: ${(props) => props.ratingColor};
    color: ${textColor.primary.light};
  }
`;
const Genres = styled.div`
  grid-area: gnr;
  padding: 0 10px;
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

const color = '#e91e63';

const DeleteButton = styled.button`
  position: absolute;
  bottom: 7px;
  right: 7px;
  border-radius: 50%;
  background-color: #e91e63;
  filter: brightness(90%);
  border: none;
  box-shadow: 0 0 5px ${color}, 0 0 10px ${color}, 0 0 20px ${color};
  color: white;
  padding: 10px 11px;
  transition: all 0.2s;
  font-family: 'Roboto', sans-serif, Helvetica, Arial;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background-color: #ff6291;
    transform: scale(1.04);
  }
`;

const Card = memo(
  ({ id, image, name, released, rating, genres, setElement, enableDelete }) => {
    const dispatch = useDispatch();
    const handleDeleteGame = (e) => {
      e.stopPropagation();
      dispatch(startDeletingGame(id));
    };
    let ratingColor = '';
    if (rating >= 4.5) {
      ratingColor = 'linear-gradient(180deg, #b4ec51, #429321)';
    } else if (rating >= 3) {
      ratingColor = 'linear-gradient(180deg, #649bff, #4354b9)';
    } else {
      ratingColor = 'linear-gradient(180deg, #ff5764, #f11a2a)';
    }
    return (
      <Container ref={setElement}>
        <ImageSection>
          <img src={image} alt="ima" />
        </ImageSection>
        <Title>
          <SpanLink to={`/games/detail/${id}`}>{name}</SpanLink>
        </Title>
        <Released>
          <h5>Released</h5>
          <span>{dayjs(released).format('MMMM D, YYYY')}</span>
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
            <i className="fas fa-minus fa-2x" />
          </DeleteButton>
        )}
      </Container>
    );
  },
);

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  name: PropTypes.string,
  released: PropTypes.string,
  rating: PropTypes.number,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  setElement: PropTypes.func,
  enableDelete: PropTypes.bool,
};

Card.defaultProps = {
  id: undefined,
  image: '',
  name: 'name',
  released: '',
  rating: 3,
  genres: [],
  setElement: null,
  enableDelete: false,
};

export default Card;
