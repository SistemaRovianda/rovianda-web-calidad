import { createReducer, on } from '@ngrx/store';
import { LoginPageInterface } from 'src/app/shared/models/login-page.interface';
import { signIn, finishLoad, signInFailure } from '../actions/login.action';

export const loginReducer = createReducer <LoginPageInterface> (
    {loading: false, errors: null},
    on(signIn, state => ({...state, loading: true})),
    on(finishLoad, state => ({...state, loading: false})),
    on(signInFailure, (state, { reason }) => ({
        ...state,
        loading: false,
        reason
      }))
);
