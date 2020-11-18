import bind from 'bind-decorator';

import Observer from '../../Observer/Observer';
import { IObserver } from '../../Observer/Observer.types';
import AbstractElement from '../AbstractElement/AbstractElement';
import { ISliderHandle } from '../SliderHandle/SliderHandle.types';
import SliderDirection from '../SliderDirection';
import StyleClasses from '../StyleClasses';
import { ISliderHandleWrapper } from './SliderHandleWrapper.types';

class SliderHandleWrapper extends AbstractElement implements ISliderHandleWrapper {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private handleFrom: ISliderHandle;

  private handleTo: ISliderHandle;

  private isRange: boolean;

  private onHandlePositionChanged: Observer<SliderDirection>;

  constructor(isHorizontal: boolean, handleFrom: ISliderHandle, handleTo?: ISliderHandle) {
    super();
    this.isHorizontal = isHorizontal;
    this.handleFrom = handleFrom;
    if (handleTo) {
      this.handleTo = handleTo;
      this.isRange = true;
    } else {
      this.isRange = false;
    }
    this.init();
    this.addEvents();
  }

  @bind
  public getMaxHandlePosition(): number {
    let maxHandlePosition: number;
    maxHandlePosition = this.handleFrom.getSliderHandleMaxPosition();
    if (this.isRange) {
      const maxHandlePositionTo = this.handleTo.getSliderHandleMaxPosition();
      maxHandlePosition = Math.min(maxHandlePosition, maxHandlePositionTo);
    }
    return maxHandlePosition;
  }

  @bind
  public setHandlePosition(
    position: number,
    direction: SliderDirection,
    isNewPosition: boolean = true
  ): void {
    if (isNewPosition) {
      SliderDirection.isFrom(direction)
        ? this.handleFrom.setNewPosition(position, direction)
        : this.handleTo.setNewPosition(position, direction);
    } else {
      SliderDirection.isFrom(direction)
        ? this.handleFrom.setCurrentPosition(position, direction)
        : this.handleTo.setCurrentPosition(position, direction);
    }
  }

  @bind
  public getSliderHandlePosition(direction: SliderDirection): number {
    if (SliderDirection.isFrom(direction)) {
      return this.handleFrom.getPosition();
    }
    return this.handleTo.getPosition();
  }

  @bind
  public getHandleFromPosition(): number {
    return this.handleFrom.getPosition();
  }

  @bind
  public getHandleToPosition(): number | null{
    return !this.isRange ? null : this.handleTo.getPosition();
  }

  @bind
  public getIsRange(): boolean {
    return this.isRange;
  }

  public get handlePositionChangedEvent(): IObserver<SliderDirection> {
    return this.onHandlePositionChanged.expose();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.HANDLE_WRAPPER,
      StyleClasses.HANDLE_WRAPPER_V
    );
    this.isRange
      ? this.$elem.append([this.handleFrom.$elem, this.handleTo.$elem])
      : this.$elem.append(this.handleFrom.$elem);

    this.onHandlePositionChanged = new Observer<SliderDirection>();
  }

  private addEvents(): void{
    this.handleFrom.positionChangedEvent.on((direction) => {
      this.sliderHandlePositionChanged(direction);
      this.onHandlePositionChanged.trigger(direction);
    });
    this.isRange
      && this.handleTo.positionChangedEvent.on((direction) => {
        this.sliderHandlePositionChanged(direction);
        this.onHandlePositionChanged.trigger(direction);
      });
  }

  private sliderHandlePositionChanged(direction: SliderDirection): void{
    this.isRange
      && this.checkHandleIntersection(
        this.handleFrom.getPosition(),
        this.handleTo.getPosition(),
        direction
      );
  }

  private checkHandleIntersection(
    positionFrom: number,
    positionTo: number,
    direction: SliderDirection
  ): void {
    const maxPos = this.getMaxHandlePosition();
    if (positionFrom > maxPos - positionTo) {
      SliderDirection.isFrom(direction)
        ? this.setHandlePosition(maxPos - positionTo, direction)
        : this.setHandlePosition(maxPos - positionFrom, direction);
    }
  }
}

export default SliderHandleWrapper;
