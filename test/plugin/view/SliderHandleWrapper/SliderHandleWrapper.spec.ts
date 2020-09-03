import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import SliderHandleWrapper from '../../../../src/plugin/view/SliderHandleWrapper/SliderHandleWrapper';
import MockHandle from './MockHandle';
import MockHandleWrapperEvent from './MockHandleWrapperEvent';

describe('Test SliderHandleWrapper', () => {
  let wrapper: SliderHandleWrapper;
  let handleFrom: MockHandle;
  let handleTo: MockHandle;

  describe(
    'Test SliderHandleWrapper / init',
    () => {
      it(
        `The element must have class ${StyleClasses.HANDLEWRAPPER} if the isHorizontal property is true`,
        () => {
          wrapper = new SliderHandleWrapper(true, new MockHandle());
          expect(wrapper.$elem.attr('class')).toBe(StyleClasses.HANDLEWRAPPER);
        }
      );

      it(
        `The element must have classes ${StyleClasses.HANDLEWRAPPER} and ${StyleClasses.HANDLEWRAPPERV} if the isHorizontal property is false`,
        () => {
          wrapper = new SliderHandleWrapper(false, new MockHandle(), new MockHandle());
          expect(wrapper.$elem.attr('class')).toBe(`${StyleClasses.HANDLEWRAPPER} ${StyleClasses.HANDLEWRAPPERV}`);
        }
      );

      it(
        `The element must have subelement with class ${StyleClasses.HANDLE} if the isHorizontal property is true`,
        () => {
          wrapper = new SliderHandleWrapper(true, new MockHandle(true), new MockHandle(true));
          expect(wrapper.$elem.find(`.${StyleClasses.HANDLE}`).attr('class')).toBe(StyleClasses.HANDLE);
        }
      );

      it(
        `The element must have subelement with classes ${StyleClasses.HANDLE} and ${StyleClasses.HANDLEV} if the isHorizontal property is false`,
        () => {
          wrapper = new SliderHandleWrapper(false, new MockHandle(), new MockHandle(false));
          expect(wrapper.$elem.find(`.${StyleClasses.HANDLE}`).attr('class')).toBe(`${StyleClasses.HANDLE} ${StyleClasses.HANDLEV}`);
        }
      );
    }
  );

  describe(
    'Test SliderHandleWrapper / public function',
    () => {
      it(
        'The getMaxHandlePosition function must return the MaxHandlePosition of the handleFrom if the isRange property is false',
        () => {
          wrapper = new SliderHandleWrapper(true, new MockHandle());
          expect(wrapper.getMaxHandlePosition()).toBe(90);
        }
      );

      it(
        'The getMaxHandlePosition function should return a minimum of MaxHandlePosition from handleFrom and handleTo if the isRange property is true',
        () => {
          handleFrom = new MockHandle();
          handleFrom.size = 15;
          wrapper = new SliderHandleWrapper(true, handleFrom, new MockHandle());
          expect(wrapper.getMaxHandlePosition()).toBe(85);
        }
      );

      it(
        'The setHandlePosition function must set position for handleFrom if SliderDirection.isFrom()===true',
        () => {
          handleFrom = new MockHandle();
          wrapper = new SliderHandleWrapper(true, handleFrom);
          wrapper.setHandlePosition(10, SliderDirection.LEFT);
          expect(handleFrom.position).toBe(10);
        }
      );

      it(
        'The setHandlePosition function must set position for handleTo if SliderDirection.isFrom()===false',
        () => {
          handleTo = new MockHandle();
          wrapper = new SliderHandleWrapper(true, new MockHandle(), handleTo);
          wrapper.setHandlePosition(10, SliderDirection.RIGHT);
          expect(handleTo.position).toBe(10);
        }
      );

      it(
        'The getSliderHandlePosition function must return the position of handleFrom if SliderDirection.isFrom()===true',
        () => {
          handleFrom = new MockHandle();
          wrapper = new SliderHandleWrapper(true, handleFrom);
          handleFrom.position = 10;
          wrapper.getSliderHandlePosition(SliderDirection.LEFT);
          expect(handleFrom.position).toBe(10);
        }
      );

      it(
        'The getSliderHandlePosition function must return the position of handleTo if SliderDirection.isFrom()===false',
        () => {
          handleTo = new MockHandle();
          wrapper = new SliderHandleWrapper(true, new MockHandle(), handleTo);
          handleTo.position = 10;
          wrapper.getSliderHandlePosition(SliderDirection.RIGHT);
          expect(handleTo.position).toBe(10);
        }
      );

      it(
        'The getHandleFromPosition function must return the position of handleFrom',
        () => {
          handleFrom = new MockHandle();
          wrapper = new SliderHandleWrapper(true, handleFrom);
          handleFrom.position = 10;
          expect(wrapper.getHandleFromPosition()).toBe(10);
        }
      );

      it(
        'The getHandleToPosition function must return the position of handleTo if the isRange property is true',
        () => {
          handleTo = new MockHandle();
          wrapper = new SliderHandleWrapper(true, new MockHandle(), handleTo);
          handleTo.position = 10;
          expect(wrapper.getHandleToPosition()).toBe(10);
        }
      );

      it(
        'The getHandleToPosition function must return null if the isRange property is false',
        () => {
          wrapper = new SliderHandleWrapper(true, new MockHandle());
          expect(wrapper.getHandleToPosition()).toBe(null);
        }
      );

      it(
        'The getIsRange function must return the isRange property',
        () => {
          wrapper = new SliderHandleWrapper(true, new MockHandle());
          expect(wrapper.getIsRange()).toBe(false);
        }
      );

      it(
        'When the handleFrom changes position, the wrapper checks the intersection of the handles and changes the position if they intersect',
        () => {
          handleFrom = new MockHandle();
          handleTo = new MockHandle();
          handleTo.position = 50;
          wrapper = new SliderHandleWrapper(true, handleFrom, handleTo);
          handleFrom.setNewPosition(51, SliderDirection.LEFT);
          expect(handleFrom.position).not.toBe(51);
        }
      );

      it(
        'When the handle changes position, the wrapper checks the intersection of the handles and don\'t changes the position if they don\'t intersect',
        () => {
          handleFrom = new MockHandle();
          handleTo = new MockHandle();
          handleFrom.position = 20;
          wrapper = new SliderHandleWrapper(false, handleFrom, handleTo);
          handleTo.setNewPosition(20, SliderDirection.TOP);
          expect(handleTo.position).toBe(20);
        }
      );

      it(
        'When the handleTo changes position, the wrapper checks the intersection of the handles and changes the position if they intersect',
        () => {
          handleFrom = new MockHandle();
          handleTo = new MockHandle();
          handleFrom.position = 50;
          wrapper = new SliderHandleWrapper(false, handleFrom, handleTo);
          handleTo.setNewPosition(51, SliderDirection.TOP);
          expect(handleTo.position).not.toBe(51);
        }
      );

      it(
        'Changing the position of handle calls handlePositionChangedEvent',
        () => {
          handleFrom = new MockHandle();
          wrapper = new SliderHandleWrapper(true, handleFrom);
          const mockHandleWrapperEvent = new MockHandleWrapperEvent(wrapper);
          const spy = spyOn(mockHandleWrapperEvent, 'eventHandler');
          handleFrom.setNewPosition(0, SliderDirection.LEFT);
          expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
        }
      );
    }
  );
});
