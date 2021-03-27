import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { createSelector } from "@ngrx/store";

export const HISTORIAL_STATE = (state: AppStateInterface) => state.historial;

export const SELECT_ENTRANCES = createSelector(
  HISTORIAL_STATE,
  state => state.entrances
);

export const SELECT_HISTORIAL_LOADING = createSelector(
  HISTORIAL_STATE,
  state => state.loading
);

export const SELECT_HISTORIAL_ERROR = createSelector(
  HISTORIAL_STATE,
  state => state.error
);

export const SELECT_GENERATE_HISTORIAL = createSelector(
  HISTORIAL_STATE,
  state => state.generateHistorial
);

export const SELECT_COOLING = createSelector(
  HISTORIAL_STATE,
  state => state.cooling
);
export const SELECT_OUTPUTS_COOLING = createSelector(
  HISTORIAL_STATE,
  state => state.outputCoolings
);

export const SELECT_OUTPUTS_FORMULATIONS = createSelector(
  HISTORIAL_STATE,
  state => state.outputsFormulations
);

export const SELECT_OUTPUTS_PROCESS= createSelector(
  HISTORIAL_STATE,
  state => state.outputsProcess
);

export const SELECT_OUTPUTS_OVEN= createSelector(
  HISTORIAL_STATE,
  state => state.outputsOven
);

export const SELECT_OUTPUTS_PACKAGING= createSelector(
  HISTORIAL_STATE,
  state => state.outputsPackaging
);

export const SELECT_INSPECTIONS= createSelector(
  HISTORIAL_STATE,
  state => state.inspections
);

export const SELECT_DEVOLUTIONS= createSelector(
  HISTORIAL_STATE,
  state => state.devolutions
);

export const SELECT_REPROCESINGS= createSelector(
  HISTORIAL_STATE,
  state => state.reprocesing
  )