import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BREAKPOINT } from '@angular/flex-layout';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BrowserStack } from 'protractor/built/driverProviders';
import { FridgeInterface } from 'src/app/shared/models/fridge.interface';
import { DeliveryToSeller, DeliveryToSellerRequest, DevolutionListItemInterface, InventoryItem, InventoryItemEdit, InventoryItemRequest, InventoryTypeQuality, OutputsOfWarehouse, OvensInventory, ProcessInventory, ProductEndedIventory } from 'src/app/shared/models/inventory.interface';
import { EntranceOutputsOven, OutputsByEntrance, ProcessFormulation } from 'src/app/shared/models/reception-materials.interface';
import { HistorialService } from 'src/app/shared/Services/historial.service';
import { PlantService } from 'src/app/shared/Services/plant.service';
import { ModalConfirmEditionComponent } from '../../components/modal-confirm-edition/modal-confirm-edition.component';
import { Clipboard } from '@angular/cdk/clipboard';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  
  constructor(private plantService:PlantService,private historyApiService:HistorialService,
    private dialog:MatDialog,private clipboard: Clipboard) { 
  
  }

  sellers:{name:string,id:string}[]=[];

  
  inventory:InventoryItemEdit[]=[];
  isLoading:boolean=false;
  fridges:FridgeInterface[]=[];
  inventoryMeat:InventoryTypeQuality[]=[];
  inventoryDrief:InventoryTypeQuality[]=[];
  inventoryPacking:InventoryTypeQuality[]=[];
  outputsWarehouses:OutputsOfWarehouse[]=[];
  formulations:OutputsByEntrance[]=[];
  process:ProcessInventory[]=[];
  ovens:OvensInventory[]=[];
  productsEnded:ProductEndedIventory[]=[];
  productDelivered:DeliveryToSeller[]=[];
  productDevolution:DevolutionListItemInterface[]=[];
  form:FormGroup;
  section=0;
  startDateStr:string="";
  endDateStr:string="";
  autorizeToModified=false;
  get startDate(){
    return this.form.get("startDate");
  }
  get endDate(){
    return this.form.get("endDate");
  }
  get lot(){
    return this.form.get("lot");
  }
  get type(){
    return this.form.get("type");
  }
  get seller(){
    return this.form.get("seller");
  }

  
  form3:FormGroup;
  formProductEnded:FormGroup;
  get typeTableProductDelivered(){
    return this.form3.get("typeTableProductDelivered");
  }
  get typeTableProductEnded(){
    return this.formProductEnded.get("typeTableProductEnded");
  }
  ngOnInit(): void {
    this.formProductEnded= new FormGroup({
      typeTableProductEnded: new FormControl("ACUMULATED")
    });
    this.plantService.getAllFridges().subscribe((fridges:FridgeInterface[])=>{
      this.fridges=fridges; 
    })
    this.form = new FormGroup({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      lot: new FormControl(null),
      type: new FormControl(null,Validators.required),
      seller: new FormControl(null,Validators.required)
    });
    this.type.valueChanges.subscribe(()=>{
      this.outputsWarehouses=[];
    });
    this.seller.valueChanges.subscribe((value)=>{
      console.log("Seller selected: "+value);
      if(value=="TODOS"){
        this.sellersSelected=[];
      }else{
        this.sellersSelected=[value];
      }
    });
    this.form3 = new FormGroup({
      typeTableProductDelivered: new FormControl("ACCUMULATED",Validators.required)
    });
    this.typeTableProductDelivered.valueChanges.subscribe((value)=>{
      this.productDelivered=[];
    })
    //this.reloadTable();
    //this.getType(0);
    let date:Date = new Date();
    this.startDateStr = this.parseDate(date);
    this.endDateStr = this.parseDate(date);
    this.historyApiService.getAllSellers().subscribe((sellers)=>{
      this.sellers=sellers;
      this.sellers.push({name:"TODOS",id:"TODOS"});
    });
    this.typeTableProductEnded.valueChanges.subscribe((valueChanges)=>{
      this.productsEnded=[];
    })
  }
  sellersSelected:string[]=[];
  pageIndexMeat:number=0;
  pageTotalMeat:number=0;
  pageIndexDrief:number=0;
  pageTotalDrief:number=0;
  pageIndexPacking:number=0;
  pageTotalPacking:number=0;
  pageIndexOutputs:number=0;
  pageTotalOutputs:number=0;
  pageIndexFormulation:number=0;
  pageTotalFormulation:number=0;
  pageIndexProcess:number=0;
  pageTotalProcess:number=0;
  pageIndexOvens:number=0;
  pageTotalOvens:number=0;
  pageIndexProductEnded:number=0;
  pageTotalProductEnded:number=0;
  pageIndexProductDelivered:number=0;
  pageTotalProductDelivered:number=0;
  pageIndexProductDevolution:number=0;
  pageTotalProductDevolution:number=0;
  searchInventory(){
    switch(this.section){
        case 0:
            if(!this.isLoading){
              this.isLoading=true;
          
            let startDate= (this.startDate.value)?this.parseDate(this.startDate.value):null;
            let endDate = (this.endDate.value)?this.parseDate(this.endDate.value):null;
          
              this.historyApiService.getInventoryByDateAndType(this.pageIndexMeat,10,startDate,endDate,this.form.get("lot").value,"MEAT").subscribe((response:HttpResponse<InventoryTypeQuality[]>)=>{
                  this.isLoading=false;
                  this.inventoryMeat=response.body;
                  this.inventoryMeat.forEach(x=>{
                    x.isEditing=false;
                    x.lotProviderTemp=x.lotProvider;
                    x.quantityTemp=x.quantity;
                    x.statusTemp=x.status=='OPENED'?'OPENED':'CLOSED';
                    x.fridgeIdTemp=x.fridgeId;
                    x.lotInternTemp=x.lotIntern;
                    x.isLoading=false;
                  });
                  this.pageTotalMeat=+response.headers.get("x-total-count");
              },(err)=>{
                this.isLoading=false;
              });
            }
          break;
        case 1:
            if(!this.isLoading){
              this.isLoading=true;  
              let startDate= (this.startDate.value)?this.parseDate(this.startDate.value):null;
              let endDate = (this.endDate.value)?this.parseDate(this.endDate.value):null;
                this.historyApiService.getInventoryByDateAndType(this.pageIndexDrief,10,startDate,endDate,this.form.get("lot").value,"DRIEF").subscribe((response:HttpResponse<InventoryTypeQuality[]>)=>{
                  this.isLoading=false;
                    this.inventoryDrief=response.body;
                    this.inventoryDrief.forEach(x=>{
                      x.isEditing=false;
                      x.lotProviderTemp=x.lotProvider;
                      x.quantityTemp=x.quantity;
                      x.statusTemp=x.status=='OPENED'?'OPENED':'CLOSED';
                    });
                    this.pageTotalDrief=+response.headers.get("x-total-count");
                },(err)=>{
                  this.isLoading=false;
                });
            }
          break;
        case 2:
            if(!this.isLoading){
              this.isLoading=true;  
              let startDate= (this.startDate.value)?this.parseDate(this.startDate.value):null;
              let endDate = (this.endDate.value)?this.parseDate(this.endDate.value):null;
                this.historyApiService.getInventoryByDateAndType(this.pageIndexPacking,10,startDate,endDate,this.form.get("lot").value,"PACKING").subscribe((response:HttpResponse<InventoryTypeQuality[]>)=>{
                  this.isLoading=false;
                    this.inventoryPacking=response.body;
                    this.inventoryPacking.forEach(x=>{
                      x.isEditing=false;
                      x.lotProviderTemp=x.lotProvider;
                      x.quantityTemp=x.quantity;
                      x.statusTemp=x.status=='OPENED'?'OPENED':'CLOSED';
                    });
                    this.pageTotalPacking=+response.headers.get("x-total-count");
                },(err)=>{
                  this.isLoading=false;
                });
            }
          break;
        case 3:
            if(!this.isLoading){
              if(this.type.value){
                this.isLoading=true;
                let dateStart = this.startDate.value?this.parseDate(this.startDate.value):null;
                let dateEnd = this.endDate.value?this.parseDate(this.endDate.value):null;
                this.historyApiService.getOutputsOfWarehouse(this.type.value,this.pageIndexOutputs,10,dateStart,dateEnd,this.lot.value).subscribe((response)=>{
                  this.outputsWarehouses=response.body;
                  this.pageTotalOutputs=+response.headers.get("x-total-count");
                  this.isLoading=false;
                },(err)=>{
                  this.isLoading=false;
                });
              }
             
            }
          break;
        case 4: 
          if(!this.isLoading){
            this.isLoading=true;
            let startDate= (this.startDate.value)?this.parseDate(this.startDate.value):null;
            let endDate = (this.endDate.value)?this.parseDate(this.endDate.value):null;
            this.historyApiService.getFormulationsOfInventory(this.pageIndexFormulation,10,this.lot.value,startDate,endDate).subscribe((response)=>{
              this.formulations=response.body;
              this.formulations.forEach(x=>x.isLoading=false);
              this.pageTotalFormulation=+response.headers.get("x-total-count");
              this.isLoading=false;
            },(err)=>{
              this.isLoading=false;
            })
        
        }
        break;
        case 5:
          if(!this.isLoading){
            this.isLoading=true;
            let startDate= (this.startDate.value)?this.parseDate(this.startDate.value):null;
            let endDate = (this.endDate.value)?this.parseDate(this.endDate.value):null;
            this.historyApiService.getProcessRecords(this.pageIndexProcess,10,startDate,endDate,this.lot.value).subscribe((response)=>{
              this.process=response.body;
              this.process.forEach(x=>x.isLoading=false);
              this.pageTotalProcess=+response.headers.get("x-total-count");
              this.isLoading=false;
            },(err)=>{
              this.isLoading=false;
            })
          }
          break;
        case 6:
          if(!this.isLoading){
            this.isLoading=true;
            let startDate= (this.startDate.value)?this.parseDate(this.startDate.value):null;
            let endDate = (this.endDate.value)?this.parseDate(this.endDate.value):null;
            this.historyApiService.getOvensRecords(this.pageIndexOvens,10,startDate,endDate,this.lot.value).subscribe((response)=>{
              this.ovens=response.body;
              this.ovens.forEach((x)=>{
                x.isEditing=false;
                x.statusTemp=x.status=='CLOSED'?'CLOSED':'USED';
                x.newLotTemp=x.newLot;
                x.isLoading=false;
              })
              this.pageTotalOvens=+response.headers.get("x-total-count");
              this.isLoading=false;
            },(err)=>{
              this.isLoading=false;
            })
          }
          break;
          case 7:
            if(!this.isLoading){
              this.isLoading=true;
              let startDate= (this.startDate.value)?this.parseDate(this.startDate.value):null;
            let endDate = (this.endDate.value)?this.parseDate(this.endDate.value):null;
            this.historyApiService.getProductEndRecords(this.pageIndexProductEnded,10,startDate,endDate,this.lot.value,this.typeTableProductEnded.value).subscribe((response)=>{
              this.productsEnded=response.body;
              this.productsEnded.forEach(x=>x.isLoading=false);
              this.pageTotalProductEnded=+response.headers.get("x-total-count");
              this.isLoading=false;
            },(err)=>{
              this.isLoading=false;
            })
            }
          break;
          case 8:
            this.reloadTable();
            break;
            case 9:
              if(!this.isLoading){
                this.isLoading=true;
              return this.historyApiService.getProductDevolutionList(this.pageIndexProductDevolution,10,this.parseDate(this.startDate.value),this.parseDate(this.endDate.value)).subscribe((response)=>{
                this.productDevolution=response.body;
                this.pageTotalProductDevolution=+response.headers.get("x-total-count");
                this.isLoading=false;
              },(err)=>{
                this.isLoading=false;
              });  
              }
              break;
          case 10:
            if(!this.isLoading){
              let request:DeliveryToSellerRequest={
                page:this.pageIndexProductDelivered,
                perPage: 10,
                sellers: this.sellersSelected,
                endDate: this.endDate.value?this.parseDate(this.endDate.value):null,
                lot: this.lot.value,
                startDate: this.endDate.value?this.parseDate(this.startDate.value):null
              };
              this.isLoading=true;
              return this.historyApiService.getProductDelivered(request,this.typeTableProductDelivered.value).subscribe((response)=>{
                this.productDelivered=response.body;
                this.pageTotalProductDelivered=+response.headers.get("x-total-count");
                this.isLoading=false;
              },(err)=>{
                this.isLoading=false;
              });
            }
            break;
  }
}

getReport(id:number,index:number){
  switch(this.section){
    case 0:
      if(!this.isLoading){
        this.inventoryMeat[index].isLoading=true;
        
        this.historyApiService.getReportOfReceptionMeat(id).subscribe((blob)=>{
          this.openReport(blob);
        
            this.inventoryMeat[index].isLoading=false;
        },(err)=>{
          this.inventoryMeat[index].isLoading=false;
        
        })
      }
      break;
    case 1:
      if(!this.isLoading){
        this.inventoryDrief[index].isLoading=true;
        
        this.historyApiService.getReportOfReceptionDrief(id).subscribe((blob)=>{
          this.openReport(blob);
        
            this.inventoryDrief[index].isLoading=false;
        },(err)=>{
          this.inventoryDrief[index].isLoading=false;
          
        })
      }
      break;
    case 2:
      if(!this.isLoading){
        this.inventoryPacking[index].isLoading=true;
        
        this.historyApiService.getReportOfReceptionPacking(id).subscribe((blob)=>{
            this.openReport(blob);
        
            this.inventoryPacking[index].isLoading=false;
        },(err)=>{
          this.inventoryPacking[index].isLoading=false;
        
        })
      }
      break;
    case 3:
      
      break;
    case 4:
      if(!this.isLoading){
        this.formulations[index].isLoading=true;
        
        this.historyApiService.getReportFormulationTrazability(id).subscribe((blob)=>{
            this.openReport(blob);
        
            this.formulations[index].isLoading=false;
        },(err)=>{
          this.formulations[index].isLoading=false;
        
        })
      }
      break;
    case 5:
      if(!this.isLoading){
        this.process[index].isLoading=true;
        
        this.historyApiService.getReportProcessTrazability(id).subscribe((blob)=>{
            this.openReport(blob);
        
            this.process[index].isLoading=false;
        },(err)=>{
          this.process[index].isLoading=false;
          
        })
      }
      break;
    case 6:
      if(!this.isLoading){
        this.ovens[index].isLoading=true;
        
        this.historyApiService.getReportOvenTrazability(id).subscribe((blob)=>{
            this.openReport(blob);
        
            this.ovens[index].isLoading=false;
        },(err)=>{
          this.ovens[index].isLoading=false;
          
        })
      }
      break;
    case 7:
      if(!this.isLoading){
        this.productsEnded[index].isLoading=true;
        
        this.historyApiService.getReportHistoryTrazability(id,"pdf").subscribe((blob)=>{
            this.openReport(blob);
        
            this.productsEnded[index].isLoading=false;
        },(err)=>{
          this.productsEnded[index].isLoading=false;
        
        })
      }
      break;
    case 8:
      if(!this.isLoading){
        this.isLoading=true;
        this.historyApiService.getReportGeneralInventoryPdf().subscribe(blob=>{
          this.openReport(blob);
          this.isLoading=false;
        },(err)=>this.isLoading=false);
      }
      break;
      case 9:
        if(!this.isLoading){
          this.isLoading=true;
        
          this.historyApiService.getReportOfPresentationChangePacking(this.pageIndexProductDevolution,10,this.parseDate(this.startDate.value),this.parseDate(this.endDate.value)).subscribe((blob)=>{
              this.openReport(blob);
            this.isLoading=false;
  
          },(err)=>{
            this.isLoading=false;
          
          })
        }
        break;
    case 10:
      if(!this.isLoading){
        this.isLoading=true;
        this.historyApiService.getReportProductDeliveredPdf(this.typeTableProductDelivered.value,this.parseDate(this.startDate.value),this.parseDate(this.endDate.value),this.sellersSelected).subscribe(blob=>{
          this.openReport(blob);
          this.isLoading=false;
        },(err)=>this.isLoading=false);
      }
      break;
  }
}

  getFormulationReport(formulationId:number){
    if(!this.isLoading){
      this.isLoading=true;
      this.historyApiService.getReportFormulationTrazability(formulationId).subscribe((blob)=>{
        this.openReport(blob);
          this.isLoading=false;
      },(err)=>{
        this.isLoading=false;
      })
    }
  }
  openReport(response:any){
    let file = new Blob([response], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    window.open(fileURL);
  }
  reloadTable(){
    this.isLoading=true;
    this.plantService.getInventory().subscribe((items)=>{
      this.inventory =items.map(x=>{
        return {
           lot_id:x.lot_id,
           name:x.name,
           packaging_id:x.packaging_id,
           type_presentation: x.type_presentation,
           units: x.units,
           weight: x.weight,
           editing: false,
           unitsTemp: x.units,
           weightTemp: x.weight,
           presentation_id: x.presentation_id,
           isUpdating:false,
           register_date: x.register_date
        }
      });
      this.isLoading=false;
  },(err)=>{
    this.isLoading=false;
  });
  }

  edit(index:number){
    this.inventory[index].editing=true;
  }

  save(index:number){
    console.log("Save: "+index);
    let item = this.inventory[index];
    item.editing=false;
    if(+item.units!=+item.unitsTemp || item.weight!=item.weightTemp){
      let unitsTypeOp:number=null;
      let weightTypeOp:number=null;
      if(+item.unitsTemp>+item.units){
        unitsTypeOp=1;
      }else if(+item.unitsTemp<+item.units){
        unitsTypeOp=2;
      }else if(+item.unitsTemp==+item.units){
        unitsTypeOp=3;
      }
      if(item.weightTemp>item.weight){
        weightTypeOp=1;
      }else if(item.weightTemp<item.weight){
        weightTypeOp=2;
      }else if(item.weightTemp==item.weight){
        weightTypeOp=3;
      }
      
      item.isUpdating=true;
      let request:InventoryItemRequest= {
        lot_id: item.lot_id,
        packaging_id: item.packaging_id,
        presentation_id: item.presentation_id,
        unitTypeOp: unitsTypeOp,
        weightTypeOp: weightTypeOp,
        units: item.units,
        unitsTemp: item.unitsTemp,
        weight: item.weight,
        weightTemp: item.weightTemp
      }
      this.plantService.updateInventoryStock(request).subscribe(()=>{

        item.isUpdating=false;
        item.weight=item.weightTemp;
        item.units=item.unitsTemp;
      },()=>{
        item.isUpdating=false;
        this.reloadTable();
      });
    }else{
      console.log("Not Updatable");
    }

  }

  cancel(index){
    let item=this.inventory[index];
    item.weightTemp=item.weight;
    item.unitsTemp=item.units;
    item.editing=false;
  }

  getType(section:number){
    this.section=section;
    // if(section==0){
    //   this.isLoading=true;
    //   this.historyApiService.getInventoryByDateAndsection("MEAT",this.startDateStr,this.endDateStr,0,10).subscribe((inventory:InventorysectionQuality[])=>{
    //     this.isLoading=false;
    //       this.inventory=inventory;
    //   },(err)=>{
    //     this.isLoading=false;
    //   });
    // }else if(section==1){
    //   this.isLoading=true;
    //   this.historyApiService.getInventoryByDateAndsection("DRIEF",this.startDateStr,this.endDateStr,0,10).subscribe((inventory:InventorysectionQuality[])=>{
    //     this.inventory=inventory;
    //     this.isLoading=false;
    // },(err)=>{
    //   this.isLoading=false;
    // });
    // }else if(section==2){
    //   this.isLoading=true;
    //   this.historyApiService.getInventoryByDateAndsection("PACKING",this.startDateStr,this.endDateStr,0,10).subscribe((inventory:InventorysectionQuality[])=>{
    //     this.inventory=inventory;
    //     this.isLoading=false;
    // },(err)=>{
    //   this.isLoading=false;
    // });
    // }else if(section==3){
    //   this.reloadTable();
    // }
  }



  parseDate(date:Date){
    let month = (date.getMonth()+1).toString();
    let day = date.getDate().toString();
    if(+month<10) month="0"+month;
    if(+day<10) day="0"+day;
    return `${date.getFullYear()}-${month}-${day}`;
  }
  parseDateFromIso(iso:string){
    let date = new Date(iso);
    let month = (date.getMonth()+1).toString();
    let day = date.getDate().toString();
    if(+month<10) month="0"+month;
    if(+day<10) day="0"+day;
    return `${day}/${month}/${date.getFullYear()}`;
  }
  parseDateStr(date:string){
    let dateSplited = date.split("-");
    return `${dateSplited[2]}/${dateSplited[1]}/${dateSplited[0]}`;
  }
  copyRow(devolution:DevolutionListItemInterface){
   this.clipboard.copy(`${devolution.name} \t ${devolution.presentation} \t ${devolution.lot} \t ${devolution.units} \t ${devolution.weight} \t ${this.parseDateFromIso(devolution.date)}`);
  }
  ant(){
    switch(this.section){
      case 0:
        if(this.pageIndexMeat>0){
          this.pageIndexMeat-=1;
          this.searchInventory();
        }
        break;
      case 1:
        if(this.pageIndexDrief>0){
          this.pageIndexDrief-=1;
          this.searchInventory();
        }
        break;
      case 2:
        if(this.pageIndexPacking>0){
          this.pageIndexPacking-=1;
          this.searchInventory();
        }
        break;
      case 3:
        if(this.pageIndexOutputs>0){
          this.pageIndexOutputs-=1;
          this.searchInventory();
        }
        break;
      case 4:
        if(this.pageIndexFormulation>0){
          this.pageIndexFormulation-=1;
          this.searchInventory();
        }
        break;
      case 5:
        if(this.pageIndexProcess>0){
          this.pageIndexProcess-=1;
          this.searchInventory();
        }
        break;
      case 6:
        if(this.pageIndexOvens>0){
          this.pageIndexOvens-=1;
          this.searchInventory();
        }
        break;
      case 7:
        if(this.pageIndexProductEnded>0){
          this.pageIndexProductEnded-=1;
          this.searchInventory();
        }
        break;
        case 9:
        if(this.pageIndexProductDevolution>0){
          this.pageIndexProductDevolution-=1;
          this.searchInventory();
        }
        break;
      case 10:
        if(this.pageIndexProductDelivered>0){
          this.pageIndexProductDelivered-=1;
          this.searchInventory();
        }
        break;
    }
  }
  next(){
    switch(this.section){
      case 0:
        if( ((this.pageIndexMeat+1)*10)<this.pageTotalMeat ){
          this.pageIndexMeat+=1;
          this.searchInventory();
        }
        break;
      case 1:
        if( ((this.pageIndexDrief+1)*10)<this.pageTotalDrief){
          this.pageIndexDrief+=1;
          this.searchInventory();
        }
        break;
      case 2:
        if( ((this.pageIndexPacking+1)*10)<this.pageTotalPacking ){
          this.pageIndexPacking+=1;
          this.searchInventory();
        }
        break;
      case 3:
        if( ((this.pageIndexOutputs+1)*10)<this.pageTotalOutputs ){
          this.pageIndexOutputs+=1;
          this.searchInventory();
        }
        break;
      case 4:
        if( ((this.pageIndexFormulation+1)*10)<this.pageTotalFormulation ){
          this.pageIndexFormulation+=1;
          this.searchInventory();
        }
        break;
      case 5:
        if( ((this.pageIndexProcess+1)*10)<this.pageTotalProcess){
          this.pageIndexProcess+=1;
          this.searchInventory();
        }
        break;
      case 6:
        if( ((this.pageIndexOvens+1)*10)<this.pageTotalOvens ){
          this.pageIndexOvens+=1;
          this.searchInventory();
        }
        break;
      case 7:
        if( ((this.pageIndexProductEnded+1)*10)<this.pageTotalProductEnded ){
          this.pageIndexProductEnded+=1;
          this.searchInventory();
        }
        break;
        case 9:
        if( ((this.pageIndexProductDevolution+1)*10)<this.pageTotalProductDevolution ){
          this.pageIndexProductDevolution+=1;
          this.searchInventory();
        }
        break;
      case 10:
        if( ((this.pageIndexProductDelivered+1)*10)<this.pageTotalProductDelivered ){
          this.pageIndexProductDelivered+=1;
          this.searchInventory();
        }
        break;
    }
  }

  paginator(index:number,total:number){

    let rangeStart=0;
    let rangeEnd=0;
    
    if(total==0){
      rangeStart=0;
      rangeEnd=0;
    }else{
      rangeStart= (index*10)+1;
      if((index+1)*10>total){
        rangeEnd=total;
      }else{
        rangeEnd=(index+1)*10;
      }
    }

    return rangeStart+"-"+rangeEnd+"/"+total;
  }

  reopenToPackaging(ovenId:number){
    if(!this.isLoading){
      this.isLoading=true;
      this.historyApiService.reopentToPackagingOvenLot(ovenId,"CLOSED").subscribe(()=>{ // estatus CLOSE porque esta cerrado para hornos pero habilitado para empaquetado.
        this.isLoading=false;
        this.searchInventory();
      },(err)=>{
        this.isLoading=false;
      });
    }
  }
  closeToPackaging(ovenId:number){
    if(!this.isLoading){
      this.isLoading=true;
      this.historyApiService.reopentToPackagingOvenLot(ovenId,"USED").subscribe(()=>{ // estatus USED porque ya fue usado por el area de empaquetado por lo cual es un estatus de cierre definitivo de lote.
        this.isLoading=false;
        this.searchInventory();
      },(err)=>{
        this.isLoading=false;
      });
    }
  }


  editRecord(type:string,index:number){
    if(this.autorizeToModified){
    switch(type){
      case 'MEAT':
        this.inventoryMeat[index].isEditing=!this.inventoryMeat[index].isEditing;
        break;
      case 'DRIEF':
        console.log("Editando record");
        this.inventoryDrief[index].isEditing=!this.inventoryDrief[index].isEditing;
        break;
      case 'OVEN':
        this.ovens[index].isEditing=true;
        break;
    }
  }else{
    this.checkCanEdit();
  }
  }

  saveEdit(type:string,index:number){
    let inventory:InventoryTypeQuality;
    let oven:OvensInventory;
    let request:any={};
    switch(type){
      case 'MEAT':
        inventory=this.inventoryMeat[index];
        this.inventoryMeat[index].isEditing=false;
        break;
      case 'DRIEF':
        inventory=this.inventoryDrief[index];
        this.inventoryDrief[index].isEditing=false;
      break;
      case 'OVEN':
        this.ovens[index].isEditing=false;
        oven=this.ovens[index];
        break;
    }
    if(type!='OVEN'){
        request = this.buildRequest(type,inventory);  
        if(Object.keys(request).length){
          this.isLoading=true;
          this.plantService.updatePropertiesRecordsByType(inventory.id,type,request).subscribe(()=>{
            this.isLoading=false;
            this.searchInventory();
          },(err)=>{
            this.isLoading=false;
          })
        }else{
          this.isLoading=false;
        }
      }else{
        request = this.buildRequest(type,null,oven);  
        if(Object.keys(request).length){
          this.isLoading=true;
          this.plantService.updatePropertiesOven(oven.id,request).subscribe(()=>{
            this.isLoading=false;
            this.searchInventory();
          },(err)=>{
            this.isLoading=false;
          })
        }else{
          this.isLoading=false;
        }
      }
    }
  

  buildRequest(type:string,inventory:InventoryTypeQuality,oven?:OvensInventory){
    let request:any={};
    if(type=='DRIEF'){
      if(inventory.quantity!=inventory.quantityTemp && inventory.quantityTemp>=0){
        request.quantity=inventory.quantityTemp;
      }
      let status= inventory.status=='OPENED'?'OPENED':'CLOSED';
      if(inventory.statusTemp!=status){
        request.status=inventory.statusTemp;
      }
      if(inventory.lotProviderTemp!=inventory.lotProvider){
        request.lotProvider=inventory.lotProviderTemp;
      }
    }else if(type=='MEAT'){
      if(inventory.quantity!=inventory.quantityTemp && inventory.quantityTemp>=0){
        request.quantity=inventory.quantityTemp;
      }
      let status= inventory.status=='OPENED'?'OPENED':'CLOSED';
      if(inventory.statusTemp!=status){
        request.status=inventory.statusTemp;
      }
      if(inventory.lotProviderTemp!=inventory.lotProvider){
        request.lotProvider=inventory.lotProviderTemp;
      }
      if(inventory.lotInternTemp!=inventory.lotIntern){
        request.lotIntern=inventory.lotInternTemp;
      }
      if(inventory.fridgeIdTemp!=inventory.fridgeId){
        request.fridgeId=inventory.fridgeIdTemp;
      }
    }else if(type=='OVEN'){
      if(oven){
        if(oven.newLotTemp!=oven.newLot){
          request.newLot=oven.newLotTemp;
        }
        
        if(oven.status!="OPENED" && oven.status!=oven.statusTemp){
          request.status=oven.statusTemp;
        }
      }
    }
    return request;
  }

  checkCanEdit(){
    this.dialog.open(ModalConfirmEditionComponent).afterClosed().subscribe((data)=>{
      
      this.autorizeToModified=data.valid;
    })
  }
}
