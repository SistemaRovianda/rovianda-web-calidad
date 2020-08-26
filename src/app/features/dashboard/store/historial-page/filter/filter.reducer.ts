import { createReducer, on } from "@ngrx/store";

import * as fromActionsFilter from "./filter.action";
import { FilterInterface } from "src/app/shared/models/filter.interface";

export const STATE_INITIAL_FILTER: FilterInterface = {
  filter: "",
  loading: false,
  typeMaterial: null,
  error: null,
  lotFound: false,
  dateFinal: null,
  dateIni: null,
  existDates: false,
};

export const filterReducer = createReducer<FilterInterface>(
  STATE_INITIAL_FILTER,
  on(fromActionsFilter.filterSelectMAterial, (state, { typeMaterial }) => ({
    ...state,
    typeMaterial,
    lotFound: false,
  })),
  on(fromActionsFilter.filterSearchLot, (state, { lot }) => ({
    ...state,
    loading: true,
    filter: lot,
    lotFound: false,
  })),
  on(fromActionsFilter.filterFinishLoading, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromActionsFilter.filterFailure, (state, { error }) => ({
    ...state,
    error,
    lotFound: false,
  })),
  on(fromActionsFilter.filterLoadingSuccess, (state) => ({
    ...state,
    lotFound: true,
  })),
  on(fromActionsFilter.filterLoadDates, (state, { dateIni, dateFinal }) => ({
    ...state,
    dateIni,
    dateFinal,
    existDates: true,
  })),
  on(fromActionsFilter.filterReset, (state) => ({
    ...state,
    ...STATE_INITIAL_FILTER,
  }))
);
