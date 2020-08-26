import { LoginEffects } from "../../landing/store/login/login.effects";
import { DocumentsEffects } from "../../dashboard/store/historial-page/documents/documents.effects";
import { HistorialEffects } from "../../dashboard/store/historial-page/historial/historial.effects";
import { AddUserEffects } from "../../dashboard/store/add-user-page/add-user.effect";
import { ReportEffects } from '../../dashboard/store/report-page/report.effect';
import { FilterEffect } from '../../dashboard/store/historial-page/filter/filter.effect';

export const effects = [
  LoginEffects,
  DocumentsEffects,
  HistorialEffects,
  AddUserEffects,
  ReportEffects,
  FilterEffect
];
