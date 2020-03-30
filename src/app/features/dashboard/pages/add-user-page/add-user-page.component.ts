import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { noWhiteSpace } from "src/app/shared/validators/noSpaceWhite.validator";
import { emailValidator } from "src/app/shared/validators/email.validator";
import { passwordValidator } from "src/app/shared/validators/password.validator";
import { SELECT_ADD_USER_LOADING } from "../../store/add-user-page/add-user.selector";
import { addUser } from "../../store/add-user-page/add-user.action";

@Component({
  selector: "app-add-user-page",
  templateUrl: "./add-user-page.component.html",
  styleUrls: ["./add-user-page.component.scss"]
})
export class AddUserPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}
  loading;
  userForm = this.fb.group({
    email: ["", [Validators.required, noWhiteSpace, emailValidator]],
    password: ["", [Validators.required, passwordValidator]],
    typeUser: ["tipo 1", [Validators.required]]
  });
  listuser: string[] = ["tipo 1", "tipo 2", "tipo 3"];

  ngOnInit(): void {
    this.store
      .select(SELECT_ADD_USER_LOADING)
      .subscribe(tempLoading => (this.loading = tempLoading));
  }

  get email() {
    return this.userForm.get("email");
  }

  get password() {
    return this.userForm.get("password");
  }

  get typeUser() {
    return this.userForm.get("typeUser");
  }

  registerUser() {
    console.log(this.userForm.value);
    this.store.dispatch(addUser({ user: this.userForm.value }));
  }
}
