import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import { GlobalStyles } from './global-styles';
import AppRouter from './routers/app.routes';

const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <AppRouter />
    </Provider>
  );
};

export default App;
