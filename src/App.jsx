import { Provider } from "react-redux";
import { store } from "./store/store";
import { GlobalStyles } from "./global-styles";
import { AppRouter } from "./routers/app.routes";

export const App = () => {
  return (
    <Provider store={store}>
      <GlobalStyles />
      <AppRouter />
    </Provider>
  );
};
