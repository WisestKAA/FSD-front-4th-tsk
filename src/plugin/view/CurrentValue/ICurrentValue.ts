interface ICurrentValue{
  $elem: JQuery<HTMLElement>;
  setCurrentValue(currentValue: number): void;
  getCurrentValue(): number;
  setPosition(
    position: number,
    handlePercent?: number,
    lineWidth?: number,
    isCorrect?: boolean
  ): void;
  getCurrentValueSize(): number;
  getCurrentValuePosition(): number;
}

export default ICurrentValue;
