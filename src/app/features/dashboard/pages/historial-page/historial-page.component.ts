import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import * as fromActionsFilter from "../../store/historial-page/filter/filter.action";
import { TypeHistorial } from "src/app/shared/models/type-historial.interface";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { filter } from "rxjs/operators";
import { MatDatepickerInputEvent, MatDialog } from "@angular/material";
import { TableReceptionsComponent } from "../../components/table-receptions/table-receptions.component";

@Component({
  selector: "app-historial-page",
  templateUrl: "./historial-page.component.html",
  styleUrls: ["./historial-page.component.scss"],
})
export class HistorialPageComponent implements OnInit {
  filter: FormGroup;

  dateSelected:string=null;
  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder,
    private dialog:MatDialog
  ) {
    this.filter = this.fb.group({
      option: ["", [Validators.required]],
      search: ["",[Validators.required]],
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
      this.dialog.open(TableReceptionsComponent,{data:{lotId: this.search.value,date:this.dateSelected,type: this.option.value },disableClose:true,width:"800px"});  
    } 
  }

  get option() {
    return this.filter.get("option");
  }

  get search() {
    return this.filter.get("search");
  }

  changeDate(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    let date=event.value;
    let day = date.getDate()<10?'0'+date.getDate():date.getDate();
    let month = (date.getMonth()+1).toString()
    let dateStr=date.getFullYear()+"-"+(+month<10?'0'+month:month)+"-"+day;
    this.dateSelected=dateStr;
  }
}
