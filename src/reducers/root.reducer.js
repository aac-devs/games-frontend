import { combineReducers } from "redux";
import { componentsReducer } from "./components.reducer";
import { gamesReducer } from "./games.reducer";
import { uiReducer } from "./ui.reducer";

export const rootReducer = combineReducers({
  games: gamesReducer,
  ui: uiReducer,
  components: componentsReducer,
});
