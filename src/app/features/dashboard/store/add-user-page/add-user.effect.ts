import { Injectable } from "@angular/core";
import { AddUserService } from "src/app/shared/Services/add-user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromAddUserActions from "./add-user.action";
import { exhaustMap, delay, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class AddUserEffects {
  constructor(
    private action$: Actions,
    private addUserService: AddUserService
  ) {}

  addUserEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromAddUserActions.addUser),
      exhaustMap(action =>
        this.addUserService.addUser(action.user).pipe(
          delay(3000),
          switchMap(user => [fromAddUserActions.finishAddUser()]),
          catchError(error =>
            of(
              fromAddUserActions.addUserFailure(error),
              fromAddUserActions.finishAddUser()
            )
          )
        )
      )
    )
  );
}
