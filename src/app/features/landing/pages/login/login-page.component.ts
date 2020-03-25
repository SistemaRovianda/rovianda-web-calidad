import { Component, OnInit } from "@angular/core";
import { MatIconRegistry } from "@angular/material";
import { DomSanitizer } from "@angular/platform-browser";
import { FormBuilder, Validators } from "@angular/forms";
import { Store, select } from "@ngrx/store";
import { selectIsLoading } from "../../store/selectors/login.selector";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import * as fromLoginActions from "../../store/actions/login.action";

@Component({
  selector: "app-login-page",
  templateUrl: "./login-page.component.html",
  styleUrls: ["./login-page.component.scss"]
})
export class LoginPageComponent implements OnInit {
  loginForm = this.fb.group({
    nickUser: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

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
      .pipe(select(selectIsLoading))
      .subscribe(isLoading => (this.loading = isLoading));
  }

  get nickUser() {
    return this.loginForm.get("nickUser");
  }

  get password() {
    return this.loginForm.get("password");
  }

  onLogin() {
    console.log(this.loginForm.value);
    this.store.dispatch(fromLoginActions.signIn(this.loginForm.value));
  }
}
