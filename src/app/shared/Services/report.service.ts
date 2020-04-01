import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { ReportInterface } from '../models/report.interface';

@Injectable({
  providedIn: "root"
})
export class ReportService {
  API;

  constructor(private http: HttpClient) {
    this.API = `${environment.basePath}/`;
  }

  GetReport(report: ReportInterface): Observable<any> {
    return new Observable(observer => {
      console.log(report);
      observer.next(report);
      observer.complete();
    });
  }
}
