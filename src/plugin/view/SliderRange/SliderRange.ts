import AbstractElement from '../AbstractElement/AbstractElement';
import StyleClasses from '../StyleClasses';
import ISliderRange from './ISliderRange';

class SliderRange extends AbstractElement implements ISliderRange {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  constructor(isHorizontal: boolean) {
    super();
    this.isHorizontal = isHorizontal;
    this.init();
  }

  public changeRangeLineTwo(positionFrom: number, positionTo: number): void{
    const rangePosition = positionFrom;
    const rangeSize = 100 - positionTo - positionFrom;
    const direction = this.isHorizontal ? 'left' : 'bottom';
    const wh = this.isHorizontal ? 'width' : 'height';
    this.$elem.attr('style', `${direction}: ${rangePosition}%; ${wh}: ${rangeSize}%`);
  }

  public changeRangeLineOne(positionFrom: number, maxHandlePosition: number): void{
    const size = ((100 - maxHandlePosition) / 2) + positionFrom;
    const direction = this.isHorizontal ? 'left' : 'bottom';
    const wh = this.isHorizontal ? 'width' : 'height';
    this.$elem.attr('style', `${direction}: 0%; ${wh}: ${size}%`);
  }

  protected init(): void {
    this.$elem = this.isHorizontal
      ? $('<div>').addClass(StyleClasses.RANGE)
      : $('<div>').addClass([StyleClasses.RANGE, StyleClasses.RANGE_V]);
  }
}

export default SliderRange;
