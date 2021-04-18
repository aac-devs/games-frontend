import { types } from "../types/types";

const initialState = {
  listbox: {
    genres: {
      list: [],
      // selected: "Genres",
      selected: "All",
      visible: false,
    },
    platforms: {
      list: [],
      selected: "Platforms",
      visible: false,
    },
    source: {
      list: ["All", "Rawg", "Custom"],
      selected: "All",
      visible: false,
    },
    sorted: {
      list: ["None", "Name", "Rating", "Released"],
      selected: "None",
      visible: false,
    },
    parent: "none", // 'navbar' | 'main'
  },
  ratingPicker: {
    show: false,
  },
  datePicker: {
    show: false,
  },
};

export const componentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.components.loadGenresNames:
      return {
        ...state,
        listbox: {
          ...state.listbox,
          genres: action.payload,
        },
      };

    case types.components.loadPlatformsNames:
      return {
        ...state,
        listbox: {
          ...state.listbox,
          platforms: action.payload,
        },
      };

    case types.components.setSelectedOption:
      return {
        ...state,
        listbox: {
          ...state.listbox,
          [action.payload.destination]: {
            ...state.listbox[action.payload.destination],
            selected: action.payload.option,
          },
        },
      };

    case types.components.showListbox:
      return {
        ...state,
        listbox: {
          ...state.listbox,
          [action.payload]: {
            ...state.listbox[action.payload],
            visible: true,
          },
        },
      };

    case types.components.hideListbox:
      return {
        ...state,
        listbox: {
          ...state.listbox,
          [action.payload]: {
            ...state.listbox[action.payload],
            visible: false,
          },
        },
      };

    case types.components.showRatingPicker:
      return {
        ...state,
        ratingPicker: {
          show: true,
        },
      };

    case types.components.hideRatingPicker:
      return {
        ...state,
        ratingPicker: {
          show: false,
        },
      };

    case types.components.showDatePicker:
      return {
        ...state,
        datePicker: {
          show: true,
        },
      };

    case types.components.hideDatePicker:
      return {
        ...state,
        datePicker: {
          show: false,
        },
      };

    case types.components.listboxParent:
      return {
        ...state,
        listbox: {
          ...state.listbox,
          parent: action.payload,
        },
      };

    default:
      return state;
  }
};
