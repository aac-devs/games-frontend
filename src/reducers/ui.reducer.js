import types from '../types/types';

const initialState = {
  loading: false,
  msgError: null,
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ui.setError:
      return {
        ...state,
        msgError: action.payload,
      };
    case types.ui.removeError:
      return {
        ...state,
        msgError: null,
      };
    case types.ui.startLoading:
      return {
        ...state,
        loading: true,
      };
    case types.ui.finishLoading:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default uiReducer;
