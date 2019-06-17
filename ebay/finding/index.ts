import { Ebay } from '../ebay';
import {
  IAuth,
  IFindItemsIneBayStores,
} from '../Interfaces';

class Finding extends Ebay {
  constructor(options: { apiType: string, auth: IAuth }) {
    super({
      auth: options.auth,
      apiType: 'XML',
    });
  }

  async findItemsIneBayStores(params: IFindItemsIneBayStores): Promise<any> {
    try {
      const callParams = {
        method: 'GET',
        url: 'https://svcs.ebay.com/services/search/FindingService/v1',
        callInfo: params,
        callName: 'findItemsIneBayStores',
      }

      return this.makeCall(callParams);
    } catch (e) {
      throw e;
    }
  }
}

export { Finding };