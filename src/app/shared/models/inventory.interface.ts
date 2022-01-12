export interface InventoryItem{
    name:string,
    type_presentation:string,
    lot_id:string,
    units:number,
    weight:number,
    packaging_id:number,
    presentation_id:number,
    register_date:string
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
    isUpdating:boolean,
    register_date:string
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



export interface InventoryTypeQuality{
    id:number,
    createAt:string,
    status:string,
    statusTemp:string,
    lotIntern?:string,
    lotInternTemp?:string,
    lotProvider:string,
    provider:string,
    quantity:number,
    receiver:string,
    temp?:string,
    fridgeIdTemp?:number,
    fridgeId?:number,
    fridgeDescription?: string;
    description:string,
    isEditing:boolean,
    lotProviderTemp: string,
    quantityTemp: number,
    isLoading:boolean
}

export interface ProductCatalog{
    id:number,
    status:number,
    name:String
}

export interface ProductQualityDetails{
    name:string,
    presentations:ProductQualityPresentationDetails[],
    ingredients:ProductQualityIngredientDetails[]
}
export interface ProductQualityPresentationDetails{
    presentation:string,
    code:string
}
export interface ProductQualityIngredientDetails{
    id:number,
    productName:string,
    mark:string,
    presentation:string,
    variant:string
}

export interface IngredientQuality{
    id?:number,
    productId?:number,
    productName:string,
    nameProduct?:string,
    variant:string,
    mark:string,
    presentation:string
}

export interface NewIngredientQuality{
    productId?:number,
    productName:string,
    variant:string,
    mark:string,
    presentation:string
}

export interface OutputsOfWarehouse{
    name:string,
    outputDate:string,
    quantity?:string,
    status?:string,
    lot:string
}
export interface ProcessInventory{
    id:number,
    name:string,
    lotDay:string,
    currentProcess:string,
    statusProcess:string,
    createAt:string,
    isLoading:boolean
}

export interface OvensInventory{
    id:number,
    antLot:string,
    newLot:string,
    status:string,
    createAt:string,
    name:string;
    isEditing:boolean,
    statusTemp:string,
    newLotTemp:string,
    isLoading:boolean
}
export interface ProductEndedIventory{
    id?:number,
    weight:number,
    units:number,
    name:string,
    presentation:string,
    lot:string,
    registerDate:string,
    isLoading:boolean
}



export interface DeliveryToSeller{
    id:number,
    loteId:string,
    outputDate:string,
    quantity:number,
    weight:number,
    productName:string,
    presentation:string,
    name:string
}
export interface DeliveryToSellerRequest{
    sellers:string[],
    lot?:string,
    startDate?:string,
    endDate?:string
    page:number,
    perPage:number
}

export interface DevolutionListItemInterface{
    devolutionId:number,
    units:number,
    weight:number,
    lot:string,
    date:string,
    name:string,
    presentation:string
}