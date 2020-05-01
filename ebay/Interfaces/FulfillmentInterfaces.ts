interface ICreateShippingFulfillment {
  lineItems: ILineItems;
  shippedDate?: string;
  shippingCarrierCode?: string;
  trackingNumber: string;
}

interface ILineItems {
  lineItemId: string;
  quantity?: number;
}

export {
  ICreateShippingFulfillment
}