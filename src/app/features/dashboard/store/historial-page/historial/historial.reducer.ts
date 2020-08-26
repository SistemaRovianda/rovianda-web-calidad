import { createReducer, on } from "@ngrx/store";
import { HistorialListInterface } from "src/app/shared/models/historial-list.interface";
import * as fromActionsHistorial from "./historial.action";

const STATE_INITIAL_HISTORIAL: HistorialListInterface = {
  historial: null,
  loading: false,
  error: null,
  generateHistorial: false,
};

export const historialReducer = createReducer<HistorialListInterface>(
  STATE_INITIAL_HISTORIAL,
  on(fromActionsHistorial.loadHistorial, (state, { historial }) => ({
    ...state,
    historial,
  })),
  on(fromActionsHistorial.emptyHistorial, (state) => ({
    ...state,
    historial: null,
  }))
);
