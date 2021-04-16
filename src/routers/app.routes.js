import { Route, Switch, HashRouter as Router } from "react-router-dom";
import styled from "styled-components";
import { backgroundColor } from "../global-styles";
import { useSelector } from "react-redux";
import {
  DetailPage,
  HomePage,
  MainPage,
  CrudPage,
  Navbar,
  Loading,
} from "../components";

const AppRouterContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 60px;
  height: 100%;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    /* background-color: ${backgroundColor.primary.normal}; */
    background-color: rgba(0, 0, 0, 0.7);
    /* opacity: 0.9; */
    z-index: 101;
  }
  .main {
    height: 100%;
    padding-top: 80px;
    @media (max-width: 768px) {
      padding-top: 60px;
    }
  }
  .footer {
    background-color: ${backgroundColor.primary.normal};
    opacity: 0.5;
  }
`;

export const AppRouter = () => {
  const { loading } = useSelector((state) => state.ui);
  return (
    <AppRouterContainer>
      <Router>
        <header className="header">
          <Navbar />
        </header>
        <Loading animation={loading} />
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
