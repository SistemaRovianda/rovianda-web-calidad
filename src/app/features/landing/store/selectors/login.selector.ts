import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const selectLogin = (state: AppStateInterface) => state.login;

export const selectIsLoading = createSelector(
  selectLogin,
  state => state.loading
);

export const selectErrors = createSelector(selectLogin, state => state.errors);
