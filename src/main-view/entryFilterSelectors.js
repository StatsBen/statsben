import { createSelector } from "reselect";
import {
  getListOfAllTypes,
  getListOfAllRanges,
  getCountsByTypes,
  getCountsByRanges
} from "./mathHelpers";

const entriesSelector = entryData => entryData;

export const typesListSelector = createSelector(entriesSelector, entryData =>
  getListOfAllTypes(entryData)
);

export const rangesListSelector = createSelector(entriesSelector, entryData =>
  getListOfAllRanges(entryData)
);

export const typesCountSelector = createSelector(entriesSelector, entryData =>
  getCountsByTypes(entryData)
);

export const rangeCountsSelector = createSelector(entriesSelector, entryData =>
  getCountsByRanges(entryData)
);
