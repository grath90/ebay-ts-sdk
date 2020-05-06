interface IStartDownloadJob {
  downloadJobType: string;
  downloadRequestFilter?: IDownloadRequestFilter;
}

interface IGetJobStatus {
  jobId: string;
}

interface IDownloadFile {
  fileReferenceId: string;
  taskReferenceId: string;
}

interface IDownloadRequestFilter {
  feeSettlementReportFilter?: IFeeSettlementReportFilter;
}

interface IFeeSettlementReportFilter {
  startTime: string;
}

interface IDownloadFileResult {
  fileAttachment: {
    Data: any;
    Size: number;
  }
}

interface IStartDownloadJobResult {
  jobId: string;
  ack: string;
  errorMessage?: IError;
  timestamp: string;
  version: string;
}

interface IGetJobStatusResult {
  jobProfile: {
    completionTime?: string;
    creationTime: string;
    errorCount?: number;
    fileReferenceId?: string;
    jobId: string;
    jobStatus: string;
    jobType: string;
    percentComplete: string;
  }
}

interface IError {
  error: {
    category: string;
    domain: string;
    errorId: number;
    exceptionId: string;
    message: string;
    parameter: string;
    severity: string;
    subdomain: string;
  }
}

export {
  IGetJobStatus,
  IDownloadFile,
  IStartDownloadJob,
  IDownloadFileResult,
  IGetJobStatusResult,
  IStartDownloadJobResult,
}