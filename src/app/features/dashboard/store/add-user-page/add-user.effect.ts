import { Injectable } from "@angular/core";
import { AddUserService } from "src/app/shared/Services/add-user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromAddUserActions from "./add-user.action";
import { exhaustMap, delay, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AddUserEffects {
  constructor(
    private action$: Actions,
    private addUserService: AddUserService,
    private toastr: ToastrService
  ) {}

  addUserEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddUserActions.addUser),
      exhaustMap((action) =>
        this.addUserService.addUser(action.user).pipe(
          switchMap((user) => {
            this.toastr.success("Operación exitosa", "Éxito");
            return [
              fromAddUserActions.addUserSuccess({ result: true }),
              fromAddUserActions.finishAddUser(),
            ];
          }),
          catchError((error) => {
            this.toastr.error(`${error.error.msg}`, "Error");
            return of(
              fromAddUserActions.addUserFailure({ error: error.error.msg }),
              fromAddUserActions.finishAddUser()
            );
          })
        )
      )
    )
  );
}
