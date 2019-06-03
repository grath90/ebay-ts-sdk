import { Ebay } from '../ebay';

interface Pagination {
  EntriesPerPage: number,
  PageNumber: number
}

interface GetAccountInterface {
  AccountEntrySortType?: string;
  AccountHistorySelection: string;
  BeginDate?: string;
  Currency?: string;
  EndDate?: string;
  ExcludeBalance?: boolean;
  ExcludeSummary?: boolean;
  IncludeConversionRate?: boolean;
  InvoiceDate?: string;
  ItemID?: string;
  Pagination?: Pagination;
  MessageID?: string;
  OutputSelector?: string;
  WarningLevel?: string;
};

interface IParams {
  meta: object;
  callInfo: GetAccountInterface;
  apiType: string;
  auth: object;
}

class GetAccount extends Ebay {
  constructor (options: IParams) {
    super({
      callInfo: options.callInfo,
      auth: options.auth,
      callName: 'GetAccount',
      method: 'POST',
      endpoint: 'https://api.ebay.com/ws/api.dll',
      apiType: 'XML',
    });
  }
}

export { GetAccount };