import { Injectable, Inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { UserInterface } from "../models/user.interface";
import { Observable } from "rxjs";
import { API_ENPOINT_PROVIDER } from "src/app/providers/tokens";
import { AddUser } from "../models/add-user.interface";

@Injectable({
  providedIn: "root",
})
export class AddUserService {
  url: string;

  constructor(
    private http: HttpClient,
    @Inject(API_ENPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/quality`;
  }

  addUser(user: AddUser): Observable<any> {
    console.log(user);
    return this.http.post<any>(`${this.url}/user`, { ...user });
  }
}
