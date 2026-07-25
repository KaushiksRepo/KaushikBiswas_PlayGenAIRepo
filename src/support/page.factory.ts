import { Page, BrowserContext } from '@playwright/test';
import { CustomWorld } from './world';
import { IBasePage } from '../types/page.types';

export class PageFactory {
  private readonly pages: Map<string, IBasePage> = new Map();
  private readonly world: CustomWorld;

  constructor(world: CustomWorld) {
    this.world = world;
  }

  public getPage<T extends IBasePage>(
    PageClass: new (page: Page, context: BrowserContext) => T,
  ): T {
    const className = PageClass.name;

    if (!this.pages.has(className)) {
      const instance = new PageClass(this.world.page, this.world.context);
      this.pages.set(className, instance);
    }

    return this.pages.get(className) as T;
  }

  public clearCache(): void {
    this.pages.clear();
  }
}
