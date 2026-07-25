export class StringUtility {
  public static capitalize(str: string): string {
    if (!str) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  public static camelCase(str: string): string {
    return str
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, char: string) => char.toUpperCase())
      .replace(/^[A-Z]/, (char) => char.toLowerCase());
  }

  public static kebabCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  public static snakeCase(str: string): string {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  }

  public static truncate(str: string, maxLength: number, suffix: string = '...'): string {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength - suffix.length) + suffix;
  }

  public static sanitizeForFilename(str: string): string {
    return str.replace(/[^a-zA-Z0-9-_]/g, '_');
  }

  public static template(str: string, variables: Record<string, string | number>): string {
    return str.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
      return variables[key] !== undefined ? String(variables[key]) : `{{${key}}}`;
    });
  }

  public static isEmpty(str: string | null | undefined): boolean {
    return str === null || str === undefined || str.trim().length === 0;
  }

  public static padLeft(str: string, length: number, char: string = ' '): string {
    return str.padStart(length, char);
  }

  public static padRight(str: string, length: number, char: string = ' '): string {
    return str.padEnd(length, char);
  }

  public static contains(str: string, search: string, ignoreCase: boolean = false): boolean {
    if (ignoreCase) {
      return str.toLowerCase().includes(search.toLowerCase());
    }
    return str.includes(search);
  }

  public static removeWhitespace(str: string): string {
    return str.replace(/\s+/g, '');
  }

  public static extractNumbers(str: string): number[] {
    const matches = str.match(/\d+(\.\d+)?/g);
    return matches ? matches.map(Number) : [];
  }
}
