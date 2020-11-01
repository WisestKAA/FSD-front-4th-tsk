import ILiteEvent from '../../../../src/plugin/LiteEvent/ILiteEvent';
import LiteEvent from '../../../../src/plugin/LiteEvent/LiteEvent';
import AbstractElement from '../../../../src/plugin/view/AbstractElement/AbstractElement';
import ICurrentValueWrapper from '../../../../src/plugin/view/CurrentValueWrapper/ICurrentValueWrapper';
import ISetCurrentValuePositionOptions from '../../../../src/plugin/view/CurrentValueWrapper/ISetCurrentValuePositionOptions';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockCurrentValueWrapper extends AbstractElement implements ICurrentValueWrapper {
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
      StyleClasses.CURRENT_VAL_WRAPPER,
      StyleClasses.CURRENT_VAL_WRAPPER_V
    );
    this.onIntersectionEnded = new LiteEvent<SliderDirection>();
  }

  setCurrentValuePosition(optionsMock: ISetCurrentValuePositionOptions): void { }

  setCurrentValue(currentValueMock: number[]): void {}

  getCurrentValue(): number[] {
    return [0, 0];
  }

  $elem: JQuery<HTMLElement> = $('<div>');
}

export default MockCurrentValueWrapper;
