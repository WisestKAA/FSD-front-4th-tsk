import HintWrapper from '../../../../src/plugin/view/HintWrapper/HintWrapper';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import MockHint from './MockHint';

describe(
  'HintWrapper',
  () => {
    let hintWrapper: HintWrapper;
    let hintFrom: MockHint;
    let hintTo: MockHint;

    describe(
      'HintWrapper / init',
      () => {
        it(
          `The element must have class ${StyleClasses.HINT_WRAPPER} if the isHorizontal property is true`,
          () =>{
            hintWrapper = new HintWrapper(true, new MockHint());
            expect(hintWrapper.$elem.attr('class')).toBe(StyleClasses.HINT_WRAPPER);
          }
        );

        it(
          `The element must have class ${StyleClasses.HINT_WRAPPER} and ${StyleClasses.HINT_WRAPPER_V} if the isHorizontal property is false`,
          () =>{
            hintWrapper = new HintWrapper(
              false, new MockHint(),
              new MockHint()
            );
            expect(hintWrapper.$elem.attr('class'))
              .toBe(`${StyleClasses.HINT_WRAPPER} ${StyleClasses.HINT_WRAPPER_V}`);
          }
        );
      }
    );

    describe(
      'HintWrapper / functions',
      () => {
        it(
          'The setHintPosition function must set the position for hintFrom if the dictionary property is LEFT',
          () => {
            hintFrom = new MockHint();
            hintWrapper = new HintWrapper(true, hintFrom);
            hintWrapper.setHintPosition({
              direction: SliderDirection.LEFT,
              position: 10
            });
            expect(hintFrom.position).toBe(10);
          }
        );

        it(
          'The setHintPosition function must set the position for hintFrom if the dictionary property is BOTTOM',
          () => {
            hintFrom = new MockHint();
            hintWrapper = new HintWrapper(true, hintFrom);
            hintWrapper.setHintPosition({
              direction: SliderDirection.BOTTOM,
              position: 10
            });
            expect(hintFrom.position).toBe(10);
          }
        );

        it(
          'The setHintPosition function must set the position for hintFrom if the dictionary property is RIGHT',
          () => {
            hintTo = new MockHint();
            hintWrapper = new HintWrapper(true, new MockHint(), hintTo);
            hintWrapper.setHintPosition({
              direction: SliderDirection.RIGHT,
              position: 10
            });
            expect(hintTo.position).toBe(10);
          }
        );

        it(
          'The setHintPosition function must set the position for hintFrom if the dictionary property is TOP',
          () => {
            hintTo = new MockHint();
            hintWrapper = new HintWrapper(true, new MockHint(), hintTo);
            hintWrapper.setHintPosition({
              direction: SliderDirection.TOP,
              position: 10
            });
            expect(hintTo.position).toBe(10);
          }
        );

        it(
          'The setHintPosition function must check the intersection of containers of current values and correct they, if they are close',
          () => {
            hintFrom = new MockHint();
            hintTo = new MockHint();
            hintFrom.position = 50;
            hintTo.position = 50;
            hintWrapper = new HintWrapper(true, hintFrom, hintTo);
            hintWrapper.setHintPosition({
              direction: SliderDirection.LEFT,
              position: 50,
              handleFromPosition: 50,
              handleToPosition: 50,
              lineSize: 100
            });
            expect(hintFrom.position).toBe(39);
            expect(hintTo.position).toBe(40);
          }
        );

        it(
          'The setHintValue function must set current value for the hintFrom if the isRange property is false',
          () => {
            hintFrom = new MockHint();
            hintWrapper = new HintWrapper(true, hintFrom);
            hintWrapper.setHintValue([1, 0]);
            expect(hintFrom.hintValue).toBe(1);
          }
        );

        it(
          'The setHintValue function must set current value for the hintFrom and the hintTo if the isRange property is true',
          () => {
            hintFrom = new MockHint();
            hintTo = new MockHint();
            hintWrapper = new HintWrapper(true, hintFrom, hintTo);
            hintWrapper.setHintValue([1, 2]);
            expect(hintFrom.hintValue).toBe(1);
            expect(hintTo.hintValue).toBe(2);
          }
        );

        it(
          'The getHintValue function must return [hintFrom, 0] if the isRange property is false',
          () => {
            hintFrom = new MockHint();
            hintFrom.hintValue = 1;
            hintWrapper = new HintWrapper(true, hintFrom);
            expect(hintWrapper.getHintValue()).toEqual([1]);
          }
        );

        it(
          'The getHintValue function must return [hintFrom, 0] if the isRange property is true',
          () => {
            hintFrom = new MockHint();
            hintTo = new MockHint();
            hintFrom.hintValue = 1;
            hintTo.hintValue = 2;
            hintWrapper = new HintWrapper(true, hintFrom, hintTo);
            expect(hintWrapper.getHintValue()).toEqual([1, 2]);
          }
        );
      }
    );
  }
);
