import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const selectUser = (state: AppStateInterface) => state.user;

export const selectUID = createSelector(selectUser, state => state.uid);

export const selectUserRole = createSelector(selectUser, state => state.role);
