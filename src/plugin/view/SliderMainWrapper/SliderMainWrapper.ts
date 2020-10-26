import AbstractElement from '../AbstractElement/AbstractElement';
import ISliderHandleWrapper from '../SliderHandleWrapper/ISliderHandleWrapper';
import LiteEvent from '../../LiteEvent/LiteEvent';
import ILiteEvent from '../../LiteEvent/ILiteEvent';
import ISetRangeOptions from '../SliderLine/ISetRangeOptions';
import ISliderLine from '../SliderLine/ISliderLine';
import SliderDirection from '../SliderDirection';
import StyleClasses from '../StyleClasses';
import ISliderMainWrapper from './ISliderMainWrapper';

class SliderMainWrapper extends AbstractElement implements ISliderMainWrapper {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private sliderLine: ISliderLine;

  private sliderHandleWrapper: ISliderHandleWrapper;

  private onHandlePositionChanged: LiteEvent<SliderDirection>;

  constructor(
    isHorizontal: boolean,
    sliderLine: ISliderLine,
    sliderHandleWrapper: ISliderHandleWrapper
  ) {
    super();
    this.isHorizontal = isHorizontal;
    this.sliderLine = sliderLine;
    this.sliderHandleWrapper = sliderHandleWrapper;
    this.init();
    this.addEvents();
  }

  public getSliderHandlePosition(direction: SliderDirection): number {
    return this.sliderHandleWrapper.getSliderHandlePosition(direction);
  }

  public getMaxHandlePosition(): number {
    return this.sliderHandleWrapper.getMaxHandlePosition();
  }

  public setHandlePosition(position: number, direction: SliderDirection): void{
    this.sliderHandleWrapper.setHandlePosition(position, direction);
  }

  public getHandleFromPosition(): number {
    return this.sliderHandleWrapper.getHandleFromPosition();
  }

  public getHandleToPosition(): number | null{
    return this.sliderHandleWrapper.getHandleToPosition();
  }

  public getLineSize(): number {
    return this.sliderLine.getLineSize();
  }

  public get handlePositionChangedEvent(): ILiteEvent<SliderDirection> {
    return this.onHandlePositionChanged.expose();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.MAIN_WRAPPER,
      StyleClasses.MAIN_WRAPPER_V
    );
    this.$elem.append([this.sliderLine.$elem, this.sliderHandleWrapper.$elem]);
    this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
  }

  private addEvents(): void{
    this.sliderHandleWrapper.handlePositionChangedEvent.on((direction) => {
      this.setRange();
      this.onHandlePositionChanged.trigger(direction);
    });
  }

  private setRange(): void{
    let options: ISetRangeOptions;
    const isRange = this.sliderHandleWrapper.getIsRange();
    isRange
      ? options = {
        isRange,
        handleFromPosition: this.getHandleFromPosition(),
        handleToPosition: this.getHandleToPosition()
      }
      : options = {
        isRange,
        handleFromPosition: this.getHandleFromPosition(),
        maxHandlePosition: this.getMaxHandlePosition()
      };
    this.sliderLine.setRange(options);
  }
}

export default SliderMainWrapper;
