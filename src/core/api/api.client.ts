import { APIRequestContext, APIResponse, request } from '@playwright/test';
import {
  IApiClient,
  IApiRequestOptions,
  IApiResponse,
  IApiInterceptor,
  IApiRequestConfig,
  ApiError,
  HttpMethod,
} from '../../types/api.types';
import { EnvConfig } from '../../config/env.config';
import { Logger } from '../logger';
import { MESSAGES } from '../../constants/messages';

export class ApiClient implements IApiClient {
  private requestContext: APIRequestContext | null = null;
  private readonly logger = Logger.getInstance('api');
  private readonly baseUrl: string;
  private readonly timeout: number;
  private readonly interceptors: IApiInterceptor[] = [];
  private defaultHeaders: Record<string, string> = {};

  constructor(baseUrl?: string, timeout?: number) {
    const config = EnvConfig.getInstance();
    this.baseUrl = baseUrl || config.get('apiBaseUrl');
    this.timeout = timeout || config.get('apiTimeout');
  }

  public addInterceptor(interceptor: IApiInterceptor): void {
    this.interceptors.push(interceptor);
  }

  public setDefaultHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  public setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  public async get<T = unknown>(
    endpoint: string,
    options?: IApiRequestOptions,
  ): Promise<IApiResponse<T>> {
    return this.sendRequest<T>('GET', endpoint, undefined, options);
  }

  public async post<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: IApiRequestOptions,
  ): Promise<IApiResponse<T>> {
    return this.sendRequest<T>('POST', endpoint, body, options);
  }

  public async put<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: IApiRequestOptions,
  ): Promise<IApiResponse<T>> {
    return this.sendRequest<T>('PUT', endpoint, body, options);
  }

  public async patch<T = unknown>(
    endpoint: string,
    body?: unknown,
    options?: IApiRequestOptions,
  ): Promise<IApiResponse<T>> {
    return this.sendRequest<T>('PATCH', endpoint, body, options);
  }

  public async delete<T = unknown>(
    endpoint: string,
    options?: IApiRequestOptions,
  ): Promise<IApiResponse<T>> {
    return this.sendRequest<T>('DELETE', endpoint, undefined, options);
  }

  public async dispose(): Promise<void> {
    if (this.requestContext) {
      await this.requestContext.dispose();
      this.requestContext = null;
    }
  }

  private async getContext(): Promise<APIRequestContext> {
    if (!this.requestContext) {
      this.requestContext = await request.newContext({
        baseURL: this.baseUrl,
        extraHTTPHeaders: this.defaultHeaders,
      });
    }
    return this.requestContext;
  }

  private async sendRequest<T>(
    method: HttpMethod,
    endpoint: string,
    body?: unknown,
    options?: IApiRequestOptions,
  ): Promise<IApiResponse<T>> {
    const startTime = Date.now();
    const url = this.buildUrl(endpoint, options?.params);
    const headers = { ...this.defaultHeaders, ...options?.headers };

    let requestConfig: IApiRequestConfig = { method, url, headers, body, params: options?.params };
    for (const interceptor of this.interceptors) {
      if (interceptor.onRequest) {
        requestConfig = interceptor.onRequest(requestConfig);
      }
    }

    this.logger.info(`${MESSAGES.info.API_REQUEST_SENT}${method} ${url}`);
    this.logger.debug('Request details', { method, url, headers: requestConfig.headers });

    const context = await this.getContext();
    let rawResponse: APIResponse;

    try {
      rawResponse = await this.executeRequest(
        context,
        method,
        endpoint,
        requestConfig.body,
        {
          ...options,
          headers: requestConfig.headers,
        },
      );
    } catch (error) {
      const apiError = new ApiError(
        `${MESSAGES.errors.API_REQUEST_FAILED}${method} ${url}: ${error instanceof Error ? error.message : String(error)}`,
        0,
        undefined,
        requestConfig,
      );

      for (const interceptor of this.interceptors) {
        if (interceptor.onError) {
          interceptor.onError(apiError);
        }
      }

      throw apiError;
    }

    const responseTime = Date.now() - startTime;
    let response = await this.buildResponse<T>(rawResponse, responseTime);

    for (const interceptor of this.interceptors) {
      if (interceptor.onResponse) {
        response = interceptor.onResponse(response);
      }
    }

    this.logger.info(
      `${MESSAGES.info.API_RESPONSE_RECEIVED}${method} ${url} [${response.status}] (${responseTime}ms)`,
    );

    if (options?.failOnStatusCode !== false && !response.ok) {
      throw new ApiError(
        `API request failed: ${method} ${url} returned ${response.status}`,
        response.status,
        response as IApiResponse,
        requestConfig,
      );
    }

    return response;
  }

  private async executeRequest(
    context: APIRequestContext,
    method: HttpMethod,
    endpoint: string,
    body?: unknown,
    options?: IApiRequestOptions,
  ): Promise<APIResponse> {
    const requestOptions: Record<string, unknown> = {
      headers: options?.headers,
      timeout: options?.timeout || this.timeout,
    };

    if (body && method !== 'GET') {
      if (options?.multipart) {
        requestOptions.multipart = options.multipart;
      } else if (options?.form) {
        requestOptions.form = options.form;
      } else {
        requestOptions.data = body;
      }
    }

    if (options?.params) {
      requestOptions.params = options.params;
    }

    switch (method) {
      case 'GET':
        return context.get(endpoint, requestOptions);
      case 'POST':
        return context.post(endpoint, requestOptions);
      case 'PUT':
        return context.put(endpoint, requestOptions);
      case 'PATCH':
        return context.patch(endpoint, requestOptions);
      case 'DELETE':
        return context.delete(endpoint, requestOptions);
      default:
        throw new Error(`Unsupported HTTP method: ${method}`);
    }
  }

  private async buildResponse<T>(raw: APIResponse, responseTime: number): Promise<IApiResponse<T>> {
    let body: T;
    try {
      body = (await raw.json()) as T;
    } catch {
      body = (await raw.text()) as unknown as T;
    }

    const headersObj: Record<string, string> = {};
    const allHeaders = await raw.headersArray();
    for (const header of allHeaders) {
      headersObj[header.name.toLowerCase()] = header.value;
    }

    return {
      status: raw.status(),
      statusText: raw.statusText(),
      headers: headersObj,
      body,
      responseTime,
      ok: raw.ok(),
      raw,
    };
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    let url = `${this.baseUrl}${endpoint}`;
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, String(value));
      }
      url += `?${searchParams.toString()}`;
    }
    return url;
  }
}
