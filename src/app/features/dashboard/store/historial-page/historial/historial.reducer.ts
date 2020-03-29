import { createReducer, on } from "@ngrx/store";
import { HistorialListInterface } from "src/app/shared/models/historial-list.interface";
import * as fromActionsHistorial from "./historial.action";

const STATE_INITIAL_HISTORIAL: HistorialListInterface = {
  historial: [],
  loading: false,
  error: null,
  generateHistorial: false
};

export const historialReducer = createReducer<HistorialListInterface>(
  STATE_INITIAL_HISTORIAL,
  on(fromActionsHistorial.startLoadHistorial, state => ({
    ...state,
    loading: true
  })),
  on(fromActionsHistorial.finishLoadHistorial, state => ({
    ...state,
    loading: false
  })),
  on(fromActionsHistorial.loadHistorial, (state, { historial }) => ({
    ...state,
    historial
  })),
  on(fromActionsHistorial.loadHistorialFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(fromActionsHistorial.downloadHistorial, state => ({
    ...state,
    generateHistorial: true
  })),
  on(fromActionsHistorial.finishDownloadHistorial, state => ({
    ...state,
    generateHistorial: false
  }))
);
