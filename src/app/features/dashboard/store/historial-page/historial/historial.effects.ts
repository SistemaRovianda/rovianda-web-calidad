import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HistorialService } from "src/app/shared/Services/historial.service";
import * as fromHistorialActions from "./historial.action";
import { exhaustMap, switchMap, delay, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
@Injectable()
export class HistorialEffects {
  constructor(
    private action$: Actions,
    private historialService: HistorialService
  ) {}

  loadHistorial$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromHistorialActions.startLoadHistorial),
      exhaustMap(action =>
        this.historialService.getHistorial().pipe(
          delay(6000),
          switchMap(historial => [
            fromHistorialActions.loadHistorial({ historial }),
            fromHistorialActions.finishLoadHistorial()
          ]),
          catchError(error =>
            of(
              fromHistorialActions.loadHistorialFailure(error),
              fromHistorialActions.finishLoadHistorial()
            )
          )
        )
      )
    )
  );

  downloadHistorialEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromHistorialActions.downloadHistorial),
      exhaustMap(action =>
        this.historialService.downloadHistorialService(action.historial).pipe(
          delay(4000),
          switchMap(action => [fromHistorialActions.finishDownloadHistorial()]),
          catchError(error =>
            of(
              fromHistorialActions.loadHistorialFailure(error),
              fromHistorialActions.finishDownloadHistorial()
            )
          )
        )
      )
    )
  );
}
