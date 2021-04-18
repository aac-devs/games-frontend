import { useState } from "react";
import styled from "styled-components";

const BackgroundRating = styled.div`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  background-color: black;
  filter: brightness(50%);
  opacity: 0.4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const Container = styled.div`
  visibility: ${(props) => (props.show ? "visible" : "hidden")};
  position: absolute;
  top: -5px;
  right: -10px;
  background-color: #fff;
  z-index: 10;
  border-radius: 6px;
  padding: 20px 24px;
  width: 180px;
  @media (max-width: 768px) {
    position: fixed;
    left: 10px;
    bottom: 10px;
    top: unset;
    right: unset;
    width: calc(100vw - 20px);
  }
`;

const Header = styled.div`
  display: flex;
`;
const Title = styled.div`
  flex: 1 1 auto;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
`;
const SaveButton = styled.div`
  flex: 0 0 auto;
  margin-left: 10px;
  text-decoration: underline;
  color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
  opacity: 0.5;
  transition: opacity 0.3s;
`;

const Body = styled.div`
  margin-top: 12px;
  @media (max-width: 768px) {
    margin-top: 6px;
    flex-direction: column;
  }
  input {
    padding: 8px 12px;
    color: #262626;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    background-color: #fff;
    overflow: visible;
    font-size: 14px;
    width: 100%;
  }
`;

const Rating = ({
  currentRating,
  show,
  handleChangeRating,
  handleChangeRatingClose,
}) => {
  const [rating, setRating] = useState(currentRating);
  return (
    <>
      <BackgroundRating show={show} onClick={handleChangeRatingClose} />
      <Container show={show}>
        <Header>
          <Title>Rating</Title>
          <SaveButton onClick={(e) => handleChangeRating(rating)}>
            Save
          </SaveButton>
        </Header>
        <Body>
          <input
            type="number"
            name="rating"
            onChange={(e) => setRating(e.target.value)}
            step="0.1"
            min="0"
            max="5"
            value={rating}
          />
        </Body>
      </Container>
    </>
  );
};

export default Rating;
