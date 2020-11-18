import { Component, OnInit, Input } from "@angular/core";
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: "history-list",
  templateUrl: "./history-list.component.html",
  styleUrls: ["./history-list.component.scss"]
})
export class HistoryListComponent implements OnInit {
  public _meat:any=null;

  displayedColumnsOutputs:string[]=['number','name','date','quantity']
  displayedColumnInputs:string[]=['number','receive','weigth','date']
  displayedColumnFormulations:string[]=['number','lotDay','product','temp','elaborated']
  displayedColumnProcess:string[]=['number','lotDay','product','lastProcess','dateStart','dateEnd']
  displayedColumnOven:string[]=['number','lotDay','product','hour','oven','revisions'];
  displayedColumnPacking:string[]=['number','date','product','lotDay','presentation','quantity','weight']
  outputs:any[]=[];
  inputs:any[]=[];
  formulations:any[]=[];
  process:any[]=[];
  ovens:any[]=[];
  packing:any[]=[];
  datasourceOutputs:MatTableDataSource<any>;
  datasourceInputs:MatTableDataSource<any>;
  datasourceFormulations:MatTableDataSource<any>;
  datasourceProcess:MatTableDataSource<any>;
  datasourceOven:MatTableDataSource<any>;
  datasourcePacking:MatTableDataSource<any>;
  @Input() public set meat(val: any){
    if(val){
    this._meat=val;
    console.log(this._meat);
    if(this._meat.outputs && this._meat.outputs.length){
      this.outputs=this._meat.outputs;
      this.resetTable();
    }
    if(this._meat.entranceMeat && this._meat.entranceMeat.length){
      this.inputs=this._meat.entranceMeat;
      this.resetTable();
    }

    if(this._meat.formulation && this._meat.formulation.length){
      this.formulations=this._meat.formulation;
      this.resetTable();
    }
    if(this._meat.process && this._meat.process.length){
      this.process=this._meat.process;
      this.resetTable();
    }

    if(this._meat.oven && this._meat.oven.length){
      this.ovens=this._meat.oven;
      this.resetTable();
    }

    if(this._meat.packingDate && this._meat.packingDate.length){
      this.packing=[];
      this._meat.packingDate.map((x)=>{
        for(let output of x.properties){
          this.packing.push({
            date: x.date,
            product:output.product,
            lotDay:x.newLot,
            presentation: output.presentation,
            quantity: output.quantity,
            weight: output.weight
          })
        }
      });
      this.resetTable();
    }
  }
    
  }

  constructor() {
    this.datasourceOutputs=new MatTableDataSource();
    this.datasourceInputs= new MatTableDataSource();
    this.datasourceFormulations= new MatTableDataSource();
    this.datasourceProcess= new MatTableDataSource();
    this.datasourceOven = new MatTableDataSource();
    this.datasourcePacking= new MatTableDataSource();
  }

  ngOnInit() {}

  resetTable(){
    this.datasourceOutputs.data=this.outputs;
    this.datasourceInputs.data=this.inputs;
    this.datasourceFormulations.data=this.formulations;
    this.datasourceProcess.data=this.process;
    this.datasourceOven.data=this.ovens;
    this.datasourcePacking.data=this.packing;
  }
}
