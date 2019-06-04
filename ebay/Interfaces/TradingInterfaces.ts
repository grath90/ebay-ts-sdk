interface IPagination {
  EntriesPerPage: number,
  PageNumber: number
}

interface IGetAccountInterface {
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
  Pagination?: IPagination;
  MessageID?: string;
  OutputSelector?: string;
  WarningLevel?: string;
};

export {
  IGetAccountInterface,
}