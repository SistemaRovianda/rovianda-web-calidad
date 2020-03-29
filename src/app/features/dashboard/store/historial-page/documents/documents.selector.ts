import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const DOCUMENTS_STATE = (state: AppStateInterface) => state.documents;

export const SELECT_DOCUMENTS = createSelector(
  DOCUMENTS_STATE,
  state => state.documents
);

export const SELECT_DOCUMENTS_LOADING = createSelector(
  DOCUMENTS_STATE,
  state => state.loading
);

export const SELECT_DOCUMENTS_ERROR = createSelector(
  DOCUMENTS_STATE,
  state => state.error
);

export const SELECT_DOWNLOAD_DOCUMENT = createSelector(
  DOCUMENTS_STATE,
  state => state.downloadDocument
);
