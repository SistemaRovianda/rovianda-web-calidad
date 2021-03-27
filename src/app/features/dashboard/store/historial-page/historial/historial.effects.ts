import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HistorialService } from "src/app/shared/Services/historial.service";
import * as fromHistorialActions from "./historial.action";
import { exhaustMap, switchMap, delay, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { searchingOutputsOvenOfProcessOfEntrance, searchOutputCoolingOfEntrance, searchOutputsFormulationsOfEntrance, searchOutputsProcessOfEntrance } from "../filter/filter.action";
import { loadHistorialOutputsCooling, loadHistorialOutputsFormulation, loadHistorialOutputsOven, loadHistorialOutputsProcess } from "./historial.action";
import { ToastrService } from "ngx-toastr";
@Injectable()
export class HistorialEffects {
  constructor(
    private action$: Actions,
    private historialService: HistorialService,
    private toast: ToastrService
  ) {}

  searchOutputsCoolingMeat$ = createEffect(() =>
  this.action$.pipe(
    ofType(searchOutputCoolingOfEntrance),
    exhaustMap((action) =>
      this.historialService.searchOutputsCoolingOfEntrance(action.entranceId,action.dateStart,action.dateEnd).pipe(
        switchMap((historial:{outputs:any[]}) => {
          return [
            searchOutputsFormulationsOfEntrance({outputsCooling: (historial.outputs?historial.outputs.map(x=>x.outputsCoolingId):[] ) }),
            loadHistorialOutputsCooling({ historial }),
          ];
        }),
        catchError((error) => {
          this.toast.error(
            `Ningun resultado salidas para la entrada : ${action.entranceId}`
          );
          return of(
            loadHistorialOutputsCooling({historial:null})
          );
        })
      )
    )
  )
);

searchOutputsFormulationsMeat$ = createEffect(() =>
  this.action$.pipe(
    ofType(searchOutputsFormulationsOfEntrance),
    exhaustMap((action) =>
      this.historialService.searchOutputsFormulationOfEntrance(action.outputsCooling).pipe(
        switchMap((historial:{formulation:any[]}) => {
          return [
            searchOutputsProcessOfEntrance({formulationsIds: historial.formulation.map(x=>x.formulationId)}),
            loadHistorialOutputsFormulation({ historial }),
          ];
        }),
        catchError((error) => {
          this.toast.error(
            `Ningun resultado de formulaciones`
          );
          return of(
            loadHistorialOutputsFormulation({historial:null})
          );
        })
      )
    )
  )
);

searchOutputsProcessMeat$ = createEffect(() =>
  this.action$.pipe(
    ofType(searchOutputsProcessOfEntrance),
    exhaustMap((action) =>
      this.historialService.searchOutputsProcessOfEntrance(action.formulationsIds).pipe(
        switchMap((historial:{process:any[]}) => {
          return [
            searchingOutputsOvenOfProcessOfEntrance({processId: historial.process.map(x=>x.processId)}),
            loadHistorialOutputsProcess({ historial }),
          ];
        }),
        catchError((error) => {
          this.toast.error(
            `Ningun resultado de formulaciones`
          );
          return of(
            loadHistorialOutputsProcess({historial:null})
          );
        })
      )
    )
  )
);

searchOutputsOvenMeat$ = createEffect(() =>
  this.action$.pipe(
    ofType(searchingOutputsOvenOfProcessOfEntrance),
    exhaustMap((action) =>
      this.historialService.searchOutputsOvenOfEntrance(action.processId).pipe(
        switchMap((historial:{oven:any[]}) => {
          return [
            
            loadHistorialOutputsOven({ historial }),
          ];
        }),
        catchError((error) => {
          this.toast.error(
            `Ningun resultado de formulaciones`
          );
          return of(
            loadHistorialOutputsOven({historial:null})
          );
        })
      )
    )
  )
);

}
