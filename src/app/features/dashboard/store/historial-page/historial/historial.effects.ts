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

  
}
