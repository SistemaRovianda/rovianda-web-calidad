import { Component, OnInit } from "@angular/core";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import {
  SELECT_HISTORIAL_LOADING,
  SELECT_HISTORIAL,
  SELECT_GENERATE_HISTORIAL,
} from "../../store/historial-page/historial/historial.selector";
import { HistorialInterface } from "src/app/shared/models/historial.interface";
import {
  SELECT_STATE_FILTER,
  SELECT_IS_LOADING,
  SELECT_TYPE_MATERIAL,
  SELECT_RESULT_LOT_FOUND,
} from "../../store/historial-page/filter/filter.selector";

import * as fromHistorialActions from "../../store/historial-page/historial/historial.action";

@Component({
  selector: "app-table-historial",
  templateUrl: "./table-historial.component.html",
  styleUrls: ["./table-historial.component.scss"],
})
export class TableHistorialComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}
  isLoading;
  historial: any;
  type: string;
  found: boolean;

  ngOnInit(): void {
    this.store
      .select(SELECT_IS_LOADING)
      .subscribe((loading) => (this.isLoading = loading));
    this.store
      .select(SELECT_HISTORIAL)
      .subscribe((result) => (this.historial = result));
    this.store
      .select(SELECT_TYPE_MATERIAL)
      .subscribe((type) => (this.type = type));
    this.store
      .select(SELECT_RESULT_LOT_FOUND)
      .subscribe((found) => (this.found = found));
  }
}
