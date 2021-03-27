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
  displayedColumnEntrances:string[]=['number','receive','rawMaterial','weigth','date']
  displayedColumnFormulations:string[]=['number','lotDay','product','temp','elaborated']
  displayedColumnProcess:string[]=['number','lotDay','product','lastProcess','dateStart','dateEnd']
  displayedColumnOven:string[]=['number','date','lotDay','product','hour','oven','revisions'];
  displayedColumnPacking:string[]=['number','date','product','lotDay','presentation','quantity','weight']

  _outputs:any[]=[];
  _cooling:any[]=[];
  _entrances:any=null;
  _formulations:any[]=[];
  _process:any[]=[];
  _ovens:any[]=[];
  _packing:any[]=[];

  datasourceOutputs:MatTableDataSource<any>;
  datasourceEntrances:MatTableDataSource<any>;
  datasourceFormulations:MatTableDataSource<any>;
  datasourceProcess:MatTableDataSource<any>;
  datasourceOven:MatTableDataSource<any>;
  datasourcePacking:MatTableDataSource<any>;

  @Input() public set entrances(val:any){
    if(val){
      if(val.entranceMeat){
        this._entrances=val.entranceMeat;
        this.resetTable();
      }
    }
  }
  @Input() public set cooling(val:any){
    if(val && val.fridge && val.fridge.length){
        this._cooling=val.fridge;
        this.resetTable();
    }
  }

  @Input() public set outputsCooling(val:any){
    if(val && val.outputs && val.outputs.length){
        this._outputs=val.outputs;
        this.resetTable();
    }
  }

  @Input() public set formulations(val:any){
    if(val && val.formulation && val.formulation.length){
        this._formulations=val.formulation;
        this.resetTable();
    }
  }
  @Input() public set process(val:any){
    if(val && val.process && val.process.length){
        this._process=val.process;
        this.resetTable();
    }
  }
  @Input() public set oven(val:any){
    if(val && val.oven && val.oven.length){
        this._ovens=val.oven;
        this.resetTable();
    }
  }

  @Input() public set meat(val: any){
    
    if(val){
      let keys = Object.keys(val);
      if(this._meat==null){
        this._meat={};
      }
      let keysMeat = Object.keys(this._meat);
      if(keysMeat.length<keys.length){
        if(this._meat!=null){
          this._meat={...this._meat,...val};
        }else{
          this.meat=val;
        }
      console.log("Meat Received:",this._meat);
      if(this._meat.outputs && this._meat.outputs.length){
        this._outputs=this._meat.outputs;
        this.resetTable();
      }

      if(this._meat.formulation && this._meat.formulation.length){
        this._formulations=this._meat.formulation;
        this.resetTable();
      }
      if(this._meat.process && this._meat.process.length){
        this._process=this._meat.process;
        this.resetTable();
      }

      if(this._meat.oven && this._meat.oven.length){
        this._ovens=this._meat.oven;
        this.resetTable();
      }

      if(this._meat.packingDate && this._meat.packingDate.length){
        this._packing=[];
        this._meat.packingDate.map((x)=>{
          for(let output of x.properties){
            this._packing.push({
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
  }

  constructor() {
    this.datasourceOutputs=new MatTableDataSource();
    this.datasourceEntrances= new MatTableDataSource();
    this.datasourceFormulations= new MatTableDataSource();
    this.datasourceProcess= new MatTableDataSource();
    this.datasourceOven = new MatTableDataSource();
    this.datasourcePacking= new MatTableDataSource();
  }

  ngOnInit() {}

  resetTable(){
    this.datasourceOutputs.data=this._outputs;
    this.datasourceEntrances.data=this._entrances;
    this.datasourceFormulations.data=this._formulations;
    this.datasourceProcess.data=this._process;
    this.datasourceOven.data=this._ovens;
    this.datasourcePacking.data=this._packing;
  }
}
