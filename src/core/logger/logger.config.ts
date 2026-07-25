import { LogLevel } from '../../types/config.types';

export interface ILoggerConfig {
  level: LogLevel;
  logDir: string;
  consoleEnabled: boolean;
  fileEnabled: boolean;
  timestamp: boolean;
  correlationId?: string;
}

export const DEFAULT_LOGGER_CONFIG: ILoggerConfig = {
  level: 'info',
  logDir: 'logs',
  consoleEnabled: true,
  fileEnabled: true,
  timestamp: true,
};
