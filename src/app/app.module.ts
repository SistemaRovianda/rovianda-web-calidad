import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import {
  reducers,
  metaReducers,
} from "./features/store/reducers/index.reducer";
import { EffectsModule } from "@ngrx/effects";
import { effects } from "./features/store/effects/index.effects";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AppProviderModule } from "./providers/app_provider.module";
import { IsAuthGuard } from "./shared/guards/is-auth.guard";
import { AuthGaurd } from "./shared/guards/auth.guard";
import { ToastrModule } from "ngx-toastr";

const DECLARATIONS = [AppComponent];

const IMPORTS = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  AppRoutingModule,
  AngularFireAuthModule,
  StoreModule.forRoot(reducers, {
    metaReducers,
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
    },
  }),
  EffectsModule.forRoot(effects),
  StoreDevtoolsModule.instrument({
    maxAge: 20,
  }),
  HttpClientModule,
  AppProviderModule,
  ToastrModule.forRoot(),
];

@NgModule({
  declarations: DECLARATIONS,
  imports: IMPORTS,
  providers: [AppProviderModule, IsAuthGuard, AuthGaurd],
  bootstrap: [AppComponent],
})
export class AppModule {}
