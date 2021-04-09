import { GlobalStyles } from "./global-styles";
import { AppRouter } from "./routers/app.routes";

export const App = () => {
  return (
    <>
      <GlobalStyles />
      <AppRouter />
    </>
  );
};
