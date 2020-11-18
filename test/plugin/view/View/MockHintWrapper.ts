import { IObserver } from '../../../../src/plugin/Observer/Observer.types';
import Observer from '../../../../src/plugin/Observer/Observer';
import AbstractElement from '../../../../src/plugin/view/AbstractElement/AbstractElement';
import { IHintWrapper, ISetHintPositionOptions } from '../../../../src/plugin/view/HintWrapper/HintWrapper.types';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockHintWrapper extends AbstractElement implements IHintWrapper {
  protected isHorizontal: boolean;

  private onIntersectionEnded: Observer<SliderDirection>;

  constructor(isHorizontal: boolean) {
    super();
    this.isHorizontal = isHorizontal;
    this.init();
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
    this.onIntersectionEnded = new Observer<SliderDirection>();
  }

  setHintPosition(optionsMock: ISetHintPositionOptions): void { }

  setHintValue(hintValue: number[]): void {}

  getHintValue(): number[] {
    return [0, 0];
  }

  $elem: JQuery<HTMLElement> = $('<div>');
}

export default MockHintWrapper;
