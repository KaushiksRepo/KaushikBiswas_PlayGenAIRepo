import { Page, Locator, FrameLocator, BrowserContext } from '@playwright/test';

export interface IBasePage {
  page: Page;
  context: BrowserContext;
  navigate(path?: string): Promise<void>;
  waitForPageLoad(): Promise<void>;
  getTitle(): Promise<string>;
  getUrl(): string;
}

export interface IPageActions {
  click(locator: Locator): Promise<void>;
  fill(locator: Locator, value: string): Promise<void>;
  selectOption(locator: Locator, value: string | string[]): Promise<void>;
  check(locator: Locator): Promise<void>;
  uncheck(locator: Locator): Promise<void>;
  hover(locator: Locator): Promise<void>;
  getText(locator: Locator): Promise<string>;
  getAttribute(locator: Locator, attribute: string): Promise<string | null>;
  isVisible(locator: Locator): Promise<boolean>;
  isEnabled(locator: Locator): Promise<boolean>;
  waitForElement(locator: Locator, options?: IWaitOptions): Promise<void>;
}

export interface IPageNavigation {
  goBack(): Promise<void>;
  goForward(): Promise<void>;
  reload(): Promise<void>;
  navigateTo(url: string): Promise<void>;
}

export interface IWaitOptions {
  state?: 'visible' | 'hidden' | 'attached' | 'detached';
  timeout?: number;
}

export interface IFrameActions {
  switchToFrame(frameLocator: FrameLocator): FrameLocator;
}

export interface ILocatorStrategy {
  byRole(role: string, options?: Record<string, unknown>): Locator;
  byTestId(testId: string): Locator;
  byText(text: string, options?: { exact?: boolean }): Locator;
  byLabel(label: string): Locator;
  byPlaceholder(placeholder: string): Locator;
  byCss(selector: string): Locator;
  byXpath(xpath: string): Locator;
}

export interface IPageFactory {
  getPage<T extends IBasePage>(PageClass: new (page: Page, context: BrowserContext) => T): T;
}
