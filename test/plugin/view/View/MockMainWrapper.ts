import AbstractElement from '../../../../src/plugin/view/AbstractElement/AbstractElement';
import { ISliderMainWrapper } from '../../../../src/plugin/view/SliderMainWrapper/SliderMainWrapper.types';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import { IObserver } from '../../../../src/plugin/Observer/Observer.types';
import Observer from '../../../../src/plugin/Observer/Observer';

class MockMainWrapper extends AbstractElement implements ISliderMainWrapper {
  protected isHorizontal: boolean;

  protected onHandlePositionChanged: Observer<SliderDirection>;

  private onLineClick: Observer<number>;

  constructor(isHorizontal: boolean) {
    super();
    this.isHorizontal = isHorizontal;
    this.init();
  }

  public get lineClickEvent(): IObserver<number> {
    return this.onLineClick.expose();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.MAIN_WRAPPER,
      StyleClasses.MAIN_WRAPPER_V
    );
    this.onHandlePositionChanged = new Observer<SliderDirection>();
    this.onLineClick = new Observer<number>();
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

  public get handlePositionChangedEvent(): IObserver<SliderDirection> {
    return this.onHandlePositionChanged.expose();
  }

  $elem: JQuery<HTMLElement>;
}

export default MockMainWrapper;
