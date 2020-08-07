import AbstractElement from '../../../src/plugin/view/AbstractElement/AbstractElement';
import StyleClasses from '../../../src/plugin/view/StyleClasses';

class MockAbstractElement extends AbstractElement {
    public $elem: JQuery<HTMLElement>;
    protected isHorizontal: boolean;
    constructor () {
      super();
      this.init();
    }
    protected init (): void {
      this.$elem = $('<div>');
    }
}

describe('Test AbstractElement', () =>{
  const abstractElement = new MockAbstractElement();

  it(`The changeOrientation function must added class ${StyleClasses.CURRENTVAL} if property isHorizontal true`, () => {
    abstractElement.changeOrientation(true, StyleClasses.CURRENTVAL, StyleClasses.CURRENTVALV);
    expect(abstractElement.$elem.attr('class')).toBe(StyleClasses.CURRENTVAL);
  });

  it(`The changeOrientation function must added class ${StyleClasses.CURRENTVAL} and ${StyleClasses.CURRENTVALV} if property isHorizontal false`, () => {
    abstractElement.changeOrientation(false, StyleClasses.CURRENTVAL, StyleClasses.CURRENTVALV);
    expect(abstractElement.$elem.attr('class')).toBe(`${StyleClasses.CURRENTVAL} ${StyleClasses.CURRENTVALV}`);
  });
});
