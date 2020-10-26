import CurrentValue from '../../../../src/plugin/view/CurrentValue/CurrentValue';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

describe('Test CurrentValue', () => {
  let currentValue: CurrentValue;

  describe('Test CurrentValue / init', () => {
    it(`The element must have class ${StyleClasses.CURRENT_VAL} if the isHorizontal property is true`, () => {
      currentValue = new CurrentValue(true, true);
      expect(currentValue.$elem.attr('class')).toBe(StyleClasses.CURRENT_VAL);
    });

    it(`The element must have classes ${StyleClasses.CURRENT_VAL} and ${StyleClasses.CURRENT_VAL_V} if the isHorizontal property is false`, () => {
      currentValue = new CurrentValue(true, false);
      expect(currentValue.$elem.attr('class')).toBe(`${StyleClasses.CURRENT_VAL} ${StyleClasses.CURRENT_VAL_V}`);
    });

    it(`The element must have sub-element with class ${StyleClasses.CURRENT_VAL_ARROW} if the isHorizontal property is true`, () => {
      currentValue = new CurrentValue(true, true);
      expect(currentValue.$elem.find(`.${StyleClasses.CURRENT_VAL_ARROW}`).attr('class')).toBe(StyleClasses.CURRENT_VAL_ARROW);
    });

    it(`The element must have sub-element with classes ${StyleClasses.CURRENT_VAL_ARROW} and ${StyleClasses.CURRENT_VAL_ARROW_V} if the isHorizontal property  is true`, () => {
      currentValue = new CurrentValue(true, false);
      expect(currentValue.$elem.find(`.${StyleClasses.CURRENT_VAL_ARROW}`).attr('class')).toBe(`${StyleClasses.CURRENT_VAL_ARROW} ${StyleClasses.CURRENT_VAL_ARROW_V}`);
    });

    it(`The element must have sub-element with class ${StyleClasses.CURRENT_VAL_TEXT}`, () => {
      currentValue = new CurrentValue(true, true);
      expect(currentValue.$elem.find(`.${StyleClasses.CURRENT_VAL_TEXT}`).attr('class')).toBe(StyleClasses.CURRENT_VAL_TEXT);
    });
  });

  describe('Test CurrentValue / functions', () => {
    it('The setCurrentValue function should set the current value for the currentValue property and change the text sub-element of the $element', () => {
      currentValue = new CurrentValue(true, true);
      currentValue.setCurrentValue(10);
      expect(currentValue.getCurrentValue()).toBe(10);
      expect(currentValue.$elem.find(`.${StyleClasses.CURRENT_VAL_TEXT}`).html()).toBe('10');
    });

    it('The setPosition function must set the position for the $element and check the position if the isHorizontal property is true', () => {
      currentValue = new CurrentValue(true, true);
      currentValue.setPosition(90, 10, 100, false);
      expect(currentValue.getCurrentValuePosition()).toBe(95);
    });

    it('The setPosition function must set the position for the $element and don\'t check the position if the isCorrect property is true', () => {
      currentValue = new CurrentValue(true, true);
      currentValue.setPosition(90, 10, 100, true);
      expect(currentValue.getCurrentValuePosition()).toBe(90);
    });

    it('The getCurrentValueSize function must return $element width if the isHorizontal property is true', () => {
      currentValue = new CurrentValue(true, true);
      currentValue.$elem.attr('style', 'width: 100px;');
      $(document.body).append(currentValue.$elem);
      expect(currentValue.getCurrentValueSize()).toBe(100);
    });

    it('The getCurrentValueSize function must return $element height if the isHorizontal property is false', () => {
      currentValue = new CurrentValue(true, false);
      currentValue.$elem.attr('style', 'height: 100px;');
      $(document.body).append(currentValue.$elem);
      expect(currentValue.getCurrentValueSize()).toBe(100);
    });
  });
});
