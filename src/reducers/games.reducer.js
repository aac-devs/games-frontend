import types from '../types/types';

const initialState = {
  games: [],
  render: [],
  genres: [],
  platforms: [],

  detailedGame: [],

  searchName: '',
  search: false,

  nextPage: 1,
  savingGameFlag: false,

  orderBy: 'None', // 'none' | 'name' | 'rating' | 'released'
  orderSense: 'lower-to-higher', // 'up-to-down' | 'down-to-up'
  filterSource: 'All', // 'all' | 'rawg' | 'custom'
  filterGenre: 'All', // 'All' | 'action' | ... | 'strategy'

  currentScreen: '', // 'home' | 'games' | 'detail' | 'create' | 'update'
  setTemporaryImage: null,
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.games.cleanArrays:
      return {
        ...state,
        games: [],
        render: [],
        genres: [],
        platforms: [],
        detailedGame: [],
        nextPage: 1,
        orderBy: 'None',
        orderSense: 'lower-to-higher',
        filterSource: 'All',
        filterGenre: 'All',
      };
    case types.games.loadArray:
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

    case types.games.resetTemporaryImage:
      return {
        ...state,
        temporaryImage: null,
      };

    case types.games.setCurrentScreen:
      return {
        ...state,
        currentScreen: action.payload,
      };

    case types.games.changeSearchName:
      return {
        ...state,
        searchName: action.payload,
      };

    case types.games.setGoSearch:
      return {
        ...state,
        search: true,
      };

    case types.games.resetGoSearch:
      return {
        ...state,
        search: false,
      };

    case types.games.setNewGame:
      return {
        ...state,
        detailedGame: [action.payload],
      };

    default:
      return state;
  }
};

export default gamesReducer;
