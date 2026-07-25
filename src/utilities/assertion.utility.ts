import { Locator, expect } from '@playwright/test';

export interface ISoftAssertionResult {
  passed: boolean;
  message: string;
}

export class AssertionUtility {
  private softErrors: ISoftAssertionResult[] = [];

  public async assertVisible(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeVisible();
  }

  public async assertHidden(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeHidden();
  }

  public async assertEnabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeEnabled();
  }

  public async assertDisabled(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeDisabled();
  }

  public async assertText(locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await expect(locator, message).toHaveText(expected);
  }

  public async assertContainsText(locator: Locator, expected: string, message?: string): Promise<void> {
    await expect(locator, message).toContainText(expected);
  }

  public async assertValue(locator: Locator, expected: string | RegExp, message?: string): Promise<void> {
    await expect(locator, message).toHaveValue(expected);
  }

  public async assertAttribute(
    locator: Locator,
    attribute: string,
    expected: string | RegExp,
    message?: string,
  ): Promise<void> {
    await expect(locator, message).toHaveAttribute(attribute, expected);
  }

  public async assertCount(locator: Locator, expected: number, message?: string): Promise<void> {
    await expect(locator, message).toHaveCount(expected);
  }

  public async assertChecked(locator: Locator, message?: string): Promise<void> {
    await expect(locator, message).toBeChecked();
  }

  public async assertUrl(page: { url(): string }, expected: string | RegExp, message?: string): Promise<void> {
    const url = page.url();
    if (typeof expected === 'string') {
      expect(url, message).toBe(expected);
    } else {
      expect(url, message).toMatch(expected);
    }
  }

  public async assertTitle(page: { title(): Promise<string> }, expected: string | RegExp, message?: string): Promise<void> {
    const title = await page.title();
    if (typeof expected === 'string') {
      expect(title, message).toBe(expected);
    } else {
      expect(title, message).toMatch(expected);
    }
  }

  // Soft assertions - collect failures without stopping execution

  public async softAssert(assertion: () => Promise<void>, description: string): Promise<void> {
    try {
      await assertion();
      this.softErrors.push({ passed: true, message: description });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.softErrors.push({ passed: false, message: `${description}: ${errorMessage}` });
    }
  }

  public getSoftAssertionResults(): ISoftAssertionResult[] {
    return [...this.softErrors];
  }

  public getFailedSoftAssertions(): ISoftAssertionResult[] {
    return this.softErrors.filter((r) => !r.passed);
  }

  public assertAllSoftAssertions(): void {
    const failures = this.getFailedSoftAssertions();
    if (failures.length > 0) {
      const messages = failures.map((f) => f.message).join('\n');
      this.clearSoftAssertions();
      throw new Error(`Soft assertion failures (${failures.length}):\n${messages}`);
    }
    this.clearSoftAssertions();
  }

  public clearSoftAssertions(): void {
    this.softErrors = [];
  }
}
