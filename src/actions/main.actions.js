import dayjs from "dayjs";
import { fetchingData } from "../helpers/fetch-data";
import { uploadImage } from "../helpers/upload-image";
import { types } from "../types/types";
import { setSelectedOption } from "./components.actions";
import {
  finishLoading,
  removeError,
  setError,
  startLoading,
} from "./ui.actions";

export const startLoadingPlatformsGenres = (option) => {
  return async (dispatch) => {
    try {
      dispatch(removeError());
      dispatch(startLoading());
      const resp = await fetchingData(`games/${option}`);
      const { ok, results: list, message } = await resp.json();
      ok
        ? dispatch(loadPlatformsGenres({ option, list }))
        : dispatch(setError(message));
      dispatch(finishLoading());
    } catch (error) {
      console.error(`Something went wrong fetching data!`);
    }
  };
};

const loadPlatformsGenres = (payload) => ({
  type: types.main.loadPlatformsGenres,
  payload,
});

export const startSettingEditGame = (edit = "") => {
  return (dispatch, getState) => {
    console.log({ edit });
    if (edit === "new") {
      console.log("new game");
      dispatch(
        setEditGame({
          name: "",
          description: "",
          image: "",
          released: dayjs(),
          rating: 3,
          genres: [],
          platforms: [],
        })
      );
    } else {
      console.log("update game");
      const { detailedGame } = getState().main.data;
      dispatch(setEditGame(detailedGame));
    }
  };
};

export const startLoadingDetailedGame = (id) => {
  return async (dispatch) => {
    try {
      dispatch(removeError());
      dispatch(startLoading());
      const resp = await fetchingData(`games/detail/${id}`);
      const { ok, result, msg } = await resp.json();
      ok ? dispatch(loadDetailedGame(result)) : dispatch(setError(msg));
      dispatch(finishLoading());
    } catch (error) {
      console.error(`Something went wrong fetching data!`);
    }
  };
};

export const startLoadingGames = (page = 1) => {
  return async (dispatch, getState) => {
    try {
      const { searchName: name = "" } = getState().main.data;
      dispatch(removeError());
      dispatch(startLoading());
      dispatch(setSelectedOption({ destination: "source", option: "All" }));
      dispatch(setSelectedOption({ destination: "genres", option: "Genres" }));
      const resp = await fetchingData(
        `games?page=${page}${name !== "" ? `&name=${name}` : ""}`
      );
      const { ok, nextPage, data, msg } = await resp.json();
      if (page === 1) {
        dispatch(clearArrays());
      }
      if (ok) {
        dispatch(loadGames({ data, nextPage: parseInt(nextPage) }));
      } else {
        dispatch(setError(msg));
      }
      dispatch(finishLoading());
    } catch (error) {
      console.error(`Something went wrong fetching data!`);
    }
  };
};

export const startModifyingGames = () => {
  return (dispatch, getState) => {
    const {
      data,
      orderBy,
      orderSense,
      filterSource,
      filterGenre,
    } = getState().main;

    let array =
      filterSource === "Rawg"
        ? data.games.original.filter((g) => !g.id.toString().startsWith("own"))
        : filterSource === "Custom"
        ? data.games.original.filter((g) => g.id.toString().startsWith("own"))
        : [...data.games.original];

    if (filterGenre !== "Genres") {
      array = array.filter((item) => {
        const genres = item.genres.map((g) => g.name.toLowerCase());
        return genres.includes(filterGenre.toLowerCase()) ? item : null;
      });
    }
    if (orderBy !== "None") {
      array.sort(function (a, b) {
        if (orderBy === "Name") {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        } else if (orderBy === "Rating") {
          if (a.rating < b.rating) {
            return -1;
          } else if (a.rating > b.rating) {
            return 1;
          } else {
            return 0;
          }
        } else {
          if (a.released < b.released) {
            return -1;
          } else if (a.released > b.released) {
            return 1;
          } else {
            return 0;
          }
        }

        // return orderBy === "Name"
        //   ? a.name.toLowerCase() < b.name.toLowerCase()
        //     ? -1
        //     : a.name.toLowerCase() > b.name.toLowerCase()
        //     ? 1
        //     : 0
        //   : orderBy === 'Rating'
        //   ? a.rating < b.rating
        //   ? -1
        //   : a.rating < b.rating
        //   ? 1
        //   : 0
        //   : a.released < b.released
        //   ?-1
        //   : a.released > b.released
        //   ? 1
        //   : 0
      });
    }
    orderSense === "higher-to-lower" && array.reverse();
    let totalArray = [];
    if (array.length > 0) {
      for (let i = 0; i < Math.ceil(array.length / 10); i++) {
        totalArray.push(i + 1);
      }
    }
    dispatch(loadRendererGames(array));
  };
};

export const startSavingGame = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(removeError());
      dispatch(startLoading());
      dispatch(setSavingGameFlag());

      //TODO: Problema al poner la imagen en editGame
      const det = getState().main.data.editGame;
      console.log({ det });
      const file = getState().main.data.temporaryImage;
      if (file) {
        const imageUrl = await uploadImage(file);
        dispatch(changeInputValue({ name: "image", value: imageUrl }));
      }
      const { id: gameId, ...data } = getState().main.data.editGame;
      const det2 = getState().main.data.editGame;

      console.log({ data });
      console.log({ det2 });

      // const method = gameId ? "PUT" : "POST";
      // const endpoint = gameId ? `games/edit/${gameId}` : "games/create";
      // const resp = await fetchingData(endpoint, data, method);
      // const { ok, id, msg } = await resp.json();
      // if (ok) {
        // console.log("Terminó de guardar.");
        // dispatch(resetSavingGameFlag());

        // dispatch(setCurrentScreen("games"));
        // const newData = {
        //   id,
        //   name: data.name,
        //   image: data.image,
        //   rating: data.rating,
        //   genres: data.genres,
        // };
        // gameId ? dispatch(updateGame(newData)) : dispatch(addNewGame(newData));
      // } else {
        // dispatch(setError(msg));
      // }
      dispatch(finishLoading());
      dispatch(resetTemporaryImage());
      // TODO: redirigir a 'games' ==> dispatch(setCurrentScreen('games'))
    } catch (error) {
      console.error(`Something went wrong fetching data!`);
    }
  };
};

export const startDeletingGame = (id) => {
  return async (dispatch) => {
    try {
      dispatch(removeError());
      dispatch(startLoading());
      const resp = await fetchingData(`games/delete/${id}`, null, "DELETE");
      const { ok, msg } = await resp.json();
      ok ? dispatch(deleteGame(id)) : dispatch(setError(msg));
      dispatch(finishLoading());
    } catch (error) {
      console.error(`Something went wrong fetching data!`);
    }
  };
};

const deleteGame = (payload) => ({
  type: types.main.updateDeletedGame,
  payload,
});

export const setEditGame = (payload) => ({
  type: types.main.setEditGame,
  payload,
});

export const setSavingGameFlag = () => ({
  type: types.main.setSavingGameFlag,
});

export const resetSavingGameFlag = () => ({
  type: types.main.resetSavingGameFlag,
});

// const loadPlatforms = (payload) => ({
//   type: types.main.loadPlatforms,
//   payload,
// });

// const loadGenres = (payload) => ({
//   type: types.main.loadGenres,
//   payload,
// });

const loadGames = (payload) => ({
  type: types.main.loadGames,
  payload,
});

export const changeOrderSense = (payload) => ({
  type: types.main.changeOrderSense,
  payload,
});

export const changeOrderBy = (payload) => ({
  type: types.main.changeOrderBy,
  payload,
});

export const changeFilterSource = (payload) => ({
  type: types.main.changeFilterSource,
  payload,
});
export const changeFilterGenre = (payload) => ({
  type: types.main.changeFilterGenre,
  payload,
});

const loadRendererGames = (payload) => ({
  type: types.main.loadRendererGames,
  payload,
});

export const changeSearchName = (payload) => ({
  type: types.main.changeSearchName,
  payload,
});

export const clearArrays = () => ({
  type: types.main.clearArrays,
});

export const setDetailedId = (payload) => ({
  type: types.main.setDetailedId,
  payload,
});

// export const resetDetailedId = () => ({
//   type: types.main.resetDetailedId,
// });

const loadDetailedGame = (payload) => ({
  type: types.main.setDetailedGame,
  payload,
});

export const unloadDetailedGame = () => ({
  type: types.main.resetDetailedGame,
});

export const changeInputValue = (payload) => ({
  type: types.main.changeInputValue,
  payload,
});

export const setTemporaryImage = (payload) => ({
  type: types.main.setTemporaryImage,
  payload,
});

export const resetTemporaryImage = () => ({
  type: types.main.setTemporaryImage,
});

const updateGame = (payload) => ({
  type: types.main.updateGameFromRenderList,
  payload,
});

const addNewGame = (payload) => ({
  type: types.main.addGameToRenderList,
  payload,
});

export const setCurrentScreen = (payload) => ({
  type: types.main.setCurrentScreen,
  payload,
});

export const setGoSearch = () => ({
  type: types.main.setGoSearch,
});

export const resetGoSearch = () => ({
  type: types.main.resetGoSearch,
});
