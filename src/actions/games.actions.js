import dayjs from "dayjs";
import { fetchingData } from "../helpers/fetch-data";
import { uploadImage } from "../helpers/upload-image";
import { types } from "../types/types";
import { finishLoading, removeError, startLoading } from "./ui.actions";

export const startLoadingArrays = (key, endpoint) => {
  return async (dispatch, getState) => {
    try {
      const next = getState().games.nextPage;
      dispatch(removeError());
      dispatch(startLoading());
      // console.log({ endpoint });
      // const resp = await fetchingData(
      //   `${endpoint}${key === "games" ? next : ""}`
      // );
      const resp = await fetchingData(endpoint);
      const data = await resp.json();
      const value = data.results
        ? data.results
        : data.data
        ? data.data
        : [data.result];
      data?.nextPage && dispatch(loadNextPage(parseInt(data.nextPage)));
      // console.log({ value });
      dispatch(loadArray({ key, value }));

      dispatch(finishLoading());
    } catch (error) {
      console.error(`Something went wrong fetching data!`);
    }
  };
};

export const dataRequest = () => {
  return (dispatch, getState) => {
    console.log("dataRequest");
    const { nextPage, searchName } = getState().games;
    console.log({ nextPage });
    console.log({ searchName });

    if (nextPage === 1) {
      dispatch(startLoadingArrays("genres", "games/genres"));
      dispatch(startLoadingArrays("platforms", "games/platforms"));
    }
    if (searchName === "") {
      dispatch(startLoadingArrays("games", `games?page=${nextPage}`));
    } else {
      dispatch(
        startLoadingArrays("games", `games?name=${searchName}&page=${nextPage}`)
      );
    }
  };
};

// export const startLoadingDetailedGame = (id) => {
//   return async (dispatch) => {
//     try {
//       dispatch(removeError());
//       dispatch(startLoading());
//       const resp = await fetchingData(`games/detail/${id}`);
//       const { ok, result, msg } = await resp.json();
//       ok ? dispatch(loadDetailedGame(result)) : dispatch(setError(msg));
//       dispatch(finishLoading());
//     } catch (error) {
//       console.error(`Something went wrong fetching data!`);
//     }
//   };
// };

const loadArray = (payload) => ({
  type: types.games.loadArray,
  payload,
});

const loadNextPage = (payload) => ({
  type: types.games.loadNextPage,
  payload,
});

// Limpia los arrays games, render, platforms, genres y pone nextPage a 1.
export const cleanArrays = () => ({
  type: types.games.cleanArrays,
});

const enableSavingGameFlag = () => ({
  type: types.games.enableSavingGameFlag,
});

const disableSavingGameFlag = () => ({
  type: types.games.disableSavingGameFlag,
});

export const startModifyingGames = () => {
  return (dispatch, getState) => {
    const {
      games,
      orderBy,
      orderSense,
      filterSource,
      filterGenre,
    } = getState().games;

    console.log(getState().games);

    let array =
      filterSource === "Rawg"
        ? games.filter((g) => !g.id.toString().startsWith("own"))
        : filterSource === "Custom"
        ? games.filter((g) => g.id.toString().startsWith("own"))
        : [...games];

    // if (filterGenre !== "Genres") {
    if (filterGenre !== "All") {
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

const loadRendererGames = (payload) => ({
  type: types.games.loadRendererGames,
  payload,
});

export const changeOrderSense = (payload) => ({
  type: types.games.changeOrderSense,
  payload,
});

export const changeOrderBy = (payload) => ({
  type: types.games.changeOrderBy,
  payload,
});

export const changeFilterSource = (payload) => ({
  type: types.games.changeFilterSource,
  payload,
});
export const changeFilterGenre = (payload) => ({
  type: types.games.changeFilterGenre,
  payload,
});

export const changeInputValue = (payload) => ({
  type: types.games.changeInputValue,
  payload,
});

export const setTemporaryImage = (payload) => ({
  type: types.games.setTemporaryImage,
  payload,
});

export const resetTemporaryImage = () => ({
  type: types.games.setTemporaryImage,
});

export const startSavingGame = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(removeError());
      dispatch(startLoading());
      dispatch(enableSavingGameFlag());
      const file = getState().games.temporaryImage;
      if (file) {
        const imageUrl = await uploadImage(file);
        dispatch(changeInputValue({ name: "image", value: imageUrl }));
      }
      const { id: gameId, ...data } = getState().games.detailedGame[0];
      const method = gameId ? "PUT" : "POST";
      const endpoint = gameId ? `games/edit/${gameId}` : "games/create";
      const resp = await fetchingData(endpoint, data, method);
      const { ok, id, msg } = await resp.json();
      if (ok) {
        console.log("Terminó de guardar.");

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
      }
      dispatch(finishLoading());
      dispatch(resetTemporaryImage());
      dispatch(disableSavingGameFlag());

      // TODO: redirigir a 'games' ==> dispatch(setCurrentScreen('games'))
    } catch (error) {
      console.error(`Something went wrong fetching data!`);
    }
  };
};

export const setCurrentScreen = (payload) => ({
  type: types.games.setCurrentScreen,
  payload,
});

export const changeSearchName = (payload) => ({
  type: types.games.changeSearchName,
  payload,
});

export const setGoSearch = () => ({
  type: types.games.setGoSearch,
});

export const resetGoSearch = () => ({
  type: types.games.resetGoSearch,
});

export const startCreatingNewGame = () => {
  return (dispatch, getState) => {
    dispatch(
      setNewGame({
        name: "",
        description: "",
        image: "",
        released: dayjs(),
        rating: 3,
        genres: [],
        platforms: [],
      })
    );
  };
};

export const setNewGame = (payload) => ({
  type: types.games.setNewGame,
  payload,
});
