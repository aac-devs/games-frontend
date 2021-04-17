import { combineReducers } from "redux";
import { componentsReducer } from "./components.reducer";
import { gamesReducer } from "./games.reducer";
// import { mainReducer } from "./main.reducer";
import { uiReducer } from "./ui.reducer";

export const rootReducer = combineReducers({
  games: gamesReducer,
  // main: mainReducer,
  ui: uiReducer,
  components: componentsReducer,
});
