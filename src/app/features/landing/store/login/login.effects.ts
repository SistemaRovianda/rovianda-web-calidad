import { Injectable } from "@angular/core";
import { AuthService } from "src/app/shared/Services/auth.service";
import { Router } from "@angular/router";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as fromLoginActions from "./login.action";
import * as fromUserActions from "src/app/features/landing/store/user/user.actions";
import { exhaustMap, switchMap, catchError, tap, delay } from "rxjs/operators";
import { of, forkJoin, from } from "rxjs";

@Injectable()
export class LoginEffects {
  constructor(
    private auth: AuthService,
    private router: Router,
    private action$: Actions
  ) {}

  signInEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signIn),
      exhaustMap((action) =>
        this.auth.signIn(action.email, action.password).pipe(
          switchMap(({ uid, token }) => {
            return [
              fromLoginActions.startLoad(),
              fromUserActions.loadUser({ uid, token }),
              fromUserActions.loadCurrentToken({ uid }),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  loadCurrentTokenEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromUserActions.loadCurrentToken),
      exhaustMap((action) =>
        this.auth.getTokenCurrentUser().pipe(
          switchMap(({ currentToken }) => {
            localStorage.setItem("token", currentToken);
            return [
              fromUserActions.loadUser({ currentToken }),
              fromLoginActions.signAuthSuccess({ uid: action.uid }),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error })
            )
          )
        )
      )
    )
  );

  signAuthSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signAuthSuccess),
      exhaustMap((action) =>
        this.auth.getUserData(action.uid).pipe(
          switchMap(({ name, lastSurname, firstSurname, rol }) => {
            localStorage.setItem("role", rol);
            return [
              fromUserActions.loadUser({
                name,
                firstSurname,
                lastSurname,
                rol,
              }),
              fromLoginActions.signInSuccess(),
            ];
          }),
          catchError((error) =>
            of(
              fromLoginActions.finishLoad(),
              fromLoginActions.signInFailure({ error })
            )
          )
        )
      )
    )
  );

  signInSuccessEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.signInSuccess),
      exhaustMap((action) =>
        from(this.router.navigate(["/dashboard"])).pipe(
          switchMap((result) =>
            result
              ? [fromLoginActions.finishLoad()]
              : [
                  fromLoginActions.signInFailure({
                    error: "Usuario no valido ",
                  }),
                ]
          )
        )
      )
    )
  );

  signInFailureEffect$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(fromLoginActions.signInFailure),
        tap((action) => localStorage.clear())
      ),
    {
      dispatch: false,
    }
  );

  sigOutEffect$ = createEffect(() =>
    this.action$.pipe(
      ofType(fromLoginActions.singOut),
      exhaustMap((action) =>
        this.auth.signOut().pipe(
          switchMap((res) => [fromUserActions.clearUser()]),
          catchError((err) => of(fromLoginActions.signInFailure(err)))
        )
      )
    )
  );
}
