export interface ReceptionMaterialInterface{
    entranceId:number,
    date:string,
    provider:string,
    productName:string,
    lotIntern:string,
    lotProvider:string,
    evidence:string,
    qualityInspector:string,
    area:string,
    propertiesEvaluated:PropertyEvaluatedType1[],
    desplegated?:boolean,
    status:string,
    outputsToFormulation?:OutputsByEntrance[],
    pageIndex:number,
    pageIndexProcess:number,
    pageIndexOvens:number,
    pageIndexProductEnded:number,
    totalFormulations:number,
    totalProcess:number,
    totalOvens:number,
    totalProductEnded:number,
    process?:ProcessFormulation[]
}

export interface PropertyEvaluatedType1{
    accepted:boolean,
    observations:string,
    property:string,
    value?:string,
    fridge?:string
}
export interface OutputsByEntrance{
    id:number,
    temp:number,
    date:string,
    waterTemp:number,
    status:string,
    lotDay:string,
    type:string,
    ingredientsProcessIds:string,
    name:string,
    verifyBy:string,
    makedBy:string,
    productId:number,
    ingredients:IngredientsFormulation[],
    isLoading:boolean
}

export interface IngredientsFormulation{
    productName:string,
    lotProvider:string,
    dateOutput:string,
    observations:string
}
export interface ProcessFormulation{
    id:number,
    status:string,
    currentProcess:string,
    createAt:string,
    typeProcess:string,
    productName:string,
    productId:number
}

export interface EntranceOutputsOven{
    id:number,
    estimatedTime:string,
    newLote:string,
    pcc:string,
    oven:string,
    date:string,
    status:string,
    observations:string,
    productId:number,
    productName:string
}

export interface EntranceOutputPackingFromOven{
    id:number,
    registerDate:string,
    lotId:string,
    expiration:string,
    productId:number,
    productName:string,
    presentation:string,
    quantity:number,
    uniMed:string
}