import AbstractElement from '../../../../src/plugin/view/AbstractElement/AbstractElement';
import ICurrentValueWrapper from '../../../../src/plugin/view/CurrentValueWrapper/ICurrentValueWrapper';
import ISetCurrentValuePositionOptions from '../../../../src/plugin/view/CurrentValueWrapper/ISetCurrentValuePositionOptions';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';

class MockCurrentValueWrapper extends AbstractElement implements ICurrentValueWrapper {
  protected isHorizontal: boolean;

  constructor(isHorizontal: boolean) {
    super();
    this.isHorizontal = isHorizontal;
    this.init();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.CURRENTVALWRAPPER,
      StyleClasses.CURRENTVALWRAPPERV
    );
  }

  setCurrentValuePosition(optionsMock: ISetCurrentValuePositionOptions): void { }

  setCurrentValue(currentValueMock: number[]): void {}

  getCurrentValue(): number[] {
    return [0, 0];
  }

  $elem: JQuery<HTMLElement> = $('<div>');
}

export default MockCurrentValueWrapper;
