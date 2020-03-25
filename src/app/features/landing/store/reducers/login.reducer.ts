import { createReducer, on } from '@ngrx/store';
import { LoginPageInterface } from 'src/app/shared/models/login-page.interface';
import { signIn, finishLoad, signInFailure } from '../actions/login.action';

export const loginReducer = createReducer <LoginPageInterface> (
    {loading: false, error: null},
    on(signIn, state => ({...state, loading: true})),
    on(finishLoad, state => ({...state, loading: false})),
    on(signInFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
      }))
);
