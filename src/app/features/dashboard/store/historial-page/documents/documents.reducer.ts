import { createReducer, on } from "@ngrx/store";
import { DocumentsInterface } from "src/app/shared/models/documents.interface";
import { DocumentInterface } from "src/app/shared/models/document.interface";
import * as fromActionsDocuments from "./documents.action";

export const STATE_INITIAL_DOCUMENTS: DocumentsInterface = {
  loading: false,
  documents: [],
  error: null,
  downloadDocument: false
};

export const documentsReducer = createReducer<DocumentsInterface>(
  STATE_INITIAL_DOCUMENTS,
  on(fromActionsDocuments.startLoadDocuments, state => ({
    ...state,
    loading: true
  })),
  on(fromActionsDocuments.finishLoadDocuments, state => ({
    ...state,
    loading: false
  })),
  on(fromActionsDocuments.loadDocuments, (state, { documents }) => ({
    ...state,
    documents
  })),
  on(fromActionsDocuments.loadDocumentsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(fromActionsDocuments.downloadDocument, state => ({
    ...state,
    downloadDocument: true
  })),
  on(fromActionsDocuments.finishDownloadDocuments, state => ({
    ...state,
    downloadDocument: false
  }))
);
