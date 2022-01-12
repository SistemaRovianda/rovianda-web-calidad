import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IngredientQuality, ProductQualityDetails } from 'src/app/shared/models/inventory.interface';
import { HistorialService } from 'src/app/shared/Services/historial.service';
import { IngredientFormComponent } from '../ingredient-form/ingredient-form.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private roviandaApiService:HistorialService,
  private activatedRoute: ActivatedRoute,private router:Router,
  private _snackBar: MatSnackBar,
  private dialog:MatDialog) { }
  productDetails:ProductQualityDetails;
  productId:number;
  isLoading:boolean=false;
  ngOnInit(): void {
    this.productId = +this.activatedRoute.snapshot.paramMap.get('productId'); 
    this.getDetails();
  }

  getDetails(){
    if(!this.isLoading){
      this.isLoading=true;
      this.roviandaApiService.getProductDetails(this.productId).subscribe((details)=>{
        this.productDetails = details;
        this.isLoading=false;
      },(err)=>{
        this.isLoading=false;
      });
    }
  }
  back(){
    this.router.navigateByUrl("/dashboard/productos");
  }

  addIngredient(){
    this.dialog.open(IngredientFormComponent,{
      data:{
        productId: this.productId,
        type: "vinculated",
        ingredients: this.productDetails.ingredients
      },
      disableClose: true
    }).afterClosed().subscribe(()=>{
      this.getDetails();
    })
  }

  removeIngredient(ingredient:IngredientQuality){
    if(!this.isLoading){
      this.roviandaApiService.addRemoveIngredientToProduct(this.productId,ingredient.id,'REMOVE').subscribe(()=>{
        this.isLoading=false;
        this.getDetails();
        this.notify("Ingrediente removido exitosamente","success")
      },(err)=>{
        this.isLoading=false;
        this.notify("Error al remover ingrediente","success")
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
