import { createAction, props } from "@ngrx/store";
import { AddUser } from "src/app/shared/models/add-user.interface";

const ADD_USER = "[ADD_USER] Add user";

const ADD_SELLER = "[ADD USER] Add User";

const ADD_USER_SUCCESS = "[ADD_USER] Add User Success";

const ADD_USER_FAILURE = "[ADD_USER] Add User Failure";

const FINISH_ADD_USER = "[ADD_USER] Finish Add User";

const GET_ID_SELLER = "[ADD USER] get id seller";

const LOAD_ID_SELLER = "[ADD USER] Load Id Seller";

export const addUser = createAction(ADD_USER, props<{ user: AddUser }>());

export const addSeller = createAction(ADD_SELLER, props<{ user: AddUser }>());

export const addUserSuccess = createAction(
  ADD_USER_SUCCESS,
  props<{ result: boolean }>()
);

export const addUserFailure = createAction(
  ADD_USER_FAILURE,
  props<{ error: string }>()
);

export const finishAddUser = createAction(FINISH_ADD_USER);

export const getIdSeller = createAction(GET_ID_SELLER);

export const loadIdSeller = createAction(LOAD_ID_SELLER, props<{ count: number }>());

export const loadWarehouses = createAction("[QUALITY] load warehouses");
export const setWarehouses = createAction("[QUALITY] set warehouses",props<{warehouses:any[]}>());
