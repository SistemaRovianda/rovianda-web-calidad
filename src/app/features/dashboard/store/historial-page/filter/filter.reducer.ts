import { createReducer, on } from "@ngrx/store";

import * as fromActionsFilter from "./filter.action";
import { FilterInterface } from "src/app/shared/models/filter.interface";

export const STATE_INITIAL_FILTER: FilterInterface = {
  filter: "",
  isFiltered: false
};

export const filterReducer = createReducer<FilterInterface>(
  STATE_INITIAL_FILTER,
  on(fromActionsFilter.filterLoad, (state, { filter }) => ({
    ...state,
    filter
  })),
  on(fromActionsFilter.filteredOut, (state, { isFiltered }) => ({
    ...state,
    isFiltered
  }))
);
