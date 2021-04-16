import { types } from "../types/types";

const initialState = {
  data: {
    games: {
      original: [],
      render: [],
    },
    genres: [],
    platforms: [],
    searchName: "",
    search: false,
    detailedGame: null,
    editGame: null,
    temporaryImage: null,
  },
  nextPage: null,
  buttons: {
    back: true,
    next: true,
    total: [],
    active: null,
  },
  orderBy: "None", // 'none' | 'name' | 'rating' | 'released'
  orderSense: "lower-to-higher", // 'up-to-down' | 'down-to-up'
  filterSource: "All", // 'all' | 'rawg' | 'custom'
  filterGenre: "Genres", // 'none' | 'action' | ... | 'strategy'
  currentScreen: "", // 'home' | 'games' | 'detail' | 'create' | 'update'
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    // case types.main.loadGenres:
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       genres: action.payload,
    //     },
    //   };

    // case types.main.loadPlatforms:
    //   return {
    //     ...state,
    //     data: {
    //       ...state.data,
    //       platforms: action.payload,
    //     },
    //   };

    case types.main.loadPlatformsGenres:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.option]: action.payload.list,
        },
      };

    case types.main.setEditGame:
      console.log(action.payload);
      return {
        ...state,
        data: {
          ...state.data,
          editGame: action.payload,
        },
      };

    case types.main.changeInputValue:
      return {
        ...state,
        data: {
          ...state.data,
          editGame: {
            ...state.data.editGame,
            [action.payload.name]: action.payload.value,
          },
        },
      };

    case types.main.loadGames:
      return {
        ...state,
        data: {
          ...state.data,
          games: {
            ...state.data.games,
            original: [...state.data.games.original, ...action.payload.data],
          },
        },
        nextPage: action.payload.nextPage,
      };

    case types.main.addGameToRenderList:
      return {
        ...state,
        data: {
          ...state.data,
          games: {
            original: [action.payload, ...state.data.games.original],
            render: state.data.games.original,
          },
        },
      };

    case types.main.updateGameFromRenderList:
      return {
        ...state,
        data: {
          ...state.data,
          games: {
            original: [
              action.payload,
              ...state.data.games.original.filter(
                (g) => g.id !== action.payload.id
              ),
            ],
            render: state.data.games.original,
          },
        },
      };

    case types.main.updateDeletedGame:
      return {
        ...state,
        data: {
          ...state.data,
          games: {
            original: [
              ...state.data.games.original.filter(
                (g) => g.id !== action.payload
              ),
            ],
            render: state.data.games.original,
          },
        },
      };

    case types.main.changeSearchName:
      return {
        ...state,
        data: {
          ...state.data,
          searchName: action.payload,
        },
      };

    case types.main.changeOrderSense:
      return {
        ...state,
        orderSense: action.payload,
      };

    case types.main.changeOrderBy:
      return {
        ...state,
        orderBy: action.payload,
      };

    case types.main.changeFilterSource:
      return {
        ...state,
        filterSource: action.payload,
      };

    case types.main.changeFilterGenre:
      return {
        ...state,
        filterGenre: action.payload,
      };

    case types.main.loadRendererGames:
      return {
        ...state,
        data: {
          ...state.data,
          games: {
            ...state.data.games,
            render: action.payload,
          },
        },
      };

    case types.main.clearArrays:
      return {
        ...state,
        data: {
          ...state.data,
          games: {
            original: [],
            render: [],
          },
        },
      };

    case types.main.setDetailedGame:
      return {
        ...state,
        data: {
          ...state.data,
          detailedGame: action.payload,
        },
      };

    case types.main.resetDetailedGame:
      return {
        ...state,
        data: {
          ...state.data,
          detailedGame: null,
          editGame: null,
        },
      };

    case types.main.setTemporaryImage:
      return {
        ...state,
        data: {
          ...state.data,
          temporaryImage: action.payload,
        },
      };

    case types.main.resetTemporaryImage:
      return {
        ...state,
        data: {
          ...state.data,
          temporaryImage: null,
        },
      };

    case types.main.setCurrentScreen:
      return {
        ...state,
        currentScreen: action.payload,
      };

    case types.main.setGoSearch:
      return {
        ...state,
        data: {
          ...state.data,
          search: true,
        },
      };

    case types.main.resetGoSearch:
      return {
        ...state,
        data: {
          ...state.data,
          search: false,
        },
      };

    default:
      return state;
  }
};
