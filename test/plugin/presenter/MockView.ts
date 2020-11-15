import IView from '../../../src/plugin/view/IView';
import SliderDirection from '../../../src/plugin/view/SliderDirection';
import IElementsFactory from '../../../src/plugin/view/IElementsFactory';
import IViewOptions from '../../../src/plugin/view/IViewOptions';
import IPresenter from '../../../src/plugin/presenter/IPresenter';

class MockView implements IView {
  getScaleMarkValues(): number[] {
    return [0, 100];
  }

  setScaleMarksPosition(positions: number[]): void {}

  hintValue: number[];

  handleFromPosition: number;

  handleToPosition: number;

  scaleValues?: number[];

  getSliderHandlePosition(direction: SliderDirection): number {
    return SliderDirection.isFrom(direction) ? this.handleFromPosition : this.handleToPosition;
  }

  setHintValue(hintValue: number[]): void {
    this.hintValue = hintValue;
  }

  getHintValue(): number[] {
    return this.hintValue;
  }

  getMaxHandlePosition(): number {
    return 90;
  }

  setHandlePosition(
    position: number,
    direction: SliderDirection,
    isNewPosition: boolean = true
  ): void {
    if (SliderDirection.isFrom(direction)) {
      this.handleFromPosition = position;
    } else {
      this.handleToPosition = position;
    }
  }

  reinitialization(optionMock: IViewOptions): void {}

  setOptions(
    presenterMock?: IPresenter,
    optionMock?: IViewOptions,
    elementsFactoryMock?: IElementsFactory,
    scaleValues?: number[]
  ):void{
    this.scaleValues = scaleValues;
  }

  setHintPosition(direction: SliderDirection): void {
    throw new Error('Method not implemented.');
  }
}

export default MockView;
