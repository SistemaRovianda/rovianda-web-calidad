import { props, createAction } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";
import { HistorialReception, HistorialReceptionDrief } from "src/app/shared/models/historial-list.interface";

const FILTER_SELECT_MATERIAL = "[FILTER] Select Material";

const FILTER_SEARCH_LOT = "[FILTER] Search Lot";


const FILTER_LOADING_SUCCESS = "[FILTER] Loading Success";

const FILTER_FINISH_LOADING = "[FILTER] Finish Loading";

const FILTER_FAILURE = "[FILTER] Failure";

const FILTER_LOAD_DATES = "[FILTER] Load Dates";

const FILTER_RESET = "[FILTER] Reset";

export const filterSelectMAterial = createAction(
  FILTER_SELECT_MATERIAL,
  props<{ typeMaterial: string }>()
);



export const GetfilterSearchLotDrief = createAction(
  "[FILTER] Get Search Lot Drief",
  props<{ entranceId: string}>()
);

export const SetfilterSearchLotDrief = createAction(
  "[FILTER] Set Search Lot Drief",
  props<{ receptionsDrief: HistorialReceptionDrief[]}>()
);

export const filterLoadingSuccess = createAction(FILTER_LOADING_SUCCESS);

export const filterFinishLoading = createAction(FILTER_FINISH_LOADING);

export const filterFailure = createAction(
  FILTER_FAILURE,
  props<{ error: string }>()
);

export const filterLoadDates = createAction(
  FILTER_LOAD_DATES,
  props<{ dateIni: string; dateFinal: string }>()
);

export const filterReset = createAction(FILTER_RESET);

export const getRecepcionDates = createAction(
  "[FILTER] Getting receptionsDates",
  props<{lotId:string,date:string}>()
);

export const setRecepcionDates = createAction(
  "[FILTER] Setting receptionsDates",
  props<{receptions:HistorialReception[]}>()
);


export const getRecepcionDriefDates = createAction(
  "[FILTER] Getting receptionsDriefDates",
  props<{lotId:string,date:string}>()
);

export const setRecepcionDriefDates = createAction(
  "[FILTER] Setting receptionsDriefDates",
  props<{receptions:HistorialReception[]}>()
);

export const filterSearchEntrances = createAction(
  FILTER_SEARCH_LOT,
  props<{ entranceId: string ,dateStart:string,dateEnd:string}>()
);

export const searchCoolingOfEntrance = createAction(
  "[FILTER] Searching cooling",
  props<{entranceId:number,dateStart: string,dateEnd:string}>()
);

export const searchOutputCoolingOfEntrance = createAction(
  "[FILTER] Searching Outputs cooling",
  props<{entranceId:number,dateStart: string,dateEnd:string}>()
);

export const searchOutputsFormulationsOfEntrance = createAction(
  "[FILTER] Searching Formulations of Outputs Coolings",
  props<{outputsCooling:number[]}>()
);

export const searchOutputsProcessOfEntrance = createAction(
  "[FILTER] Searching process of outputs of entrance",
  props<{formulationsIds:number[]}>()
);

export const searchingOutputsOvenOfProcessOfEntrance = createAction(
  "[FILTER] Searching outputs oven of entrance",
  props<{processId:number[]}>()
);

export const searchingOutputsPackagingOfEntrance = createAction(
  "[FILTER] Searching outputs packaging of entrance",
  props<{lotsDays:string[]}>()
);

