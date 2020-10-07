import { createReducer, on } from "@ngrx/store";
import { AddUserPageInterface } from "src/app/shared/models/add-user.page";
import * as fromAddUserActions from "./add-user.action";

const STATE_INITIAL_ADD_USER_PAGE: AddUserPageInterface = {
  loading: false,
  error: null,
  result: false,
  count: null
};

export const addUserReducer = createReducer<AddUserPageInterface>(
  STATE_INITIAL_ADD_USER_PAGE,
  on(fromAddUserActions.addUser, (state) => ({ ...state, loading: true })),
  on(fromAddUserActions.addSeller, (state) => ({ ...state, loading: true })),
  on(fromAddUserActions.addUserSuccess, (state, { result }) => ({
    ...state,
    result,
  })),
  on(fromAddUserActions.finishAddUser, (state) => ({
    ...state,
    loading: false,
  })),
  on(fromAddUserActions.addUserFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(fromAddUserActions.loadIdSeller, (state, { count }) => ({ ...state, count }))
);
