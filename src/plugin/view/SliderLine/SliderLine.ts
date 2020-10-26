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

  protected init(): void{
    this.$elem = this.isHorizontal
      ? $('<div>').addClass(StyleClasses.LINE)
      : $('<div>').addClass([StyleClasses.LINE, StyleClasses.LINEV]);
    this.isRangeLineEnabled && this.$elem.append(this.range.$elem);
  }
}

export default SliderLine;
