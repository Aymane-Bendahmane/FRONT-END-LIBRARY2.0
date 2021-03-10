export enum DataStateEnuM {
  LOADING,
  LOADED,
  ERROR,
}

export interface  AppDataState<T> {
  dataState?: DataStateEnuM,
  data?:T,//type T ca peut etre liste de livres et ca peut etre d'autre chose
  errorMessage?:string
  //?=>veux dire que la présence des ces variables dans l'objet est facultatif
}
