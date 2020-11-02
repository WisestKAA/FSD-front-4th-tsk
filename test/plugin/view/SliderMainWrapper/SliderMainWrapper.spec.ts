import SliderMainWrapper from '../../../../src/plugin/view/SliderMainWrapper/SliderMainWrapper';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import MockLine from './MockLine';
import MockHandleWrapper from './MockHandleWrapper';
import { MockEvent } from '../../../mocks/MockEvent';

describe('Tests SliderMainWrapper', () => {
  let wrapper: SliderMainWrapper;

  describe(
    'Tests SliderMainWrapper / init',
    () => {
      it(
        `The element must have class ${StyleClasses.MAIN_WRAPPER} if the isHorizontal property is true`,
        () => {
          wrapper = new SliderMainWrapper(true, new MockLine(), new MockHandleWrapper());
          expect(wrapper.$elem.attr('class')).toBe(StyleClasses.MAIN_WRAPPER);
        }
      );

      it(
        `The element must have classes ${StyleClasses.MAIN_WRAPPER} and ${StyleClasses.MAIN_WRAPPER_V} if the isHorizontal property is false`,
        () => {
          wrapper = new SliderMainWrapper(false, new MockLine(), new MockHandleWrapper());
          expect(wrapper.$elem.attr('class'))
            .toBe(`${StyleClasses.MAIN_WRAPPER} ${StyleClasses.MAIN_WRAPPER_V}`);
        }
      );

      it(
        `The element must have sub-element with class ${StyleClasses.HANDLE_WRAPPER} if the isHorizontal property is true`,
        () => {
          wrapper = new SliderMainWrapper(true, new MockLine(), new MockHandleWrapper(true));
          expect(wrapper.$elem.find(`.${StyleClasses.HANDLE_WRAPPER}`).attr('class'))
            .toBe(StyleClasses.HANDLE_WRAPPER);
        }
      );

      it(
        `The element must have sub-element with classes ${StyleClasses.HANDLE_WRAPPER} and ${StyleClasses.HANDLE_WRAPPER_V} if the isHorizontal property is false`,
        () => {
          wrapper = new SliderMainWrapper(false, new MockLine(), new MockHandleWrapper(false));
          expect(wrapper.$elem.find(`.${StyleClasses.HANDLE_WRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.HANDLE_WRAPPER} ${StyleClasses.HANDLE_WRAPPER_V}`);
        }
      );
    }
  );

  describe(
    'Tests SliderMainWrapper / functions',
    () => {
      it(
        'The getSliderHandlePosition function must call the getSliderHandlePosition function from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'getSliderHandlePosition');
          wrapper.getSliderHandlePosition(SliderDirection.LEFT);
          expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
        }
      );

      it(
        'The getMaxHandlePosition function must call the getMaxHandlePosition function from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'getMaxHandlePosition');
          wrapper.getMaxHandlePosition();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The setHandlePosition function must call the setHandlePosition function from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'setHandlePosition');
          wrapper.setHandlePosition(0, SliderDirection.LEFT);
          expect(spy).toHaveBeenCalledWith(0, SliderDirection.LEFT);
        }
      );

      it(
        'The getHandleFromPosition function must call the getHandleFromPosition function from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'getHandleFromPosition');
          wrapper.getHandleFromPosition();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The getHandleToPosition function must call the getHandleToPosition function from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'getHandleToPosition');
          wrapper.getHandleToPosition();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The getLineSize function must call the getLineSize function from the sliderLine',
        () => {
          const line = new MockLine();
          wrapper = new SliderMainWrapper(true, line, new MockHandleWrapper());
          const spy = spyOn(line, 'getLineSize');
          wrapper.getLineSize();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'When handle change position the SliderMainWrapper must call handlePositionChangedEvent (isRange=true)',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const mockEvent = new MockEvent(wrapper.handlePositionChangedEvent);
          const spy = spyOn(mockEvent, 'eventHandler');
          handleWrapper.setHandlePosition(0, SliderDirection.LEFT);
          expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
        }
      );

      it(
        'When handle change position the SliderMainWrapper must call handlePositionChangedEvent (isRange=false)',
        () => {
          const handleWrapper = new MockHandleWrapper();
          handleWrapper.isRange = false;
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const mockEvent = new MockEvent(wrapper.handlePositionChangedEvent);
          const spy = spyOn(mockEvent, 'eventHandler');
          handleWrapper.setHandlePosition(0, SliderDirection.LEFT);
          expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
        }
      );

      it(
        'After clicking on the line should trigger the lineClickEvent event',
        () => {
          const handleWrapper = new MockHandleWrapper();
          const line = new MockLine();
          wrapper = new SliderMainWrapper(true, line, handleWrapper);
          const mockEvent = new MockEvent<number>(line.lineClickEvent);
          const spy = spyOn(mockEvent, 'eventHandler');
          line.lineClickTrigger();
          expect(spy).toHaveBeenCalled();
        }
      );
    }
  );
});
