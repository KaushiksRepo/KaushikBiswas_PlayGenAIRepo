import { IApiInterceptor, IApiRequestConfig, IApiResponse } from '../../types/api.types';
import { Logger } from '../logger';

export class LoggingInterceptor implements IApiInterceptor {
  private readonly logger = Logger.getInstance('api-interceptor');

  public onRequest(config: IApiRequestConfig): IApiRequestConfig {
    this.logger.debug('Outgoing request', {
      method: config.method,
      url: config.url,
      params: config.params,
    });
    return config;
  }

  public onResponse<T>(response: IApiResponse<T>): IApiResponse<T> {
    this.logger.debug('Incoming response', {
      status: response.status,
      responseTime: response.responseTime,
    });
    return response;
  }

  public onError(error: Error): void {
    this.logger.error('Request failed', { error: error.message });
  }
}

export class AuthInterceptor implements IApiInterceptor {
  constructor(private readonly getToken: () => string | Promise<string>) {}

  public onRequest(config: IApiRequestConfig): IApiRequestConfig {
    const token = this.getToken();
    if (typeof token === 'string' && token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }
}

export class RetryInterceptor implements IApiInterceptor {
  private readonly retryStatusCodes: number[];
  private readonly logger = Logger.getInstance('api-retry');

  constructor(retryStatusCodes: number[] = [429, 500, 502, 503, 504]) {
    this.retryStatusCodes = retryStatusCodes;
  }

  public onResponse<T>(response: IApiResponse<T>): IApiResponse<T> {
    if (this.retryStatusCodes.includes(response.status)) {
      this.logger.warn(`Retryable status code received: ${response.status}`);
    }
    return response;
  }
}

export class CorrelationIdInterceptor implements IApiInterceptor {
  constructor(private readonly correlationId: string) {}

  public onRequest(config: IApiRequestConfig): IApiRequestConfig {
    config.headers['X-Correlation-ID'] = this.correlationId;
    return config;
  }
}
