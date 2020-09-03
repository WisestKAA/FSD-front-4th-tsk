import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import MockAbstractElement from './MockAbstractElement';

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
