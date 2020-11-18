import bind from 'bind-decorator';

import AbstractElement from '../AbstractElement/AbstractElement';
import { ISliderHandleWrapper } from '../SliderHandleWrapper/SliderHandleWrapper.types';
import Observer from '../../Observer/Observer';
import { IObserver } from '../../Observer/Observer.types';
import { ISetRangeOptions } from '../SliderLine/SliderLine.types';
import { ISliderLine } from '../SliderLine/SliderLine.types';
import SliderDirection from '../SliderDirection';
import StyleClasses from '../StyleClasses';
import { ISliderMainWrapper } from './SliderMainWrapper.types';

class SliderMainWrapper extends AbstractElement implements ISliderMainWrapper {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private sliderLine: ISliderLine;

  private sliderHandleWrapper: ISliderHandleWrapper;

  private onHandlePositionChanged: Observer<SliderDirection>;

  private onLineClick: Observer<number>;

  constructor(
    isHorizontal: boolean,
    sliderLine: ISliderLine,
    sliderHandleWrapper: ISliderHandleWrapper
  ) {
    super();
    this.isHorizontal = isHorizontal;
    this.sliderLine = sliderLine;
    this.sliderHandleWrapper = sliderHandleWrapper;
    this.init();
    this.addEvents();
  }

  @bind
  public getSliderHandlePosition(direction: SliderDirection): number {
    return this.sliderHandleWrapper.getSliderHandlePosition(direction);
  }

  @bind
  public getMaxHandlePosition(): number {
    return this.sliderHandleWrapper.getMaxHandlePosition();
  }

  @bind
  public setHandlePosition(
    position: number,
    direction: SliderDirection,
    isNewPosition: boolean = true
  ): void{
    this.sliderHandleWrapper.setHandlePosition(position, direction, isNewPosition);
  }

  @bind
  public getHandleFromPosition(): number {
    return this.sliderHandleWrapper.getHandleFromPosition();
  }

  @bind
  public getHandleToPosition(): number | null{
    return this.sliderHandleWrapper.getHandleToPosition();
  }

  @bind
  public getLineSize(): number {
    return this.sliderLine.getLineSize();
  }

  public get handlePositionChangedEvent(): IObserver<SliderDirection> {
    return this.onHandlePositionChanged.expose();
  }

  public get lineClickEvent(): IObserver<number> {
    return this.onLineClick.expose();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.MAIN_WRAPPER,
      StyleClasses.MAIN_WRAPPER_V
    );
    this.$elem.append([this.sliderLine.$elem, this.sliderHandleWrapper.$elem]);

    this.onHandlePositionChanged = new Observer<SliderDirection>();
    this.onLineClick = new Observer<number>();
  }

  private addEvents(): void{
    this.sliderHandleWrapper.handlePositionChangedEvent.on((direction) => {
      this.onHandlePositionChanged.trigger(direction);
    });

    this.sliderLine.lineClickEvent.on(this.handleLineClick);
  }

  @bind
  private handleLineClick(position: number): void {
    const maxHandlePosition = this.sliderHandleWrapper.getMaxHandlePosition();
    const correctPosition = position - ((100 - maxHandlePosition) / 2);
    this.onLineClick.trigger(correctPosition);
  }

  @bind
  public setRange(): void{
    let options: ISetRangeOptions;
    const isRange = this.sliderHandleWrapper.getIsRange();
    isRange
      ? options = {
        isRange,
        handleFromPosition: this.getHandleFromPosition(),
        handleToPosition: this.getHandleToPosition()
      }
      : options = {
        isRange,
        handleFromPosition: this.getHandleFromPosition(),
        maxHandlePosition: this.getMaxHandlePosition()
      };
    this.sliderLine.setRange(options);
  }
}

export default SliderMainWrapper;
