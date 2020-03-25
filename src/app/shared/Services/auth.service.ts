import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { UserInterface } from "../models/user.interface";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  API;

  constructor(private router: Router, private http: HttpClient) {
    this.API = `${environment.basePath}/`;
  }

  userFake: UserInterface = {
    email: "rovianda@gmail.com",
    password: "rovianda123",
    token: "hddskskeokjghskskdn",
    role: "admi",
    uid: "ururjdjsjsjjslanldenimw",
    type: "user"
  };

  signIn(user: string, password: string): Observable<any> {
    return new Observable(observer => {
      if (user === this.userFake.email && password === this.userFake.password) {
        observer.next(this.userFake.uid);
        observer.complete();
      } else {
        throw new Error("The user does not exist");
      }
    });
  }

  getUserData(uid: string): Observable<UserInterface> {
    //return this.http.get<UserInterface>(`${this.API}/${uid}`);

    return new Observable(observer => {
      observer.next(this.userFake);
      observer.complete();
    });
  }

  getTokenCurrentUser(): Observable<any> {
    //return this.http.get<UserInterface>(`${this.API}/${uid}`);

    return new Observable(observer => {
      observer.next(this.userFake.token);
      observer.complete();
    });
  }
}
