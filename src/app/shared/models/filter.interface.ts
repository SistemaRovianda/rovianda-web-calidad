import { HistorialReception, HistorialReceptionDrief } from "./historial-list.interface";

export interface FilterInterface {
  filter: string;
  loading: boolean;
  typeMaterial: string;
  error: string;
  lotFound: boolean;
  dateIni: string;
  dateFinal: string;
  existDates: boolean;
  receptions:HistorialReception[],
  receptionsDrief:HistorialReceptionDrief[],
  receptionsPacking:any[]
}
