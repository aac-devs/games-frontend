import React from 'react';
import { Route, Switch, HashRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import MainScreen from '../components/MainScreen';
import CrudScreen from '../components/CrudScreen';
import DetailScreen from '../components/DetailScreen';
import HomeScreen from '../components/HomeScreen';
import Loading from '../components/Loading';
import Footer from '../components/Footer';

const AppRouterContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 60px;
  height: 100%;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
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
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0.5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const AppRouter = () => {
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
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/games" component={MainScreen} />
            <Route exact path="/games/detail/:id" component={DetailScreen} />
            <Route exact path="/games/update/:id" component={CrudScreen} />
            <Route exact path="/games/create" component={CrudScreen} />
          </Switch>
        </main>
        <footer className="footer">
          <Footer />
        </footer>
      </Router>
    </AppRouterContainer>
  );
};

export default AppRouter;
