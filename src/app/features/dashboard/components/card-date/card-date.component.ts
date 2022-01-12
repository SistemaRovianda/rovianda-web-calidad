import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import { filterLoadDates } from "../../store/historial-page/filter/filter.action";
import moment from "moment";

@Component({
  selector: "app-card-date",
  templateUrl: "./card-date.component.html",
  styleUrls: ["./card-date.component.scss"],
})
export class CardDateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    this.form = this.fb.group({
      dateIni: ["", Validators.required],
      dateFinal: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((o) => {
      if (this.form.valid) {
        this.store.dispatch(
          filterLoadDates({
            dateFinal: moment(this.dateFinal.value).format("YYYY-MM-DD"),
            dateIni: moment(this.dateIni.value).format("YYYY-MM-DD"),
          })
        );
      }
    });
  }

  get dateIni() {
    return this.form.get("dateIni");
  }
  get dateFinal() {
    return this.form.get("dateFinal");
  }
}
