import AbstractElement from '../AbstractElement/AbstractElement';
import ISliderHandleWrapper from './ISliderHandleWrapper';
import StyleClasses from '../StyleClasses';
import ISliderHandle from '../SliderHandle/ISliderHandle';
import SliderDirection from '../SliderDirection';
import LiteEvent from '../../LiteEvent/LiteEvent';
import ILiteEvent from '../../LiteEvent/ILiteEvent';

class SliderHandleWrapper extends AbstractElement implements ISliderHandleWrapper {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  protected handleFrom: ISliderHandle;

  protected handleTo: ISliderHandle;

  protected isRange: boolean;

  protected onHandlePositionChanged: LiteEvent<SliderDirection>;

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

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.HANDLEWRAPPER,
      StyleClasses.HANDLEWRAPPERV
    );
    this.isRange
      ? this.$elem.append([this.handleFrom.$elem, this.handleTo.$elem])
      : this.$elem.append(this.handleFrom.$elem);

    this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
  }

  protected addEvents(): void{
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

  protected sliderHandlePositionChanged(direction: SliderDirection): void{
    this.isRange
      && this.checkHandleIntersection(
        this.handleFrom.getPosition(),
        this.handleTo.getPosition(),
        direction
      );
  }

  protected checkHandleIntersection(
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

  public getMaxHandlePosition(): number {
    let maxHandlePosition: number;
    maxHandlePosition = this.handleFrom.getSliderHandleMaxPosition();
    if (this.isRange) {
      const maxHandlePositionTo = this.handleTo.getSliderHandleMaxPosition();
      maxHandlePosition = Math.min(maxHandlePosition, maxHandlePositionTo);
    }
    return maxHandlePosition;
  }

  public setHandlePosition(position: number, direction: SliderDirection): void {
    SliderDirection.isFrom(direction)
      ? this.handleFrom.setCurrentPosition(position, direction)
      : this.handleTo.setCurrentPosition(position, direction);
    this.onHandlePositionChanged.trigger(direction);
  }

  public getSliderHandlePosition(direction: SliderDirection): number {
    if (SliderDirection.isFrom(direction)) {
      return this.handleFrom.getPosition();
    }
    return this.handleTo.getPosition();
  }

  public getHandleFromPosition(): number {
    return this.handleFrom.getPosition();
  }

  public getHandleToPosition(): number | null{
    return !this.isRange ? null : this.handleTo.getPosition();
  }

  public getIsRange(): boolean {
    return this.isRange;
  }

  public get handlePositionChangedEvent(): ILiteEvent<SliderDirection> {
    return this.onHandlePositionChanged.expose();
  }
}

export default SliderHandleWrapper;
