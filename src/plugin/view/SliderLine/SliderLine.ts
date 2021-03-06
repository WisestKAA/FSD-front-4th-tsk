import bind from 'bind-decorator';

import Observer from '../../Observer/Observer';
import { IObserver } from '../../Observer/Observer.types';
import AbstractElement from '../AbstractElement/AbstractElement';
import { ISliderRange } from '../SliderRange/SliderRange.types';
import StyleClasses from '../StyleClasses';
import { ISliderLine } from './SliderLine.types';
import { ISetRangeOptions } from './SliderLine.types';

class SliderLine extends AbstractElement implements ISliderLine {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private isRangeLineEnabled: boolean;

  private range: ISliderRange;

  private onLineClick: Observer<number>;

  constructor(isHorizontal: boolean, range?: ISliderRange) {
    super();
    this.isHorizontal = isHorizontal;
    if (range) {
      this.range = range;
      this.isRangeLineEnabled = true;
    } else {
      this.isRangeLineEnabled = false;
    }
    this.init();
    this.addEvents();
  }

  @bind
  public getLineSize(): number {
    return this.isHorizontal ? this.$elem.outerWidth() : this.$elem.outerHeight();
  }

  @bind
  public setRange(setRangeOptions: ISetRangeOptions): void{
    if (!this.isRangeLineEnabled) { return; }

    const {
      isRange,
      handleFromPosition,
      handleToPosition,
      maxHandlePosition
    } = setRangeOptions;

    isRange
      ? this.range.changeRangeLineTwo(handleFromPosition, handleToPosition)
      : this.range.changeRangeLineOne(handleFromPosition, maxHandlePosition);
  }

  public get lineClickEvent(): IObserver<number> {
    return this.onLineClick.expose();
  }

  protected init(): void{
    this.$elem = this.isHorizontal
      ? $('<div>').addClass(StyleClasses.LINE)
      : $('<div>').addClass([StyleClasses.LINE, StyleClasses.LINE_V]);
    this.isRangeLineEnabled && this.$elem.append(this.range.$elem);

    this.onLineClick = new Observer<number>();
  }

  private addEvents(): void {
    this.$elem.on('click', this.lineClickHandler);
  }

  @bind
  private lineClickHandler(event: JQuery.ClickEvent): void {
    const pxValue = this.isHorizontal
      ? event.pageX - this.$elem.offset().left
      : event.pageY - this.$elem.offset().top;
    const lineWidth = this.getLineSize();
    const percentValue = (pxValue * 100) / lineWidth;
    this.onLineClick.trigger(percentValue);
  }
}

export default SliderLine;
