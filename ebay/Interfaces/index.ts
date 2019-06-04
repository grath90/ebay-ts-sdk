import { IGetAccountInterface } from './TradingInterfaces';

/** Interface for Authoriation needed for ebay API */
interface IAuth { 
  DevID: string, 
  AppID: string, 
  CertID: string, 
  token: string
}

/** Interface for params passed to Ebay class constructor */
interface IParams {
  auth: IAuth,
  apiType: string,
}

/** Interface for params passed to makeCall method on ebay class */
interface ICallParams {
  callInfo: any,
  method: string,
  url: string,
  callName: string,
}

/** Interface for object returned after building api call object */
interface IAPICallParams {
  url: string,
  qs?: string,
  body?: any,
  method: string,
  headers: any,
}

export {
  IAuth,
  IParams,
  ICallParams,
  IAPICallParams,
  IGetAccountInterface,
}