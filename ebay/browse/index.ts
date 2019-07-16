import { Ebay } from '../ebay';
import {
  IAuth,
  IGetAccountInterface,
} from '../Interfaces';

class Browse extends Ebay {
  constructor(options: { apiType: string, auth: IAuth }) {
    super({
      auth: options.auth,
      apiType: 'JSON',
    });
  }

  async search(params): Promise<any> {
    try {
      const callParams = {
        method: 'GET',
        url: 'https://api.ebay.com/buy/browse/v1/item_summary/',
        callInfo: params,
        callName: 'search',
      }

      return this.makeCall(callParams);
    } catch (e) {
      throw e;
    }
  }
}