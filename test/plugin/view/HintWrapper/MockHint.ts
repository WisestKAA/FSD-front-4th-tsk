import IHint from '../../../../src/plugin/view/Hint/IHint';

class MockHint implements IHint {
  $elem: JQuery<HTMLElement>;

  hintValue: number;

  position: number;

  setHintValue(hintValue: number): void {
    this.hintValue = hintValue;
  }

  getHintValue(): number {
    return this.hintValue;
  }

  setHintPosition(
    position: number,
    handlePercentMock?: number,
    lineWidthMock?: number,
    isCorrectMock?: boolean
  ): void {
    this.position = position;
  }

  getHintSize(): number {
    return 10;
  }

  getHintPosition(): number {
    return this.position;
  }
}

export default MockHint;
