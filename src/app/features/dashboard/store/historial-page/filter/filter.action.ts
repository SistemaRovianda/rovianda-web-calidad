import { props, createAction } from "@ngrx/store";
import { createEffect } from "@ngrx/effects";

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

export const filterSearchLot = createAction(
  FILTER_SEARCH_LOT,
  props<{ lot: string }>()
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
