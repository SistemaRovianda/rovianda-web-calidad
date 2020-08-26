import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AppStateInterface } from "../models/app-state.interface";
import { Store } from "@ngrx/store";
import * as fromHistorialActions from "src/app/features/dashboard/store/historial-page/historial/historial.action";
import { filterReset } from "src/app/features/dashboard/store/historial-page/filter/filter.action";
@Injectable()
export class HIstorialResolver implements Resolve<boolean> {
  constructor(private store: Store<AppStateInterface>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.store.dispatch(filterReset());
    return true;
  }
}
