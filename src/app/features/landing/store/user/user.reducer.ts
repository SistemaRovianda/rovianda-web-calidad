import { createReducer, on } from '@ngrx/store';
import { UserInterface } from 'src/app/shared/models/user.interface';
import { loadUser, clearUser } from './user.actions';

const stateInitialUser: UserInterface =  {
    uid: null,
    token: null,
    name: null,
    firstSurname: null,
    lastSurname: null,
    email: null,
    phone: null,
    type: null,
    role: null
};

export const userReducer = createReducer<UserInterface>(
    stateInitialUser,
    on(loadUser, (state, userCredential) => ({...state, ...userCredential})),
    on(clearUser, state => ({...state, ...stateInitialUser}))
);
