import { createAction, props } from "@ngrx/store";
import { HistorialInterface } from "src/app/shared/models/historial.interface";

const LOAD_HISTORIAL = "[HISTORIAL] Load Historial";

const START_LOAD_HISTORIAL = "[HISTORIAL] Start Load Historial";

const FINISH_LOAD_HISTORIAL = "[HISTORIAL] Finish Load Historial";

const LOAD_HISTORIAL_FAILURE = "[HISTORIAL] Load Historial Failure";

const DOWNLOAD_HISTORIAL = "[HISTORIAL] Dowload Historial";

const DOWNLOAD_HISTORIAL_SUCCESS = "[HISTORIAL] Dowload Historial Success";

const FINISH_DOWNLOAD_HISTORIAL = "[HISTORIAL] Finish Download Historial";

export const loadHistorial = createAction(
  LOAD_HISTORIAL,
  props<{ historial: HistorialInterface[] }>()
);

export const startLoadHistorial = createAction(START_LOAD_HISTORIAL);

export const finishLoadHistorial = createAction(FINISH_LOAD_HISTORIAL);

export const loadHistorialFailure = createAction(
  LOAD_HISTORIAL_FAILURE,
  props<{ error: string }>()
);

export const downloadHistorial = createAction(
  DOWNLOAD_HISTORIAL,
  props<{ historial: HistorialInterface[] }>()
);

export const downloadHistorialSuccess = createAction(
  DOWNLOAD_HISTORIAL_SUCCESS
);

export const finishDownloadHistorial = createAction(FINISH_DOWNLOAD_HISTORIAL);
