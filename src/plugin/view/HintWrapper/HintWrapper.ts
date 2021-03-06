import bind from 'bind-decorator';

import AbstractElement from '../AbstractElement/AbstractElement';
import { IHint } from '../Hint/Hint.types';
import Observer from '../../Observer/Observer';
import { IObserver } from '../../Observer/Observer.types';
import StyleClasses from '../StyleClasses';
import SliderDirection from '../SliderDirection';
import { IHintWrapper, ISetHintPositionOptions } from './HintWrapper.types';

class HintWrapper extends AbstractElement implements IHintWrapper {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private hintFrom: IHint;

  private hintTo: IHint;

  private isRange: boolean;

  private wasIntersected: boolean = false;

  private onIntersectionEnded: Observer<SliderDirection>;

  constructor(isHorizontal: boolean, hintFrom: IHint, hintTo?: IHint) {
    super();
    this.hintFrom = hintFrom;
    this.isHorizontal = isHorizontal;
    if (hintTo) {
      this.hintTo = hintTo;
      this.isRange = true;
    } else {
      this.isRange = false;
    }
    this.init();
  }

  @bind
  public setHintPosition(options: ISetHintPositionOptions): void {
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
      this.hintFrom.setHintPosition(
        position,
        handlePercent,
        lineSize
      );
      break;
    }
    case SliderDirection.BOTTOM: {
      this.hintFrom.setHintPosition(position);
      break;
    }
    case SliderDirection.RIGHT: {
      const maxPosition = maxHandlePosition;
      const handlePercent = 100 - maxPosition;
      this.hintTo.setHintPosition(
        position,
        handlePercent,
        lineSize
      );
      break;
    }
    case SliderDirection.TOP: {
      this.hintTo.setHintPosition(position);
      break;
    }
    default: {
      return;
    }
    }

    if (this.isRange) {
      this.checkHintsIntersection({
        lineSize,
        handleFromPosition,
        handleToPosition,
        direction
      });
    }
  }

  @bind
  public setHintValue(currentValue: number[]): void{
    this.hintFrom.setHintValue(currentValue[0]);
    this.isRange && this.hintTo.setHintValue(currentValue[1]);
  }

  @bind
  public getHintValue(): number[] {
    const val: number[] = [];
    val.push(this.hintFrom.getHintValue());
    this.isRange && val.push(this.hintTo.getHintValue());
    return val;
  }

  public get intersectionEndedEvent(): IObserver<SliderDirection> {
    return this.onIntersectionEnded.expose();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.HINT_WRAPPER,
      StyleClasses.HINT_WRAPPER_V
    );

    this.$elem.append(this.hintFrom.$elem);
    this.isRange && this.$elem.append(this.hintTo.$elem);
    this.onIntersectionEnded = new Observer<SliderDirection>();
  }

  private checkHintsIntersection(
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
    const hintFromSize = this.hintFrom.getHintSize() + 1;
    const hintToSize = this.hintTo.getHintSize();

    const sumPosition = this.getSumPosition(precision);
    const maxSizePercent = this.getMaxSizePercent({
      hintFromSize,
      hintToSize,
      lineSize,
      precision
    });

    if (sumPosition >= maxSizePercent) {
      this.wasIntersected = true;
      this.fixIntersection({
        handleFromPosition,
        handleToPosition,
        hintFromSize,
        hintToSize,
        lineSize
      });
    } else if (this.wasIntersected) {
      this.wasIntersected = false;
      this.onIntersectionEnded.trigger(SliderDirection.getReverseDirection(direction));
    }
  }

  private getSumPosition(precision: number): number {
    let sumPosition = this.hintFrom.getHintPosition()
      + this.hintTo.getHintPosition();
    sumPosition = Math.round(sumPosition * precision) / precision;
    return sumPosition;
  }

  private getMaxSizePercent(data : {
    hintFromSize: number,
    hintToSize: number,
    lineSize: number,
    precision: number
  }): number {
    const {
      hintFromSize,
      hintToSize,
      lineSize,
      precision
    } = data;
    const maxSize = lineSize - hintFromSize - hintToSize;
    let maxSizePercent = (maxSize * 100) / lineSize;
    maxSizePercent = Math.round(maxSizePercent * precision) / precision;
    return maxSizePercent;
  }

  private fixIntersection(data: {
    handleFromPosition: number,
    handleToPosition: number,
    hintFromSize: number,
    hintToSize: number,
    lineSize: number
  }): void {
    const {
      handleFromPosition,
      handleToPosition,
      hintFromSize,
      hintToSize,
      lineSize
    } = data;
    const shiftMiddlePosition = (100 - handleFromPosition - handleToPosition) / 2;
    const hintFromPercent = (hintFromSize * 100) / lineSize;
    const hintToPercent = (hintToSize * 100) / lineSize;
    const currentHintPositionFrom = handleFromPosition
      + shiftMiddlePosition - hintFromPercent;
    const currentHintPositionTo = handleToPosition
      + shiftMiddlePosition - hintToPercent;
    this.hintFrom.setHintPosition(currentHintPositionFrom, null, null, true);
    this.hintTo.setHintPosition(currentHintPositionTo, null, null, true);
  }
}

export default HintWrapper;
