import {
  Page,
  Locator,
  BrowserContext,
  FrameLocator,
  Download,
  Dialog,
} from '@playwright/test';
import { IBasePage, IPageActions, IPageNavigation, IWaitOptions } from '../../types/page.types';
import { WaitUtility } from '../../utilities/wait.utility';
import { LocatorUtility } from '../../utilities/locator.utility';
import { AssertionUtility } from '../../utilities/assertion.utility';
import { Logger } from '../logger';
import { EnvConfig } from '../../config/env.config';
import { MESSAGES } from '../../constants/messages';

export abstract class BasePage implements IBasePage, IPageActions, IPageNavigation {
  public readonly page: Page;
  public readonly context: BrowserContext;
  protected readonly wait: WaitUtility;
  protected readonly locators: LocatorUtility;
  protected readonly assert: AssertionUtility;
  protected readonly logger: Logger;
  protected readonly config = EnvConfig.getInstance();

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
    this.wait = new WaitUtility(page);
    this.locators = new LocatorUtility(page);
    this.assert = new AssertionUtility();
    this.logger = Logger.getInstance(this.constructor.name);
  }

  // --- Navigation ---

  public async navigate(path: string = '/'): Promise<void> {
    const baseUrl = this.config.get('baseUrl');
    const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
    this.logger.info(`${MESSAGES.info.NAVIGATION_SUCCESS}${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  public async navigateTo(url: string): Promise<void> {
    this.logger.info(`${MESSAGES.info.NAVIGATION_SUCCESS}${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  public async goBack(): Promise<void> {
    await this.page.goBack({ waitUntil: 'domcontentloaded' });
  }

  public async goForward(): Promise<void> {
    await this.page.goForward({ waitUntil: 'domcontentloaded' });
  }

  public async reload(): Promise<void> {
    await this.page.reload({ waitUntil: 'domcontentloaded' });
  }

  // --- Page State ---

  public async waitForPageLoad(): Promise<void> {
    await this.wait.forDomContentLoaded();
  }

  public async getTitle(): Promise<string> {
    return this.page.title();
  }

  public getUrl(): string {
    return this.page.url();
  }

  // --- Element Actions ---

  public async click(locator: Locator): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.click();
    this.logger.debug(`Clicked element`);
  }

  public async doubleClick(locator: Locator): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.dblclick();
  }

  public async rightClick(locator: Locator): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.click({ button: 'right' });
  }

  public async fill(locator: Locator, value: string): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.clear();
    await locator.fill(value);
    this.logger.debug(`Filled element with value`);
  }

  public async type(locator: Locator, value: string, delay: number = 50): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.pressSequentially(value, { delay });
  }

  public async clear(locator: Locator): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.clear();
  }

  public async selectOption(locator: Locator, value: string | string[]): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.selectOption(value);
  }

  public async check(locator: Locator): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.check();
  }

  public async uncheck(locator: Locator): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.uncheck();
  }

  public async hover(locator: Locator): Promise<void> {
    await this.wait.forElement(locator, { state: 'visible' });
    await locator.hover();
  }

  public async focus(locator: Locator): Promise<void> {
    await locator.focus();
  }

  public async pressKey(key: string): Promise<void> {
    await this.page.keyboard.press(key);
  }

  public async uploadFile(locator: Locator, filePaths: string | string[]): Promise<void> {
    await locator.setInputFiles(filePaths);
  }

  // --- Element State ---

  public async getText(locator: Locator): Promise<string> {
    await this.wait.forElement(locator, { state: 'visible' });
    return (await locator.textContent()) || '';
  }

  public async getInputValue(locator: Locator): Promise<string> {
    await this.wait.forElement(locator, { state: 'visible' });
    return locator.inputValue();
  }

  public async getAttribute(locator: Locator, attribute: string): Promise<string | null> {
    await this.wait.forElement(locator, { state: 'attached' });
    return locator.getAttribute(attribute);
  }

  public async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  public async isEnabled(locator: Locator): Promise<boolean> {
    return locator.isEnabled();
  }

  public async isChecked(locator: Locator): Promise<boolean> {
    return locator.isChecked();
  }

  public async getCount(locator: Locator): Promise<number> {
    return locator.count();
  }

  // --- Waits ---

  public async waitForElement(locator: Locator, options?: IWaitOptions): Promise<void> {
    await this.wait.forElement(locator, options);
  }

  public async waitForUrl(urlPattern: string | RegExp): Promise<void> {
    await this.wait.forUrl(urlPattern);
  }

  public async waitForNetworkIdle(): Promise<void> {
    await this.wait.forNetworkIdle();
  }

  // --- Frames ---

  public switchToFrame(selector: string): FrameLocator {
    return this.page.frameLocator(selector);
  }

  // --- Dialogs ---

  public async acceptDialog(handler?: (dialog: Dialog) => Promise<void>): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      if (handler) {
        await handler(dialog);
      } else {
        await dialog.accept();
      }
    });
  }

  public async dismissDialog(): Promise<void> {
    this.page.on('dialog', async (dialog) => {
      await dialog.dismiss();
    });
  }

  // --- Downloads ---

  public async waitForDownload(action: () => Promise<void>): Promise<Download> {
    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      action(),
    ]);
    return download;
  }

  // --- Tabs ---

  public async openNewTab(action: () => Promise<void>): Promise<Page> {
    const [newPage] = await Promise.all([
      this.context.waitForEvent('page'),
      action(),
    ]);
    await newPage.waitForLoadState('domcontentloaded');
    return newPage;
  }

  public async closeCurrentPage(): Promise<void> {
    await this.page.close();
  }

  // --- Scroll ---

  public async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  public async scrollToTop(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  public async scrollToBottom(): Promise<void> {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  // --- Drag & Drop ---

  public async dragAndDrop(source: Locator, target: Locator): Promise<void> {
    await source.dragTo(target);
  }

  // --- JavaScript Execution ---

  public async executeScript<T>(script: string, ...args: unknown[]): Promise<T> {
    return this.page.evaluate<T, unknown[]>(
      (params) => {
        const fn = new Function('...args', params[0] as string);
        return fn(...params.slice(1)) as T;
      },
      [script, ...args],
    );
  }

  // --- Storage ---

  public async getLocalStorage(key: string): Promise<string | null> {
    return this.page.evaluate((k) => localStorage.getItem(k), key);
  }

  public async setLocalStorage(key: string, value: string): Promise<void> {
    await this.page.evaluate(({ k, v }) => localStorage.setItem(k, v), { k: key, v: value });
  }

  public async getCookie(name: string): Promise<string | undefined> {
    const cookies = await this.context.cookies();
    const cookie = cookies.find((c) => c.name === name);
    return cookie?.value;
  }

  // --- Soft Assertions ---

  public getAssertionUtility(): AssertionUtility {
    return this.assert;
  }
}
