import { props, createAction } from "@ngrx/store";

const FILTER_LOAD = "[FILTER] Load Filter";

const FILTERED_OUT = "[FILTER] Filtered Out";

export const filterLoad = createAction(
  FILTER_LOAD,
  props<{ filter: string }>()
);

export const filteredOut = createAction(
  FILTERED_OUT,
  props<{
    isFiltered: boolean;
  }>()
);
