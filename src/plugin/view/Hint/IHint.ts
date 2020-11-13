interface IHint{
  $elem: JQuery<HTMLElement>;
  setHintValue(currentValue: number): void;
  getHintValue(): number;
  setHintPosition(
    position: number,
    handlePercent?: number,
    lineWidth?: number,
    isCorrect?: boolean
  ): void;
  getHintSize(): number;
  getHintPosition(): number;
}

export default IHint;
