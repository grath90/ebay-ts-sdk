import { Ebay } from '../ebay';
import {
  IAuth,
  ICreateShippingFulfillment,
} from '../Interfaces';

class Fulfillment extends Ebay {
  BASE_URL: string;
  
  constructor (options: { apiType: string, auth: IAuth }) {
    super({
      auth: options.auth,
      apiType: 'JSON',
    });

    this.BASE_URL = 'https://api.ebay.com/sell/fulfillment/v1';
  }

  async createShippingFulfillment(params: ICreateShippingFulfillment, orderId: string): Promise<any> {
    try {
      const callParams = {
        method: 'POST',
        url: `${this.BASE_URL}/order/${orderId}/shipping_fulfillment`,
        callName: 'getShippingFulfillment',
        callInfo: params,
      }

      return this.makeCall(callParams);
    } catch (e) {
      throw e;
    }
  }
}

export { Fulfillment };