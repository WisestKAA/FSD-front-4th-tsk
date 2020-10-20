import StyleClasses from './StyleClasses';
import IViewOptions from './IViewOptions';
import SliderDirection from './SliderDirection';
import ICurrentValueWrapper from './CurrentValueWrapper/ICurrentValueWrapper';
import ISliderMainWrapper from './SliderMainWrapper/ISliderMainWrapper';
import ISliderLine from './SliderLine/ISliderLine';
import ISliderHandleWrapper from './SliderHandleWrapper/ISliderHandleWrapper';
import IPresenter from '../presenter/IPresenter';
import IElementsFactory from './IElementsFactory';
import IScaleWrapper from './ScaleWrapper/IScaleWrapper';
import IScaleItem from './ScaleItem/IScaleItem';
import IView from './IView';

class View implements IView {
  protected presenter: IPresenter;

  public $slider: JQuery<HTMLElement>;

  protected currentValueWrapper: ICurrentValueWrapper;

  protected mainWrapper: ISliderMainWrapper;

  protected options: IViewOptions;

  protected elem: HTMLElement;

  protected elementsFactory: IElementsFactory;

  protected scaleWrapper: IScaleWrapper;

  protected scaleValues?: number[] = null;

  constructor(viewOptions: {
      elem: HTMLElement,
      presenter: IPresenter,
      options: IViewOptions,
      elementsFactory: IElementsFactory,
      scaleValues?: number[]
  }) {
    const {
      elem, presenter, options, elementsFactory, scaleValues
    } = viewOptions;
    this.presenter = presenter;
    this.options = options;
    this.elem = elem;
    this.elementsFactory = elementsFactory;
    this.scaleValues = scaleValues;
    this.init();
    this.addEvents();
  }

  protected init(): void{
    this.currentValueWrapper = this.buildCurrentValueWrapper(this.options.isRange);
    this.mainWrapper = this.buildMainWrapper(
      this.options.isRangeLineEnabled,
      this.options.isRange
    );
    const $mainDiv = this.options.isHorizontal
      ? $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDERJS])
      : $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDERJS, StyleClasses.SLIDERV]);
    if (this.scaleValues === null || this.scaleValues === undefined) {
      $mainDiv.append([this.currentValueWrapper.$elem, this.mainWrapper.$elem]);
    } else {
      this.scaleWrapper = this.buildScaleWrapper();
      $mainDiv.append([
        this.currentValueWrapper.$elem,
        this.mainWrapper.$elem, this.scaleWrapper.$elem
      ]);
    }
    this.$slider = $(this.elem).append($mainDiv);
  }

  protected buildMainWrapper(isRangeLineEnabled: boolean, isRange: boolean): ISliderMainWrapper {
    let line: ISliderLine;
    if (isRangeLineEnabled) {
      const range = this.elementsFactory.buildRange();
      line = this.elementsFactory.buildLine(range);
    } else {
      line = this.elementsFactory.buildLine();
    }

    let handleWrapper: ISliderHandleWrapper;
    const handleFrom = this.elementsFactory.buildHandle(line, true);
    if (isRange) {
      const handleTo = this.elementsFactory.buildHandle(line, false);
      handleWrapper = this.elementsFactory.buildHandleWrapper(handleFrom, handleTo);
    } else {
      handleWrapper = this.elementsFactory.buildHandleWrapper(handleFrom);
    }
    return this.elementsFactory.buildMainWrapper(
      line,
      handleWrapper
    );
  }

  protected buildCurrentValueWrapper(isRange: boolean): ICurrentValueWrapper {
    const currentValueFrom = this.elementsFactory.buildCurrentValue(true);
    let currentValueWrapper: ICurrentValueWrapper;
    if (isRange) {
      const currentValueTo = this.elementsFactory.buildCurrentValue(false);
      currentValueWrapper = this.elementsFactory.buildCurrentValueWrapper(
        currentValueFrom,
        currentValueTo
      );
    } else {
      currentValueWrapper = this.elementsFactory.buildCurrentValueWrapper(currentValueFrom);
    }
    if (!this.options.isVisibleCurrentValue) {
      currentValueWrapper.$elem.attr('style', 'display: none');
    }
    return currentValueWrapper;
  }

  protected buildScaleWrapper(): IScaleWrapper {
    const scaleItems: IScaleItem[] = [];
    if (!this.options.isHorizontal) {
      this.scaleValues.reverse();
    }
    this.scaleValues.forEach((value) => {
      scaleItems.push(this.elementsFactory.buildScaleItem(value));
    });
    return this.elementsFactory.buildScaleWrapper(scaleItems);
  }

  protected addEvents(): void {
    this.mainWrapper.handlePositionChangedEvent.on((direction) => {
      this.setCurrentValuePosition(direction);
      this.presenter.sliderHandleChangedPosition(direction);
    });
    if (this.scaleValues !== null && this.scaleValues !== undefined) {
      this.scaleWrapper.scaleItemClickedEvent.on((number) => {
        this.presenter.scaleClicked(number);
      });
    }
  }

  protected setCurrentValuePosition(direction: SliderDirection): void{
    const position = SliderDirection.isFrom(direction)
      ? this.mainWrapper.getHandleFromPosition() : this.mainWrapper.getHandleToPosition();
    this.currentValueWrapper.setCurrentValuePosition({
      position,
      direction,
      handleFromPosition: this.mainWrapper.getHandleFromPosition(),
      handleToPosition: this.mainWrapper.getHandleToPosition(),
      lineSize: this.mainWrapper.getLineSize(),
      maxHandlePosition: this.getMaxHandlePosition()
    });
  }

  public getSliderHandlePosition(direction: SliderDirection): number {
    return this.mainWrapper.getSliderHandlePosition(direction);
  }

  public setCurrentValue(currentValue: number[]): void {
    this.currentValueWrapper.setCurrentValue(currentValue);
  }

  public getCurrentValue(): number[] {
    return this.currentValueWrapper.getCurrentValue();
  }

  public getMaxHandlePosition(): number {
    return this.mainWrapper.getMaxHandlePosition();
  }

  public setHandlePosition(position: number, direction: SliderDirection): void {
    this.mainWrapper.setHandlePosition(position, direction);
  }

  public reinitialization(option: IViewOptions, scaleValues?: number[]): void{
    this.$slider.html('');
    this.options = option;
    this.scaleValues = scaleValues;
    this.elementsFactory.setNewOptions(option.isHorizontal, option.isRange);
    this.init();
    this.addEvents();
  }
}

export default View;
