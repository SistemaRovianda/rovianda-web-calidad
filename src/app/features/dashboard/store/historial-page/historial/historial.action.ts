import { createAction, props } from "@ngrx/store";
import { HistorialInterface } from "src/app/shared/models/historial.interface";

const LOAD_HISTORIAL = "[HISTORIAL] Load Historial";

const EMPTY_HISTORIAL = "[HISTORIAL] Empty historial";

export const loadHistorial = createAction(
  LOAD_HISTORIAL,
  props<{ historial: any }>()
);

export const emptyHistorial = createAction(EMPTY_HISTORIAL);
