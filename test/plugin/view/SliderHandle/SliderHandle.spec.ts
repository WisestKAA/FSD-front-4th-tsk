import SliderHandle from '../../../../src/plugin/view/SliderHandle/SliderHandle';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import MockSliderLine from './MockSliderLine';
import MockHandleEvent from './MockHandleEvent';

describe(
  'Test SliderHandle',
  () => {
    let handle: SliderHandle;
    let line: MockSliderLine;

    describe(
      'Test SliderHandle / init',
      () => {
        it(`The element must have class ${StyleClasses.HANDLE} if the isHorizontal property is true`, () =>{
          handle = new SliderHandle({
            isHorizontal: true,
            isRange: false,
            sliderLine: new MockSliderLine(true),
            isFrom: true
          });
          expect(handle.$elem.attr('class')).toBe(StyleClasses.HANDLE);
        });

        it(
          `The element must have classes ${StyleClasses.HANDLE} and ${StyleClasses.HANDLEV} if the isHorizontal property is false`,
          () =>{
            handle = new SliderHandle({
              isHorizontal: false,
              isRange: false,
              sliderLine: new MockSliderLine(false),
              isFrom: true
            });
            expect(handle.$elem.attr('class')).toBe(`${StyleClasses.HANDLE} ${StyleClasses.HANDLEV}`);
          }
        );
      }
    );

    describe(
      'Test SliderHandle / functions',
      () => {
        const checkChangePosition = function (options: {
            isHorizontal: boolean,
            isFrom: boolean,
            isRange: boolean,
            startPosition: number,
            endPosition: number,
            expectVal: number
        }): void{
          const {
            isHorizontal,
            isFrom,
            isRange,
            startPosition,
            endPosition: endPosition,
            expectVal
          } = options;
          line = new MockSliderLine(isHorizontal);
          if (isHorizontal) {
            line.$elem.outerWidth(100);
          } else {
            line.$elem.outerHeight(100);
          }
          handle = new SliderHandle({
            isHorizontal,
            isRange,
            sliderLine: line,
            isFrom
          });
          if (isHorizontal) {
            handle.$elem.width(10);
          } else {
            handle.$elem.height(10);
          }
          setFixtures(line.$elem.html());
          const eventMouseDown = document.createEvent('MouseEvent');
          eventMouseDown.initMouseEvent(
            'mousedown',
            true,
            true,
            window,
            1,
            startPosition,
            startPosition,
            startPosition,
            startPosition,
            false,
            false,
            true,
            false,
            0,
            null
          );
          handle.$elem.get(0).dispatchEvent(eventMouseDown);
          const eventMouseMove = document.createEvent('MouseEvent');
          eventMouseMove.initMouseEvent(
            'mousemove',
            true,
            true,
            window,
            1,
            endPosition,
            endPosition,
            endPosition,
            endPosition,
            false,
            false,
            true,
            false,
            0,
            null
          );

          document.dispatchEvent(eventMouseMove);
          $(document).mouseup();
          expect(handle.getPosition()).toBe(expectVal);
        };

        it(
          'When click on an element, and then change the position of the mouse, the position of the element must change (LEFT)',
          () => {
            checkChangePosition({
              isHorizontal: true,
              isFrom: true,
              isRange: false,
              startPosition: 25,
              endPosition: 40,
              expectVal: 15
            });
          }
        );

        it(
          'When click on an element, and then change the position of the mouse, the position of the element must change (RIGHT)',
          () => {
            checkChangePosition({
              isHorizontal: true,
              isFrom: false,
              isRange: true,
              startPosition: 25,
              endPosition: 40,
              expectVal: 85
            });
          }
        );

        it(
          'When click on an element, and then change the position of the mouse, the position of the element must change (BOTTOM)',
          () => {
            checkChangePosition({
              isHorizontal: false,
              isFrom: true,
              isRange: false,
              startPosition: 80,
              endPosition: 40,
              expectVal: 90
            });
          }
        );

        it(
          'When click on an element, and then change the position of the mouse, the position of the element must change (TOP)',
          () => {
            checkChangePosition({
              isHorizontal: false,
              isFrom: false,
              isRange: true,
              startPosition: 10,
              endPosition: 60,
              expectVal: 50
            });
          }
        );

        it(
          'When click on an element, and then change the position of the mouse, and the position sub zero, then the position must be 0',
          () => {
            checkChangePosition({
              isHorizontal: true,
              isFrom: true,
              isRange: true,
              startPosition: 0,
              endPosition: -100,
              expectVal: 0
            });
          }
        );

        it(
          'When click on an element, and then change the position of the mouse, and the position more then line size, then the position must be 0 (RIGHT)',
          () => {
            checkChangePosition({
              isHorizontal: true,
              isFrom: false,
              isRange: true,
              startPosition: 100,
              endPosition: 2000,
              expectVal: 0
            });
          }
        );

        it(
          'When click on an element, and then change the position of the mouse, and the position sub zero, then the position must be 90',
          () => {
            checkChangePosition({
              isHorizontal: true,
              isFrom: false,
              isRange: true,
              startPosition: 0,
              endPosition: -10,
              expectVal: 90
            });
          }
        );

        it(
          'The setNewPosition function must call positionChangedEvent',
          () => {
            line = new MockSliderLine(true);
            handle = new SliderHandle({
              isHorizontal: true,
              isRange: true,
              sliderLine: line,
              isFrom: true
            });
            const mockHandleEvent = new MockHandleEvent(handle);
            const spy = spyOn(mockHandleEvent, 'eventHandler');
            handle.setNewPosition(10, SliderDirection.LEFT);
            expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
          }
        );

        it(
          'The getSliderHandleMaxPosition function must return the maximum position of the handle on the line.',
          () => {
            line = new MockSliderLine(true);
            handle = new SliderHandle({
              isHorizontal: true,
              isRange: true,
              sliderLine: line,
              isFrom: true
            });
            line.$elem.outerWidth(100);
            handle.$elem.outerWidth(10);
            expect(handle.getSliderHandleMaxPosition()).toBe(90);
          }
        );

        it(
          'The setCurrentPosition function must set the style for the handle element.',
          () => {
            line = new MockSliderLine(true);
            handle = new SliderHandle({
              isHorizontal: true,
              isRange: true,
              sliderLine: line,
              isFrom: true
            });
            handle.setCurrentPosition(10, SliderDirection.LEFT);
            expect(handle.$elem.attr('style')).toBe(`${SliderDirection.LEFT}: 10%`);
          }
        );

        it(
          'If the position more then the sliderHandleMaxPosition - the setCurrentPosition function must set the style for the handle element with z-index = 100',
          () => {
            line = new MockSliderLine(true);
            handle = new SliderHandle({
              isHorizontal: true,
              isRange: true,
              sliderLine: line,
              isFrom: true
            });
            line.$elem.outerWidth(100);
            handle.$elem.outerWidth(10);
            handle.setCurrentPosition(100, SliderDirection.LEFT);
            expect(handle.$elem.attr('style')).toBe(`${SliderDirection.LEFT}: 100%; z-index: 100;`);
          }
        );

        it(
          'The getHandleSize function must return elem.outerWidth() if the isHorizontal property is true',
          () => {
            line = new MockSliderLine(true);
            handle = new SliderHandle({
              isHorizontal: true,
              isRange: true,
              sliderLine: line,
              isFrom: true
            });
            handle.$elem.outerWidth(10);
            expect(handle.getHandleSize()).toBe(10);
          }
        );

        it(
          'The getHandleSize function must return elem.outerHeight() if the isHorizontal property is false',
          () => {
            line = new MockSliderLine(false);
            handle = new SliderHandle({
              isHorizontal: false,
              isRange: true,
              sliderLine: line,
              isFrom: true
            });
            handle.$elem.outerHeight(10);
            expect(handle.getHandleSize()).toBe(10);
          }
        );

        it(
          'The getPosition function must return current position of the handle element',
          () => {
            line = new MockSliderLine(true);
            handle = new SliderHandle({
              isHorizontal: false,
              isRange: true,
              sliderLine: line,
              isFrom: true
            });
            handle.setCurrentPosition(10, SliderDirection.LEFT);
            expect(handle.getPosition()).toBe(10);
          }
        );
      }
    );
  }
);
