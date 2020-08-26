import { Injectable, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { HistorialListInterface } from "../models/historial-list.interface";
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

  searchLot(lot: string, path: string): Observable<any> {
    return this.http.get<any>(`${this.url}/history/${path}/${lot}`);
  }

  downloadHistorialService(historial: HistorialInterface[]): Observable<any> {
    return new Observable((observer) => {
      console.log(historial);
      observer.next(historial);
      observer.complete();
    });
  }
}
