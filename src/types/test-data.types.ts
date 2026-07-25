export interface ITestData<T = Record<string, unknown>> {
  name: string;
  description?: string;
  data: T;
}

export interface ITestDataProvider<T = Record<string, unknown>> {
  getData(key: string): T;
  getAllData(): ITestData<T>[];
  loadFromFile(filePath: string): void;
}

export interface IDataGenerator {
  generateString(length?: number): string;
  generateNumber(min?: number, max?: number): number;
  generateEmail(domain?: string): string;
  generatePhone(): string;
  generateUuid(): string;
  generateDate(options?: IDateOptions): Date;
  generateBoolean(): boolean;
}

export interface IDateOptions {
  past?: boolean;
  future?: boolean;
  years?: number;
  refDate?: Date;
}

export interface IUserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  address?: IAddressData;
}

export interface IAddressData {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface ICredentials {
  username: string;
  password: string;
}

export interface ITestDataSet<T = Record<string, unknown>> {
  testCaseName: string;
  tags: string[];
  data: T;
  expected?: Record<string, unknown>;
}
