import { createAction, props } from "@ngrx/store";
import { DocumentInterface } from "src/app/shared/models/document.interface";

const LOAD_DOCUMENTS = "[DOCUMENTS] Load Documents";

const START_LOAD_DOCUMENTS = "[DOCUMENTS] Start Load Documents";

const FINISH_LOAD_DOCUMENTS = "[DOCUMENTS] Finish Load Documents";

const LOAD_DOCUMENTS_FAILURE = "[DOCUMENTS] Load Documents Failure";

const DOWNLOAD_DOCUMENT = "[DOCUMENTS] Download Document";

const FINISH_DOWNLOAD_DOCUMENT = "[DOCUMENTS] Finish Download Document";

export const loadDocuments = createAction(
  LOAD_DOCUMENTS,
  props<{ documents: DocumentInterface[] }>()
);

export const startLoadDocuments = createAction(START_LOAD_DOCUMENTS);

export const finishLoadDocuments = createAction(FINISH_LOAD_DOCUMENTS);

export const loadDocumentsFailure = createAction(
  LOAD_DOCUMENTS_FAILURE,
  props<{ error: string }>()
);

export const downloadDocument = createAction(
  DOWNLOAD_DOCUMENT,
  props<{ document: DocumentInterface }>()
);

export const finishDownloadDocuments = createAction(FINISH_DOWNLOAD_DOCUMENT);
