import * as winston from 'winston';
import * as path from 'path';
import * as fs from 'fs';
import { ILogger } from '../../types/logger.types';
import { ILoggerConfig, DEFAULT_LOGGER_CONFIG } from './logger.config';

export class Logger implements ILogger {
  private static instances: Map<string, Logger> = new Map();
  private winstonLogger: winston.Logger;
  private correlationId?: string;

  private constructor(
    private readonly name: string,
    config: ILoggerConfig,
  ) {
    this.correlationId = config.correlationId;
    this.ensureLogDir(config.logDir);
    this.winstonLogger = this.createWinstonLogger(config);
  }

  public static getInstance(name: string = 'default', config?: Partial<ILoggerConfig>): Logger {
    if (!Logger.instances.has(name)) {
      const mergedConfig: ILoggerConfig = { ...DEFAULT_LOGGER_CONFIG, ...config };
      Logger.instances.set(name, new Logger(name, mergedConfig));
    }
    return Logger.instances.get(name)!;
  }

  public static resetAll(): void {
    for (const [, instance] of Logger.instances) {
      instance.winstonLogger.close();
    }
    Logger.instances.clear();
  }

  public setCorrelationId(id: string): void {
    this.correlationId = id;
  }

  public info(message: string, meta?: Record<string, unknown>): void {
    this.winstonLogger.info(message, this.enrichMeta(meta));
  }

  public warn(message: string, meta?: Record<string, unknown>): void {
    this.winstonLogger.warn(message, this.enrichMeta(meta));
  }

  public error(message: string, meta?: Record<string, unknown>): void {
    this.winstonLogger.error(message, this.enrichMeta(meta));
  }

  public debug(message: string, meta?: Record<string, unknown>): void {
    this.winstonLogger.debug(message, this.enrichMeta(meta));
  }

  private enrichMeta(meta?: Record<string, unknown>): Record<string, unknown> {
    return {
      ...meta,
      logger: this.name,
      ...(this.correlationId && { correlationId: this.correlationId }),
    };
  }

  private createWinstonLogger(config: ILoggerConfig): winston.Logger {
    const transports: winston.transport[] = [];

    if (config.consoleEnabled) {
      transports.push(this.createConsoleTransport(config));
    }

    if (config.fileEnabled) {
      transports.push(this.createFileTransport(config, 'combined'));
      transports.push(this.createErrorFileTransport(config));
    }

    return winston.createLogger({
      level: config.level,
      format: this.createFormat(config),
      transports,
      exitOnError: false,
    });
  }

  private createFormat(config: ILoggerConfig): winston.Logform.Format {
    const formats: winston.Logform.Format[] = [];

    if (config.timestamp) {
      formats.push(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }));
    }

    formats.push(winston.format.errors({ stack: true }));
    formats.push(winston.format.json());

    return winston.format.combine(...formats);
  }

  private createConsoleTransport(config: ILoggerConfig): winston.transport {
    return new winston.transports.Console({
      level: config.level,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'HH:mm:ss.SSS' }),
        winston.format.colorize({ all: true }),
        winston.format.printf(({ timestamp, level, message, logger, correlationId, ...rest }) => {
          const cid = correlationId ? ` [${correlationId as string}]` : '';
          const loggerName = logger ? ` [${logger as string}]` : '';
          const extra = Object.keys(rest).length > 0 ? ` ${JSON.stringify(rest)}` : '';
          return `${timestamp as string} ${level}${loggerName}${cid}: ${message as string}${extra}`;
        }),
      ),
    });
  }

  private createFileTransport(config: ILoggerConfig, suffix: string): winston.transport {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = path.join(config.logDir, `${timestamp}-${suffix}.log`);

    return new winston.transports.File({
      filename,
      level: config.level,
      maxsize: 10 * 1024 * 1024, // 10MB
      maxFiles: 30,
    });
  }

  private createErrorFileTransport(config: ILoggerConfig): winston.transport {
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = path.join(config.logDir, `${timestamp}-error.log`);

    return new winston.transports.File({
      filename,
      level: 'error',
      maxsize: 10 * 1024 * 1024,
      maxFiles: 30,
    });
  }

  private ensureLogDir(logDir: string): void {
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
  }
}
