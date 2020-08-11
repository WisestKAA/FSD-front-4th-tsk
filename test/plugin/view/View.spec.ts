import IPresenter from '../../../src/plugin/presenter/IPresenter';
import SliderDirection from '../../../src/plugin/view/SliderDirection';
import View from '../../../src/plugin/view/View';
import IViewOptions from '../../../src/plugin/view/IViewOptions';
import ICurrentValueWrapper from '../../../src/plugin/view/CurrentValueWrapper/ICurrentValueWrapper';
import ISliderMainWrapper from '../../../src/plugin/view/SliderMainWrapper/ISliderMainWrapper';
import IScaleWrapper from '../../../src/plugin/view/ScaleWrapper/IScaleWrapper';
import IElementsFactory from '../../../src/plugin/view/IElementsFactory';
import IScaleItem from '../../../src/plugin/view/ScaleItem/IScaleItem';
import ISliderRange from '../../../src/plugin/view/SliderRange/ISliderRange';
import ISliderLine from '../../../src/plugin/view/SliderLine/ISliderLine';
import ISliderHandle from '../../../src/plugin/view/SliderHandle/ISliderHandle';
import ISliderHandleWrapper from '../../../src/plugin/view/SliderHandleWrapper/ISliderHandleWrapper';
import ICurrentValue from '../../../src/plugin/view/CurrentValue/ICurrentValue';
import StyleClasses from '../../../src/plugin/view/StyleClasses';
import ISetRangeOptions from '../../../src/plugin/view/SliderLine/ISetRangeOptions';
import ILiteEvent from '../../../src/plugin/LiteEvent/ILiteEvent';
import LiteEvent from '../../../src/plugin/LiteEvent/LiteEvent';
import AbstractElement from '../../../src/plugin/view/AbstractElement/AbstractElement';
import ISetCurrentValuePositionOptions from '../../../src/plugin/view/CurrentValueWrapper/ISetCurrentValuePositionOptions';


class MockPresenter implements IPresenter {
  scaleClicked (valueMock: number): void {}

  sliderHandleChangedPosition (directionMock: SliderDirection): void {}
}

class MockView extends View {
  constructor (
    elem: HTMLElement,
    presenter: IPresenter,
    options: IViewOptions,
    scaleValues?: number[]
  ) {
    super({
      elem,
      presenter,
      options,
      'elementsFactory': new MockElementsFactory(options.isHorizontal, options.isRange),
      scaleValues,
    });
  }

  getCurrentValueWrapper (): ICurrentValueWrapper {
    return this.currentValueWrapper;
  }

  getMainWrapper (): ISliderMainWrapper {
    return this.mainWrapper;
  }

  getOptions ():IViewOptions {
    return this.options;
  }

  init () {
    super.init();
  }

  addEvents () {
    super.addEvents();
  }

  getScaleWrapper ():IScaleWrapper {
    return this.scaleWrapper;
  }
}

class MockElementsFactory implements IElementsFactory {
    isHorizontal: boolean;
    isRange: boolean;
    constructor (isHorizontal: boolean, isRange: boolean) {
      this.setNewOptions(isHorizontal, isRange);
    }
    
    buildScaleItem (valueMock: number): IScaleItem {
      return new MockScaleItem;
    }

    buildScaleWrapper (scaleItemsMock: IScaleItem[]): IScaleWrapper {
      return new MockScaleWrapper(this.isHorizontal);
    }

    buildRange (): ISliderRange {
      return new MockRange();
    }

    buildLine (rangeMock?: ISliderRange): ISliderLine {
      return new MockLine();
    }

    buildHandle (lineMock: ISliderLine, isFromMock: boolean): ISliderHandle {
      return new MockHandle();
    }

    buildHandleWrapper (
      handleFromMock: ISliderHandle,
      handleToMock?: ISliderHandle
    ): ISliderHandleWrapper {
      return new MockHandleWrapper();
    }

    buildMainWrapper (
      sliderLineMock: ISliderLine,
      sliderHandleWrapperMock: ISliderHandleWrapper
    ): ISliderMainWrapper {
      return new MockMainWrapper(this.isHorizontal);
    }
    buildCurrentValue (isFromMock: boolean): ICurrentValue {
      return new MockCurrentValue();
    }

    buildCurrentValueWrapper (
      valueFromMock: ICurrentValue,
      valueToMock?: ICurrentValue
    ): ICurrentValueWrapper {
      return new MockCurrentValueWrapper(this.isHorizontal);
    }

    setNewOptions (isHorizontal: boolean, isRange: boolean): void {
      this.isHorizontal = isHorizontal;
      this.isRange = isRange;
    }
}

class MockRange implements ISliderRange {
    $elem: JQuery<HTMLElement> = $('<div>');
    changeRangeLineTwo (positionFromMock: number, positionToMock: number): void {}

    changeRangeLineOne (positionFromMock: number, maxHandlePositionMock: number): void {}
    
    changeOrientation (
      isHorizontalMock: boolean,
      horizontalClassMock: StyleClasses,
      verticalClassMock: StyleClasses
    ): void {}
}

class MockLine implements ISliderLine {
  changeOrientation (
    isHorizontalMock: boolean,
    horizontalClassMock: StyleClasses,
    verticalClassMock: StyleClasses
  ): void {}

  public $elem: JQuery<HTMLElement> = $('<div>');

  getLineSize (): number {
    return 100;
  }
  setRange (setRangeOptionsMock: ISetRangeOptions): void {}
}

class MockHandle implements ISliderHandle {
  setNewPosition (positionMock: number, directionMock: SliderDirection): void {}
  getSliderHandleMaxPosition (): number {
    return 0;
  }

  setCurrentPosition (positionMock: number, directionMock: SliderDirection): void {}

  getHandleSize (): number {
    return 10;
  }

  getPosition (): number {
    return 0;
  }
    positionChangedEvent: ILiteEvent<SliderDirection>;
    $elem: JQuery<HTMLElement> = $('<div>');
    changeOrientation (
      isHorizontalMock: boolean,
      horizontalClassMock: StyleClasses,
      verticalClassMock: StyleClasses
    ): void {}
}

class MockHandleWrapper implements ISliderHandleWrapper {
    protected onHandlePositionChanged: LiteEvent<SliderDirection>;
    constructor () {
      this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
    }
    getMaxHandlePosition (): number {
      return 90;
    }
    setHandlePosition (
      positionMock: number,
      directionMock: SliderDirection
    ): void {}

    getSliderHandlePosition (directionMock: SliderDirection): number {
      return 0;
    }

    getHandleFromPosition (): number {
      return 0;
    }

    getHandleToPosition (): number {
      return 0;
    }

    getIsRange (): boolean {
      return false;
    }

    public get handlePositionChangedEvent (): ILiteEvent<SliderDirection> {
      return this.onHandlePositionChanged.expose();
    }

    $elem: JQuery<HTMLElement> = $('<div>');

    changeOrientation (
      isHorizontalMock: boolean,
      horizontalClassMock: StyleClasses,
      verticalClassMock: StyleClasses
    ): void {}
}

class MockMainWrapper extends AbstractElement implements ISliderMainWrapper {
    protected isHorizontal: boolean;
    protected onHandlePositionChanged: LiteEvent<SliderDirection>;

    constructor (isHorizontal: boolean) {
      super();
      this.isHorizontal = isHorizontal;
      this.init();
    }

    protected init (): void {
      this.$elem  = $('<div>');
      this.changeOrientation(
        this.isHorizontal,
        StyleClasses.MAINWRAPPER,
        StyleClasses.MAINWRAPPERV
      );
      this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
    }

    getSliderHandlePosition (directionMock: SliderDirection): number {
      return 0;
    }

    getMaxHandlePosition (): number {
      return 90;
    }

    setHandlePosition (position: number, direction: SliderDirection): void {
      this.onHandlePositionChanged.trigger(direction);
    }

    getHandleFromPosition (): number {
      return 0;
    }

    getHandleToPosition (): number {
      return 0;
    }

    getLineSize (): number {
      return 100;
    }

    public get handlePositionChangedEvent (): ILiteEvent<SliderDirection> {
      return this.onHandlePositionChanged.expose();
    }

    $elem: JQuery<HTMLElement>;
}

class MockCurrentValue implements ICurrentValue {
    $elem: JQuery<HTMLElement>;

    setCurrentValue (currentValueMock: number): void {}

    getCurrentValue (): number {
      return 0;
    }

    setPosition (
      positionMock: number,
      handlePercentMock?: number,
      lineWidthMock?: number,
      isCorrectMock?: boolean
    ): void {}

    getCurrentValueSize (): number {
      return 5;
    }

    getCurrentValuePosition (): number {
      return 0;
    }
}

class MockCurrentValueWrapper extends AbstractElement implements ICurrentValueWrapper {
    protected isHorizontal: boolean;
    constructor (isHorizontal: boolean) {
      super();
      this.isHorizontal = isHorizontal;
      this.init();
    }
    protected init (): void {
      this.$elem  = $('<div>');
      this.changeOrientation(
        this.isHorizontal,
        StyleClasses.CURRENTVALWRAPPER,
        StyleClasses.CURRENTVALWRAPPERV
      );
    }
    setCurrentValuePosition (optionsMock: ISetCurrentValuePositionOptions): void { }

    setCurrentValue (currentValueMock: number[]): void {}

    getCurrentValue (): number[] {
      return [0, 0];
    }

    $elem: JQuery<HTMLElement> = $('<div>');
}

class MockScaleItem implements IScaleItem {
    protected onScaleItemClicked: LiteEvent<number>;
    scaleItemClickedEvent: ILiteEvent<number>;
    $elem: JQuery<HTMLElement>;

    changeOrientation (
      isHorizontalMock: boolean,
      horizontalClassMock: StyleClasses,
      verticalClassMock: StyleClasses
    ): void { }
}

class MockScaleWrapper implements IScaleWrapper {
    protected onScaleItemClicked: LiteEvent<number>;
    isHorizontal: boolean;
    $elem: JQuery<HTMLElement>;

    constructor (isHorizontal: boolean) {
      this.isHorizontal = isHorizontal;
      this.onScaleItemClicked = new LiteEvent<number>();
      this.$elem = this.isHorizontal ?
        $('<div>').addClass(StyleClasses.SCALEWRAPPER) :
        $('<div>').addClass([StyleClasses.SCALEWRAPPER, StyleClasses.SCALEWRAPPERV]);
      this.$elem.click(() => {
        this.onScaleItemClicked.trigger(0);
      });
    }

    public get scaleItemClickedEvent (): ILiteEvent<number> {
      return this.onScaleItemClicked.expose();
    }

    changeOrientation (
      isHorizontalMock: boolean,
      horizontalClassMock: StyleClasses,
      verticalClassMock: StyleClasses
    ): void {}
}

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
            'isHorizontal': true,
            'isRange': false,
            'isRangeLineEnabled': false,
            'isVisibleCurrentValue': false,
          };
          view = new View({
            elem,
            options,
            'presenter': new MockPresenter(),
            'elementsFactory': new MockElementsFactory(options.isHorizontal, options.isRange),
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
            'isHorizontal': false,
            'isRange': false,
            'isRangeLineEnabled': false,
            'isVisibleCurrentValue': false,
          };
          view = new View({
            elem,
            options,
            'presenter': new MockPresenter(),
            'elementsFactory': new MockElementsFactory(options.isHorizontal, options.isRange),
          });
          expect(view.$slider.find(`.${StyleClasses.SLIDER}`).attr('class'))
            .toBe(`${StyleClasses.SLIDER} ${StyleClasses.SLIDERJS} ${StyleClasses.SLIDERV}`);
        }
      );

      it(
        `The element must have have subelement with class ${StyleClasses.CURRENTVALWRAPPER} if the isHorizontal property is true`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            'isHorizontal': true,
            'isRange': true,
            'isRangeLineEnabled': false,
            'isVisibleCurrentValue': false,
          };
          view = new View({
            elem,
            options,
            'presenter': new MockPresenter(),
            'elementsFactory': new MockElementsFactory(options.isHorizontal, options.isRange),
          });
          expect(view.$slider.find(`.${StyleClasses.CURRENTVALWRAPPER}`).attr('class'))
            .toBe(StyleClasses.CURRENTVALWRAPPER);
        }
      );

      it(
        `The element must have have subelement with classes ${StyleClasses.CURRENTVALWRAPPER} and ${StyleClasses.CURRENTVALWRAPPERV} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            'isHorizontal': false,
            'isRange': false,
            'isRangeLineEnabled': true,
            'isVisibleCurrentValue': false,
          };
          view = new View({
            elem,
            options,
            'presenter': new MockPresenter(),
            'elementsFactory': new MockElementsFactory(options.isHorizontal, options.isRange),
          });
          expect(view.$slider.find(`.${StyleClasses.CURRENTVALWRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.CURRENTVALWRAPPER} ${StyleClasses.CURRENTVALWRAPPERV}`);
        }
      );

      it(
        `The element must have have subelement with class ${StyleClasses.MAINWRAPPER} if the isHorizontal property is true`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            'isHorizontal': true,
            'isRange': true,
            'isRangeLineEnabled': false,
            'isVisibleCurrentValue': false,
          };
          view = new View({
            elem,
            options,
            'presenter': new MockPresenter(),
            'elementsFactory': new MockElementsFactory(options.isHorizontal, options.isRange),
          });
          expect(view.$slider.find(`.${StyleClasses.MAINWRAPPER}`).attr('class'))
            .toBe(StyleClasses.MAINWRAPPER);
        }
      );

      it(
        `The element must have have subelement with classes ${StyleClasses.MAINWRAPPER} and ${StyleClasses.MAINWRAPPERV} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            'isHorizontal': false,
            'isRange': false,
            'isRangeLineEnabled': true,
            'isVisibleCurrentValue': false,
          };
          view = new View({
            elem,
            options,
            'presenter': new MockPresenter(),
            'elementsFactory': new MockElementsFactory(options.isHorizontal, options.isRange),
          });
          expect(view.$slider.find(`.${StyleClasses.MAINWRAPPER}`).attr('class'))
            .toBe(`${StyleClasses.MAINWRAPPER} ${StyleClasses.MAINWRAPPERV}`);
        }
      );

      it(
        `The element must have have subelement with class ${StyleClasses.SCALEWRAPPER} if the isHorizontal property is true and the scaleValues is not null/undefined`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            'isHorizontal': true,
            'isRange': true,
            'isRangeLineEnabled': false,
            'isVisibleCurrentValue': false,
          };
          view = new View({
            elem,
            options,
            'presenter': new MockPresenter(),
            'elementsFactory': new MockElementsFactory(options.isHorizontal, options.isRange),
            'scaleValues': [0, 100],
          });
          expect(view.$slider.find(`.${StyleClasses.SCALEWRAPPER}`).attr('class'))
            .toBe(StyleClasses.SCALEWRAPPER);
        }
      );

      it(
        `The element must have have subelement with classes ${StyleClasses.SCALEWRAPPER} and ${StyleClasses.SCALEWRAPPERV} if the isHorizontal property is false`,
        () => {
          const elem = $('<div>').get(0);
          const options: IViewOptions = {
            'isHorizontal': false,
            'isRange': true,
            'isRangeLineEnabled': false,
            'isVisibleCurrentValue': false,
          };
          view = new View({
            elem,
            options,
            'presenter': new MockPresenter(),
            'elementsFactory': new MockElementsFactory(options.isHorizontal, options.isRange),
            'scaleValues': [0, 100],
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
          const view = new MockView(
            elem,
            new MockPresenter(),
            {
              'isHorizontal': false,
              'isRange': false,
              'isRangeLineEnabled': true,
              'isVisibleCurrentValue': false,
            }
          );
          const mainWrapper = view.getMainWrapper();
          const spy = spyOn(mainWrapper, 'getSliderHandlePosition');
          view.getSliderHandlePosition(SliderDirection.BOTTOM);
          expect(spy).toHaveBeenCalledWith(SliderDirection.BOTTOM);
        }
      );

      it(
        'The setCurrentValue function must call the setCurrentValue function from currentValueWrapper',
        () => {
          const elem = $('<div>').get(0);
          const view = new MockView(
            elem,
            new MockPresenter(),
            {
              'isHorizontal': false,
              'isRange': false,
              'isRangeLineEnabled': true,
              'isVisibleCurrentValue': false,
            }
          );
          const currentValueWrapper = view.getCurrentValueWrapper();
          const spy = spyOn(currentValueWrapper, 'setCurrentValue');
          view.setCurrentValue([0, 0]);
          expect(spy).toHaveBeenCalledWith([0, 0]);
        }
      );

      it(
        'The getCurrentValue function must call the getCurrentValue function from currentValueWrapper',
        () => {
          const elem = $('<div>').get(0);
          const view = new MockView(
            elem,
            new MockPresenter(),
            {
              'isHorizontal': false,
              'isRange': false,
              'isRangeLineEnabled': true,
              'isVisibleCurrentValue': false,
            }
          );
          const currentValueWrapper = view.getCurrentValueWrapper();
          const spy = spyOn(currentValueWrapper, 'getCurrentValue');
          view.getCurrentValue();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The getMaxHandlePosition function must call the getMaxHandlePosition function from mainWrapper',
        () => {
          const elem = $('<div>').get(0);
          const view = new MockView(
            elem,
            new MockPresenter(),
            {
              'isHorizontal': false,
              'isRange': false,
              'isRangeLineEnabled': true,
              'isVisibleCurrentValue': false,
            }
          );
          const mainWrapper = view.getMainWrapper();
          const spy = spyOn(mainWrapper, 'getMaxHandlePosition');
          view.getMaxHandlePosition();
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The setHandlePosition function must call the setHandlePosition function from mainWrapper',
        () => {
          const elem = $('<div>').get(0);
          const view = new MockView(
            elem,
            new MockPresenter(),
            {
              'isHorizontal': false,
              'isRange': false,
              'isRangeLineEnabled': true,
              'isVisibleCurrentValue': false,
            }
          );
          const mainWrapper = view.getMainWrapper();
          const spy = spyOn(mainWrapper, 'setHandlePosition');
          view.setHandlePosition(0, SliderDirection.BOTTOM);
          expect(spy).toHaveBeenCalledWith(0, SliderDirection.BOTTOM);
        }
      );

      it(
        'When the handle position changed the View must call the sliderHandleChangedPosition function from presenter',
        () => {
          const elem = $('<div>').get(0);
          presenter = new MockPresenter();
          const view = new MockView(
            elem,
            presenter,
            {
              'isHorizontal': true,
              'isRange': false,
              'isRangeLineEnabled': true,
              'isVisibleCurrentValue': false,
            }
          );
          const spy = spyOn(presenter, 'sliderHandleChangedPosition');
          view.setHandlePosition(1000, SliderDirection.LEFT);
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'When the handle position changed the View must call the setCurrentValuePosition function from currentValueWrapper',
        () => {
          const elem = $('<div>').get(0);
          const view = new MockView(
            elem,
            new MockPresenter(),
            {
              'isHorizontal': true,
              'isRange': true,
              'isRangeLineEnabled': true,
              'isVisibleCurrentValue': false,
            }
          );
          const currentValueWrapper = view.getCurrentValueWrapper();
          const spy = spyOn(currentValueWrapper, 'setCurrentValuePosition');
          view.setHandlePosition(1000, SliderDirection.RIGHT);
          expect(spy).toHaveBeenCalled();
        }
      );

      it(
        'The reinitialization function must clear slider, change options and call next functions: init and addEvents',
        () => {
          const elem = $('<div>').get(0);
          const oldOptions: IViewOptions = {
            'isHorizontal': true,
            'isRange': false,
            'isRangeLineEnabled': false,
            'isVisibleCurrentValue': true,
          };
          const newOptions: IViewOptions = {
            'isHorizontal': false,
            'isRange': false,
            'isRangeLineEnabled': true,
            'isVisibleCurrentValue': true,
          };
          const view = new MockView(elem, new MockPresenter(), oldOptions);
          const spySlider = spyOn(view.$slider, 'html');
          const spyInit = spyOn(view, 'init');
          const spyAddEvents = spyOn(view, 'addEvents');
          view.reinitialization(newOptions);
          expect(view.getOptions()).toEqual(newOptions);
          expect(spySlider).toHaveBeenCalled();
          expect(spyInit).toHaveBeenCalled();
          expect(spyAddEvents).toHaveBeenCalled();
        }
      );

      it(
        'When user clicked on element from ScaleWrapper, the View must call scaleClicked whith a value from presenter',
        () => {
          const options: IViewOptions = {
            'isHorizontal': false,
            'isRange': false,
            'isRangeLineEnabled': true,
            'isVisibleCurrentValue': true,
          };
          const presenter = new MockPresenter();
          const view = new MockView($('<div>').get(0), presenter, options, [0, 100]);
          const presenterSpy = spyOn(presenter, 'scaleClicked');
          view.getScaleWrapper().$elem.click();
          expect(presenterSpy).toHaveBeenCalledWith(0);
        }
      );
    }
  );
});
