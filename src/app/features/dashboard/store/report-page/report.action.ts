import { createAction, props } from "@ngrx/store";
import { ReportInterface } from "src/app/shared/models/report.interface";

const GET_REPORT = "[REPORT] Get Report";

const GET_REPORT_FAILURE = "[REPORT] Get Report Failure";

const FINISH_GET_REPORT = "[REPORT] Finish Get Report";

export const getReport = createAction(
  GET_REPORT,
  props<{ report: ReportInterface }>()
);

export const getReportFailure = createAction(
  GET_REPORT_FAILURE,
  props<{ error: string }>()
);

export const finishGetReport = createAction(FINISH_GET_REPORT);
