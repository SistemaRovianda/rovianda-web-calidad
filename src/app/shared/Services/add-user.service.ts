import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserInterface } from "../models/user.interface";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AddUserService {
  API;

  constructor(private http: HttpClient) {
    this.API = `${environment.basePath}/`;
  }

  addUser(user: UserInterface): Observable<any> {
    return new Observable(observer => {
      console.log(user);
      observer.next(user);
      observer.complete();
    });
  }
}
