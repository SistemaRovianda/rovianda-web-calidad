import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { InventoryItem, InventoryItemEdit, InventoryItemRequest } from 'src/app/shared/models/inventory.interface';
import { PlantService } from 'src/app/shared/Services/plant.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  
  constructor(private plantService:PlantService) { 
    this.dataSource = new MatTableDataSource();
  }
  displayedColumns:string[]=["product","presentation","lot","units","weight","options"]
  dataSource:MatTableDataSource<InventoryItemEdit>;
  loadingTable:boolean=false;
  ngOnInit(): void {

    this.reloadTable();
  
  }

  reloadTable(){
    this.loadingTable=true;
    this.plantService.getInventory().subscribe((items)=>{
      this.dataSource.data =items.map(x=>{
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
           isUpdating:false
        }
      });
      this.loadingTable=false;
  },(err)=>{
    this.loadingTable=false;
  });
  }

  edit(index:number){
    this.dataSource.data[index].editing=true;
  }

  save(index:number){
    let item = this.dataSource.data[index];
    item.editing=false;
    if(item.units!=item.unitsTemp || item.weight!=item.weightTemp){
      let unitsTypeOp:number=null;
      let weightTypeOp:number=null;
      if(item.unitsTemp>item.units){
        unitsTypeOp=1;
      }else if(item.unitsTemp<item.units){
        unitsTypeOp=2;
      }else if(item.unitsTemp==item.units){
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
    let item=this.dataSource.data[index];
    item.weightTemp=item.weight;
    item.unitsTemp=item.units;
    item.editing=false;
  }
}
