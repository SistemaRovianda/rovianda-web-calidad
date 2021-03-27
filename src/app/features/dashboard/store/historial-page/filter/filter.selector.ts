import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const FILTER_STATE = (state: AppStateInterface) =>
  state.filterHistorialPage;

export const SELECT_STATE_FILTER = createSelector(
  FILTER_STATE,
  (state) => state.filter
);

export const SELECT_IS_LOADING = createSelector(
  FILTER_STATE,
  (state) => state.loading
);

export const SELECT_TYPE_MATERIAL = createSelector(
  FILTER_STATE,
  (state) => state.typeMaterial
);

export const SELECT_RESULT_LOT_FOUND = createSelector(
  FILTER_STATE,
  (state) => state.lotFound
);

export const SELECT_DATES_VALID = createSelector(
  FILTER_STATE,
  (state) => state.existDates
);

export const getReceptions = createSelector(
  FILTER_STATE,
  (state)=>state.receptions
);

export const getReceptionsDrief = createSelector(
  FILTER_STATE,
  (state)=>state.receptionsDrief
);