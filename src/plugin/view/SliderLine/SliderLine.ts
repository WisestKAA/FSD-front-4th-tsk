import bind from 'bind-decorator';

import LiteEvent from '../../LiteEvent/LiteEvent';
import ILiteEvent from '../../LiteEvent/ILiteEvent';
import AbstractElement from '../AbstractElement/AbstractElement';
import ISliderRange from '../SliderRange/ISliderRange';
import StyleClasses from '../StyleClasses';
import ISliderLine from './ISliderLine';
import ISetRangeOptions from './ISetRangeOptions';

class SliderLine extends AbstractElement implements ISliderLine {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private isRangeLineEnabled: boolean;

  private range: ISliderRange;

  private onLineClick: LiteEvent<number>;

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

  public getLineSize(): number {
    return this.isHorizontal ? this.$elem.outerWidth() : this.$elem.outerHeight();
  }

  public setRange(setRangeOptions: ISetRangeOptions): void{
    if (this.isRangeLineEnabled) {
      setRangeOptions.isRange
        ? this.range.changeRangeLineTwo(
          setRangeOptions.handleFromPosition,
          setRangeOptions.handleToPosition
        )
        : this.range.changeRangeLineOne(
          setRangeOptions.handleFromPosition,
          setRangeOptions.maxHandlePosition
        );
    }
  }

  public get lineClickEvent(): ILiteEvent<number> {
    return this.onLineClick.expose();
  }

  protected init(): void{
    this.$elem = this.isHorizontal
      ? $('<div>').addClass(StyleClasses.LINE)
      : $('<div>').addClass([StyleClasses.LINE, StyleClasses.LINE_V]);
    this.isRangeLineEnabled && this.$elem.append(this.range.$elem);

    this.onLineClick = new LiteEvent<number>();
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
