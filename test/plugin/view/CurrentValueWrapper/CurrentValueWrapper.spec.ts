import CurrentValueWrapper from '../../../../src/plugin/view/HintWrapper/HintWrapper';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import MockCurrentValue from './MockCurrentValue';

describe(
  'CurrentValueWrapper',
  () => {
    let currentValueWrapper: CurrentValueWrapper;
    let valFrom: MockCurrentValue;
    let valTo: MockCurrentValue;

    describe(
      'CurrentValueWrapper / init',
      () => {
        it(
          `The element must have class ${StyleClasses.CURRENT_VAL_WRAPPER} if the isHorizontal property is true`,
          () =>{
            currentValueWrapper = new CurrentValueWrapper(true, new MockCurrentValue());
            expect(currentValueWrapper.$elem.attr('class')).toBe(StyleClasses.CURRENT_VAL_WRAPPER);
          }
        );

        it(
          `The element must have class ${StyleClasses.CURRENT_VAL_WRAPPER} and ${StyleClasses.CURRENT_VAL_WRAPPER_V} if the isHorizontal property is false`,
          () =>{
            currentValueWrapper = new CurrentValueWrapper(
              false, new MockCurrentValue(),
              new MockCurrentValue()
            );
            expect(currentValueWrapper.$elem.attr('class'))
              .toBe(`${StyleClasses.CURRENT_VAL_WRAPPER} ${StyleClasses.CURRENT_VAL_WRAPPER_V}`);
          }
        );
      }
    );

    describe(
      'CurrentValueWrapper / functions',
      () => {
        it(
          'The setCurrentValuePosition function must set the position for valFrom if the dictionary property is LEFT',
          () => {
            valFrom = new MockCurrentValue();
            currentValueWrapper = new CurrentValueWrapper(true, valFrom);
            currentValueWrapper.setCurrentValuePosition({
              direction: SliderDirection.LEFT,
              position: 10
            });
            expect(valFrom.position).toBe(10);
          }
        );

        it(
          'The setCurrentValuePosition function must set the position for valFrom if the dictionary property is BOTTOM',
          () => {
            valFrom = new MockCurrentValue();
            currentValueWrapper = new CurrentValueWrapper(true, valFrom);
            currentValueWrapper.setCurrentValuePosition({
              direction: SliderDirection.BOTTOM,
              position: 10
            });
            expect(valFrom.position).toBe(10);
          }
        );

        it(
          'The setCurrentValuePosition function must set the position for valFrom if the dictionary property is RIGHT',
          () => {
            valTo = new MockCurrentValue();
            currentValueWrapper = new CurrentValueWrapper(true, new MockCurrentValue(), valTo);
            currentValueWrapper.setCurrentValuePosition({
              direction: SliderDirection.RIGHT,
              position: 10
            });
            expect(valTo.position).toBe(10);
          }
        );

        it(
          'The setCurrentValuePosition function must set the position for valFrom if the dictionary property is TOP',
          () => {
            valTo = new MockCurrentValue();
            currentValueWrapper = new CurrentValueWrapper(true, new MockCurrentValue(), valTo);
            currentValueWrapper.setCurrentValuePosition({
              direction: SliderDirection.TOP,
              position: 10
            });
            expect(valTo.position).toBe(10);
          }
        );

        it(
          'The setCurrentValuePosition function must check the intersection of containers of current values and correct they, if they are close',
          () => {
            valFrom = new MockCurrentValue();
            valTo = new MockCurrentValue();
            valFrom.position = 50;
            valTo.position = 50;
            currentValueWrapper = new CurrentValueWrapper(true, valFrom, valTo);
            currentValueWrapper.setCurrentValuePosition({
              direction: SliderDirection.LEFT,
              position: 50,
              handleFromPosition: 50,
              handleToPosition: 50,
              lineSize: 100
            });
            expect(valFrom.position).toBe(39);
            expect(valTo.position).toBe(40);
          }
        );

        it(
          'The setCurrentValue function must set current value for the valFrom if the isRange property is false',
          () => {
            valFrom = new MockCurrentValue();
            currentValueWrapper = new CurrentValueWrapper(true, valFrom);
            currentValueWrapper.setCurrentValue([1, 0]);
            expect(valFrom.currentValue).toBe(1);
          }
        );

        it(
          'The setCurrentValue function must set current value for the valFrom and the valTo if the isRange property is true',
          () => {
            valFrom = new MockCurrentValue();
            valTo = new MockCurrentValue();
            currentValueWrapper = new CurrentValueWrapper(true, valFrom, valTo);
            currentValueWrapper.setCurrentValue([1, 2]);
            expect(valFrom.currentValue).toBe(1);
            expect(valTo.currentValue).toBe(2);
          }
        );

        it(
          'The getCurrentValue function must return [valFrom, 0] if the isRange property is false',
          () => {
            valFrom = new MockCurrentValue();
            valFrom.currentValue = 1;
            currentValueWrapper = new CurrentValueWrapper(true, valFrom);
            expect(currentValueWrapper.getCurrentValue()).toEqual([1]);
          }
        );

        it(
          'The getCurrentValue function must return [valFrom, 0] if the isRange property is true',
          () => {
            valFrom = new MockCurrentValue();
            valTo = new MockCurrentValue();
            valFrom.currentValue = 1;
            valTo.currentValue = 2;
            currentValueWrapper = new CurrentValueWrapper(true, valFrom, valTo);
            expect(currentValueWrapper.getCurrentValue()).toEqual([1, 2]);
          }
        );
      }
    );
  }
);
