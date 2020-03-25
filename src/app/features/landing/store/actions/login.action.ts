import { createAction, props } from "@ngrx/store";
import { UserInterface } from "src/app/shared/models/user.interface";

const SIGN_IN = "[LOGIN] Sing In";

const SIGN_IN_SUCCESS = "[LOGIN] Sign In Success";

const SIGN_AUTH_SUCCESS = "[LOGIN] Sign Auth Succes";

const START_LOAD = "[LOGIN] Start Load";

const FINISH_LOAD = "[LOGIN] Finish Load";

const SIGN_OUT = "[LOGIN] Sign Out";

const SIGN_IN_FAILURE = "[LOGIN] Sign In Failure";

const SIGN_OUT_SUCCESS = "[LOGIN] Sign Out Success";

export const signIn = createAction(
  SIGN_IN,
  props<{ nickUser: string; password: string }>()
);

export const signInSuccess = createAction(SIGN_IN_SUCCESS);

export const signAuthSuccess = createAction(
  SIGN_AUTH_SUCCESS,
  props<UserInterface>()
);

export const startLoad = createAction(START_LOAD);

export const finishLoad = createAction(FINISH_LOAD);

export const singOut = createAction(SIGN_OUT);

export const signInFailure = createAction(
  SIGN_IN_FAILURE,
  props<{ reason: string }>()
);

export const singOutSuccess = createAction(SIGN_OUT_SUCCESS);
