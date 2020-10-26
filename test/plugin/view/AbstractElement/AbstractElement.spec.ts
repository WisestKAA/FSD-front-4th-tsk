import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import MockAbstractElement from './MockAbstractElement';

describe('Test AbstractElement', () =>{
  const abstractElement = new MockAbstractElement();

  it(`The changeOrientation function must added class ${StyleClasses.CURRENT_VAL} if property isHorizontal true`, () => {
    abstractElement.changeOrientation(true, StyleClasses.CURRENT_VAL, StyleClasses.CURRENT_VAL_V);
    expect(abstractElement.$elem.attr('class')).toBe(StyleClasses.CURRENT_VAL);
  });

  it(`The changeOrientation function must added class ${StyleClasses.CURRENT_VAL} and ${StyleClasses.CURRENT_VAL_V} if property isHorizontal false`, () => {
    abstractElement.changeOrientation(false, StyleClasses.CURRENT_VAL, StyleClasses.CURRENT_VAL_V);
    expect(abstractElement.$elem.attr('class')).toBe(`${StyleClasses.CURRENT_VAL} ${StyleClasses.CURRENT_VAL_V}`);
  });
});
