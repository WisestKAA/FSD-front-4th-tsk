import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import View from '../../../../src/plugin/view/View';
import IViewOptions from '../../../../src/plugin/view/IViewOptions';
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
            isVisibleCurrentValue: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange)
          });
          expect(view.$slider.find(`.${StyleClasses.SLIDER}`).attr('class'))
            .toBe(`${StyleClasses.SLIDER} ${StyleClasses.SLIDERJS}`);
        }
      );

      it(
        `The element must have classes ${StyleClasses.SLIDER} and ${StyleClasses.SLIDERV} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: false,
            isRange: false,
            isRangeLineEnabled: false,
            isVisibleCurrentValue: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange)
          });
          expect(view.$slider.find(`.${StyleClasses.SLIDER}`).attr('class'))
            .toBe(`${StyleClasses.SLIDER} ${StyleClasses.SLIDERJS} ${StyleClasses.SLIDERV}`);
        }
      );

      it(
        `The element must have have sub-element with class ${StyleClasses.CURRENTVALWRAPPER} if the isHorizontal property is true`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: true,
            isRange: true,
            isRangeLineEnabled: false,
            isVisibleCurrentValue: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange)
          });
          expect(view.$slider.find(`.${StyleClasses.CURRENTVALWRAPPER}`).attr('class'))
            .toBe(StyleClasses.CURRENTVALWRAPPER);
        }
      );

      it(
        `The element must have have sub-element with classes ${StyleClasses.CURRENTVALWRAPPER} and ${StyleClasses.CURRENTVALWRAPPERV} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: false,
            isRange: false,
            isRangeLineEnabled: true,
            isVisibleCurrentValue: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange)
          });
          expect(view.$slider.find(`.${StyleClasses.CURRENTVALWRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.CURRENTVALWRAPPER} ${StyleClasses.CURRENTVALWRAPPERV}`);
        }
      );

      it(
        `The element must have have sub-element with class ${StyleClasses.MAINWRAPPER} if the isHorizontal property is true`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: true,
            isRange: true,
            isRangeLineEnabled: false,
            isVisibleCurrentValue: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange)
          });
          expect(view.$slider.find(`.${StyleClasses.MAINWRAPPER}`).attr('class'))
            .toBe(StyleClasses.MAINWRAPPER);
        }
      );

      it(
        `The element must have have sub-element with classes ${StyleClasses.MAINWRAPPER} and ${StyleClasses.MAINWRAPPERV} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: false,
            isRange: false,
            isRangeLineEnabled: true,
            isVisibleCurrentValue: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange)
          });
          expect(view.$slider.find(`.${StyleClasses.MAINWRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.MAINWRAPPER} ${StyleClasses.MAINWRAPPERV}`);
        }
      );

      it(
        `The element must have have sub-element with class ${StyleClasses.SCALEWRAPPER} if the isHorizontal property is true and the scaleValues is not null/undefined`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: true,
            isRange: true,
            isRangeLineEnabled: false,
            isVisibleCurrentValue: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.SCALEWRAPPER}`).attr('class'))
            .toBe(StyleClasses.SCALEWRAPPER);
        }
      );

      it(
        `The element must have have sub-element with classes ${StyleClasses.SCALEWRAPPER} and ${StyleClasses.SCALEWRAPPERV} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            isHorizontal: false,
            isRange: true,
            isRangeLineEnabled: false,
            isVisibleCurrentValue: false
          };
          view = new View({
            elem,
            options,
            presenter: new MockPresenter(),
            elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
            scaleValues: [0, 100]
          });
          expect(view.$slider.find(`.${StyleClasses.SCALEWRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.SCALEWRAPPER} ${StyleClasses.SCALEWRAPPERV}`);
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
              isVisibleCurrentValue: false
            }
          );
          const mainWrapper = localView.getMainWrapper();
          const spy = spyOn(mainWrapper, 'getSliderHandlePosition');
          localView.getSliderHandlePosition(SliderDirection.BOTTOM);
          expect(spy).toHaveBeenCalledWith(SliderDirection.BOTTOM);
        }
      );

      it(
        'The setCurrentValue function must call the setCurrentValue function from currentValueWrapper',
        () => {
          const elem = $('<div>').get(0);
          const localView = new MockView(
            elem,
            new MockPresenter(),
            {
              isHorizontal: false,
              isRange: false,
              isRangeLineEnabled: true,
              isVisibleCurrentValue: false
            }
          );
          const currentValueWrapper = localView.getCurrentValueWrapper();
          const spy = spyOn(currentValueWrapper, 'setCurrentValue');
          localView.setCurrentValue([0, 0]);
          expect(spy).toHaveBeenCalledWith([0, 0]);
        }
      );

      it(
        'The getCurrentValue function must call the getCurrentValue function from currentValueWrapper',
        () => {
          const elem = $('<div>').get(0);
          const localView = new MockView(
            elem,
            new MockPresenter(),
            {
              isHorizontal: false,
              isRange: false,
              isRangeLineEnabled: true,
              isVisibleCurrentValue: false
            }
          );
          const currentValueWrapper = localView.getCurrentValueWrapper();
          const spy = spyOn(currentValueWrapper, 'getCurrentValue');
          localView.getCurrentValue();
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
              isVisibleCurrentValue: false
            }
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
              isVisibleCurrentValue: false
            }
          );
          const mainWrapper = localView.getMainWrapper();
          const spy = spyOn(mainWrapper, 'setHandlePosition');
          localView.setHandlePosition(0, SliderDirection.BOTTOM);
          expect(spy).toHaveBeenCalledWith(0, SliderDirection.BOTTOM);
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
              isVisibleCurrentValue: false
            }
          );
          const spy = spyOn(presenter, 'sliderHandleChangedPosition');
          localView.setHandlePosition(1000, SliderDirection.LEFT);
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'When the handle position changed the View must call the setCurrentValuePosition function from currentValueWrapper',
        () => {
          const elem = $('<div>').get(0);
          const localView = new MockView(
            elem,
            new MockPresenter(),
            {
              isHorizontal: true,
              isRange: true,
              isRangeLineEnabled: true,
              isVisibleCurrentValue: false
            }
          );
          const currentValueWrapper = localView.getCurrentValueWrapper();
          const spy = spyOn(currentValueWrapper, 'setCurrentValuePosition');
          localView.setHandlePosition(1000, SliderDirection.RIGHT);
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
            isVisibleCurrentValue: true
          };
          const newOptions: IViewOptions = {
            isHorizontal: false,
            isRange: false,
            isRangeLineEnabled: true,
            isVisibleCurrentValue: true
          };
          const localView = new MockView(elem, new MockPresenter(), oldOptions);
          const spySlider = spyOn(localView.$slider, 'html');
          const spyInit = spyOn(localView, 'init');
          const spyAddEvents = spyOn(localView, 'addEvents');
          localView.reinitialization(newOptions);
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
            isVisibleCurrentValue: true
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
