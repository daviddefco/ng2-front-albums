import { Ng2FrontAlbumsPage } from './app.po';

describe('ng2-front-albums App', () => {
  let page: Ng2FrontAlbumsPage;

  beforeEach(() => {
    page = new Ng2FrontAlbumsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
