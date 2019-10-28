import { actionTypes } from "../actions/actions.js";
import { combineReducers } from "redux";
// import { loadFiveMoreReducer } from "./load-five-more-reducer";

const initialEntriesState = {
  entries: [],
  waitingForFirestore: true,
  firestoreError: null,
  moreToLoad: false,
  lastLoaded: null
};

const initialFiltersState = {
  activeFilters: []
};

const entriesReducer = (state = initialEntriesState, action) => {
  let newState = Object.assign(state);

  if (action.type === actionTypes.LOAD_FIVE_MORE_REQUEST) {
    newState.waitingForFirestore = true;
    newState.firestoreError = null;
    return newState;
  } else if (action.type === actionTypes.LOAD_FIVE_MORE_SUCCESS) {
    newState.waitingForFirestore = false;
    newState.firestoreError = null;
    newState.entries = [...state.entries, action.payload.entries];
    newState.lastLoaded = action.payload.lastLoaded;
    newState.moreToLoad = action.payload.moreToLoad;
    return newState;
  } else if (action.type === actionTypes.LOAD_FIVE_MORE_FAILURE) {
    newState.waitingForFirestore = false;
    newState.firestoreError = action.payload.err;
    newState.moreToLoad = false;
    newState.lastLoaded = null;
    return newState;
  }

  return state;
};

const filtersReducer = (state = initialFiltersState, action) => {
  // let newState = Object.assign(state);
  if (action.type === actionTypes.SELECT_NEW_FILTER_REQUEST) {
    // TODO
  } else if (action.type === actionTypes.SELECT_NEW_FILTER_SUCCESS) {
    // TODO
  } else if (action.type === actionTypes.SELECTNEW_FITER_FAILURE) {
    // TODO
  }

  return state;
};

export default combineReducers({ entriesReducer, filtersReducer });
