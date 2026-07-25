import { IDatabaseClient, IDbConfig, IDbResult } from '../../types/database.types';
import { Logger } from '../logger';

export abstract class BaseDatabaseClient implements IDatabaseClient {
  protected readonly logger = Logger.getInstance('database');
  protected connected = false;

  constructor(protected readonly config: IDbConfig) {}

  public abstract connect(): Promise<void>;
  public abstract disconnect(): Promise<void>;
  public abstract query<T = unknown>(sql: string, params?: unknown[]): Promise<T[]>;
  public abstract execute(sql: string, params?: unknown[]): Promise<IDbResult>;

  public isConnected(): boolean {
    return this.connected;
  }

  protected validateConnection(): void {
    if (!this.connected) {
      throw new Error('Database is not connected. Call connect() first.');
    }
  }
}
