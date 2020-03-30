import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const ADD_USER_STATE = (state: AppStateInterface) => state.add_user;

export const SELECT_ADD_USER_ERROR = createSelector(
  ADD_USER_STATE,
  state => state.error
);

export const SELECT_ADD_USER_LOADING = createSelector(
  ADD_USER_STATE,
  state => state.loading
);
