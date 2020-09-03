import ICurrentValue from '../../../../src/plugin/view/CurrentValue/ICurrentValue';

class MockCurrentValue implements ICurrentValue {
  $elem: JQuery<HTMLElement>;

  setCurrentValue(currentValueMock: number): void {}

  getCurrentValue(): number {
    return 0;
  }

  setPosition(
    positionMock: number,
    handlePercentMock?: number,
    lineWidthMock?: number,
    isCorrectMock?: boolean
  ): void {}

  getCurrentValueSize(): number {
    return 5;
  }

  getCurrentValuePosition(): number {
    return 0;
  }
}

export default MockCurrentValue;
