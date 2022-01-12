import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { Subscription } from 'rxjs';
import { AppStateInterface } from 'src/app/shared/models/app-state.interface';
import { HistorialReception } from 'src/app/shared/models/historial-list.interface';
import { filterLoadDates, filterSearchEntrances, getRecepcionDates, searchCoolingOfEntrance, searchOutputCoolingOfEntrance, searchOutputsFormulationsOfEntrance } from '../../store/historial-page/filter/filter.action';
import { getReceptions } from '../../store/historial-page/filter/filter.selector';

@Component({
  selector: 'app-table-receptions',
  templateUrl: './table-receptions.component.html',
  styleUrls: ['./table-receptions.component.scss']
})
export class TableReceptionsComponent implements OnInit,OnDestroy {

  constructor(private _store:Store<AppStateInterface>,@Inject(MAT_DIALOG_DATA) public data:{lotId:string,date:string,type:string},public matDialogRef:MatDialogRef<TableReceptionsComponent>) { 
    this.dataSource=new MatTableDataSource();
    this.dataSourceTemp=new MatTableDataSource();
  }

  ngOnDestroy(): void {
   this.subcription.unsubscribe();
   this.isLoading=true;
  }
isLoading=true;
page=0;
peerPage=10;
maxCount=100;
pageSizeOptions: number[] = [5, 10];
  displayedColumns=["position","vendor","rawMaterial","weight","date","selection"];
  dataSource: MatTableDataSource<HistorialReception>;
  dataSourceTemp: MatTableDataSource<HistorialReception>;
  subcription:Subscription;
  ngOnInit(): void {
    this.subcription= new Subscription();
    if(this.data.type=="meat"){
      this.subcription.add(this._store.select(getReceptions).subscribe((receptions)=>{
        this.dataSourceTemp.data = [...receptions];
        this.maxCount = this.dataSourceTemp.data.length;
        
        let count = (this.page+1)*this.peerPage;
        let init = this.page*this.peerPage
        this.dataSource.data = this.dataSourceTemp.data.slice(init,count);
        this.isLoading=false;
      }));
      this._store.dispatch(
        getRecepcionDates({ lotId: this.data.lotId,date: this.data.date })
      );
    }else if(this.data.type=="drief"){
      this.subcription.add(this._store.select(getReceptions).subscribe((receptions)=>{
        this.dataSourceTemp.data = receptions;
        this.isLoading=false;
      }));
      this._store.dispatch(
        getRecepcionDates({ lotId: this.data.lotId,date: this.data.date })
      );
    }
    this.isLoading=true;
    
      
  }

  closeModal(){
    this.matDialogRef.close();
  }

  pageEvent(event:any){
    console.log(event);
    this.page = event.pageIndex;
    this.peerPage = event.pageSize;
    let count = (this.page+1)*this.peerPage;
    let init = this.page*this.peerPage
    this.dataSource.data = this.dataSourceTemp.data.slice(init,count);
  }
  seleccionar(index:number){
    let item1 = this.dataSource.data[index];
    let dateStart = this.dataSource.data[index].createdAt;
    let dateEnd="";
    let dateEndStr;
    if((index+2)>this.dataSource.data.length){
      let date = new Date();
      let day = (date.getDate()<10)?'0'+date.getDate():date.getDate().toString();
      let month = (date.getMonth()+1).toString();
      if(+month<10) month='0'+month;
      dateEnd = date.getFullYear()+"-"+month+"-"+day;
      dateEndStr = dateEnd;
    }else{
      dateEnd=this.dataSource.data[index+1].createdAt;
      let dateTemp = new Date(dateEnd);
      
      let month:string = (dateTemp.getMonth()+1).toString();
      let day:string = dateTemp.getDate().toString();
      if(+month<10){
        month='0'+month;
      }
      if(+day<10){
        day = '0'+day;
      }
      
      dateEndStr = dateTemp.getFullYear()+"-"+month+"-"+day;
    }
   
    console.log(dateStart,dateEndStr);

    this._store.dispatch(filterSearchEntrances({entranceId:item1.id.toString(),dateStart,dateEnd:dateEndStr}));
    this._store.dispatch(searchCoolingOfEntrance({entranceId:item1.id,dateStart,dateEnd:dateEndStr}));
    this._store.dispatch(searchOutputCoolingOfEntrance({entranceId:item1.id,dateStart,dateEnd:dateEndStr}));
    
    this._store.dispatch(
      filterLoadDates({
        dateFinal: dateEndStr,
        dateIni: dateStart,
      })
    );
  }
}
