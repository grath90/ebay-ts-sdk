import * as request from 'request-promise';
import { generate, generateQS, generateBulkDataRequest } from './helpers';
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
  apiType: string;
  auth: IAuth;

  constructor(params: IParams) {
    this.params = params;
    this.auth = params.auth
    this.apiType = params.apiType;
  }

  async makeCall(params: ICallParams): Promise<any> {
    try {
      const call: IAPICallParams = this.buildCallParams(params);

      // console.log(call);
      // process.exit();

      const response = await request(call);
      
      const convertedResponse = this.parseResponse(response);
      
      return convertedResponse;
    } catch (e) {
      throw e;
    }
  }

  private buildCallParams(params: ICallParams): IAPICallParams {
    const headers = this.buildHeaders(params);
    const call: IAPICallParams = { 
      url: params.url,
      headers,
      method: params.method,
    };

    if(params.method === 'GET') {
      call.qs = generateQS(params);
    } else {
      if(this.apiType === DataTypes.json) {
        call.body = params.callInfo;
        call.json = true;
        call.headers.Authorization = `TOKEN ${this.auth.token}`;
      } else if(this.apiType === DataTypes.xml && !params.bulkData) {
        call.body = generate(params, this.auth.token);
      } else if (this.apiType === DataTypes.xml && params.bulkData) {
        call.body = generateBulkDataRequest(params);
      } else {
        throw `apiType must be either ${DataTypes.json} or ${DataTypes.xml}`;
      }
    }

    return call;
  }

  private buildHeaders(params: ICallParams): object {
    const headers = {
      api: {
        'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
        'X-EBAY-API-DEV-NAME': this.auth.DevID,
        'X-EBAY-API-APP-NAME': this.auth.AppID,
        'X-EBAY-API-CERT-NAME': this.auth.CertID,
        'X-EBAY-API-SITEID': 0,
        'X-EBAY-API-CALL-NAME': params.callName,
        'Content-Type': this.apiType === 'XML' ? 'text/xml' : 'application/json',
      },
      bulkData: {
        'CONTENT-TYPE': 'XML',
        'X-EBAY-SOA-SECURITY-TOKEN': this.auth.token,
        'X-EBAY-SOA-OPERATION-NAME': params.callName,
        'X-EBAY-SOA-SERVICE-NAME': params.serviceName,
        'X-EBAY-SOA-SERVICE-VERSION': '1.0.0',
      }
    }

    return params.bulkData ? headers.bulkData : headers.api;
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