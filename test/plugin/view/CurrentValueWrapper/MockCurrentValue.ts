import ICurrentValue from '../../../../src/plugin/view/Hint/IHint';

class MockCurrentValue implements ICurrentValue {
  $elem: JQuery<HTMLElement>;

  currentValue: number;

  position: number;

  setCurrentValue(currentValue: number): void {
    this.currentValue = currentValue;
  }

  getCurrentValue(): number {
    return this.currentValue;
  }

  setPosition(
    position: number,
    handlePercentMock?: number,
    lineWidthMock?: number,
    isCorrectMock?: boolean
  ): void {
    this.position = position;
  }

  getCurrentValueSize(): number {
    return 10;
  }

  getCurrentValuePosition(): number {
    return this.position;
  }
}

export default MockCurrentValue;
