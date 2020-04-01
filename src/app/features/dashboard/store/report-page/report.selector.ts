import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const GET_REPORT_STATE = (state: AppStateInterface) => state.report;

export const SELECT_GET_REPORT_ERROR = createSelector(
  GET_REPORT_STATE,
  state => state.error
);

export const SELECT_GET_REPORT_LOADING = createSelector(
  GET_REPORT_STATE,
  state => state.loading
);
