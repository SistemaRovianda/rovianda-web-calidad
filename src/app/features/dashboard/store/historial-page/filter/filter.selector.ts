import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const FILTER_STATE = (state: AppStateInterface) =>
  state.filterHistorialPage;

export const SELECT_STATE_FILTER = createSelector(
  FILTER_STATE,
  state => state.filter
);

export const SELECT_IS_FILTER = createSelector(
  FILTER_STATE,
  state => state.isFiltered
);
