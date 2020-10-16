import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import SliderMainWrapper from '../../../../src/plugin/view/SliderMainWrapper/SliderMainWrapper';
import MockLine from './MockLine';
import MockHandleWrapper from './MockHandleWrapper';
import MockWrapperEvent from './MockWrapperEvent';

describe('Tests SliderMainWrapper', () => {
  let wrapper: SliderMainWrapper;

  describe(
    'Tests SliderMainWrapper / init',
    () => {
      it(
        `The element must have class ${StyleClasses.MAINWRAPPER} if the isHorizontal property is true`,
        () => {
          wrapper = new SliderMainWrapper(true, new MockLine(), new MockHandleWrapper());
          expect(wrapper.$elem.attr('class')).toBe(StyleClasses.MAINWRAPPER);
        }
      );

      it(
        `The element must have classes ${StyleClasses.MAINWRAPPER} and ${StyleClasses.MAINWRAPPERV} if the isHorizontal property is false`,
        () => {
          wrapper = new SliderMainWrapper(false, new MockLine(), new MockHandleWrapper());
          expect(wrapper.$elem.attr('class'))
            .toBe(`${StyleClasses.MAINWRAPPER} ${StyleClasses.MAINWRAPPERV}`);
        }
      );

      it(
        `The element must have subelement with class ${StyleClasses.HANDLEWRAPPER} if the isHorizontal property is true`,
        () => {
          wrapper = new SliderMainWrapper(true, new MockLine(), new MockHandleWrapper(true));
          expect(wrapper.$elem.find(`.${StyleClasses.HANDLEWRAPPER}`).attr('class'))
            .toBe(StyleClasses.HANDLEWRAPPER);
        }
      );

      it(
        `The element must have subelement with classes ${StyleClasses.HANDLEWRAPPER} and ${StyleClasses.HANDLEWRAPPERV} if the isHorizontal property is false`,
        () => {
          wrapper = new SliderMainWrapper(false, new MockLine(), new MockHandleWrapper(false));
          expect(wrapper.$elem.find(`.${StyleClasses.HANDLEWRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.HANDLEWRAPPER} ${StyleClasses.HANDLEWRAPPERV}`);
        }
      );
    }
  );

  describe(
    'Tests SliderMainWrapper / functions',
    () => {
      it(
        'The getSliderHandlePosition function must call the getSliderHandlePosition funtion from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'getSliderHandlePosition');
          wrapper.getSliderHandlePosition(SliderDirection.LEFT);
          expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
        }
      );

      it(
        'The getMaxHandlePosition function must call the getMaxHandlePosition funtion from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'getMaxHandlePosition');
          wrapper.getMaxHandlePosition();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The setHandlePosition function must call the setHandlePosition funtion from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'setHandlePosition');
          wrapper.setHandlePosition(0, SliderDirection.LEFT);
          expect(spy).toHaveBeenCalledWith(0, SliderDirection.LEFT);
        }
      );

      it(
        'The getHandleFromPosition function must call the getHandleFromPosition funtion from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'getHandleFromPosition');
          wrapper.getHandleFromPosition();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The getHandleToPosition function must call the getHandleToPosition funtion from the sliderHandleWrapper',
        () => {
          const handleWrapper = new MockHandleWrapper();
          wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
          const spy = spyOn(handleWrapper, 'getHandleToPosition');
          wrapper.getHandleToPosition();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The getLineSize function must call the getLineSize funtion from the sliderLine',
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
          const mockWrapperEvent = new MockWrapperEvent(wrapper);
          const spy = spyOn(mockWrapperEvent, 'eventHandler');
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
          const mockWrapperEvent = new MockWrapperEvent(wrapper);
          const spy = spyOn(mockWrapperEvent, 'eventHandler');
          handleWrapper.setHandlePosition(0, SliderDirection.LEFT);
          expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
        }
      );
    }
  );
});