import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { API_ENPOINT_PROVIDER } from "src/app/providers/tokens";
import { AppStateInterface } from "../models/app-state.interface";
import { Store } from "@ngrx/store";
import { selectUID } from "src/app/features/landing/store/user/user.selector";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })
export class DocumentsService {
  url: string;
  uid: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENPOINT_PROVIDER) private endpoint,
    private store: Store<AppStateInterface>
  ) {
    this.url = `${environment.basePath}/report`;
    this.store.select(selectUID).subscribe((uid) => (this.uid = uid));
  }

  createReport(path: string): Observable<any> | null {
    const options = { params: new HttpParams().set("uid", this.uid) };
    return this.http.get(`${this.url}/${path}`, {
      ...options,
      responseType: "arraybuffer",
      observe: "response",
    });
  }
  ///report/entry/packing/{pakingId}
}
