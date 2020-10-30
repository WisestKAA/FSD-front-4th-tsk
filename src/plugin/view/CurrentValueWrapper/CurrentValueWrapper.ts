import AbstractElement from '../AbstractElement/AbstractElement';
import ICurrentValue from '../CurrentValue/ICurrentValue';
import LiteEvent from '../../LiteEvent/LiteEvent';
import ILiteEvent from '../../LiteEvent/ILiteEvent';
import StyleClasses from '../StyleClasses';
import SliderDirection from '../SliderDirection';
import ISetCurrentValuePositionOptions from './ISetCurrentValuePositionOptions';

class CurrentValueWrapper extends AbstractElement {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private currentValueFrom: ICurrentValue;

  private currentValueTo: ICurrentValue;

  private isRange: boolean;

  private wasIntersected: boolean = false;

  private onIntersectionEnded: LiteEvent<SliderDirection>;

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
    const {
      direction,
      position,
      maxHandlePosition,
      lineSize,
      handleFromPosition,
      handleToPosition
    } = options;

    switch (direction) {
    case SliderDirection.LEFT: {
      const maxPosition = maxHandlePosition;
      const handlePercent = 100 - maxPosition;
      this.currentValueFrom.setPosition(
        position,
        handlePercent,
        lineSize
      );
      break;
    }
    case SliderDirection.BOTTOM: {
      this.currentValueFrom.setPosition(position);
      break;
    }
    case SliderDirection.RIGHT: {
      const maxPosition = maxHandlePosition;
      const handlePercent = 100 - maxPosition;
      this.currentValueTo.setPosition(
        position,
        handlePercent,
        lineSize
      );
      break;
    }
    case SliderDirection.TOP: {
      this.currentValueTo.setPosition(position);
      break;
    }
    default: {
      return;
    }
    }

    if (this.isRange) {
      this.checkCurrentValueIntersection({
        lineSize,
        handleFromPosition,
        handleToPosition,
        direction
      });
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

  public get intersectionEndedEvent(): ILiteEvent<SliderDirection> {
    return this.onIntersectionEnded.expose();
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
    this.onIntersectionEnded = new LiteEvent<SliderDirection>();
  }

  private checkCurrentValueIntersection(
    data : {
      lineSize: number,
      handleFromPosition: number,
      handleToPosition: number,
      direction: SliderDirection
    }
  ): void{
    const {
      lineSize,
      handleFromPosition,
      handleToPosition,
      direction
    } = data;

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

    if (sumPosition >= maxSizePercent) {
      this.wasIntersected = true;
      this.fixIntersection({
        handleFromPosition,
        handleToPosition,
        currentValueFromSize,
        currentValueToSize,
        lineSize
      });
    } else if (this.wasIntersected) {
      this.wasIntersected = false;
      this.onIntersectionEnded.trigger(SliderDirection.getReverseDirection(direction));
    }
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
