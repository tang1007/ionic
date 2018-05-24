'use strict';

const { By, until } = require('selenium-webdriver');
const { register, Page, platforms } = require('../../../../../scripts/e2e');

class E2ETestPage extends Page {
  constructor(driver, platform) {
    super(driver, `http://localhost:3333/src/components/loading/test/standalone?ionic:mode=${platform}`);
  }

  async present(buttonId) {
    await this.navigate('#basic');
    this.driver.findElement(By.id(buttonId)).click();
    await this.driver.wait(until.elementLocated(By.css('.loading-wrapper')));
    return await this.driver.wait(until.elementIsVisible(this.driver.findElement(By.css('.loading-wrapper'))));
  }
}

platforms.forEach(platform => {
  describe('loading/standalone', () => {
    register('should init', driver => {
      const page = new E2ETestPage(driver, platform);
      return page.navigate('#basic');
    });

    register('should open loading', driver => {
      const page = new E2ETestPage(driver, platform);
      return page.present('basic');
    });
  });
});
