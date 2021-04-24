import { combineReducers } from 'redux';
import componentsReducer from './components.reducer';
import gamesReducer from './games.reducer';
import uiReducer from './ui.reducer';

const rootReducer = combineReducers({
  games: gamesReducer,
  ui: uiReducer,
  components: componentsReducer,
});

export default rootReducer;
