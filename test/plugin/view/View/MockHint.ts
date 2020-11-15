import IHint from '../../../../src/plugin/view/Hint/IHint';

class MockHint implements IHint {
  $elem: JQuery<HTMLElement>;

  setHintValue(hintValue: number): void {}

  getHintValue(): number {
    return 0;
  }

  setHintPosition(
    positionMock: number,
    handlePercentMock?: number,
    lineWidthMock?: number,
    isCorrectMock?: boolean
  ): void {}

  getHintSize(): number {
    return 5;
  }

  getHintPosition(): number {
    return 0;
  }
}

export default MockHint;
