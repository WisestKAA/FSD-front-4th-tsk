import Hint from '../../../../src/plugin/view/Hint/Hint';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

describe('Test hint', () => {
  let hint: Hint;

  describe('Test hint / init', () => {
    it(`The element must have class ${StyleClasses.HINT} if the isHorizontal property is true`, () => {
      hint = new Hint(true, true);
      expect(hint.$elem.attr('class')).toBe(StyleClasses.HINT);
    });

    it(`The element must have classes ${StyleClasses.HINT} and ${StyleClasses.HINT_V} if the isHorizontal property is false`, () => {
      hint = new Hint(true, false);
      expect(hint.$elem.attr('class')).toBe(`${StyleClasses.HINT} ${StyleClasses.HINT_V}`);
    });

    it(`The element must have sub-element with class ${StyleClasses.HINT_ARROW} if the isHorizontal property is true`, () => {
      hint = new Hint(true, true);
      expect(hint.$elem.find(`.${StyleClasses.HINT_ARROW}`).attr('class')).toBe(StyleClasses.HINT_ARROW);
    });

    it(`The element must have sub-element with classes ${StyleClasses.HINT_ARROW} and ${StyleClasses.HINT_ARROW_V} if the isHorizontal property  is true`, () => {
      hint = new Hint(true, false);
      expect(hint.$elem.find(`.${StyleClasses.HINT_ARROW}`).attr('class')).toBe(`${StyleClasses.HINT_ARROW} ${StyleClasses.HINT_ARROW_V}`);
    });

    it(`The element must have sub-element with class ${StyleClasses.HINT_TEXT}`, () => {
      hint = new Hint(true, true);
      expect(hint.$elem.find(`.${StyleClasses.HINT_TEXT}`).attr('class')).toBe(StyleClasses.HINT_TEXT);
    });
  });

  describe('Test hint / functions', () => {
    it('The setHintValue function should set the current value for the hint property and change the text sub-element of the $element', () => {
      hint = new Hint(true, true);
      hint.setHintValue(10);
      expect(hint.getHintValue()).toBe(10);
      expect(hint.$elem.find(`.${StyleClasses.HINT_TEXT}`).html()).toBe('10');
    });

    it('The setPosition function must set the position for the $element and check the position if the isHorizontal property is true', () => {
      hint = new Hint(true, true);
      hint.setHintPosition(90, 10, 100, false);
      expect(hint.getHintPosition()).toBe(95);
    });

    it('The setPosition function must set the position for the $element and don\'t check the position if the isCorrect property is true', () => {
      hint = new Hint(true, true);
      hint.setHintPosition(90, 10, 100, true);
      expect(hint.getHintPosition()).toBe(90);
    });

    it('The getHintSize function must return $element width if the isHorizontal property is true', () => {
      hint = new Hint(true, true);
      hint.$elem.attr('style', 'width: 100px;');
      $(document.body).append(hint.$elem);
      expect(hint.getHintSize()).toBe(100);
    });

    it('The getHintSize function must return $element height if the isHorizontal property is false', () => {
      hint = new Hint(true, false);
      hint.$elem.attr('style', 'height: 100px;');
      $(document.body).append(hint.$elem);
      expect(hint.getHintSize()).toBe(100);
    });
  });
});
