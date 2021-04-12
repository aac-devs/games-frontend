import { combineReducers } from "redux";
import { componentsReducer } from "./components.reducer";
import { mainReducer } from "./main.reducer";
import { uiReducer } from "./ui.reducer";

export const rootReducer = combineReducers({
  main: mainReducer,
  ui: uiReducer,
  components: componentsReducer,
});
