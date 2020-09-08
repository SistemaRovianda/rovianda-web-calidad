import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { createEffect } from "@ngrx/effects";
import * as fromActionsFilter from "./filter.action";
import * as fromActionsHistorial from "../historial/historial.action";
import {
  exhaustMap,
  switchMap,
  delay,
  filter,
  catchError,
} from "rxjs/operators";
import { HistorialService } from "src/app/shared/Services/historial.service";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { SELECT_TYPE_MATERIAL } from "./filter.selector";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class FilterEffect {
  path: string;
  constructor(
    private action$: Actions,
    private historialService: HistorialService,
    private _store: Store<AppStateInterface>,
    private toast: ToastrService
  ) {
    this._store
      .select(SELECT_TYPE_MATERIAL)
      .subscribe((material) => (this.path = material));
  }

  searchLot$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromActionsFilter.filterSearchLot),
      exhaustMap((action) =>
        this.historialService.searchLot(action.lot, this.path).pipe(
          switchMap((historial) => {
            this.toast.success("Historial de lote obtenido");
            this.path === "packaging"
              ? localStorage.setItem(
                  "historialID",
                  historial[0].entrancePackingId
                )
              : this.path === "drief"
              ? localStorage.setItem(
                  "historialID",
                  historial[0].entranceDriefId
                )
              : localStorage.setItem(
                  "historialID",
                  historial.entranceMeat[0].entranceMeatId
                );
            return [
              fromActionsFilter.filterFinishLoading(),
              fromActionsFilter.filterLoadingSuccess(),
              fromActionsHistorial.loadHistorial({ historial }),
            ];
          }),
          catchError((error) => {
            this.toast.error(
              `Ningun resultado encontrado con el lote: ${action.lot}`
            );
            return of(
              fromActionsFilter.filterFinishLoading(),
              fromActionsFilter.filterFailure({ error: error.error.msg }),
              fromActionsHistorial.emptyHistorial()
            );
          })
        )
      )
    )
  );
}
