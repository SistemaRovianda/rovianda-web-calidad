import { Injectable, Inject, HostListener } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { UserInterface } from "../models/user.interface";
import * as firebase from "firebase/app";
import "firebase/auth";
import Auth = firebase.auth.Auth;
import { API_ENPOINT_PROVIDER } from "src/app/providers/tokens";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  url: string;
  auth: Auth;

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(API_ENPOINT_PROVIDER) private endpoint
  ) {
    this.url = `${endpoint}/user`;
    firebase.initializeApp({
      apiKey: "AIzaSyDtp99_k4WaCJWR8d4FncfRpkA4sJTt23c",
      authDomain: "sistema-rovianda.firebaseapp.com",
       /*apiKey: "AIzaSyDaoKnC-MSM0b069pawJ5KI1eWlbmng99o",
       authDomain: "rovianda-88249.firebaseapp.com",*/
    });
    

    this.auth = firebase.auth();
    //this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
  }

  @HostListener('window:beforeunload')
  closeSession(){
    localStorage.clear();
    this.auth.signOut()
  }

  getCurrentUser(){
    return this.auth.currentUser;
  }

  signIn(email: string, password: string): Observable<any> {
    return from(
      this.auth
        .signInWithEmailAndPassword(email, password)
        .then((userCrendentials) =>
          Promise.all([
            Promise.resolve(userCrendentials.user.uid),
            Promise.resolve(userCrendentials.user.refreshToken),
          ])
        )
    ).pipe(map(([uid, token]) => ({ uid, token })));
  }

  getUserData(uid: string): Observable<UserInterface> {
    return this.http.get<UserInterface>(`${this.url}/${uid}`);
  }

  isAuth(): boolean {
    return (
      localStorage.getItem("token") != null &&
      localStorage.getItem("role") === "QUALITY"
    );
  }

  getTokenCurrentUser(): Observable<any> {
    return from(
      this.auth.currentUser
        .getIdToken()
        .then((res) => Promise.all([Promise.resolve(res)]))
        .catch((error) => Promise.all(error))
    ).pipe(map(([currentToken]) => ({ currentToken })));
  }

  signOut(): Observable<any> {
    localStorage.clear();
    return from(
      this.auth.signOut().then((res) => {
        this.router.navigate(["/login"], { replaceUrl: true });
      })
    );
  }
}
