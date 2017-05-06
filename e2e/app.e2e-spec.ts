import { MudisPage } from './app.po';

describe('mudis App', () => {
  let page: MudisPage;

  beforeEach(() => {
    page = new MudisPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
