import AbstractElement from '../../../../src/plugin/view/AbstractElement/AbstractElement';
import ISliderMainWrapper from '../../../../src/plugin/view/SliderMainWrapper/ISliderMainWrapper';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';

class MockMainWrapper extends AbstractElement implements ISliderMainWrapper {
  protected isHorizontal: boolean;

  protected onHandlePositionChanged: LiteEvent<SliderDirection>;

  constructor(isHorizontal: boolean) {
    super();
    this.isHorizontal = isHorizontal;
    this.init();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.MAINWRAPPER,
      StyleClasses.MAINWRAPPERV
    );
    this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
  }

  getSliderHandlePosition(directionMock: SliderDirection): number {
    return 0;
  }

  getMaxHandlePosition(): number {
    return 90;
  }

  setHandlePosition(position: number, direction: SliderDirection): void {
    this.onHandlePositionChanged.trigger(direction);
  }

  getHandleFromPosition(): number {
    return 0;
  }

  getHandleToPosition(): number {
    return 0;
  }

  getLineSize(): number {
    return 100;
  }

  public get handlePositionChangedEvent(): ILiteEvent<SliderDirection> {
    return this.onHandlePositionChanged.expose();
  }

  $elem: JQuery<HTMLElement>;
}

export default MockMainWrapper;
