import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { HistorialListInterface } from "../models/historial-list.interface";
import { HistorialInterface } from "../models/historial.interface";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class HistorialService {
  API;

  constructor(private router: Router, private http: HttpClient) {
    this.API = `${environment.basePath}/`;
  }

  historial: HistorialInterface[] = [
    {
      date: "15/03/2020",
      stateHistorial: "Entrada refrigerador"
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada recepcion"
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada refrigerador"
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada recepcion"
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada refrigerador"
    },
    {
      date: "15/03/2020",
      stateHistorial: "Entrada refrigerador"
    }
  ];

  getHistorial(): Observable<HistorialInterface[]> {
    return new Observable(observer => {
      observer.next(this.historial);
      observer.complete();
    });
  }

  downloadHistorialService(historial: HistorialInterface[]): Observable<any> {
    return new Observable(observer => {
      console.log(historial)
      observer.next(historial);
      observer.complete();
    });
  }
}
