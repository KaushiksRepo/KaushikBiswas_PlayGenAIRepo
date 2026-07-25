import { faker } from '@faker-js/faker';
import { IDataGenerator, IDateOptions, IUserData, IAddressData } from '../types/test-data.types';

export class DataUtility implements IDataGenerator {
  public generateString(length: number = 10): string {
    return faker.string.alphanumeric(length);
  }

  public generateNumber(min: number = 1, max: number = 1000): number {
    return faker.number.int({ min, max });
  }

  public generateEmail(domain?: string): string {
    if (domain) {
      return `${faker.internet.username().toLowerCase()}@${domain}`;
    }
    return faker.internet.email().toLowerCase();
  }

  public generatePhone(): string {
    return faker.phone.number();
  }

  public generateUuid(): string {
    return faker.string.uuid();
  }

  public generateDate(options?: IDateOptions): Date {
    if (options?.past) {
      return faker.date.past({ years: options.years || 1, refDate: options.refDate });
    }
    if (options?.future) {
      return faker.date.future({ years: options.years || 1, refDate: options.refDate });
    }
    return faker.date.recent();
  }

  public generateBoolean(): boolean {
    return faker.datatype.boolean();
  }

  public generateUser(overrides?: Partial<IUserData>): IUserData {
    return {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      phone: faker.phone.number(),
      password: faker.internet.password({ length: 12, memorable: false }),
      ...overrides,
    };
  }

  public generateAddress(overrides?: Partial<IAddressData>): IAddressData {
    return {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
      country: faker.location.country(),
      ...overrides,
    };
  }

  public generateParagraph(sentenceCount: number = 3): string {
    return faker.lorem.paragraph(sentenceCount);
  }

  public generateWord(): string {
    return faker.lorem.word();
  }

  public generateUrl(): string {
    return faker.internet.url();
  }

  public generateCompanyName(): string {
    return faker.company.name();
  }

  public generateCreditCard(): string {
    return faker.finance.creditCardNumber();
  }

  public generateFromArray<T>(items: T[]): T {
    return faker.helpers.arrayElement(items);
  }

  public generateMultipleFromArray<T>(items: T[], count: number): T[] {
    return faker.helpers.arrayElements(items, count);
  }
}
