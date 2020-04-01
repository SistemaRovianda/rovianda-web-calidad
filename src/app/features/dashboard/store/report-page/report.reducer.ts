import { createReducer, on } from "@ngrx/store";
import * as fromGetReportActions from "./report.action";
import { ReportPageInterface } from "src/app/shared/models/reportPage.interface";

const STATE_INITIAL_ADD_USER_PAGE: ReportPageInterface = {
  loading: false,
  error: null
};

export const reportReducer = createReducer<ReportPageInterface>(
  STATE_INITIAL_ADD_USER_PAGE,
  on(fromGetReportActions.getReport, state => ({ ...state, loading: true })),
  on(fromGetReportActions.finishGetReport, state => ({
    ...state,
    loading: false
  })),
  on(fromGetReportActions.getReportFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
