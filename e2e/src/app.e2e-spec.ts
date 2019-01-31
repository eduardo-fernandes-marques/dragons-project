import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('dragons-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('Get developer name', () => {
    page.navigateTo();
    expect(page.getDeveloperName()).toEqual('Criado por Eduardo Fernandes Marques');
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
