import { types } from "../types/types";

export const setError = (err) => ({
  type: types.ui.setError,
  payload: err,
});

export const removeError = () => ({
  type: types.ui.removeError,
});

export const startLoading = () => ({
  type: types.ui.startLoading,
});

export const finishLoading = () => ({
  type: types.ui.finishLoading,
});
