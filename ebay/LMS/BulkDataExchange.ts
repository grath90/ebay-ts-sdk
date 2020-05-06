import { Ebay } from '../ebay';
import {
  IAuth,
} from '../Interfaces';
import { IStartDownloadJob, IStartDownloadJobResult, IGetJobStatus } from './Interfaces';


class BulkDataExchange extends Ebay {
  BASE_URL: string;

  constructor (auth: IAuth) {
    super({
      auth: auth,
      apiType: 'XML',
    });

    this.BASE_URL = 'https://webservices.sandbox.ebay.com/BulkDataExchangeService';
  }

  async startDownloadJob(params: IStartDownloadJob): Promise<IStartDownloadJobResult> {
    try {
      const options = {
        callInfo: params,
        method: 'POST',
        url: this.BASE_URL,
        callName: 'startDownloadJob',
        bulkData: true,
        serviceName: 'BulkDataExchangeService',
      }

      return this.makeCall(options);
    } catch (error) {
      throw error;
    }
  }

  async getJobStatus(params: IGetJobStatus) {
    const options = {
      callInfo: params,
      method: 'POST',
      url: this.BASE_URL,
      callName: 'GetJobStatus',
    }

    return this.makeCall(options);
  }
}

export { BulkDataExchange }