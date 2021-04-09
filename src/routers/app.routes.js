import { BrowserRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../components/content/Navbar";
import { Navbar2 } from "../components/content/Navbar2";
import { MainPage } from "../components/views/MainPage";
import { backgroundColor, textColor } from "../global-styles";

const AppRouterContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 60px;
  height: 100%;

  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: ${backgroundColor.primary.normal};
    z-index: 10;
  }

  .main {
    height: 100%;
    background-color: ${backgroundColor.primary.normal};
  }

  .footer {
    background-color: ${backgroundColor.primary.dark};
    border-top: 1px solid ${textColor.secondary.normal};
  }

  /* @media (max-width: 768px) {
    grid-template-rows: 1fr 70px;
  } */
`;

export const AppRouter = () => {
  return (
    <AppRouterContainer>
      <Router>
        <header className="header">
          <Navbar2 />
        </header>
        <main className="main">
          <MainPage />
        </main>
        <footer className="footer"></footer>
      </Router>
    </AppRouterContainer>
  );
};

/*
 <Container className="app-router-container">
      <Router>
        <Header className="header">
          <Navbar />
        </Header>
        <Main>
          <MainPage />
        </Main>
        <Footer></Footer>
      </Router>
    </Container>

*/
