import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/') as Promise<any>;
  }

  getDeveloperName() {
    return element(by.css('p.footer')).getText() as Promise<string>;
  }
}
