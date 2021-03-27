import { HistorialInterface } from "./historial.interface";

export interface HistorialListInterface {
  
  entrances: any;
  cooling: any;
  outputCoolings:any;
  outputsFormulations:any;
  outputsProcess:any;
  outputsOven:any;
  outputsPackaging:any;
  inspections:any;
  devolutions:any;
  reprocesing:any;
  
  loading: boolean;
  error: string;
  generateHistorial: boolean;
}

export interface HistorialReception{
  id:number,
  proveedor:string,
  loteProveedor:string,
  createdAt:string,
  loteInterno:string,
  rawMaterial:string,
  weight:{
    value:string,
    observations:string,
    accepted:boolean
  }
}

export interface HistorialReceptionDrief{
  id:number,
  proveedor:string,
  loteProveedor:string,
  date:string,
  quantity:number,
  product:{
    description:string,
    mark:string,
    variant:string,
    presentation: string
  }
}

export interface HistorialReceptionPacking{
  id:number,
  proveedor:string,
  loteProveedor:string,
  createdAt:string,
  loteInterno:string,
  rawMaterial:string,
  weight:{
    value:string,
    observations:string,
    accepted:boolean
  }
}