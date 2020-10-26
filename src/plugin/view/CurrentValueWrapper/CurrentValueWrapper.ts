import AbstractElement from '../AbstractElement/AbstractElement';
import ICurrentValue from '../CurrentValue/ICurrentValue';
import StyleClasses from '../StyleClasses';
import SliderDirection from '../SliderDirection';
import ISetCurrentValuePositionOptions from './ISetCurrentValuePositionOptions';

class CurrentValueWrapper extends AbstractElement {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private currentValueFrom: ICurrentValue;

  private currentValueTo: ICurrentValue;

  private isRange: boolean;

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

  public setCurrentValue(currentValue: number[]): void{
    this.currentValueFrom.setCurrentValue(currentValue[0]);
    this.isRange && this.currentValueTo.setCurrentValue(currentValue[1]);
  }

  public getCurrentValue(): number[] {
    const val: number[] = [];
    val.push(this.currentValueFrom.getCurrentValue());
    this.isRange && val.push(this.currentValueTo.getCurrentValue());
    return val;
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.CURRENT_VAL_WRAPPER,
      StyleClasses.CURRENT_VAL_WRAPPER_V
    );

    this.$elem.append(this.currentValueFrom.$elem);
    this.isRange && this.$elem.append(this.currentValueTo.$elem);
  }

  private checkCurrentValueIntersection(
    lineSize: number,
    handleFromPosition: number,
    handleToPosition: number
  ): void{
    const precision = Math.pow(10, 10);
    const currentValueFromSize = this.currentValueFrom.getCurrentValueSize() + 1;
    const currentValueToSize = this.currentValueTo.getCurrentValueSize();

    const sumPosition = this.getSumPosition(precision);
    const maxSizePercent = this.getMaxSizePercent({
      currentValueFromSize,
      currentValueToSize,
      lineSize,
      precision
    });

    sumPosition >= maxSizePercent && this.fixIntersection({
      handleFromPosition,
      handleToPosition,
      currentValueFromSize,
      currentValueToSize,
      lineSize
    });
  }

  private getSumPosition(precision: number): number {
    let sumPosition = this.currentValueFrom.getCurrentValuePosition()
      + this.currentValueTo.getCurrentValuePosition();
    sumPosition = Math.round(sumPosition * precision) / precision;
    return sumPosition;
  }

  private getMaxSizePercent(data : {
    currentValueFromSize: number,
    currentValueToSize: number,
    lineSize: number,
    precision: number
  }): number {
    const {
      currentValueFromSize,
      currentValueToSize,
      lineSize,
      precision
    } = data;
    const maxSize = lineSize - currentValueFromSize - currentValueToSize;
    let maxSizePercent = (maxSize * 100) / lineSize;
    maxSizePercent = Math.round(maxSizePercent * precision) / precision;
    return maxSizePercent;
  }

  private fixIntersection(data: {
    handleFromPosition: number,
    handleToPosition: number,
    currentValueFromSize: number,
    currentValueToSize: number,
    lineSize: number
  }): void {
    const {
      handleFromPosition,
      handleToPosition,
      currentValueFromSize,
      currentValueToSize,
      lineSize
    } = data;
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

export default CurrentValueWrapper;
