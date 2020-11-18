import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import View from '../../../../src/plugin/view/View';
import { IViewOptions } from '../../../../src/plugin/view/View.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import MockPresenter from './MockPresenter';
import MockElementsFactory from './MockElementsFactory';
import MockView from './MockView';

describe('Test View', () => {
  let view: View;
  let presenter: MockPresenter;

  describe(
    'Test View / init',
    () => {
      it(
        `The element must have class ${StyleClasses.SLIDER} if the isHorizontal property is true`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: true,
            isRange: false,
            isRangeLineEnabled: false,
            isVisibleHint: false,
            isScaleEnabled: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.SLIDER}`).attr('class'))
            .toBe(`${StyleClasses.SLIDER} ${StyleClasses.SLIDER_JS}`);
        }
      );

      it(
        `The element must have classes ${StyleClasses.SLIDER} and ${StyleClasses.SLIDER_V} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: false,
            isRange: false,
            isRangeLineEnabled: false,
            isVisibleHint: false,
            isScaleEnabled: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.SLIDER}`).attr('class'))
            .toBe(`${StyleClasses.SLIDER} ${StyleClasses.SLIDER_JS} ${StyleClasses.SLIDER_V}`);
        }
      );

      it(
        `The element must have have sub-element with class ${StyleClasses.HINT_WRAPPER} if the isHorizontal property is true`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: true,
            isRange: true,
            isRangeLineEnabled: false,
            isVisibleHint: false,
            isScaleEnabled: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.HINT_WRAPPER}`).attr('class'))
            .toBe(StyleClasses.HINT_WRAPPER);
        }
      );

      it(
        `The element must have have sub-element with classes ${StyleClasses.HINT_WRAPPER} and ${StyleClasses.HINT_WRAPPER_V} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: false,
            isRange: false,
            isRangeLineEnabled: true,
            isVisibleHint: false,
            isScaleEnabled: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.HINT_WRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.HINT_WRAPPER} ${StyleClasses.HINT_WRAPPER_V}`);
        }
      );

      it(
        `The element must have have sub-element with class ${StyleClasses.MAIN_WRAPPER} if the isHorizontal property is true`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: true,
            isRange: true,
            isRangeLineEnabled: false,
            isVisibleHint: false,
            isScaleEnabled: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.MAIN_WRAPPER}`).attr('class'))
            .toBe(StyleClasses.MAIN_WRAPPER);
        }
      );

      it(
        `The element must have have sub-element with classes ${StyleClasses.MAIN_WRAPPER} and ${StyleClasses.MAIN_WRAPPER_V} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: false,
            isRange: false,
            isRangeLineEnabled: true,
            isVisibleHint: false,
            isScaleEnabled: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.MAIN_WRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.MAIN_WRAPPER} ${StyleClasses.MAIN_WRAPPER_V}`);
        }
      );

      it(
        `The element must have have sub-element with class ${StyleClasses.SCALE_WRAPPER} if the isHorizontal property is true and the scaleValues is not null/undefined`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: true,
            isRange: true,
            isRangeLineEnabled: false,
            isVisibleHint: false,
            isScaleEnabled: true
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.SCALE_WRAPPER}`).attr('class'))
            .toBe(StyleClasses.SCALE_WRAPPER);
        }
      );

      it(
        `The element must have have sub-element with classes ${StyleClasses.SCALE_WRAPPER} and ${StyleClasses.SCALE_WRAPPER_V} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: false,
            isRange: true,
            isRangeLineEnabled: false,
            isVisibleHint: false,
            isScaleEnabled: true
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.SCALE_WRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.SCALE_WRAPPER} ${StyleClasses.SCALE_WRAPPER_V}`);
        }
      );
    }
  );

  describe(
    'Test View / functions',
    () => {
      it(
        'The getSliderHandlePosition function must call the getSliderHandlePosition function from mainWrapper',
        () => {
          const elem = $('<div>').get(0);
          const localView = new MockView(
            elem,
            new MockPresenter(),
            {
              isHorizontal: false,
              isRange: false,
              isRangeLineEnabled: true,
              isVisibleHint: false,
              isScaleEnabled: false
            },
            [0, 100]
          );
          const mainWrapper = localView.getMainWrapper();
          const spy = spyOn(mainWrapper, 'getSliderHandlePosition');
          localView.getSliderHandlePosition(SliderDirection.BOTTOM);
          expect(spy).toHaveBeenCalledWith(SliderDirection.BOTTOM);
        }
      );

      it(
        'The setHintValue function must call the setHintValue function from hintWrapper',
        () => {
          const elem = $('<div>').get(0);
          const localView = new MockView(
            elem,
            new MockPresenter(),
            {
              isHorizontal: false,
              isRange: false,
              isRangeLineEnabled: true,
              isVisibleHint: false,
              isScaleEnabled: false
            },
            [0, 100]
          );
          const hintWrapper = localView.getHintWrapper();
          const spy = spyOn(hintWrapper, 'setHintValue');
          localView.setHintValue([0, 0]);
          expect(spy).toHaveBeenCalledWith([0, 0]);
        }
      );

      it(
        'The getHintValue function must call the getHintValue function from hintWrapper',
        () => {
          const elem = $('<div>').get(0);
          const localView = new MockView(
            elem,
            new MockPresenter(),
            {
              isHorizontal: false,
              isRange: false,
              isRangeLineEnabled: true,
              isVisibleHint: false,
              isScaleEnabled: false
            },
            [0, 100]
          );
          const hintWrapper = localView.getHintWrapper();
          const spy = spyOn(hintWrapper, 'getHintValue');
          localView.getHintValue();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The getMaxHandlePosition function must call the getMaxHandlePosition function from mainWrapper',
        () => {
          const elem = $('<div>').get(0);
          const localView = new MockView(
            elem,
            new MockPresenter(),
            {
              isHorizontal: false,
              isRange: false,
              isRangeLineEnabled: true,
              isVisibleHint: false,
              isScaleEnabled: false
            },
            [0, 100]
          );
          const mainWrapper = localView.getMainWrapper();
          const spy = spyOn(mainWrapper, 'getMaxHandlePosition');
          localView.getMaxHandlePosition();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The setHandlePosition function must call the setHandlePosition function from mainWrapper',
        () => {
          const elem = $('<div>').get(0);
          const localView = new MockView(
            elem,
            new MockPresenter(),
            {
              isHorizontal: false,
              isRange: false,
              isRangeLineEnabled: true,
              isVisibleHint: false,
              isScaleEnabled: false
            },
            [0, 100]
          );
          const mainWrapper = localView.getMainWrapper();
          const spy = spyOn(mainWrapper, 'setHandlePosition');
          localView.setHandlePosition(0, SliderDirection.BOTTOM, true);
          expect(spy).toHaveBeenCalledWith(0, SliderDirection.BOTTOM, true);
        }
      );

      it(
        'When the handle position changed the View must call the sliderHandleChangedPosition function from presenter',
        () => {
          const elem = $('<div>').get(0);
          presenter = new MockPresenter();
          const localView = new MockView(
            elem,
            presenter,
            {
              isHorizontal: true,
              isRange: false,
              isRangeLineEnabled: true,
              isVisibleHint: false,
              isScaleEnabled: false
            },
            [0, 100]
          );
          const spy = spyOn(presenter, 'sliderHandleChangedPosition');
          localView.setHandlePosition(1000, SliderDirection.LEFT, true);
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'When the handle position changed the View must call the setHintPosition function from hintWrapper',
        () => {
          const elem = $('<div>').get(0);
          const localView = new MockView(
            elem,
            new MockPresenter(),
            {
              isHorizontal: true,
              isRange: true,
              isRangeLineEnabled: true,
              isVisibleHint: false,
              isScaleEnabled: false
            },
            [0, 100]
          );
          const hintWrapper = localView.getHintWrapper();
          const spy = spyOn(hintWrapper, 'setHintPosition');
          localView.setHandlePosition(1000, SliderDirection.RIGHT, true);
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The reinitialization function must clear slider, change options and call next functions: init and addEvents',
        () => {
          const elem = $('<div>').get(0);
          const oldOptions: IViewOptions = {
            isHorizontal: true,
            isRange: false,
            isRangeLineEnabled: false,
            isVisibleHint: true,
            isScaleEnabled: false
          };
          const newOptions: IViewOptions = {
            isHorizontal: false,
            isRange: false,
            isRangeLineEnabled: true,
            isVisibleHint: true,
            isScaleEnabled: false
          };
          const localView = new MockView(elem, new MockPresenter(), oldOptions, [0, 100]);
          const spySlider = spyOn(localView.$slider, 'html');
          const spyInit = spyOn(localView, 'init');
          const spyAddEvents = spyOn(localView, 'addEvents');
          localView.reinitialization(newOptions, [0, 100]);
          expect(localView.getOptions()).toEqual(newOptions);
          expect(spySlider).toHaveBeenCalled();
          expect(spyInit).toHaveBeenCalled();
          expect(spyAddEvents).toHaveBeenCalled();
        }
      );

      it(
        'When user clicked on element from ScaleWrapper, the View must call scaleClicked with a value from presenter',
        () => {
          const options: IViewOptions = {
            isHorizontal: false,
            isRange: false,
            isRangeLineEnabled: true,
            isVisibleHint: true,
            isScaleEnabled: true
          };
          const localPresenter = new MockPresenter();
          const localView = new MockView($('<div>').get(0), localPresenter, options, [0, 100]);
          const presenterSpy = spyOn(localPresenter, 'scaleClicked');
          localView.getScaleWrapper().$elem.click();
          expect(presenterSpy).toHaveBeenCalledWith(0);
        }
      );
    }
  );
});
