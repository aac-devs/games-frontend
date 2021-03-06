const types = {
  games: {
    cleanArrays: '[GAMES] Clean arrays',
    loadArray: '[GAMES] Load array',
    loadNextPage: '[GAMES] Load next page',
    enableSavingGameFlag: '[GAMES] Enable saving game flag',
    disableSavingGameFlag: '[GAMES] Disable saving game flag',
    loadRendererGames: '[GAMES] Load renderer games',
    changeOrderSense: '[GAMES] Change order sense',
    changeOrderBy: '[GAMES] Change order by',
    changeFilterSource: '[GAMES] Change filter source',
    changeFilterGenre: '[GAMES] Change filter genre',
    changeInputValue: '[GAMES] Change input value',
    setTemporaryImage: '[GAMES] Set temporay image',
    resetTemporaryImage: '[GAMES] Reset temporay image',
    setCurrentScreen: '[GAMES] Set current screen',
    changeSearchName: '[GAMES] Change search name',
    setGoSearch: '[GAMES] Set go search',
    resetGoSearch: '[GAMES] Reset go search',
    setNewGame: '[GAMES] Set new game',
  },

  components: {
    loadGenresNames: '[COMP] Load genres names',
    loadPlatformsNames: '[COMP] Load platforms names',
    setSelectedOption: '[COMP] Set selected option',
    showListbox: '[COMP] Show listbox',
    hideListbox: '[COMP] Hide listbox',
    listboxParent: '[COMP] Listbox parent',
    showRatingPicker: '[COMP] Show rating picker',
    hideRatingPicker: '[COMP] Hide rating picker',
    showDatePicker: '[COMP] Show date picker',
    hideDatePicker: '[COMP] Hide date picker',
    resetListboxValues: '[COMP] Reset listbox values',
  },

  ui: {
    startLoading: '[UI] Start loading',
    finishLoading: '[UI] Finish loading',
    setError: '[UI] Set error',
    removeError: '[UI] Remove error',
  },
};

export default types;
