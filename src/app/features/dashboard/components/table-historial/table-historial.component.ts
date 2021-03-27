import { Component, OnInit } from "@angular/core";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { Store } from "@ngrx/store";
import {
  SELECT_HISTORIAL_LOADING,
  SELECT_ENTRANCES,
  SELECT_GENERATE_HISTORIAL,
  SELECT_COOLING,
  SELECT_OUTPUTS_COOLING,
  SELECT_OUTPUTS_FORMULATIONS,
  SELECT_OUTPUTS_PROCESS,
  SELECT_OUTPUTS_OVEN,
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
  entrances: any;
  cooling: any;
  outputsCooling: any;
  formulations: any;
  process:any;
  oven:any;
  type: string;
  found: boolean;

  ngOnInit(): void {
    this.store
      .select(SELECT_IS_LOADING)
      .subscribe((loading) => {
        console.log("Loading:"+loading);
        this.isLoading = loading;});
    this.store
      .select(SELECT_ENTRANCES)
      .subscribe((result) => 
        {
          console.log("Result Historial Entrances:"+result);
          this.entrances = result;
        });

        this.store
      .select(SELECT_COOLING)
      .subscribe((result) => 
        {
          console.log("Result Historial Cooling:"+result);
          this.cooling = result;
        });

        this.store
        .select(SELECT_OUTPUTS_COOLING)
        .subscribe((result) => 
          {
            console.log("Result Historial Outputs Cooling:"+result);
            this.outputsCooling = result;
          });   
          
          
        this.store
        .select(SELECT_OUTPUTS_FORMULATIONS)
        .subscribe((result) => 
          {
            console.log("Result Historial Outputs Cooling:"+result);
            this.formulations = result;
          });   

          this.store
        .select(SELECT_OUTPUTS_PROCESS)
        .subscribe((result) => 
          {
            console.log("Result Historial Outputs Cooling:"+result);
            this.process = result;
          });   

          this.store
        .select(SELECT_OUTPUTS_OVEN)
        .subscribe((result) => 
          {
            console.log("Result Historial Outputs Cooling:"+result);
            this.oven = result;
          });   
    this.store
      .select(SELECT_TYPE_MATERIAL)
      .subscribe((type) => {
        this.type = type;
        console.log("Type:"+type);
      });
    this.store
      .select(SELECT_RESULT_LOT_FOUND)
      .subscribe((found) => {
        this.found = found;
        console.log("Founded:"+found);
      });
  }
}
