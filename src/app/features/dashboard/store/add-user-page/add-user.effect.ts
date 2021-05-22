import { Injectable } from "@angular/core";
import { AddUserService } from "src/app/shared/Services/add-user.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as fromAddUserActions from "./add-user.action";
import { exhaustMap, delay, switchMap, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class AddUserEffects {
  constructor(
    private action$: Actions,
    private addUserService: AddUserService,
    private toastr: c
  ) { }

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

  getIdSeller = createEffect(() => this.action$.pipe(
    ofType(fromAddUserActions.getIdSeller),
    exhaustMap(action => this.addUserService.getIdSeller().pipe(
      tap(o => console.log(o)),
      switchMap(({ count }) => {
        this.toastr.success("Id de vendedor obtenido");
        return [fromAddUserActions.loadIdSeller({ count })];
      }),
      catchError(error => {
        this.toastr.error(`${error.error.msg}`, "Error");
        return of(fromAddUserActions.addUserFailure({ error: error.error.msg }));
      })
    ))
  ));

  addSeller = createEffect(() => this.action$.pipe(
    ofType(fromAddUserActions.addSeller),
    exhaustMap(action => this.addUserService.addSeller(action.user).pipe(
      switchMap(user => {
        this.toastr.success("Operación exitosa", "Éxito");
        return [
          fromAddUserActions.addUserSuccess({ result: true }),
          fromAddUserActions.finishAddUser(),
          fromAddUserActions.loadWarehouses()
        ];
      }),
      catchError(error => {
        this.toastr.error(`${error.error.msg}`, "Error");
        return of(fromAddUserActions.addUserFailure({ error: error.error.msg }),
          fromAddUserActions.finishAddUser());
      })
    ))
  ));

  loadWarehouses$= createEffect(()=>this.action$.pipe(
    ofType(fromAddUserActions.loadWarehouses),
    exhaustMap((action)=>this.addUserService.getAllWarehouses().pipe(
      switchMap((response)=>[fromAddUserActions.setWarehouses({warehouses:response as any[]})]),
      catchError(()=>[fromAddUserActions.setWarehouses({warehouses:[]})])
    ))
  ))

}
