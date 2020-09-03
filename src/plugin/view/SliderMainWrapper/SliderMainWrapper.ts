import AbstractElement from '../AbstractElement/AbstractElement';
import ISliderMainWrapper from './ISliderMainWrapper';
import StyleClasses from '../StyleClasses';
import ISliderLine from '../SliderLine/ISliderLine';
import ISliderHandleWrapper from '../SliderHandleWrapper/ISliderHandleWrapper';
import LiteEvent from '../../LiteEvent/LiteEvent';
import ILiteEvent from '../../LiteEvent/ILiteEvent';
import ISetRangeOptions from '../SliderLine/ISetRangeOptions';
import SliderDirection from '../SliderDirection';

class SliderMainWrapper extends AbstractElement implements ISliderMainWrapper {
    public $elem: JQuery<HTMLElement>;

    protected isHorizontal: boolean;

    protected sliderLine: ISliderLine;

    protected sliderHandleWrapper: ISliderHandleWrapper;

    protected onHandlePositionChanged: LiteEvent<SliderDirection>;

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

    protected init(): void {
      this.$elem = $('<div>');
      this.changeOrientation(
        this.isHorizontal,
        StyleClasses.MAINWRAPPER,
        StyleClasses.MAINWRAPPERV
      );
      this.$elem.append([this.sliderLine.$elem, this.sliderHandleWrapper.$elem]);
      this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
    }

    protected addEvents(): void{
      this.sliderHandleWrapper.handlePositionChangedEvent.on((direction) => {
        this.setRange();
        this.onHandlePositionChanged.trigger(direction);
      });
    }

    protected setRange(): void{
      let options: ISetRangeOptions;
      const isRange = this.sliderHandleWrapper.getIsRange();
      if (isRange) {
        options = {
          isRange,
          handleFromPosition: this.getHandleFromPosition(),
          handleToPosition: this.getHandleToPosition()
        };
      } else {
        options = {
          isRange,
          handleFromPosition: this.getHandleFromPosition(),
          maxHandlePosition: this.getMaxHandlePosition()
        };
      }
      this.sliderLine.setRange(options);
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
}

export default SliderMainWrapper;
