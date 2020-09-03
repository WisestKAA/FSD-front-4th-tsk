import SliderRange from '../../../../src/plugin/view/SliderRange/SliderRange';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

describe('Test SliderRange', () => {
  let range: SliderRange;

  describe('Test SliderRange / init', () => {
    it(`The element must have class ${StyleClasses.RANGE} if the isHorizontal property is true`, () => {
      range = new SliderRange(true);
      expect(range.$elem.attr('class')).toBe(StyleClasses.RANGE);
    });

    it(`The element must have classes ${StyleClasses.RANGE} and ${StyleClasses.RANGEV} if the isHorizontal property is false`, () => {
      range = new SliderRange(false);
      expect(range.$elem.attr('class')).toBe(`${StyleClasses.RANGE} ${StyleClasses.RANGEV}`);
    });
  });
  describe('Test SliderRange / functions', () => {
    it('The changeRangeLineTwo function must set position for the element (isHorizontal=true)', () => {
      range = new SliderRange(true);
      range.changeRangeLineTwo(10, 10);
      expect(range.$elem.attr('style')).toBe('left: 10%; width: 80%');
    });

    it('The changeRangeLineTwo function must set position for the element (isHorizontal=false)', () => {
      range = new SliderRange(false);
      range.changeRangeLineTwo(10, 10);
      expect(range.$elem.attr('style')).toBe('bottom: 10%; height: 80%');
    });

    it('The changeRangeLineOne function must set position for the element (isHorizontal=true)', () => {
      range = new SliderRange(true);
      range.changeRangeLineOne(10, 90);
      expect(range.$elem.attr('style')).toBe('left: 0%; width: 15%');
    });

    it('The changeRangeLineOne function must set position for the element (isHorizontal=false)', () => {
      range = new SliderRange(false);
      range.changeRangeLineOne(10, 90);
      expect(range.$elem.attr('style')).toBe('bottom: 0%; height: 15%');
    });
  });
});
