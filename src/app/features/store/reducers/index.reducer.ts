import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AppStateInterface } from "src/app/shared/models/app-state.interface";
import { userReducer } from "../../landing/store/user/user.reducer";
import { loginReducer } from "../../landing/store/login/login.reducer";
import { historialReducer } from "../../dashboard/store/historial-page/historial/historial.reducer";
import { documentsReducer } from "../../dashboard/store/historial-page/documents/documents.reducer";
import { filterReducer } from "../../dashboard/store/historial-page/filter/filter.reducer";
import { addUserReducer } from "../../dashboard/store/add-user-page/add-user.reducer";
import { reportReducer } from "../../dashboard/store/report-page/report.reducer";

export const reducers: ActionReducerMap<AppStateInterface> = {
  user: userReducer,
  login: loginReducer,
  historial: historialReducer,
  documents: documentsReducer,
  filterHistorialPage: filterReducer,
  add_user: addUserReducer,
  report: reportReducer
};

export const metaReducers: MetaReducer<AppStateInterface>[] = [];
