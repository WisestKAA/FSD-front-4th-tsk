import IPresenter from '../presenter/IPresenter';
import ICurrentValueWrapper from './HintWrapper/IHintWrapper';
import ISliderMainWrapper from './SliderMainWrapper/ISliderMainWrapper';
import ISliderLine from './SliderLine/ISliderLine';
import ISliderHandleWrapper from './SliderHandleWrapper/ISliderHandleWrapper';
import IScaleWrapper from './ScaleWrapper/IScaleWrapper';
import IScaleItem from './ScaleItem/IScaleItem';
import StyleClasses from './StyleClasses';
import IViewOptions from './IViewOptions';
import SliderDirection from './SliderDirection';
import IElementsFactory from './IElementsFactory';
import IView from './IView';

class View implements IView {
  public $slider: JQuery<HTMLElement>;

  protected currentValueWrapper: ICurrentValueWrapper;

  protected mainWrapper: ISliderMainWrapper;

  protected options: IViewOptions;

  protected scaleWrapper: IScaleWrapper;

  private scaleValues?: number[] = null;

  private elem: HTMLElement;

  private elementsFactory: IElementsFactory;

  private presenter: IPresenter;

  constructor(viewOptions: {
      elem: HTMLElement,
      presenter: IPresenter,
      options: IViewOptions,
      elementsFactory: IElementsFactory,
      scaleValues: number[]
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

  public getSliderHandlePosition(direction: SliderDirection): number {
    return this.mainWrapper.getSliderHandlePosition(direction);
  }

  public getCurrentValue(): number[] {
    return this.currentValueWrapper.getCurrentValue();
  }

  public getMaxHandlePosition(): number {
    return this.mainWrapper.getMaxHandlePosition();
  }

  public getScaleMarkValues(): number[] {
    return this.scaleWrapper.scaleItemMarkValues;
  }

  public setHandlePosition(
    position: number,
    direction: SliderDirection,
    isNewPosition: boolean = true
  ): void {
    this.mainWrapper.setHandlePosition(position, direction, isNewPosition);
  }

  public setCurrentValue(currentValue: number[]): void {
    this.currentValueWrapper.setCurrentValue(currentValue);
  }

  public setCurrentValuePosition(direction: SliderDirection): void{
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

  public setScaleMarksPosition(positions: number[]): void {
    this.scaleWrapper.setScaleMarksPosition(positions);
  }

  public reinitialization(option: IViewOptions, scaleValues: number[]): void{
    this.$slider.html('');
    this.options = option;
    this.scaleValues = scaleValues;
    this.elementsFactory.setNewOptions(option.isHorizontal, option.isRange);
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
      ? $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDER_JS])
      : $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDER_JS, StyleClasses.SLIDER_V]);
    this.scaleWrapper = this.buildScaleWrapper();
    $mainDiv.append([
      this.currentValueWrapper.$elem,
      this.mainWrapper.$elem, this.scaleWrapper.$elem
    ]);
    this.$slider = $(this.elem).append($mainDiv);
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

    this.currentValueWrapper.intersectionEndedEvent.on((direction) => {
      this.setCurrentValuePosition(direction);
    });

    this.mainWrapper.lineClickEvent.on((percentVal) => {
      this.presenter.lineClicked(percentVal);
    });
  }

  private buildMainWrapper(isRangeLineEnabled: boolean, isRange: boolean): ISliderMainWrapper {
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
    return this.elementsFactory.buildMainWrapper(line, handleWrapper);
  }

  private buildCurrentValueWrapper(isRange: boolean): ICurrentValueWrapper {
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
    !this.options.isVisibleCurrentValue && currentValueWrapper.$elem.attr('style', 'visibility: hidden');

    return currentValueWrapper;
  }

  private buildScaleWrapper(): IScaleWrapper {
    const scaleItems: IScaleItem[] = [];
    !this.options.isHorizontal && this.scaleValues.reverse();
    this.scaleValues.forEach((value) => {
      scaleItems.push(this.elementsFactory.buildScaleItem(value));
    });
    const scaleWrapper = this.elementsFactory.buildScaleWrapper(scaleItems);
    !this.options.isScaleEnabled && scaleWrapper.$elem.attr('style', 'visibility: hidden');
    return scaleWrapper;
  }
}

export default View;
