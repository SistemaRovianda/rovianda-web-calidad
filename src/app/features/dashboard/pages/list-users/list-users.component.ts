import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ItemUser, ItemUserEdit } from 'src/app/shared/models/list-users.interface';
import { PlantService } from 'src/app/shared/Services/plant.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  constructor(private plantService:PlantService) { 
    this.dataSource = new MatTableDataSource();
  }
  userSearch:string="";
  filtered:boolean=false;

  search(){
    let users = this.dataSource.data.filter(x=>x.editing==true);
    if(!users.length && this.userSearch!=""){
      this.filtered=true;
      this.dataSource.data = this.dataSource.data.filter(x=>(
        x.fullName.toLowerCase().indexOf(this.userSearch.toLowerCase())!=-1 || x.email.toLowerCase().indexOf(this.userSearch.toLowerCase())!=-1)
        );
    }
  }
  usersTemp:ItemUserEdit[]=[];
  cancelSearch(){
    this.userSearch="";
    this.filtered=false;
    this.dataSource.data=this.usersTemp;
  }

  loadingTable:boolean=false;
  dataSource:MatTableDataSource<ItemUserEdit>;
  displayedColumns:string[]=["name","email","rol","status","options"];
  ngOnInit(): void {
      this.reloadTable();
    
  }

  reloadTable(){
    this.loadingTable=true;
    this.plantService.getAllUser().subscribe(users=>{
      users=users.filter(x=>x.status!="DELETED");
      this.dataSource.data=users.map(x=>{
        return {
          editing: false,
          email: x.email,
          fullName: x.fullName,
          fullNameTemp: x.fullName,
          job: x.job,
          rol: x.rol,
          userId: x.userId,
          status:x.status,
          updating:false
        }
      });
      this.usersTemp=this.dataSource.data;
      this.loadingTable=false;
    },(err)=>{
      this.loadingTable=false;
    })
  }

  edit(index:number){
    let item = this.dataSource.data[index];
    item.editing=true;
  }
  save(index:number){
    let item = this.dataSource.data[index];
    if(item.fullName!=item.fullNameTemp){
      item.updating=true;
      this.plantService.updateUserStatus(item.userId,"UPDATING",item.fullNameTemp).subscribe(()=>{
        item.updating=false;
        item.editing=false;
      },()=>{
        item.updating=false;
        item.editing=false;
      });
    }
  }

  del(index:number){
    console.log("Deleted");
    let item = this.dataSource.data[index];
    item.updating=true;
    this.plantService.updateUserStatus(item.userId,"DELETED",null).subscribe(()=>{
      item.updating=false;
      this.reloadTable();
      
    },()=>{
      item.updating=false;
      this.reloadTable();
    });
  }

  cancel(index:number){
    let item = this.dataSource.data[index];
    item.fullNameTemp=item.fullName;
    item.editing=false;
  }

  changeStatus(index:number){
    let item = this.dataSource.data[index];
    item.updating=true;
    item.status=="ACTIVE"?item.status="INACTIVE":item.status="ACTIVE";
    this.plantService.updateUserStatus(item.userId,item.status,null).subscribe(()=>{
      item.updating=false;
    },()=>{
      item.updating=false;
    });
  }

}
