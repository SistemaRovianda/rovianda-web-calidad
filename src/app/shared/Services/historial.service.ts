import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HistorialListInterface, HistorialReception } from "../models/historial-list.interface";
import { HistorialInterface } from "../models/historial.interface";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { API_ENPOINT_PROVIDER } from "src/app/providers/tokens";
import { EntranceOutputPackingFromOven, EntranceOutputsOven, OutputsByEntrance, ProcessFormulation, ReceptionMaterialInterface } from "../models/reception-materials.interface";
import { DeliveryToSellerRequest, IngredientQuality, InventoryTypeQuality, NewIngredientQuality, OutputsOfWarehouse, OvensInventory, ProcessInventory, ProductCatalog, ProductEndedIventory, ProductQualityDetails, DeliveryToSeller, DevolutionListItemInterface } from "../models/inventory.interface";

@Injectable({
  providedIn: "root",
})
export class HistorialService {
  url: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(API_ENPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/quality`;
  }

  historial: HistorialInterface[] = [
    {
      date: "15/03/2020",
      stateHistorial: "Entrada refrigerador",
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada recepcion",
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada refrigerador",
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada recepcion",
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada refrigerador",
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada refrigerador",
    },
  ];

  getHistorial(): Observable<HistorialInterface[]> {
    return new Observable((observer) => {
      observer.next(this.historial);
      observer.complete();
    });
  }

  searchEntrances(entranceId: string,dateStart:string,dateEnd:string, path: string): Observable<any> {
    let params = new HttpParams().set("dateStart",dateStart).set("dateEnd",dateEnd);
    return this.http.get<any>(`${this.url}/history/${path}/${entranceId}`,{params});
  }


  searchCoolingOfEntrance(entranceId: number,dateStart:string,dateEnd:string): Observable<any> {
    let params = new HttpParams().set("dateStart",dateStart).set("dateEnd",dateEnd);
    return this.http.get<any>(`${this.url}/history/meat-cooling/${entranceId}`,{params});
  }

  searchOutputsCoolingOfEntrance(entranceId: number,dateStart:string,dateEnd:string): Observable<any> {
    let params = new HttpParams().set("dateStart",dateStart).set("dateEnd",dateEnd);
    return this.http.get<any>(`${this.url}/history/meat-out-cooling/${entranceId}`,{params});
  }
  searchOutputsFormulationOfEntrance(outputs:number[]): Observable<any> {
    return this.http.post<any>(`${this.url}/history/meat-formulations`,{outputsCooling:outputs});
  }
  searchOutputsProcessOfEntrance(formulationsIds:number[]): Observable<any> {
    return this.http.post<any>(`${this.url}/history/meat-process`,{formulationsIds});
  }

  searchOutputsOvenOfEntrance(processIds:number[]): Observable<any> {
    return this.http.post<any>(`${this.url}/history/meat-oven`,{processIds});
  }

  searchLotDrief(entranceId:string,path:string){
    return this.http.get<any>(`${this.url}/history/${path}/${entranceId}`);
  }

  downloadHistorialService(historial: HistorialInterface[]): Observable<any> {
    return new Observable((observer) => {
      console.log(historial);
      observer.next(historial);
      observer.complete();
    });
  }

  getReceptionsHistory(lotId:string,date:string):Observable<HistorialReception[]>{
    let params = new HttpParams().set("date",date);
    return this.http.get<HistorialReception[]>(`${this.url}/entrances/${lotId}`,{params});
  }

  getProductsByLotAndDate(lot:string,type:string,dateStart:string,dateEnd:string){
    let params = new HttpParams().set("lot",lot).set("dateStart",dateStart).set("dateEnd",dateEnd);
    return this.http.get<string[]>(`${this.endpoint}/history-inspection/${type}`,{params});
  }

  getReceptionsOfProduct(lot:string,type:string,dateStart:string,dateEnd:string,productName:string){
    let params = new HttpParams().set("lot",lot).set("dateStart",dateStart).set("dateEnd",dateEnd);
    return this.http.get<ReceptionMaterialInterface[]>(`${this.endpoint}/history-received/${type}/${productName}`,{params});
  }

  getReportOfReceptionMeat(entranceId:number){
    return this.http.get(`${this.endpoint}/report/entry/meat/${entranceId}`,{responseType:"blob"});
  }
  getReportExcelOfReceptionMeat(entranceId:number){
    return this.http.get(`${this.endpoint}/report-excel/entry/meat/${entranceId}`,{responseType:"blob"});
  }
  getReportOfReceptionDrief(entranceId:number){
    return this.http.get(`${this.endpoint}/report/entry/drief/${entranceId}`,{responseType:"blob"});
  }
  getReportOfReceptionPacking(entranceId:number){
    return this.http.get(`${this.endpoint}/report/entry/packing/${entranceId}`,{responseType:"blob"});
  }
  getReportOfPresentationChangePacking(page:number,perPage:number,dateStart:string,dateEnd:string){
    let params:HttpParams = new HttpParams().set("page",page.toString()).set("perPage",perPage.toString()).set("dateStart",dateStart).set("dateEnd",dateEnd);
    return this.http.get(`${this.endpoint}/devolution-list-report`,{params,responseType:"blob"});
  }
  getReportExcelOfReceptionDrief(entranceId:number){
    return this.http.get(`${this.endpoint}/report/document/entry/drief/${entranceId}`,{responseType:"blob"});
  }

  getOutputsToFormulations(entranceId:number,pageIndex:number,perPage:number,typeFilter:string){
    let params:HttpParams = new HttpParams().set("page",pageIndex.toString()).set("perPage",perPage.toString());
    return this.http.get<{count:number,items:OutputsByEntrance[]}>(`${this.endpoint}/history/outputs-warehouse/${entranceId}?type=${typeFilter}`,{params});
  }

  getFormulationsOfInventory(page:number,perPage:number,lot:string,startDate:string,endDate:string){
    let params:HttpParams = new HttpParams().set("page",page.toString()).set("perPage",perPage.toString());
    if(lot){
      params=params.set("lot",lot);
    }
    if(startDate && endDate){
      params=params.set("startDate",startDate).set("endDate",endDate)
    }
    return this.http.get<OutputsByEntrance[]>(`${this.endpoint}/quality/inventory-formulations`,{params,observe:"response"});
  }

  getProcessByFormulation(data:{formulationId?:number,lot?:string,productId?:number,page?:number,perPage?:number,entranceId?:number,type?:string}){

    if(data.formulationId){
      let params:HttpParams = new HttpParams().set("formulationId",data.formulationId.toString()).set("type",data.type);
      return this.http.get<{count:number,items:ProcessFormulation[]}>(`${this.endpoint}/history/process-outputs`,{params});
    }else if(data.entranceId!=null && data.page!=null && data.perPage!=null && data.type){
      let params:HttpParams = new HttpParams().set("perPage",data.perPage.toString()).set("page",data.page.toString()).set("entranceId",data.entranceId.toString()).set("type",data.type);
      return this.http.get<{count:number,items:ProcessFormulation[]}>(`${this.endpoint}/history/process-outputs`,{params});
    }
    
  }

  getOvensByProcess(data:{processId?:number,page?:number,perPage?:number,entranceId?:number,type:string}){

    if(data.processId!=null){
      let params:HttpParams = new HttpParams().set("processId",data.processId.toString()).set("type",data.type);
      return this.http.get<{count:number,items:EntranceOutputsOven[]}>(`${this.endpoint}/history/oven-outputs`,{params});
    }else if(data.entranceId!=null && data.page!=null && data.perPage!=null){
      let params:HttpParams = new HttpParams().set("perPage",data.perPage.toString()).set("page",data.page.toString()).set("entranceId",data.entranceId.toString()).set("type",data.type);
      return this.http.get<{count:number,items:EntranceOutputsOven[]}>(`${this.endpoint}/history/oven-outputs`,{params});
    }
    
  }

  getPackingByOven(data:{ovenId?:number,page?:number,perPage?:number,entranceId?:number,type:string}){

    if(data.ovenId!=null){
      let params:HttpParams = new HttpParams().set("ovenId",data.ovenId.toString()).set("type",data.type);
      return this.http.get<{count:number,items:EntranceOutputPackingFromOven[]}>(`${this.endpoint}/history/product-ended/oven`,{params});
    }else if(data.entranceId!=null && data.page!=null && data.perPage!=null){
      let params:HttpParams = new HttpParams().set("perPage",data.perPage.toString()).set("page",data.page.toString()).set("entranceId",data.entranceId.toString()).set("type",data.type);
      return this.http.get<{count:number,items:EntranceOutputPackingFromOven[]}>(`${this.endpoint}/history/product-ended/oven`,{params});
    }
    
  }

  getReportHistoryTrazability(packId:number,type:string){
      let params:HttpParams = new HttpParams().set("id",packId.toString()).set("type",type);
      return this.http.get(`${this.endpoint}/history/report-trazability`,{params,responseType:"blob"});
  }
  getReportGeneralInventoryPdf(){
    return this.http.get(`${this.endpoint}/packaging/inventory-warehouse/pdf?ware=53`,{responseType:"blob"});
  }
  getReportProductDeliveredPdf(type:string,startDate:string,endDate:string,sellers:string[]){
    return this.http.post(`${this.endpoint}/report/sellers/delivered?type=${type}`,{sellers,startDate,endDate},{responseType:"blob"});
  }
  getReportFormulationTrazability(formulationId:number){
    return this.http.get(`${this.endpoint}/report/formulation/${formulationId}`,{responseType:"blob"});
  }
  getReportProcessTrazability(proccessId:number){
    return this.http.get(`${this.endpoint}/report/process/${proccessId}`,{responseType:"blob"});
  }
  getReportOvenTrazability(ovenId:number){
    return this.http.get(`${this.endpoint}/report/oven/${ovenId}`,{responseType:"blob"});
  }
  getReportPackagingTrazability(packagingId:number){
    return this.http.get(`${this.endpoint}/report/packaging/${packagingId}`,{responseType:"blob"});
  }

  getInventoryByDateAndType(page:number,perPage:number,dateStart:string,dateEnd:string,lot:string,type:string){
      let params:HttpParams = new HttpParams().set("page",page.toString()).set("perPage",perPage.toString());
      if(dateStart && dateEnd){
        params = params.set("dateStart",dateStart).set("dateEnd",dateEnd);
      }
      if(lot){
        params=params.set("lot",lot)
      }
      return this.http.get<InventoryTypeQuality[]>(`${this.endpoint}/warehouses/inventory/${type}`,{params,observe:"response"});
  }

  getProductEndedHistory(page:number,perPage:number,lot:string,productName:string,dateStart:string,dateEnd:string){
    let params:HttpParams = new HttpParams().set("perPage",perPage.toString()).set("page",page.toString()).set("productName",productName).set("lot",lot).set("dateStart",dateStart).set("dateEnd",dateEnd);
      return this.http.get<{count:number,items:EntranceOutputPackingFromOven[]}>(`${this.endpoint}/history/product-ended`,{params});
  }

  getOnlyProductOfQualityArea(){
    return this.http.get<ProductCatalog[]>(`${this.endpoint}/quality/products-catalog`);
  }

  getProductDetails(productId:number){
    return this.http.get<ProductQualityDetails>(`${this.endpoint}/quality/product-details/${productId}`);
  }

  getAllIngredients(){
    return this.http.get<IngredientQuality[]>(`${this.endpoint}/list/ingredients?type=DRIEF`);
  }

  registIngredient(body:NewIngredientQuality){
    return this.http.post(`${this.endpoint}/quality/add-ingredient`,body);
  }

  addRemoveIngredientToProduct(productId:number,ingredientId:number,type:string){
    return this.http.put(`${this.endpoint}/quality/vinculate-ingredient`,{productId,ingredientId,type});
  }
  
  getOutputsOfWarehouse(type:string,page:number,perPage:number,startDate:string,endDate:string,lot:string){
    let params:HttpParams = new HttpParams().set("page",page.toString()).set("perPage",perPage.toString()).set("type",type);
    if(startDate && endDate){
      params = params.set("startDate",startDate).set("endDate",endDate);
    }
    if(lot){
      params = params.set("lot",lot);
    }
    return this.http.get<OutputsOfWarehouse[]>(`${this.endpoint}/quality/warehouses-outputs`,{params,observe:"response"});
  }

  getProcessRecords(page:number,perPage:number,startDate:string,endDate:string,lot:string){
    let params:HttpParams = new HttpParams().set("page",page.toString()).set("perPage",perPage.toString());
    if(startDate && endDate){
      params = params.set("startDate",startDate).set("endDate",endDate);
    }
    if(lot){
      params = params.set("lot",lot);
    }
    return this.http.get<ProcessInventory[]>(`${this.endpoint}/quality/process-records`,{params,observe:"response"});
  }

  getOvensRecords(page:number,perPage:number,startDate:string,endDate:string,lot:string){
    let params:HttpParams = new HttpParams().set("page",page.toString()).set("perPage",perPage.toString());
    if(startDate && endDate){
      params = params.set("startDate",startDate).set("endDate",endDate);
    }
    if(lot){
      params = params.set("lot",lot);
    }
    return this.http.get<OvensInventory[]>(`${this.endpoint}/quality/ovens-records`,{params,observe:"response"});
  }

  getProductEndRecords(page:number,perPage:number,startDate:string,endDate:string,lot:string,type:string){
    let params:HttpParams = new HttpParams().set("page",page.toString()).set("perPage",perPage.toString()).set("type",type);
    if(startDate && endDate){
      params = params.set("startDate",startDate).set("endDate",endDate);
    }
    if(lot){
      params = params.set("lot",lot);
    }
    return this.http.get<ProductEndedIventory[]>(`${this.endpoint}/quality/product-ended/records`,{params,observe:"response"});
  }

  getAllSellers(){
    return this.http.get<{name:string,id:string}[]>(`${this.endpoint}/quality/users-delivers`);
  }

  getProductDelivered(request:DeliveryToSellerRequest,type:string){
    return this.http.post<DeliveryToSeller[]>(`${this.endpoint}/quality/delivery-sellers/records?type=${type}`,request,{observe:"response"});
  }

  reopentToPackagingOvenLot(ovenId:number,status:string){
    return this.http.put(`${this.endpoint}/quality/oven-status/${ovenId}`,{status});
  }

  getProductDevolutionList(page:number,perPage:number,dateStart:string,dateEnd:string){
    let params:HttpParams = new HttpParams().set("page",page.toString()).set("perPage",perPage.toString()).set("dateStart",dateStart).set("dateEnd",dateEnd);
    return this.http.get<DevolutionListItemInterface[]>(`${this.endpoint}/devolution-list`,{params,observe:"response"});
  }

}
