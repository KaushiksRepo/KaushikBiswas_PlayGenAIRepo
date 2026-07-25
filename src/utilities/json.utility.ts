export class JsonUtility {
  public static parse<T = unknown>(jsonString: string): T {
    try {
      return JSON.parse(jsonString) as T;
    } catch (error) {
      throw new Error(
        `Failed to parse JSON: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  public static stringify(data: unknown, pretty: boolean = true): string {
    return pretty ? JSON.stringify(data, null, 2) : JSON.stringify(data);
  }

  public static deepClone<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj)) as T;
  }

  public static getNestedValue<T = unknown>(
    obj: Record<string, unknown>,
    path: string,
    defaultValue?: T,
  ): T {
    const keys = path.split('.');
    let current: unknown = obj;

    for (const key of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return defaultValue as T;
      }
      current = (current as Record<string, unknown>)[key];
    }

    return (current !== undefined ? current : defaultValue) as T;
  }

  public static setNestedValue(
    obj: Record<string, unknown>,
    path: string,
    value: unknown,
  ): Record<string, unknown> {
    const keys = path.split('.');
    const result = this.deepClone(obj);
    let current: Record<string, unknown> = result;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!(key in current) || typeof current[key] !== 'object') {
        current[key] = {};
      }
      current = current[key] as Record<string, unknown>;
    }

    current[keys[keys.length - 1]] = value;
    return result;
  }

  public static merge<T extends Record<string, unknown>>(target: T, ...sources: Partial<T>[]): T {
    const result = this.deepClone(target);

    for (const source of sources) {
      for (const key of Object.keys(source) as (keyof T)[]) {
        const sourceVal = source[key];
        const targetVal = result[key];

        if (
          sourceVal &&
          typeof sourceVal === 'object' &&
          !Array.isArray(sourceVal) &&
          targetVal &&
          typeof targetVal === 'object' &&
          !Array.isArray(targetVal)
        ) {
          (result as Record<string, unknown>)[key as string] = this.merge(
            targetVal as Record<string, unknown>,
            sourceVal as Record<string, unknown>,
          );
        } else {
          (result as Record<string, unknown>)[key as string] = this.deepClone(sourceVal);
        }
      }
    }

    return result;
  }

  public static isValidJson(str: string): boolean {
    try {
      JSON.parse(str);
      return true;
    } catch {
      return false;
    }
  }

  public static removeNullValues<T extends Record<string, unknown>>(obj: T): Partial<T> {
    const result: Partial<T> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined) {
        (result as Record<string, unknown>)[key] = value;
      }
    }
    return result;
  }
}
