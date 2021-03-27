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
  receptions:[],
  receptionsDrief:[],
  receptionsPacking:[]
};

export const filterReducer = createReducer<FilterInterface>(
  STATE_INITIAL_FILTER,
  on(fromActionsFilter.filterSelectMAterial, (state, { typeMaterial }) => ({
    ...state,
    typeMaterial,
    lotFound: false,
  })),
  on(fromActionsFilter.filterSearchEntrances, (state, { entranceId }) => ({
    ...state,
    loading: true,
    filter: entranceId,
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
  on(fromActionsFilter.setRecepcionDates,(state,{receptions})=>({...state,receptions})),
  on(fromActionsFilter.filterReset, (state) => ({
    ...state,
    ...STATE_INITIAL_FILTER,
  }))
);
