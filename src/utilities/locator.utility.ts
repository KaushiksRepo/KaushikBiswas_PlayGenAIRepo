import { Page, Locator } from '@playwright/test';

export class LocatorUtility {
  constructor(private readonly page: Page) {}

  public byTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  public byRole(role: Parameters<Page['getByRole']>[0], options?: Parameters<Page['getByRole']>[1]): Locator {
    return this.page.getByRole(role, options);
  }

  public byText(text: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByText(text, options);
  }

  public byLabel(label: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByLabel(label, options);
  }

  public byPlaceholder(placeholder: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByPlaceholder(placeholder, options);
  }

  public byTitle(title: string | RegExp, options?: { exact?: boolean }): Locator {
    return this.page.getByTitle(title, options);
  }

  public byCss(selector: string): Locator {
    return this.page.locator(selector);
  }

  public byXpath(xpath: string): Locator {
    return this.page.locator(`xpath=${xpath}`);
  }

  public byId(id: string): Locator {
    return this.page.locator(`#${id}`);
  }

  public byClass(className: string): Locator {
    return this.page.locator(`.${className}`);
  }

  public byAttribute(attribute: string, value: string): Locator {
    return this.page.locator(`[${attribute}="${value}"]`);
  }

  public byPartialAttribute(attribute: string, value: string): Locator {
    return this.page.locator(`[${attribute}*="${value}"]`);
  }

  public nth(locator: Locator, index: number): Locator {
    return locator.nth(index);
  }

  public first(locator: Locator): Locator {
    return locator.first();
  }

  public last(locator: Locator): Locator {
    return locator.last();
  }

  public chainedLocator(parent: Locator, childSelector: string): Locator {
    return parent.locator(childSelector);
  }

  public filterByText(locator: Locator, text: string | RegExp): Locator {
    return locator.filter({ hasText: text });
  }

  public filterByChild(locator: Locator, childSelector: string): Locator {
    return locator.filter({ has: this.page.locator(childSelector) });
  }
}
