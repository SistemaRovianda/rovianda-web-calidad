import { createReducer, on } from "@ngrx/store";
import { HistorialListInterface } from "src/app/shared/models/historial-list.interface";
import * as fromActionsHistorial from "./historial.action";

const STATE_INITIAL_HISTORIAL: HistorialListInterface = {

  entrances: null,
  cooling: null,
  devolutions:null,
  inspections:null,
  outputCoolings:null,
  outputsFormulations:null,
  outputsOven:null,
  outputsPackaging:null,
  outputsProcess:null,
  reprocesing:null,

  loading: false,
  error: null,
  generateHistorial: false,
};

export const historialReducer = createReducer<HistorialListInterface>(
  STATE_INITIAL_HISTORIAL,
  on(fromActionsHistorial.loadHistorialEntrances, (state, { historial }) => {
    console.log("LLAMADO");
    return {...state,entrances:historial};
    }
  ),
  on(fromActionsHistorial.loadHistorialCooling, (state, { historial }) => {
    console.log("LLAMADO COOLING");
    return {...state,cooling:historial};
    }
  )
  ,
  on(fromActionsHistorial.loadHistorialOutputsCooling, (state, { historial }) => {
    console.log("LLAMADO OUTPUTS COOLING");
    return {...state,outputCoolings:historial};
    }
  ),
  on(fromActionsHistorial.loadHistorialOutputsFormulation, (state, { historial }) => {
    console.log("LLAMADO FORMULATIONS");
    return {...state,outputsFormulations:historial};
    }
  ),
  on(fromActionsHistorial.loadHistorialOutputsProcess, (state, { historial }) => {
    console.log("LLAMADO PROCESS");
    return {...state,outputsProcess:historial};
    }
  ),
  
  on(fromActionsHistorial.loadHistorialOutputsOven, (state, { historial }) => {
    console.log("LLAMADO PROCESS");
    return {...state,outputsOven:historial};
    }
  )
  ,
  on(fromActionsHistorial.emptyHistorial, (state) => ({
    ...state,
    historial: null,
  }))
);
