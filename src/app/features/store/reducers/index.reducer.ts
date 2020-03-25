import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppStateInterface } from 'src/app/shared/models/app-state.interface';
import { userReducer } from './user.reducer';
import { loginReducer } from '../../landing/store/reducers/login.reducer';

export const reducers: ActionReducerMap<AppStateInterface> =  {
    user: userReducer,
    login: loginReducer
};

export const metaReducers: MetaReducer<AppStateInterface>[] = [];
