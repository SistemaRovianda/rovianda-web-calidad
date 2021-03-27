import { createAction, props } from "@ngrx/store";




const EMPTY_HISTORIAL = "[HISTORIAL] Empty historial";

export const loadHistorialEntrances = createAction(
  "[HISTORIAL] Load Historial",
  props<{ historial: any }>()
);

export const loadHistorialCooling = createAction(
  "[HISTORIAL] Load Historial Cooling",
  props<{ historial: any }>()
);


export const loadHistorialOutputsCooling = createAction(
  "[HISTORIAL] Load Historial Outputs Cooling",
  props<{ historial: any }>()
);


export const loadHistorialOutputsFormulation = createAction(
  "[HISTORIAL] Load Historial Outputs Formulation",
  props<{ historial: any }>()
);

export const loadHistorialOutputsProcess = createAction(
  "[HISTORIAL] Load Historial Outputs Process",
  props<{ historial: any }>()
);

export const loadHistorialOutputsOven= createAction(
  "[HISTORIAL] Load Historial Outputs Oven",
  props<{ historial: any }>()
);

export const loadHistorialOutputsPackaging = createAction(
  "[HISTORIAL] Load Historial Outputs Packaging",
  props<{ historial: any }>()
);

export const loadHistorialOutputsDevolutions = createAction(
  "[HISTORIAL] Load Historial Outputs Devolutions",
  props<{ historial: any }>()
);
export const loadHistorialOutputsReprocesing = createAction(
  "[HISTORIAL] Load Historial Outputs Reprocesings",
  props<{ historial: any }>()
);

export const loadHistorialOutputsInspection = createAction(
  "[HISTORIAL] Load Historial Inspections",
  props<{ historial: any }>()
);

export const emptyHistorial = createAction(EMPTY_HISTORIAL);
