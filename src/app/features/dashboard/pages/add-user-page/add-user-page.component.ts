import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { noWhiteSpace } from "src/app/shared/validators/noSpaceWhite.validator";
import { emailValidator } from "src/app/shared/validators/email.validator";
import { passwordValidator } from "src/app/shared/validators/password.validator";
import {
  SELECT_ADD_USER_LOADING,
  SELECT_ADD_USER_RESULT,
  SELECT_ID_SELLER,
} from "../../store/add-user-page/add-user.selector";
import { addSeller, addUser, getIdSeller } from "../../store/add-user-page/add-user.action";
import { role } from "src/app/shared/models/role.interface";
import { notCharacterEspecial } from "src/app/shared/validators/not-character-especial.validator";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-add-user-page",
  templateUrl: "./add-user-page.component.html",
  styleUrls: ["./add-user-page.component.scss"],
})
export class AddUserPageComponent implements OnInit {

  userForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppStateInterface>,
    private toast: ToastrService
  ) {
    this.userForm = this.fb.group({
      name: ["", [Validators.required, notCharacterEspecial]],
      firstName: ["", [Validators.required, notCharacterEspecial]],
      lastName: ["", [Validators.required, notCharacterEspecial]],
      email: ["", [Validators.required, noWhiteSpace, emailValidator]],
      password: ["", [Validators.required, noWhiteSpace]],
      rolId: ["", [Validators.required]],
      job: ["", [Validators.required]],
      clave: [""],
      comision: [{ value: '', disabled: true }]
    });

  }
  loading;
  userId = 0;

  roles: role[] = [
    { name: "Recepción", rolId: 1 },
    { name: "Almacén", rolId: 2 },
    { name: "Formulación", rolId: 3 },
    { name: "Congelamiento", rolId: 4 },
    { name: "Proceso", rolId: 5 },
    { name: "Hornos", rolId: 6 },
    { name: "Empaquetado", rolId: 7 },
    { name: "Calidad", rolId: 8 },
    { name: "Mantenimiento", rolId: 9 },
    { name: "Ventas", rolId: 10 },
    { name: "Administrador", rolId: 11 },
    { name: "Linea de quesos", rolId: 12 }
  ];

  ngOnInit(): void {
    this.store
      .select(SELECT_ADD_USER_LOADING)
      .subscribe((tempLoading) => (this.loading = tempLoading));
    this.store
      .select(SELECT_ADD_USER_RESULT)
      .subscribe((result) => this.clearForm(result));
    this.store
      .select(SELECT_ID_SELLER)
      .subscribe(count => {
        this.clave.setValue(+count);
      }
      );
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

  get rolId() {
    return this.userForm.get("rolId");
  }

  get job() {
    return this.userForm.get("job");
  }

  get clave() {
    return this.userForm.get("clave");
  }

  get comision() {
    return this.userForm.get("comision");
  }

  checkTypeSeller() {
    if (this.rolId.value == 10) {
      this.store.dispatch(getIdSeller());
      this.comision.enable();
    } else {
      this.comision.disable();
    }
  }

  createUser() {
    if (this.rolId.value !== '10') {
      this.registerUser();
    } else {
      this.registerSeller();
    }
  }

  registerSeller() {
    if (this.comision.value === "") {
      this.toast.error("Es necesario agregar comision")
    } else {
      const { ...values } = this.userForm.value;
      this.store.dispatch(addSeller({ user: { ...values } }));
    }
  }

  registerUser() {
    const { ...values } = this.userForm.value;
    this.store.dispatch(addUser({ user: { ...values, clave: this.clave.value } }));
  }

  clearForm(result) {
    if (result) {
      this.userForm.reset();
    }
  }
}
