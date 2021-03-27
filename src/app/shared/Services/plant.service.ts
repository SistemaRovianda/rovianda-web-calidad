import { Injectable, Inject } from "@angular/core";

import { HttpClient,  } from "@angular/common/http";

import { Observable } from "rxjs";
import { API_ENPOINT_PROVIDER } from "src/app/providers/tokens";
import { InventoryItem, InventoryItemEdit, InventoryItemRequest } from "../models/inventory.interface";
import { ItemUser } from "../models/list-users.interface";

@Injectable({
  providedIn: "root",
})
export class PlantService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}`;
  }

  getInventory(): Observable<InventoryItem[]> {
    
    return this.http.get<InventoryItem[]>(`${this.url}/packaging/inventory-plant`);
  }


  updateInventoryStock(inventoryItemEdit:InventoryItemRequest){
      return this.http.put(`${this.url}/packaging-inventory/plant`,inventoryItemEdit);
  }

  getAllUser(){
    return this.http.get<ItemUser[]>(`${this.url}/user`);
  }
 
  updateUserStatus(userId:string,status:string,name:string){
    return this.http.put(`${this.url}/user-status`,{userId,status,name});
  }

}
