import { Ebay } from '../ebay';
import {
  IAuth,
  IGetAccountInterface,
} from '../Interfaces';

interface IParams {
  apiType: string;
  auth: IAuth;
}

class Trading extends Ebay {
  constructor (options: IParams) {
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