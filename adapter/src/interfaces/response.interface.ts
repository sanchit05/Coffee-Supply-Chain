export interface HTTPResponse {
    statusCode: number;
    httpResponseMessage: HTTPResponseMessage;
}
export interface HTTPResponseMessage {
    success: boolean;
    message: string;
    data: any;
}
  