import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { noWhiteSpace } from "src/app/shared/validators/noSpaceWhite.validator";
import { emailValidator } from "src/app/shared/validators/email.validator";
import { passwordValidator } from "src/app/shared/validators/password.validator";
import {
  SELECT_ADD_USER_LOADING,
  SELECT_ADD_USER_RESULT,
} from "../../store/add-user-page/add-user.selector";
import { addUser } from "../../store/add-user-page/add-user.action";
import { role } from "src/app/shared/models/role.interface";
import { notCharacterEspecial } from "src/app/shared/validators/not-character-especial.validator";

@Component({
  selector: "app-add-user-page",
  templateUrl: "./add-user-page.component.html",
  styleUrls: ["./add-user-page.component.scss"],
})
export class AddUserPageComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>
  ) {}
  loading;
  userForm = this.fb.group({
    name: ["", [Validators.required, notCharacterEspecial]],
    firstName: ["", [Validators.required, notCharacterEspecial]],
    lastName: ["", [Validators.required, notCharacterEspecial]],
    email: ["", [Validators.required, noWhiteSpace, emailValidator]],
    password: ["", [Validators.required, noWhiteSpace]],
    role: ["", [Validators.required]],
    job: ["", [Validators.required]],
  });
  roles: role[] = [
    { name: "Formulación", rol: "FORMULATION" },
    { name: "Hornos", rol: "OVEN" },
    { name: "Congelamiento", rol: "COOLING" },
    { name: "Calidad", rol: "QUALITY" },
    { name: "Almacén", rol: "WAREHOUSE" },
    { name: "Recepción", rol: "RECEPTION" },
    { name: "Proceso", rol: "PROCESS" },
    { name: "Empaquetado", rol: "PACKAGING" },
    { name: "Mantenimiento", rol: "MANTENIMENT" },
    { name: "Ventas", rol: "SALESUSER" },
  ];

  ngOnInit(): void {
    this.store
      .select(SELECT_ADD_USER_LOADING)
      .subscribe((tempLoading) => (this.loading = tempLoading));
    this.store
      .select(SELECT_ADD_USER_RESULT)
      .subscribe((result) => this.clearForm(result));
  }

  get name() {
    return this.userForm.get("name");
  }

  get firstName() {
    return this.userForm.get("firstName");
  }

  get lastName() {
    return this.userForm.get("lastName");
  }

  get email() {
    return this.userForm.get("email");
  }

  get password() {
    return this.userForm.get("password");
  }

  get role() {
    return this.userForm.get("role");
  }

  get job() {
    return this.userForm.get("job");
  }

  registerUser() {
    const { role, ...values } = this.userForm.value;
    this.store.dispatch(addUser({ user: { rol: role, ...values } }));
  }

  clearForm(result) {
    if (result) {
      this.userForm.reset();
    }
  }
}
