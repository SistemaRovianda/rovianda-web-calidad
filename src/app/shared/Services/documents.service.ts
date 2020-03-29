import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DocumentInterface } from "../models/document.interface";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DocumentsService {
  API;

  constructor(private http: HttpClient) {
    this.API = `${environment.basePath}/`;
  }

  Documents: DocumentInterface[] = [
    {
      id: 1,
      name: "Recepcion de materiales primos"
    },
    {
      id: 2,
      name: "Bitacora de control de trabajo "
    },
    {
      id: 3,
      name: "Inspeccion de producto terminado y salida"
    },
    {
      id: 4,
      name: "Recepcion de materia prima carnicos"
    },
    {
      id: 5,
      name:
        "Bitacora de control de calidad de calidad conocimiento del producto"
    },
    {
      id: 6,
      name: "Bitacora de control de calidad de almacen de empaques"
    }
  ];

  getDocuments(): Observable<DocumentInterface[]> {
    return new Observable(observe => {
      observe.next(this.Documents);
      observe.complete();
    });
  }

  downloadDocument(document: DocumentInterface): Observable<any> {
    return new Observable(observer => {
      observer.next(document);
      observer.complete();
    });
  }
}
