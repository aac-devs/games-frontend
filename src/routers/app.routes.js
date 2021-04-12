import { Route, Switch, HashRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { Navbar } from "../components/content/Navbar";
import { DetailPage } from "../components/views/DetailPage";
import { HomePage } from "../components/views/HomePage";
import { MainPage } from "../components/views/MainPage";
import { CrudPage } from "../components/views/CrudPage";
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
    opacity: 0.9;
    z-index: 10;
  }

  .main {
    height: 100%;
    padding-top: 80px;
    /* background-color: ${backgroundColor.primary.dark}; */
    @media (max-width: 768px) {
      padding-top: 60px;
    }
  }

  .footer {
    background-color: ${backgroundColor.primary.normal};
    opacity: 0.5;

    /* background-color: yellow; */
    /* border-top: 1px solid ${textColor.secondary.normal}; */
  }
`;

export const AppRouter = () => {
  return (
    <AppRouterContainer>
      <Router>
        <header className="header">
          <Navbar />
        </header>
        <main className="main">
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/games" component={MainPage} />
            <Route exact path="/games/detail/:id" component={DetailPage} />
            <Route exact path="/games/update/:id" component={CrudPage} />
            <Route exact path="/games/create" component={CrudPage} />
          </Switch>
        </main>
        <footer className="footer"></footer>
      </Router>
    </AppRouterContainer>
  );
};
