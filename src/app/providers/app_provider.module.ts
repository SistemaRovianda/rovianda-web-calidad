import { NgModule } from "@angular/core";
import { API_ENPOINT_PROVIDER } from "./tokens";
import { environment } from "src/environments/environment";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthorizationTokenInterceptor } from "./interceptor";

@NgModule({
  imports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationTokenInterceptor,
      multi: true,
    },
    {
      provide: API_ENPOINT_PROVIDER,
      useValue: environment.basePath,
    },
  ],
})
export class AppProviderModule {}
