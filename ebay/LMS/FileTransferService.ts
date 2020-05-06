import { Ebay } from '../ebay';
import { IAuth } from '../Interfaces';
import { IDownloadFile, IDownloadFileResult } from './Interfaces'

class FileTransferService extends Ebay {
  BASE_URL: string;

  constructor (options: { apiType: string, auth: IAuth }) {
    super({
      auth: options.auth,
      apiType: 'XML',
    });

    this.BASE_URL = 'https://www.ebay.com/marketplace/services';
  }

  async downloadFile(params: IDownloadFile): Promise<IDownloadFileResult> {
    try {
      const options = {
        callInfo: params,
        method: 'POST',
        url: this.BASE_URL,
        callName: 'DownloadFile',
      }

      return this.makeCall(options);
    } catch (error) {
      throw error;
    }
  }
}

export { FileTransferService }