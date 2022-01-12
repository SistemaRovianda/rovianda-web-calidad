import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EntranceOutputPackingFromOven, EntranceOutputsOven, OutputsByEntrance, ProcessFormulation, ReceptionMaterialInterface } from 'src/app/shared/models/reception-materials.interface';
import { HistorialService } from 'src/app/shared/Services/historial.service';
import { ModalSelectFormatComponent } from '../modal-select-format/modal-select-format.component';

@Component({
  selector: 'app-table-receptions-filter',
  templateUrl: './table-receptions-filter.component.html',
  styleUrls: ['./table-receptions-filter.component.scss']
})
export class TableReceptionsFilterComponent implements OnInit {

  constructor(private roviandaApiService:HistorialService,private dialog:MatDialog) { }
  @Input("_products") set _products(products:string[]){
    console.log("Asignando productos");
    this.products=products;
  }

  typeFilter:string="";

  @Input("_typeFilter") set _typeFilter(typeFilter:string){
    this.typeFilter=typeFilter;
  }

  @Input("_receptions") set _receptions(receptions:ReceptionMaterialInterface[]){
    this.rows=receptions.map(x=>{
      x.pageIndex=0;
      x.totalFormulations=0;
      x.pageIndexProcess=0;
      x.totalProcess=0;
      x.pageIndexOvens=0;
      x.totalOvens=0;
      x.pageIndexProductEnded=0;
      x.totalProductEnded=0;
      return x;
    });
  }
  @Output("_entrance") entrance:EventEmitter<{entranceId:number,type:string}> = new EventEmitter();

  @Input("_isLoading") set _isLoading(isLoading:boolean){
      this.isLoading=isLoading;
  }

  @Output("setLoading") setLoading:EventEmitter<boolean> = new EventEmitter();

  process:ProcessFormulation[]=[];
  ovens:EntranceOutputsOven[]=[];
  productsEnded:EntranceOutputPackingFromOven[]=[];
  isLoading:boolean=false;

  products:string[]=[];
  form:FormGroup;
  outputsToFormulations:OutputsByEntrance[]=[];
  rows:ReceptionMaterialInterface[]=[
    // {
    //   date:"2021-07-01",
    //   provider:"Grangas Carroll de Mexico",
    //   productName:"Papada",
    //   lotIntern: "4",
    //   lotProvider:"3",
    //   evidence:"https://storage.googleapis.com/sistema-rovianda.appspot.com/2021-07-12/26/3750cafb-9600-4edc-a285-8997e5c5a4a6.jpg",
    //   desplegated:false,
    //   area:"Calidad",
    //   qualityInspector:"Jose Ignacio Colohua Reyes",
    //   propertiesEvaluated:[
    //     {
    //       accepted: true,
    //       observations: "Se observo",
    //       property:"peso",
    //       value:"12.5"
    //     },
    //     {
    //       accepted: true,
    //       observations:"se observo2",
    //       property: "color"
    //     },
    //     {
    //       accepted:true,
    //       observations: "se guardo en enfriador",
    //       fridge:"Enfriador 14.2",
    //       property: "enfriador"
    //     }
    //   ] 
    // }
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      product: new FormControl(null,Validators.required)
    });
  }
  parseDateStr(date:string){
    let dateSplited = date.split("-");
    return `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
  }
  get product(){
    return this.form.get("product");
  }

  getOutputsToFormulation(entranceId:number,pageIndex:number,type:string,totalFormulations:number){
    if(!((pageIndex*10)>totalFormulations)){
    if(type=="next"){
      pageIndex+=1;
    }else if(type=="previous" && pageIndex==0){
      pageIndex=0;
    }else if(type=="previous"){
      pageIndex-=1;
    }
    if(!this.isLoading){
      this.setLoading.emit(true);
      this.roviandaApiService.getOutputsToFormulations(entranceId,pageIndex,10,this.typeFilter).subscribe((outputsToFormulation)=>{
        for(let row of this.rows){
          if(row.entranceId==entranceId){
            row.outputsToFormulation=[...outputsToFormulation.items];
            row.totalFormulations=outputsToFormulation.count;
            row.pageIndex=pageIndex;
          }
        }
        this.setLoading.emit(false);
      },(err)=>{
        this.setLoading.emit(false);
      })
    }
  }
  }

  @Output("productSelected") emiter:EventEmitter<string>= new EventEmitter();
  searchReceptions(){
    if(this.form.valid){
      this.emiter.emit(this.product.value);
    }
  }

  downLoadReport(entranceId:number,type:string){
    this.entrance.emit({entranceId,type});
  }

  singleFormulationSelection:boolean=false;
  selectFormulationProcess(pageIndex:number,entranceId:number,formulation?:OutputsByEntrance){
    if(!this.isLoading){
      
      this.setLoading.emit(true);
      let request:any={};
      if(formulation){
        request.formulationId=formulation.id;
        this.singleFormulationSelection=true;
        request.type=this.typeFilter;
      }else if(pageIndex!=null && entranceId!=null){
        request.page=pageIndex;
        request.perPage=10;
        request.entranceId= entranceId;
        this.singleFormulationSelection=false;
        request.type=this.typeFilter;
      }
      this.roviandaApiService.getProcessByFormulation(request).subscribe((process)=>{
        this.process=process.items;
        for(let row of this.rows){
          if(row.entranceId==entranceId){
            row.totalProcess=process.count;
            row.pageIndexProcess=pageIndex;
          }
        }
        this.setLoading.emit(false);
      },(err)=>{
        this.setLoading.emit(false);
      });
    }
  }


  getProcessOfEntranceId(entranceId:number,pageIndex:number,type:string,totalProcess:number){
    if(!this.singleFormulationSelection){
      let toDo=true;
    if(type=="next"){
      if((pageIndex+1)*10>totalProcess){
        toDo=false;
      }else{
        pageIndex+=1;
      }
    }else if(type=="previous" && pageIndex==0){
      pageIndex=0;
    }else if(type=="previous"){
      pageIndex-=1;
    }
    if(!this.isLoading && toDo){
      this.setLoading.emit(true);
      this.roviandaApiService.getProcessByFormulation({entranceId,page:pageIndex,perPage:10}).subscribe((process)=>{
        this.process=process.items;
        for(let row of this.rows){
          if(row.entranceId==entranceId){
            row.totalProcess=process.count;
            row.pageIndexProcess=pageIndex;
          }
        }

        this.setLoading.emit(false);
      },(err)=>{
        this.setLoading.emit(false);
      })
    }
  }
}

  getOvenByProcessId(processId:number,pageIndex:number,entranceId:number,totalOvens:number){
    if(!this.isLoading){
      this.setLoading.emit(true);
      if(processId!=null){
        this.roviandaApiService.getOvensByProcess({processId,type:this.typeFilter}).subscribe((ovens)=>{
          this.setLoading.emit(false);
          this.ovens=ovens.items;
          for(let row of this.rows){
            if(row.entranceId==entranceId){
              row.totalOvens=ovens.count;
              row.pageIndexOvens=pageIndex;
            }
          }
        },(err)=>{
          this.setLoading.emit(false);
        });
      }else if(pageIndex!=null && entranceId!=null){
        if(pageIndex>=0 && (pageIndex*10)<=totalOvens){
          this.roviandaApiService.getOvensByProcess({perPage:10,page:pageIndex,entranceId,type:this.typeFilter}).subscribe((ovens)=>{
            this.ovens =ovens.items;
            this.setLoading.emit(false);
            for(let row of this.rows){
              if(row.entranceId==entranceId){
                row.totalOvens=ovens.count;
                console.log("Ovens a asignar:" +row.totalOvens +" - "+ovens.count );
                row.pageIndexOvens=pageIndex;
              }
            }
          },(err)=>{
            this.setLoading.emit(false);
          });
        }else{
          this.setLoading.emit(false);
        }
      }
    }
  }

  getPackingByOven(ovenId:number,pageIndex:number,entranceId:number,totalProductsEnded:number){
    if(!this.isLoading){
      this.setLoading.emit(true);
      if(ovenId!=null){
        this.roviandaApiService.getPackingByOven({ovenId,type:this.typeFilter}).subscribe((productsEnded)=>{
          this.setLoading.emit(false);
          this.productsEnded=productsEnded.items;
          for(let row of this.rows){
            if(row.entranceId==entranceId){
              row.totalProductEnded=productsEnded.count;
              row.pageIndexProductEnded=pageIndex;
            }
          }
        },(err)=>{
          this.setLoading.emit(false);
        });
      }else if(pageIndex!=null && entranceId!=null){
        if(pageIndex>=0 && (pageIndex*10)<=totalProductsEnded){
          this.roviandaApiService.getPackingByOven({perPage:10,page:pageIndex,entranceId,type:this.typeFilter}).subscribe((productsEnded)=>{
            this.productsEnded =productsEnded.items;
            this.setLoading.emit(false);
            for(let row of this.rows){
              if(row.entranceId==entranceId){
                row.totalProductEnded=productsEnded.count;
                console.log("Ovens a asignar:" +row.totalProductEnded +" - "+productsEnded.count );
                row.pageIndexProductEnded=pageIndex;
              }
            }
          },(err)=>{
            this.setLoading.emit(false);
          });
        }else{
          this.setLoading.emit(false);
        }
      }
    }
  }

  getReportFormulation(formulationId:number){
    if(!this.isLoading){
      this.setLoading.emit(true);
      this.roviandaApiService.getReportFormulationTrazability(formulationId).subscribe((response)=>{
        this.setLoading.emit(false);
        this.openReport(response);
      },(err)=>{
        this.setLoading.emit(false);
      })
    }
  }
  getReportProcess(processId:number){
    if(!this.isLoading){
      this.setLoading.emit(true);
      this.roviandaApiService.getReportProcessTrazability(processId).subscribe((response)=>{
        this.setLoading.emit(false);
        this.openReport(response);
      },(err)=>{
        this.setLoading.emit(false);
      })
    }
  }
  getReportOven(ovenId:number){
    if(!this.isLoading){
      this.setLoading.emit(true);
      this.roviandaApiService.getReportOvenTrazability(ovenId).subscribe((response)=>{
        this.setLoading.emit(false);
        this.openReport(response);
      },(err)=>{
        this.setLoading.emit(false);
      })
    }
  }
  getReportPackaging(packagingId:number){
    if(!this.isLoading){
      this.setLoading.emit(true);
      this.roviandaApiService.getReportPackagingTrazability(packagingId).subscribe((response)=>{
        this.setLoading.emit(false);
        this.openReport(response);
      },(err)=>{
        this.setLoading.emit(false);
      })
    }
  }

  downLoadReportProductEnded(packId:number){
    
      this.dialog.open(ModalSelectFormatComponent,{
        data: {
          packId,
          type: 1
        }
      })
     
    
    // if(!this.isLoading){
    //   this.setLoading.emit(true);
    //   this.roviandaApiService.getReportHistoryTrazability(packId).subscribe((blob)=>{
    //     this.openReport(blob);
    //     this.setLoading.emit(false);
    //   },(err)=>{
    //     this.setLoading.emit(false);
    //   })
    // } 
  }

  openReport(response:any){
    let file = new Blob([response], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }

}
