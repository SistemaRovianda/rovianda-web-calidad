export interface InventoryItem{
    name:string,
    type_presentation:string,
    lot_id:string,
    units:number,
    weight:number,
    packaging_id:number,
    presentation_id:number
}

export interface InventoryItemEdit{
    name:string,
    type_presentation:string,
    lot_id:string,
    units:number,
    weight:number,
    editing?:boolean,
    packaging_id:number,
    unitsTemp:number,
    weightTemp:number,
    presentation_id:number,
    isUpdating:boolean
}

export interface InventoryItemRequest{
    lot_id:string,
    units:number,
    weight:number,
    packaging_id:number,
    unitsTemp:number,
    weightTemp:number,
    presentation_id:number,
    unitTypeOp:number,
    weightTypeOp:number
}

