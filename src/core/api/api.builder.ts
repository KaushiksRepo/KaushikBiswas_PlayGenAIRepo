import {
  IApiBuilder,
  IApiRequestConfig,
  IApiInterceptor,
  HttpMethod,
} from '../../types/api.types';

export class ApiRequestBuilder implements IApiBuilder {
  private config: IApiRequestConfig = {
    method: 'GET',
    url: '',
    headers: {},
  };
  private interceptors: IApiInterceptor[] = [];

  public setBaseUrl(url: string): ApiRequestBuilder {
    this.config.url = url;
    return this;
  }

  public setEndpoint(endpoint: string): ApiRequestBuilder {
    this.config.url = this.config.url
      ? `${this.config.url}${endpoint}`
      : endpoint;
    return this;
  }

  public setMethod(method: HttpMethod): ApiRequestBuilder {
    this.config.method = method;
    return this;
  }

  public setHeader(key: string, value: string): ApiRequestBuilder {
    this.config.headers[key] = value;
    return this;
  }

  public setHeaders(headers: Record<string, string>): ApiRequestBuilder {
    this.config.headers = { ...this.config.headers, ...headers };
    return this;
  }

  public setParam(key: string, value: string | number | boolean): ApiRequestBuilder {
    if (!this.config.params) {
      this.config.params = {};
    }
    this.config.params[key] = value;
    return this;
  }

  public setParams(params: Record<string, string | number | boolean>): ApiRequestBuilder {
    this.config.params = { ...this.config.params, ...params };
    return this;
  }

  public setBody(body: unknown): ApiRequestBuilder {
    this.config.body = body;
    return this;
  }

  public setTimeout(timeout: number): ApiRequestBuilder {
    this.config.headers['x-timeout'] = String(timeout);
    return this;
  }

  public setAuth(token: string, type: 'Bearer' | 'Basic' = 'Bearer'): ApiRequestBuilder {
    this.config.headers['Authorization'] = `${type} ${token}`;
    return this;
  }

  public setContentType(contentType: string): ApiRequestBuilder {
    this.config.headers['Content-Type'] = contentType;
    return this;
  }

  public setAccept(accept: string): ApiRequestBuilder {
    this.config.headers['Accept'] = accept;
    return this;
  }

  public addInterceptor(interceptor: IApiInterceptor): ApiRequestBuilder {
    this.interceptors.push(interceptor);
    return this;
  }

  public build(): IApiRequestConfig {
    if (!this.config.url) {
      throw new Error('API request URL is required. Set baseUrl or endpoint.');
    }

    let config = { ...this.config };

    for (const interceptor of this.interceptors) {
      if (interceptor.onRequest) {
        config = interceptor.onRequest(config);
      }
    }

    return config;
  }

  public static create(): ApiRequestBuilder {
    return new ApiRequestBuilder();
  }
}
