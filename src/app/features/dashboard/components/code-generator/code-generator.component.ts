import { Component, OnInit } from '@angular/core';
import { CodeAccess } from 'src/app/shared/models/user.interface';
import { PlantService } from 'src/app/shared/Services/plant.service';

@Component({
  selector: 'app-code-generator',
  templateUrl: './code-generator.component.html',
  styleUrls: ['./code-generator.component.scss']
})
export class CodeGeneratorComponent implements OnInit {

  constructor(private roviandaApiService:PlantService) { }
  isLoading:boolean=false;
  codeAccess:CodeAccess=null;
  userId:string = localStorage.getItem("uid");
  ngOnInit(): void {
    this.searchCode();
  }

  searchCode(){
    this.isLoading=true;
    this.roviandaApiService.getCodeOfUser(this.userId).subscribe((codeAccess)=>{
      this.codeAccess=codeAccess;
      this.isLoading=false;
    },(err)=>{
      this.isLoading=false;
    })
  }
  
  generateCode(){
    if(!this.isLoading){
      this.isLoading=true;
      this.roviandaApiService.generateCodeOfUser(this.userId).subscribe(()=>{
        this.isLoading=false;
        this.searchCode();
      },(err)=>{
        this.isLoading=false;
      });
    }
  }

}
