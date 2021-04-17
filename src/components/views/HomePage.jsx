import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
// import { clearArrays, setCurrentScreen } from "../../actions/main.actions";
import { backgroundColor, textColor } from "../../global-styles";

const Background = styled.div`
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(rgba(5, 5, 5, 0), rgb(0, 0, 0)),
    linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url("/home.png");
  max-height: 100%;
  background-size: cover;
  background-position: top;
  background-repeat: no-repeat;
  position: fixed;
  top: 0;
  left: 0;
  filter: drop-shadow(0px 0px 30px white);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Link)`
  text-shadow: 4px 4px 7px #777;
  z-index: 10;
  text-align: center;
  font-family: "Poppins", sans-serif;
  font-size: 35px;
  font-weight: 700;
  color: ${textColor.primary.dark};
  cursor: pointer;
  text-decoration: none;
  transition: all 0.5s;
  @media (min-width: 768px) {
    font-size: 64px;
  }
  @media (min-width: 1000px) {
    font-size: 80px;
  }
  &:hover {
    transform: scale(1.05);
    color: ${backgroundColor.secondary.normal};
    text-shadow: 4px 4px 7px #ccc;
    filter: brightness(70%);
  }
`;

const HomePage = () => {
  // const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(clearArrays());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <Background className="art art_colored">
        <Title
          // onClick={() => dispatch(setCurrentScreen("games"))}
          to="/games"
        >
          aac-videogames
        </Title>
      </Background>
    </div>
  );
};

export default HomePage;
