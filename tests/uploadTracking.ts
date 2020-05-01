import { Fulfillment } from '../index';
import { config } from '../config';

(async () => {
  const params = {
    auth: config.auth,
    apiType: 'JSON',
  }

  const callParams = {
    trackingNumber: '1Z1601XX0303013307',
    lineItems: {
      lineItemId: '10018362141604',
      quantity: 1
    },
    shipmentCarrierCode: 'UPS',
  }
  try {
    const client = new Fulfillment(params);

    const result = await client.createShippingFulfillment(callParams, '04-03613-92382');
  
    console.log(result); 
  } catch (error) {
    console.log(error);
  }
})();