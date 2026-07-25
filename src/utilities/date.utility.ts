export class DateUtility {
  public static now(): Date {
    return new Date();
  }

  public static format(date: Date, format: string): string {
    const tokens: Record<string, string> = {
      'YYYY': date.getFullYear().toString(),
      'MM': String(date.getMonth() + 1).padStart(2, '0'),
      'DD': String(date.getDate()).padStart(2, '0'),
      'HH': String(date.getHours()).padStart(2, '0'),
      'mm': String(date.getMinutes()).padStart(2, '0'),
      'ss': String(date.getSeconds()).padStart(2, '0'),
      'SSS': String(date.getMilliseconds()).padStart(3, '0'),
    };

    let result = format;
    for (const [token, value] of Object.entries(tokens)) {
      result = result.replace(token, value);
    }
    return result;
  }

  public static timestamp(): string {
    return this.format(this.now(), 'YYYY-MM-DD_HH-mm-ss');
  }

  public static isoTimestamp(): string {
    return this.now().toISOString();
  }

  public static addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  public static addHours(date: Date, hours: number): Date {
    const result = new Date(date);
    result.setHours(result.getHours() + hours);
    return result;
  }

  public static subtractDays(date: Date, days: number): Date {
    return this.addDays(date, -days);
  }

  public static differenceInMs(date1: Date, date2: Date): number {
    return Math.abs(date1.getTime() - date2.getTime());
  }

  public static differenceInSeconds(date1: Date, date2: Date): number {
    return Math.round(this.differenceInMs(date1, date2) / 1000);
  }

  public static isPast(date: Date): boolean {
    return date.getTime() < Date.now();
  }

  public static isFuture(date: Date): boolean {
    return date.getTime() > Date.now();
  }

  public static startOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  public static endOfDay(date: Date): Date {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  }
}
