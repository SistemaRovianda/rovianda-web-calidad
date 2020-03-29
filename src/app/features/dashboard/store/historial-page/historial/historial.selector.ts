import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const HISTORIAL_STATE = (state: AppStateInterface) => state.historial;

export const SELECT_HISTORIAL = createSelector(
  HISTORIAL_STATE,
  state => state.historial
);

export const SELECT_HISTORIAL_LOADING = createSelector(
  HISTORIAL_STATE,
  state => state.loading
);

export const SELECT_HISTORIAL_ERROR = createSelector(
  HISTORIAL_STATE,
  state => state.error
);

export const SELECT_GENERATE_HISTORIAL = createSelector(
  HISTORIAL_STATE,
  state => state.generateHistorial
);
