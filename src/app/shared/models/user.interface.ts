export interface UserInterface {
  uid?: string;
  token?: string;
  name?: string;
  firstSurname?: string;
  lastSurname?: string;
  email?: string;
  password?: string;
  phone?: string;
  type?: string;
  role?: string;
  currentToken?: string;
  rol?: string;
}


export interface CodeAccess{
  codeAccessId:number,
  userId:string,
  code:string
}