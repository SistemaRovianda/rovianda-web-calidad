import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { HistorialListInterface, HistorialReception } from "../models/historial-list.interface";
import { HistorialInterface } from "../models/historial.interface";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { API_ENPOINT_PROVIDER } from "src/app/providers/tokens";

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
}
