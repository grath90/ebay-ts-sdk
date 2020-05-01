import * as request from 'request-promise';
import { generate, generateQS } from './helpers';
import * as convert from 'xml2js';
import { DataTypes } from './types';
import {
  IAuth,
  IParams,
  ICallParams,
  IAPICallParams,
} from './Interfaces';

abstract class Ebay {
  params: object;
  headers: any;
  apiType: string;
  auth: IAuth;

  constructor(params: IParams) {
    this.params = params;
    this.auth = params.auth
    this.apiType = params.apiType;
    this.headers = {
        'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
        'X-EBAY-API-DEV-NAME': this.auth.DevID,
        'X-EBAY-API-APP-NAME': this.auth.AppID,
        'X-EBAY-API-CERT-NAME': this.auth.CertID,
        'X-EBAY-API-SITEID': 0,
        'Content-Type': params.apiType === 'XML' ? 'text/xml' : 'application/json',
    }
  }

  async makeCall(params: ICallParams): Promise<object> {
    try {
      this.headers['X-EBAY-API-CALL-NAME'] = params.callName;

      const call: IAPICallParams = this.buildCallParams(params);

      const response = await request(call);
      
      const convertedResponse = this.parseResponse(response);
      
      return convertedResponse;
    } catch (e) {
      throw e;
    }
  }

  private buildCallParams(params: ICallParams): IAPICallParams {
    const call: IAPICallParams = { 
      url: params.url,
      headers: this.headers,
      method: params.method,
    };

    if(params.method === 'GET') {
      call.qs = generateQS(params);
    } else {
      if(this.apiType === DataTypes.json) {
        call.body = params.callInfo;
        call.json = true;
        call.headers.Authorization = `TOKEN ${this.auth.token}`;
      } else if(this.apiType === DataTypes.xml) {
        call.body = generate(params, this.auth.token);
      } else {
        throw `apiType must be either ${DataTypes.json} or ${DataTypes.xml}`;
      }
    }

    return call;
  }

  private parseResponse(response: any): object {
    let convertedResponse: any;
    try {
      if(this.apiType === 'XML') {
        convert.parseString(response, (err, result) => {
          if (err) throw err;
          convertedResponse = result;
        });
      } else {
        convertedResponse = response;
      }
    } catch (error) {
      throw error;
    }

    return convertedResponse;
  }
}

export { Ebay };