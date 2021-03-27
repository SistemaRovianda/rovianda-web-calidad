import { Injectable } from "@angular/core";
import { Actions, ofType } from "@ngrx/effects";
import { createEffect } from "@ngrx/effects";
import * as fromActionsFilter from "./filter.action";
import * as fromActionsHistorial from "../historial/historial.action";
import {
  exhaustMap,
  switchMap,
  catchError,
  map,
} from "rxjs/operators";
import { HistorialService } from "src/app/shared/Services/historial.service";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { SELECT_TYPE_MATERIAL } from "./filter.selector";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { getRecepcionDates } from "./filter.action";

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

  gettingReceptions = createEffect(()=>
  this.action$.pipe(
    ofType(getRecepcionDates),
    exhaustMap((action)=>this.historialService.getReceptionsHistory(action.lotId,action.date).pipe(
      map((receptions)=>fromActionsFilter.setRecepcionDates({receptions})),
      catchError(()=>of(fromActionsFilter.setRecepcionDates({receptions:[]})))
    ))
  ));

  // searching meat entrances
  searchEntrances$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromActionsFilter.filterSearchEntrances),
      exhaustMap((action) =>
        this.historialService.searchEntrances(action.entranceId,action.dateStart,action.dateEnd, this.path).pipe(
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
              fromActionsHistorial.loadHistorialEntrances({ historial }),
            ];
          }),
          catchError((error) => {
            this.toast.error(
              `Ningun resultado encontrado para la entrada : ${action.entranceId}`
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

  //////// searching cooling records
  searchCoolingMeat$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromActionsFilter.searchCoolingOfEntrance),
      exhaustMap((action) =>
        this.historialService.searchCoolingOfEntrance(action.entranceId,action.dateStart,action.dateEnd).pipe(
          switchMap((historial) => {
            return [
              fromActionsHistorial.loadHistorialCooling({ historial }),
            ];
          }),
          catchError((error) => {
            this.toast.error(
              `Ningun resultado encontrado para la entrada a enfriadores: ${action.entranceId}`
            );
            return of(
              fromActionsHistorial.loadHistorialCooling({historial:null})
            );
          })
        )
      )
    )
  );
  ///////


  GetfilterSearchLotDrief$= createEffect(()=>
  this.action$.pipe(
    ofType(fromActionsFilter.GetfilterSearchLotDrief),
    exhaustMap((action)=>this.historialService.searchLotDrief(action.entranceId,this.path).pipe(

    ))
  )
  )
}
