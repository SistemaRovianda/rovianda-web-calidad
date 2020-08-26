import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthorizationTokenInterceptor implements HttpInterceptor {
  token: string;

  constructor() {
    localStorage.getItem("token");
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let request = req;

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", localStorage.getItem("token") || "");

    if (
      localStorage.getItem("token") != "" ||
      localStorage.getItem("token") != null
    ) {
      request = req.clone({
        headers: headers,
      });
    }
    return next.handle(request);
  }
}
