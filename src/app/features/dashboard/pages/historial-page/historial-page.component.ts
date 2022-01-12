import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import * as fromActionsFilter from "../../store/historial-page/filter/filter.action";
import { TypeHistorial } from "src/app/shared/models/type-historial.interface";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { filter } from "rxjs/operators";

import { TableReceptionsComponent } from "../../components/table-receptions/table-receptions.component";
import { MatDialog } from "@angular/material/dialog";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { HistorialService } from "src/app/shared/Services/historial.service";
import { EntranceOutputPackingFromOven, ReceptionMaterialInterface } from "src/app/shared/models/reception-materials.interface";
import { ModalSelectFormatComponent } from "../../components/modal-select-format/modal-select-format.component";

@Component({
  selector: "app-historial-page",
  templateUrl: "./historial-page.component.html",
  styleUrls: ["./historial-page.component.scss"],
})
export class HistorialPageComponent implements OnInit {
  form: FormGroup;

  dateSelected:string=null;
  productsEnded:EntranceOutputPackingFromOven[]=[];
  pageIndexProductEnded=0;
  totalProductEnded=0;
  constructor(
    private store: Store<AppStateInterface>,
    private fb: FormBuilder,
    private dialog:MatDialog,
    private historyService:HistorialService
  ) {
    this.form = this.fb.group({
      product: ["", [Validators.required]],
    });
  }


  isLoading:boolean=false;
  ngOnInit(): void {}



  get product() {
    return this.form.get("product");
  }


  changeDate(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(`${type}: ${event.value}`);
    let date=event.value;
    let day = date.getDate()<10?'0'+date.getDate():date.getDate();
    let month = (date.getMonth()+1).toString()
    let dateStr=date.getFullYear()+"-"+(+month<10?'0'+month:month)+"-"+day;
    this.dateSelected=dateStr;
  }
  typeFilter:string="";
  products:string[]=[];
  currentRequest:{lot:string,type:string,dateStart:string,dateEnd:string};
  lotSelected:string="";
  dateStartSelected:string="";
  dateEndSelected:string="";
  searchProductsBylotAndDate(event:any){
    if(!this.isLoading){
      this.currentRequest={...event};
      this.isLoading=true;
      this.typeFilter=event.type;
      this.lotSelected=event.lot;
      this.dateStartSelected=event.dateStart;
      this.dateEndSelected=event.dateEndSelected;
      this.historyService.getProductsByLotAndDate(event.lot,event.type,event.dateStart,event.dateEnd).subscribe((results)=>{
        this.products=results;
        this.isLoading=false;
      },(err)=>{
        this.products=[];
        this.isLoading=false;
      });
    }
  }

  getProductEndedHistory(){
    if(!this.isLoading){
      if(this.form.valid){
        this.isLoading=true;
        this.historyService.getProductEndedHistory(this.pageIndexProductEnded,10,this.lotSelected,this.product.value,this.dateStartSelected,this.dateEndSelected).subscribe((products)=>{
          this.productsEnded=products.items;
          this.totalProductEnded=products.count;
          this.isLoading=false;
        },(err)=>{
          this.isLoading=false;
        })
      }
    }
    
  }
  receptions:ReceptionMaterialInterface[]=[];


  searchProductSelected(event:any){
      if(!this.isLoading){
        this.isLoading=true;
        this.historyService.getReceptionsOfProduct(this.currentRequest.lot,this.currentRequest.type,this.currentRequest.dateStart,this.currentRequest.dateEnd,event).subscribe((receptions)=>{
          this.receptions=receptions;
          this.isLoading=false;
        },(err)=>{
          this.receptions=[];
          this.isLoading=false;
        })
      };
  }

  getReportEntrance(event:{entranceId:number,type:string}){
    if(!this.isLoading){
      if(this.currentRequest.type=="MEAT"){
        if(event.type=="pdf"){
          this.isLoading=true;
          this.historyService.getReportOfReceptionMeat(event.entranceId).subscribe((response)=>{
              this.openReport(response);
              this.isLoading=false;
          },(err)=>{
            this.isLoading=false;
          });
        }else{
          this.isLoading=true;
          this.historyService.getReportExcelOfReceptionMeat(event.entranceId).subscribe((response)=>{
              this.downloadFile(response);
              this.isLoading=false;
          },(err)=>{
            this.isLoading=false;
          });
        }
      }else if(this.currentRequest.type=="DRIEF"){
        if(event.type=="pdf"){
          this.isLoading=true;
          this.historyService.getReportOfReceptionDrief(event.entranceId).subscribe((response)=>{
            this.openReport(response);
            this.isLoading=false;
        },(err)=>{
          this.isLoading=false;
        });
      }
        else{
          this.isLoading=true;
          this.historyService.getReportExcelOfReceptionDrief(event.entranceId).subscribe((response)=>{
            this.downloadFile(response);
            this.isLoading=false;
        },(err)=>{
          this.isLoading=false;
        });
        }
      }
  }
  }

  setLoading(loading:boolean){
    this.isLoading=loading;
  }


  downLoadReportProductEnded(packId:number){
    this.dialog.open(ModalSelectFormatComponent,{
      data: {
        packId,
        type: 1
      }
    })
   
  }

  

  openReport(response:any){
    let file = new Blob([response], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }
  downloadFile(data: any){
    var url = window.URL.createObjectURL(new Blob([data]));
     var a = document.createElement('a');
     document.body.appendChild(a);
     a.setAttribute('style', 'display: none');
     a.href = url;
     a.download = `Entrada.xlsx`;
     a.click();
     window.URL.revokeObjectURL(url);
     a.remove(); // remove the element
   }
}
