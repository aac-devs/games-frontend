import { types } from "../types/types";

const initialState = {
  games: [],
  render: [],
  genres: [],
  platforms: [],

  detailedGame: [],

  nextPage: 1,
  savingGameFlag: false,

  orderBy: "None", // 'none' | 'name' | 'rating' | 'released'
  orderSense: "lower-to-higher", // 'up-to-down' | 'down-to-up'
  filterSource: "All", // 'all' | 'rawg' | 'custom'
  filterGenre: "Genres", // 'none' | 'action' | ... | 'strategy'

  currentScreen: "", // 'home' | 'games' | 'detail' | 'create' | 'update'
  setTemporaryImage: null,
};

export const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.games.cleanArrays:
      // console.log("*********************clean");
      return {
        ...state,
        games: [],
        render: [],
        genres: [],
        platforms: [],
        detailedGame: [],

        nextPage: 1,
      };
    case types.games.loadArray:
      // console.log(action.payload);
      return {
        ...state,
        [action.payload.key]: [
          ...state[action.payload.key],
          ...action.payload.value,
        ],
      };

    case types.games.loadNextPage:
      return {
        ...state,
        nextPage: action.payload,
      };

    case types.games.enableSavingGameFlag:
      return {
        ...state,
        savingGameFlag: true,
      };

    case types.games.disableSavingGameFlag:
      return {
        ...state,
        savingGameFlag: false,
      };

    case types.games.loadRendererGames:
      return {
        ...state,
        render: action.payload,
      };

    case types.games.changeOrderSense:
      return {
        ...state,
        orderSense: action.payload,
      };

    case types.games.changeOrderBy:
      return {
        ...state,
        orderBy: action.payload,
      };

    case types.games.changeFilterSource:
      return {
        ...state,
        filterSource: action.payload,
      };

    case types.games.changeFilterGenre:
      return {
        ...state,
        filterGenre: action.payload,
      };

    case types.games.changeInputValue:
      console.log("dentro del reducer:");
      console.log(action.payload);

      return {
        ...state,
        detailedGame: [
          {
            ...state.detailedGame[0],
            [action.payload.name]: action.payload.value,
          },
        ],
      };

    case types.games.setTemporaryImage:
      return {
        ...state,
        temporaryImage: action.payload,
      };

    case types.main.resetTemporaryImage:
      return {
        ...state,
        temporaryImage: null,
      };

    default:
      return state;
  }
};
