import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientQuality, NewIngredientQuality } from 'src/app/shared/models/inventory.interface';
import { HistorialService } from 'src/app/shared/Services/historial.service';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.scss']
})
export class IngredientFormComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,private dialogRef:MatDialogRef<IngredientFormComponent>,
  private roviandaApiService:HistorialService,private _snackBar: MatSnackBar) { }
  selection:number=0;
  form:FormGroup;
  ingredients:IngredientQuality[]=[
    {
      productName: "Nombre1",
      mark: "Marca1",
      presentation: "Presentacion1",
      variant: "variante1"
    },
    {
      productName: "Nombre2",
      mark: "Marca2",
      presentation: "Presentacion2",
      variant: "variante2"
    },
    {
      productName: "Nombre3",
      mark: "Marca3",
      presentation: "Presentacion3",
      variant: "variante3"
    },
    {
      productName: "Nombre4",
      mark: "Marca4",
      presentation: "Presentacion4",
      variant: "variante4"
    }
  ];

  ingredientsAdded:IngredientQuality[]=[];
  isLoading:boolean=false;
  typeRegist:number=0;
  addIngredient(ingredient:IngredientQuality,index:number){
    this.ingredients.splice(index,1);
    this.ingredientsAdded.push(ingredient);
  }
  ngOnInit(): void {
    this.ingredientsAdded=this.data.ingredients;
    this.form = new FormGroup({
      productName: new FormControl(null,Validators.required),
      mark: new FormControl(null,Validators.required),
      variant: new FormControl(null,Validators.required),
      presentation: new FormControl(null,Validators.required)
    });
    if(this.data.type=="vinculated"){
      this.roviandaApiService.getAllIngredients().subscribe((ingredients)=>{
        let filter = this.ingredientsAdded.map((x)=>x.id);
        this.ingredients=(ingredients.filter((x)=>!filter.includes(x.id))).map(x=>({mark:x.mark,presentation:x.presentation,productName:x.nameProduct,variant:x.variant,id:x.id}));
      })
    }
  }
  close(){
    this.dialogRef.close();
  }

  addRemove(ingredient:IngredientQuality,type:string,index:number){
    if(!this.isLoading){
      this.isLoading=true;
      this.roviandaApiService.addRemoveIngredientToProduct(this.data.productId,ingredient.id,type).subscribe(()=>{
        this.isLoading=false;
        if(type=="ADD"){
          this.ingredients.splice(index,1);
          this.ingredientsAdded.push(ingredient);
        }else if(type=="REMOVE"){
          this.ingredientsAdded.splice(index,1);
          this.roviandaApiService.getAllIngredients().subscribe((ingredients)=>{
            let filter = this.ingredientsAdded.map((x)=>x.id);
            this.ingredients=ingredients.filter((x)=>!filter.includes(x.id));
          });

        }
        this.notify("Registro actualizado con exito","success");
      },(err)=>{
        this.isLoading=false;
        this.notify(err.error.msg,"error");
      })
    }
  }

  get productName(){
    return this.form.get("productName");
  }
  get mark(){
    return this.form.get("mark");
  }
  get variant(){
    return this.form.get("variant");
  }
  get presentation(){
    return this.form.get("presentation");
  }
  regist(){
    if(!this.isLoading){
      this.isLoading=true;
      let request:NewIngredientQuality={
        mark: this.mark.value,
        productName: this.productName.value,
        presentation: this.presentation.value,
        variant: this.variant.value
      };
      if(this.typeRegist==1){
        console.log("Assined: 1"+this.data.productId);
        request.productId=this.data.productId;
      }
      this.roviandaApiService.registIngredient(request).subscribe(()=>{
          this.isLoading=false;
          this.notify("Registro completado","sucess");
      },(err)=>{
          this.isLoading=false;
          this.notify(err.error.msg,"error");
      });
    }
  }

  notify(msg:string,type:string){
    
    this._snackBar.open(msg, '', {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass:type,
      duration: 3000
    });
    
  }
}
