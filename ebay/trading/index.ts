import { Ebay } from '../ebay';
import {
  IAuth,
  IGetAccountInterface,
} from '../Interfaces';

class Trading extends Ebay {
  constructor (options: { apiType: string, auth: IAuth }) {
    super({
      auth: options.auth,
      apiType: 'XML',
    });
  }

  async getAccount(params: IGetAccountInterface): Promise<any> {
    try {
      const callParams = {
        method: 'POST',
        url: 'https://api.ebay.com/ws/api.dll',
        callInfo: params,
        callName: 'GetAccount',
      }
      return this.makeCall(callParams)
    } catch (e) {
      throw e;
    }
  }
}

export { Trading };