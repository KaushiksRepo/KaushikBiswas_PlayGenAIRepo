export interface IDatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  execute(sql: string, params?: unknown[]): Promise<IDbResult>;
  isConnected(): boolean;
}

export interface IDbConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  ssl?: boolean;
  pool?: IDbPoolConfig;
}

export interface IDbPoolConfig {
  min: number;
  max: number;
  idleTimeoutMs: number;
}

export interface IDbResult {
  rowCount: number;
  affectedRows: number;
}
