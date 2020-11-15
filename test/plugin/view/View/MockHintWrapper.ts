import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import AbstractElement from '../../../../src/plugin/view/AbstractElement/AbstractElement';
import IHintWrapper from '../../../../src/plugin/view/HintWrapper/IHintWrapper';
import ISetHintPositionOptions from '../../../../src/plugin/view/HintWrapper/ISetHintPositionOptions';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockHintWrapper extends AbstractElement implements IHintWrapper {
  protected isHorizontal: boolean;

  private onIntersectionEnded: LiteEvent<SliderDirection>;

  constructor(isHorizontal: boolean) {
    super();
    this.isHorizontal = isHorizontal;
    this.init();
  }

  public get intersectionEndedEvent(): ILiteEvent<SliderDirection> {
    return this.onIntersectionEnded.expose();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.HINT_WRAPPER,
      StyleClasses.HINT_WRAPPER_V
    );
    this.onIntersectionEnded = new LiteEvent<SliderDirection>();
  }

  setHintPosition(optionsMock: ISetHintPositionOptions): void { }

  setHintValue(hintValue: number[]): void {}

  getHintValue(): number[] {
    return [0, 0];
  }

  $elem: JQuery<HTMLElement> = $('<div>');
}

export default MockHintWrapper;
