import * as request from 'request-promise';
import { generate, generateQS } from './helpers';
import * as convert from 'xml2js';
import { DataTypes } from './types';

interface IParams {
  callInfo: object,
  auth: object,
  apiType: string,
  callName: string,
  method: string,
  endpoint: string,
}

class Ebay {
  params: any
  call: any;
  constructor(params: IParams) {
    this.params = params

    this.call = {
      method: this.params.method,
      url: this.params.endpoint,
      headers: {
        'X-EBAY-API-COMPATIBILITY-LEVEL': 967,
        'X-EBAY-API-DEV-NAME': this.params.auth.DevID,
        'X-EBAY-API-APP-NAME': this.params.auth.AppID,
        'X-EBAY-API-CALL-NAME': this.params.callName,
        'X-EBAY-API-CERT-NAME': this.params.auth.CertID,
        'X-EBAY-API-SITEID': 0,
        'Content-Type': this.params.apiType === 'XML' ? 'text/xml' : 'application/json',
      },
    }
  }

  async makeCall(): Promise<any> {
    try {
      this.buildCallParams(this.params);

      const response = await request(this.call);

      const convertedResponse = this.parseResponse(response);
      
      return convertedResponse;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  private buildCallParams(params: any): void {
    if(params.method === 'GET') {
      this.call.qs = generateQS(params);
    } else {
      if(params.apiType === DataTypes.json) {
        this.call.body = params.callInfo;
      } else if(params.apiType === DataTypes.xml) {
        this.call.body = generate(params);
      } else {
        throw `apiType must be either ${DataTypes.json} or ${DataTypes.xml}`;
      }
    }
  }

  private parseResponse(response: any): object {
    let convertedResponse: any;
    try {
      if(this.params.apiType === 'XML') {
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
} // end ebay class

export { Ebay };