import bind from 'bind-decorator';

import { IPresenter } from '../presenter/Presenter.types';
import { IHintWrapper } from './HintWrapper/HintWrapper.types';
import { ISliderMainWrapper } from './SliderMainWrapper/SliderMainWrapper.types';
import { ISliderLine } from './SliderLine/SliderLine.types';
import { ISliderHandleWrapper } from './SliderHandleWrapper/SliderHandleWrapper.types';
import { IScaleWrapper } from './ScaleWrapper/ScaleWrapper.types';
import { IScaleItem } from './ScaleItem/ScaleItem.types';
import { IElementsFactory, IView, IViewOptions } from './View.types';
import StyleClasses from './StyleClasses';
import SliderDirection from './SliderDirection';

class View implements IView {
  public $slider: JQuery<HTMLElement>;

  protected hintWrapper: IHintWrapper;

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

  @bind
  public getSliderHandlePosition(direction: SliderDirection): number {
    return this.mainWrapper.getSliderHandlePosition(direction);
  }

  @bind
  public getHintValue(): number[] {
    return this.hintWrapper.getHintValue();
  }

  @bind
  public getMaxHandlePosition(): number {
    return this.mainWrapper.getMaxHandlePosition();
  }

  @bind
  public getScaleMarkValues(): number[] {
    return this.scaleWrapper.scaleItemMarkValues;
  }

  @bind
  public setHandlePosition(
    position: number,
    direction: SliderDirection,
    isNewPosition: boolean = true
  ): void {
    this.mainWrapper.setHandlePosition(position, direction, isNewPosition);
  }

  @bind
  public setRange(): void {
    this.mainWrapper.setRange();
  }

  @bind
  public setHintValue(hintValue: number[]): void {
    this.hintWrapper.setHintValue(hintValue);
  }

  @bind
  public setHintPosition(direction: SliderDirection): void{
    const position = SliderDirection.isFrom(direction)
      ? this.mainWrapper.getHandleFromPosition() : this.mainWrapper.getHandleToPosition();
    this.hintWrapper.setHintPosition({
      position,
      direction,
      handleFromPosition: this.mainWrapper.getHandleFromPosition(),
      handleToPosition: this.mainWrapper.getHandleToPosition(),
      lineSize: this.mainWrapper.getLineSize(),
      maxHandlePosition: this.getMaxHandlePosition()
    });
  }

  @bind
  public setScaleMarksPosition(positions: number[]): void {
    this.scaleWrapper.setScaleMarksPosition(positions);
  }

  @bind
  public reinitialization(option: IViewOptions, scaleValues: number[]): void{
    this.$slider.html('');
    this.options = option;
    this.scaleValues = scaleValues;
    this.elementsFactory.setNewOptions(option.isHorizontal, option.isRange);
    this.init();
    this.addEvents();
  }

  protected init(): void{
    this.hintWrapper = this.buildHintWrapper(this.options.isRange);
    this.mainWrapper = this.buildMainWrapper(
      this.options.isRangeLineEnabled,
      this.options.isRange
    );
    const $mainDiv = this.options.isHorizontal
      ? $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDER_JS])
      : $('<div>').addClass([StyleClasses.SLIDER, StyleClasses.SLIDER_JS, StyleClasses.SLIDER_V]);
    this.scaleWrapper = this.buildScaleWrapper();
    $mainDiv.append([
      this.hintWrapper.$elem,
      this.mainWrapper.$elem, this.scaleWrapper.$elem
    ]);
    this.$slider = $(this.elem).append($mainDiv);
  }

  protected addEvents(): void {
    this.mainWrapper.handlePositionChangedEvent.on((direction) => {
      this.setHintPosition(direction);
      this.presenter.sliderHandleChangedPosition(direction);
    });

    if (this.scaleValues !== null && this.scaleValues !== undefined) {
      this.scaleWrapper.scaleItemClickedEvent.on((number) => {
        this.presenter.scaleClicked(number);
      });
    }

    this.hintWrapper.intersectionEndedEvent.on((direction) => {
      this.setHintPosition(direction);
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

  private buildHintWrapper(isRange: boolean): IHintWrapper {
    const hintFrom = this.elementsFactory.buildHint(true);
    let hintWrapper: IHintWrapper;
    if (isRange) {
      const hintTo = this.elementsFactory.buildHint(false);
      hintWrapper = this.elementsFactory.buildHintWrapper(
        hintFrom,
        hintTo
      );
    } else {
      hintWrapper = this.elementsFactory.buildHintWrapper(hintFrom);
    }
    !this.options.isVisibleHint && hintWrapper.$elem.attr('style', 'visibility: hidden');

    return hintWrapper;
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
