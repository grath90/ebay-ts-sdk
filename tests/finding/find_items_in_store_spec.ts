import { Finding } from '../../index';
import { config } from '../../config';

(async () => {
  const params = {
    auth: config.auth,
    apiType: 'xml',
  }

  const callParams = {
    storeName: 'caridautoparts',
    keywords: 'RAD12',
    'OPERATION-NAME': 'findItemsIneBayStores'
  }
  const ebay = new Finding(params);

  try {
    const result = await ebay.findItemsIneBayStores(callParams);

    console.log(result); 
  } catch (error) {
    console.log(error);
  }
})();