import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import MockAbstractElement from './MockAbstractElement';

describe('Test AbstractElement', () =>{
  const abstractElement = new MockAbstractElement();

  it(`The changeOrientation function must added class ${StyleClasses.HINT} if property isHorizontal true`, () => {
    abstractElement.changeOrientation(true, StyleClasses.HINT, StyleClasses.HINT_V);
    expect(abstractElement.$elem.attr('class')).toBe(StyleClasses.HINT);
  });

  it(`The changeOrientation function must added class ${StyleClasses.HINT} and ${StyleClasses.HINT_V} if property isHorizontal false`, () => {
    abstractElement.changeOrientation(false, StyleClasses.HINT, StyleClasses.HINT_V);
    expect(abstractElement.$elem.attr('class')).toBe(`${StyleClasses.HINT} ${StyleClasses.HINT_V}`);
  });
});
