import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromGetReportActions from "./report.action";
import { exhaustMap, delay, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ReportService } from "src/app/shared/Services/report.service";

@Injectable()
export class ReportEffects {
  constructor(private action$: Actions, private reportService: ReportService) {}

  GetReportEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromGetReportActions.getReport),
      exhaustMap(action =>
        this.reportService.GetReport(action.report).pipe(
          delay(3000),
          switchMap(user => [fromGetReportActions.finishGetReport()]),
          catchError(error =>
            of(
              fromGetReportActions.getReportFailure(error),
              fromGetReportActions.finishGetReport()
            )
          )
        )
      )
    )
  );
}
