import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import {
  SELECT_IS_LOADING,
  SELECT_ERRORS
} from "../../store/login/login.selector";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import * as fromLoginActions from "../../store/login/login.action";
import { emailValidator } from "src/app/shared/validators/email.validator";
import { noWhiteSpace } from "src/app/shared/validators/noSpaceWhite.validator";
import { passwordValidator } from "src/app/shared/validators/password.validator";
import { StoreValidators } from "src/app/shared/validators/store.validator";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group(
    {
      email: ["", [Validators.required, emailValidator]],
      password: ["", [Validators.required, noWhiteSpace, passwordValidator]]
    },
    {
      asyncValidators: [
        StoreValidators.hasStoreError(
          this.store.select(SELECT_ERRORS),
          "loginError"
        )
      ]
    }
  );

  loading: boolean;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {
    this.matIconRegistry.addSvgIcon(
      "lock-svg",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../../../../assets/icon-login/lock.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "user-svg",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../../../../../assets/icon-login/user.svg"
      )
    );
  }

  ngOnInit(): void {
    this.store
      .pipe(select(SELECT_IS_LOADING))
      .subscribe(isLoading => (this.loading = isLoading));
  }

  get email() {
    return this.loginForm.get("email");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.store.dispatch(fromLoginActions.signIn(this.loginForm.value));
  }

  recoverPassword() {
    console.log("recuperar contraseña");
  }
}
