import { IDatabaseClient, IDbConfig } from '../../types/database.types';
import { BaseDatabaseClient } from './db.interface';
import { Logger } from '../logger';

export type DatabaseType = 'postgres' | 'mysql' | 'mssql' | 'sqlite' | 'custom';

export type DatabaseClientConstructor = new (config: IDbConfig) => BaseDatabaseClient;

export class DatabaseFactory {
  private static readonly logger = Logger.getInstance('database');
  private static readonly registry: Map<DatabaseType, DatabaseClientConstructor> = new Map();

  public static register(type: DatabaseType, ClientClass: DatabaseClientConstructor): void {
    DatabaseFactory.registry.set(type, ClientClass);
    DatabaseFactory.logger.info(`Database adapter registered: ${type}`);
  }

  public static create(type: DatabaseType, config: IDbConfig): IDatabaseClient {
    const ClientClass = DatabaseFactory.registry.get(type);

    if (!ClientClass) {
      throw new Error(
        `No database adapter registered for type: "${type}". ` +
          `Available: [${Array.from(DatabaseFactory.registry.keys()).join(', ')}]. ` +
          `Register one using DatabaseFactory.register().`,
      );
    }

    DatabaseFactory.logger.info(`Creating database client: ${type}`, {
      host: config.host,
      database: config.database,
    });

    return new ClientClass(config);
  }

  public static hasAdapter(type: DatabaseType): boolean {
    return DatabaseFactory.registry.has(type);
  }

  public static getRegisteredTypes(): DatabaseType[] {
    return Array.from(DatabaseFactory.registry.keys());
  }

  public static clear(): void {
    DatabaseFactory.registry.clear();
  }
}
