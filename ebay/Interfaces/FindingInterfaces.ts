import { IAspectFilter } from './GlobalInterfaces';

interface IOperationName {
  'OPERATION-NAME'?: string,
}

interface IItemFilter {
  name?: string;
  paramName?: string;
  paramValue?: string;
  value?: string;
}

interface IFindItemsIneBayStores extends IOperationName {
  aspectFilter?: IAspectFilter;
  categoryId?: string;
  itemFilter?: IItemFilter;
  keywords?: string;
  storeName: string;
}

export {
  IFindItemsIneBayStores,
}