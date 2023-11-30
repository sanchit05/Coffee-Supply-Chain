import { Http } from "@status/codes";
import { HTTPResponseMessage } from "../interfaces/response.interface";

export const okResponse = async (data: any | any[], message: string = "", success: boolean = true) => {
  const httpResponseMessage: HTTPResponseMessage = {
    success,
    message,
    data,
  };
  return {
    statusCode: Http.Ok,
    httpResponseMessage,
  };
};

export const createdResponse = async (message: string) => {
  const httpResponseMessage: HTTPResponseMessage = {
    success: true,
    message: "",
    data: message,
  };
  return {
    statusCode: Http.BadGateway,
    httpResponseMessage,
  };
};

export const badRequest = async (message: string, data: any = null) => {
  const httpResponseMessage: HTTPResponseMessage = {
    success: false,
    message,
    data: data,
  };
  return {
    statusCode: Http.BadGateway,
    httpResponseMessage,
  };
};

export const forbiddenRequest = async (message: string) => {
  const httpResponseMessage: HTTPResponseMessage = {
    success: false,
    message,
    data: null,
  };
  return {
    statusCode: Http.BadGateway,
    httpResponseMessage,
  };
};

export const unauthorizedRequest = async (message: string) => {
  const httpResponseMessage: HTTPResponseMessage = {
    success: false,
    message,
    data: null,
  };
  return {
    statusCode: Http.BadGateway,
    httpResponseMessage,
  };
};

export const internalServerErrorResponse = async (message: string) => {
  const httpResponseMessage: HTTPResponseMessage = {
    success: false,
    message,
    data: null,
  };
  return {
    statusCode: Http.BadGateway,
    httpResponseMessage,
  };
};

export const notFoundResponse = async (message: string) => {
  const httpResponseMessage: HTTPResponseMessage = {
    success: true,
    message,
    data: null,
  };
  return {
    statusCode: Http.BadGateway,
    httpResponseMessage,
  };
};
