import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import SliderLine from '../../../../src/plugin/view/SliderLine/SliderLine';
import MockRange from './MockRange';

describe('Test SliderLine', () => {
  let line: SliderLine;

  describe('Test SliderLine / init', () => {
    it(
      `The element must have class ${StyleClasses.LINE} if the isHorizontal property is true`,
      () => {
        line = new SliderLine(true, new MockRange());
        expect(line.$elem.attr('class')).toBe(StyleClasses.LINE);
      }
    );

    it(
      `The element must have classes ${StyleClasses.LINE} and ${StyleClasses.LINEV} if the isHorizontal property is false`,
      () => {
        line = new SliderLine(false);
        expect(line.$elem.attr('class')).toBe(`${StyleClasses.LINE} ${StyleClasses.LINEV}`);
      }
    );
  });

  describe(
    'Test SliderLine / function',
    () => {
      it(
        'The getLineSize function must return the offsetWidth of element if the isHorizontal property is true',
        () => {
          line = new SliderLine(true);
          line.$elem.outerWidth(100);
          expect(line.getLineSize()).toBe(100);
        }
      );

      it(
        'The getLineSize function must return the offsetHeight of element if the isHorizontal property is false',
        () => {
          line = new SliderLine(false);
          line.$elem.outerHeight(100);
          expect(line.getLineSize()).toBe(100);
        }
      );

      it(
        'The setRange function must call the changeRangeLineTwo function from the range if the isRangeLineEnabled property is true and is range',
        () => {
          const range = new MockRange();
          line = new SliderLine(true, range);
          const spy = spyOn(range, 'changeRangeLineTwo');
          line.setRange({ handleFromPosition: 10, isRange: true });
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The setRange function must call the changeRangeLineOne function from the range if the isRangeLineEnabled property is false and is range',
        () => {
          const range = new MockRange();
          line = new SliderLine(true, range);
          const spy = spyOn(range, 'changeRangeLineOne');
          line.setRange({ handleFromPosition: 10, isRange: false });
          expect(spy).toHaveBeenCalled();
        }
      );
    }
  );
});
