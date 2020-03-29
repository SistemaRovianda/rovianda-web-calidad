import { LoginEffects } from "../../landing/store/login/login.effects";
import { DocumentsEffects } from "../../dashboard/store/historial-page/documents/documents.effects";
import { HistorialEffects } from "../../dashboard/store/historial-page/historial/historial.effects";

export const effects = [LoginEffects, DocumentsEffects, HistorialEffects];
