import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import * as fromActionsFilter from "../../store/historial-page/filter/filter.action";

@Component({
  selector: "app-historial-page",
  templateUrl: "./historial-page.component.html",
  styleUrls: ["./historial-page.component.scss"]
})
export class HistorialPageComponent implements OnInit {
  constructor(private store: Store<AppStateInterface>) {}

  ngOnInit(): void {}


  loadFilter(filter) {
    this.store.dispatch(fromActionsFilter.filterLoad({ filter: filter.toLowerCase() }));
    this.store.dispatch(fromActionsFilter.filteredOut({ isFiltered: false }));
  }
  filter() {
    this.store.dispatch(fromActionsFilter.filteredOut({ isFiltered: true }));
  }
}
