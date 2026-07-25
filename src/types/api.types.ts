import { APIResponse } from '@playwright/test';

export interface IApiClient {
  get<T = unknown>(endpoint: string, options?: IApiRequestOptions): Promise<IApiResponse<T>>;
  post<T = unknown>(endpoint: string, body?: unknown, options?: IApiRequestOptions): Promise<IApiResponse<T>>;
  put<T = unknown>(endpoint: string, body?: unknown, options?: IApiRequestOptions): Promise<IApiResponse<T>>;
  patch<T = unknown>(endpoint: string, body?: unknown, options?: IApiRequestOptions): Promise<IApiResponse<T>>;
  delete<T = unknown>(endpoint: string, options?: IApiRequestOptions): Promise<IApiResponse<T>>;
}

export interface IApiRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  timeout?: number;
  failOnStatusCode?: boolean;
  multipart?: Record<string, unknown>;
  form?: Record<string, string | number | boolean>;
}

export interface IApiResponse<T = unknown> {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: T;
  responseTime: number;
  ok: boolean;
  raw: APIResponse;
}

export interface IApiInterceptor {
  onRequest?(config: IApiRequestConfig): IApiRequestConfig;
  onResponse?<T>(response: IApiResponse<T>): IApiResponse<T>;
  onError?(error: ApiError): void;
}

export interface IApiRequestConfig {
  method: HttpMethod;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response?: IApiResponse,
    public readonly request?: IApiRequestConfig,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface IApiBuilder {
  setBaseUrl(url: string): IApiBuilder;
  setHeader(key: string, value: string): IApiBuilder;
  setHeaders(headers: Record<string, string>): IApiBuilder;
  setParam(key: string, value: string | number | boolean): IApiBuilder;
  setParams(params: Record<string, string | number | boolean>): IApiBuilder;
  setBody(body: unknown): IApiBuilder;
  setTimeout(timeout: number): IApiBuilder;
  setMethod(method: HttpMethod): IApiBuilder;
  setEndpoint(endpoint: string): IApiBuilder;
  addInterceptor(interceptor: IApiInterceptor): IApiBuilder;
  build(): IApiRequestConfig;
}
