import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PlantService } from 'src/app/shared/Services/plant.service';

@Component({
  selector: 'app-modal-confirm-edition',
  templateUrl: './modal-confirm-edition.component.html',
  styleUrls: ['./modal-confirm-edition.component.scss']
})
export class ModalConfirmEditionComponent implements OnInit {

  constructor(private roviandaApiService:PlantService,private dialogRef:MatDialogRef<ModalConfirmEditionComponent>) { }
  form:FormGroup;
  isLoading:boolean = false;
  ngOnInit(): void {
    this.form = new FormGroup({
      code: new FormControl(null,[Validators.required])
    });
    
  }
  get code(){
    return this.form.get("code");
  }
  codeNotValid:boolean=false;
  validateCode(){
    if(!this.isLoading && this.form.valid){
      this.isLoading=true;
      this.roviandaApiService.validateCode(this.code.value).subscribe((response)=>{
        this.isLoading=false;
        if(!response.valid){
          this.codeNotValid=true;
        }else{
          this.dialogRef.close({valid: response.valid});
        }
      },(err)=>{
        this.isLoading=false;
        this.codeNotValid=true;
      })
    }
  }

}
