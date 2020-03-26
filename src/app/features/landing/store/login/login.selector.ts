import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const selectLogin = (state: AppStateInterface) => state.login;

export const SELECT_IS_LOADING = createSelector(
  selectLogin,
  state => state.loading
);

export const SELECT_ERRORS = createSelector(selectLogin, state => state.error);
