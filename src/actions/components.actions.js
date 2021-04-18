import { types } from "../types/types";

export const startLoadingListboxGenres = (header = true) => {
  return (dispatch, getState) => {
    const { genres, filterGenre } = getState().games;
    let namesArray = genres.map((item) => item.name);
    namesArray.sort();
    if (header) {
      // namesArray.unshift("Genres");
      namesArray.unshift("All");
    }
    dispatch(
      loadGenres({
        // selected: filterGenre || "Genres",
        selected: filterGenre || "All",
        list: namesArray,
        visible: false,
      })
    );
  };
};

const loadGenres = (payload) => ({
  type: types.components.loadGenresNames,
  payload,
});

export const startLoadingListboxPlatforms = (header) => {
  return (dispatch, getState) => {
    const { platforms } = getState().games;
    let namesArray = platforms.map((item) => item.name);
    namesArray.sort();
    if (header) {
      namesArray.unshift("Platforms");
    }
    dispatch(
      loadPlatforms({
        selected: "Platforms",
        list: namesArray,
        visible: false,
      })
    );
  };
};

const loadPlatforms = (payload) => ({
  type: types.components.loadPlatformsNames,
  payload,
});

export const setSelectedOption = (payload) => ({
  type: types.components.setSelectedOption,
  payload,
});

export const showListbox = (payload) => ({
  type: types.components.showListbox,
  payload,
});

export const hideListbox = (payload) => ({
  type: types.components.hideListbox,
  payload,
});

export const showRatingPicker = () => ({
  type: types.components.showRatingPicker,
});

export const hideRatingPicker = () => ({
  type: types.components.hideRatingPicker,
});

export const showDatePicker = () => ({
  type: types.components.showDatePicker,
});

export const hideDatePicker = () => ({
  type: types.components.hideDatePicker,
});

export const setListboxParent = (payload) => ({
  type: types.components.listboxParent,
  payload,
});

export const resetListboxValues = () => {
  return (dispatch) => {
    // dispatch(setSelectedOption({ destination: "genres", option: "Genres" }));
    dispatch(setSelectedOption({ destination: "genres", option: "All" }));
    dispatch(setSelectedOption({ destination: "source", option: "All" }));
    dispatch(setSelectedOption({ destination: "sorted", option: "None" }));
    dispatch(
      setSelectedOption({ destination: "platforms", option: "Platforms" })
    );
  };
};
