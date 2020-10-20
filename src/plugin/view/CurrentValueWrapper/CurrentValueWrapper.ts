import AbstractElement from '../AbstractElement/AbstractElement';
import StyleClasses from '../StyleClasses';
import ICurrentValue from '../CurrentValue/ICurrentValue';
import SliderDirection from '../SliderDirection';
import ISetCurrentValuePositionOptions from './ISetCurrentValuePositionOptions';

class CurrentValueWrapper extends AbstractElement {
  public $elem: JQuery<HTMLElement>;

  protected currentValueFrom: ICurrentValue;

  protected currentValueTo: ICurrentValue;

  protected isHorizontal: boolean;

  protected isRange: boolean;

  constructor(isHorizontal: boolean, valFrom: ICurrentValue, valTo?: ICurrentValue) {
    super();
    this.currentValueFrom = valFrom;
    this.isHorizontal = isHorizontal;
    if (valTo) {
      this.currentValueTo = valTo;
      this.isRange = true;
    } else {
      this.isRange = false;
    }
    this.init();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.CURRENTVALWRAPPER,
      StyleClasses.CURRENTVALWRAPPERV
    );

    this.$elem.append(this.currentValueFrom.$elem);
    if (this.isRange) {
      this.$elem.append(this.currentValueTo.$elem);
    }
  }

  public setCurrentValuePosition(options: ISetCurrentValuePositionOptions): void {
    switch (options.direction) {
    case SliderDirection.LEFT: {
      const maxPosition = options.maxHandlePosition;
      const handlePercent = 100 - maxPosition;
      this.currentValueFrom.setPosition(
        options.position,
        handlePercent,
        options.lineSize
      );
      break;
    }
    case SliderDirection.BOTTOM: {
      this.currentValueFrom.setPosition(options.position);
      break;
    }
    case SliderDirection.RIGHT: {
      const maxPosition = options.maxHandlePosition;
      const handlePercent = 100 - maxPosition;
      this.currentValueTo.setPosition(
        options.position,
        handlePercent,
        options.lineSize
      );
      break;
    }
    case SliderDirection.TOP: {
      this.currentValueTo.setPosition(options.position);
      break;
    }
    default: {
      return;
    }
    }

    if (this.isRange) {
      this.checkCurrentValueIntersection(
        options.lineSize,
        options.handleFromPosition,
        options.handleToPosition
      );
    }
  }

  protected checkCurrentValueIntersection(
    lineSize: number,
    handleFromPosition: number,
    handleToPosition: number
  ): void{
    const currentValueFromSize = this.currentValueFrom.getCurrentValueSize() + 1;
    const currentValueToSize = this.currentValueTo.getCurrentValueSize();
    const maxSize = lineSize - currentValueFromSize - currentValueToSize;
    let maxSizePercent = (maxSize * 100) / lineSize;
    let sumPosition = this.currentValueFrom.getCurrentValuePosition()
      + this.currentValueTo.getCurrentValuePosition();
    const precision = Math.pow(10, 10);
    maxSizePercent = Math.round(maxSizePercent * precision) / precision;
    sumPosition = Math.round(sumPosition * precision) / precision;
    if (sumPosition >= maxSizePercent) {
      const shiftMiddlePosition = (100 - handleFromPosition - handleToPosition) / 2;
      const currentValueFromPercent = (currentValueFromSize * 100) / lineSize;
      const currentValueToPercent = (currentValueToSize * 100) / lineSize;
      const currentPositionValueFrom = handleFromPosition
        + shiftMiddlePosition - currentValueFromPercent;
      const currentPositionValueTo = handleToPosition
        + shiftMiddlePosition - currentValueToPercent;
      this.currentValueFrom.setPosition(currentPositionValueFrom, null, null, true);
      this.currentValueTo.setPosition(currentPositionValueTo, null, null, true);
    }
  }

  public setCurrentValue(currentValue: number[]): void{
    this.currentValueFrom.setCurrentValue(currentValue[0]);
    if (this.isRange) {
      this.currentValueTo.setCurrentValue(currentValue[1]);
    }
  }

  public getCurrentValue(): number[] {
    const val: number[] = [];
    val.push(this.currentValueFrom.getCurrentValue());
    if (this.isRange) {
      val.push(this.currentValueTo.getCurrentValue());
    }
    return val;
  }
}

export default CurrentValueWrapper;
