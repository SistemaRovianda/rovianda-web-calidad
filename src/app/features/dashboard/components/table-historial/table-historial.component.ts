import { Component, OnInit } from "@angular/core";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import {
  SELECT_HISTORIAL_LOADING,
  SELECT_HISTORIAL,
  SELECT_GENERATE_HISTORIAL
} from "../../store/historial-page/historial/historial.selector";
import { HistorialInterface } from "src/app/shared/models/historial.interface";
import {
  SELECT_STATE_FILTER,
  SELECT_IS_FILTER
} from "../../store/historial-page/filter/filter.selector";

import * as fromHistorialActions from "../../store/historial-page/historial/historial.action";

@Component({
  selector: "app-table-historial",
  templateUrl: "./table-historial.component.html",
  styleUrls: ["./table-historial.component.scss"]
})
export class TableHistorialComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}
  isLoading;
  historial: HistorialInterface[];
  filter: string;
  isfilter;
  isDownloadHistorial;

  ngOnInit(): void {
    this.store
      .select(SELECT_HISTORIAL_LOADING)
      .subscribe(loading => (this.isLoading = loading));
    this.store
      .select(SELECT_STATE_FILTER)
      .subscribe(tempFilter => (this.filter = tempFilter));
    this.store.select(SELECT_IS_FILTER).subscribe(tempIsFilter => {
      this.isfilter = tempIsFilter;
      this.historialFilter();
    });
    this.store
      .select(SELECT_GENERATE_HISTORIAL)
      .subscribe(tempDownload => (this.isDownloadHistorial = tempDownload));
  }

  historialFilter() {
    this.store.select(SELECT_HISTORIAL).subscribe(tempHistorial => {
      if (this.isfilter) {
        this.historial = tempHistorial.filter(temp =>
          temp.stateHistorial.toLowerCase().includes(this.filter)
        );
      } else {
        this.historial = tempHistorial;
      }
    });
  }

  downloadHistorial() {
    console.log(this.historial);
    this.store.dispatch(
      fromHistorialActions.downloadHistorial({ historial: this.historial })
    );
  }
}
