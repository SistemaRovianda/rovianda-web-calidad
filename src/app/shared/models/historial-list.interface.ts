import { HistorialInterface } from "./historial.interface";

export interface HistorialListInterface {
  historial: HistorialInterface[];
  loading: boolean;
  error: string;
  generateHistorial: boolean;
}
