import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import * as fromActionsFilter from "../../store/historial-page/filter/filter.action";
import { TypeHistorial } from "src/app/shared/models/type-historial.interface";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-historial-page",
  templateUrl: "./historial-page.component.html",
  styleUrls: ["./historial-page.component.scss"],
})
export class HistorialPageComponent implements OnInit {
  filter: FormGroup;

  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder
  ) {
    this.filter = this.fb.group({
      option: ["", [Validators.required]],
      search: [""],
    });
  }

  options: TypeHistorial[] = [
    { name: "Carnicos", value: "meat" },
    { name: "Secos", value: "drief" },
    { name: "Empaques", value: "packaging" },
  ];

  ngOnInit(): void {}

  selectType() {
    this.store.dispatch(
      fromActionsFilter.filterSelectMAterial({
        typeMaterial: this.option.value,
      })
    );
  
  }

  searchElement() {
    if (this.option.value !== "") {
      this.store.dispatch(
        fromActionsFilter.filterSearchLot({ lot: this.search.value })
      );
    }
  }

  get option() {
    return this.filter.get("option");
  }

  get search() {
    return this.filter.get("search");
  }
}
