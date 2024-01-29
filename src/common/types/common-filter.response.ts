export interface CommonFilterResponse {
  status: number;
  timestamp: number;
  path: string;
  name: string;
  message?: string | string[];
  expiredAt?: string;
}

export class CommonFilterResponse {
  constructor(
    status: number,
    requestUrl: string,
    exceptionName: string,
    message?: string | string[],
  ) {
    this.status = status;
    this.timestamp = Date.now();
    this.path = requestUrl;
    this.name = exceptionName;
    this.message = message;
  }
}
