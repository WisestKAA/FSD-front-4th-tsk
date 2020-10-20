interface ISliderSettings {
  isHorizontal?: boolean;
  minVal?: number;
  maxVal?: number;
  currentVal?: number[];
  step?: number;
  precision?: number;
  isRange?: boolean;
  isRangeLineEnabled?: boolean;
  isVisibleCurrentValue?: boolean;
  isScaleEnabled?: boolean;
  numberOfScaleMarks?: number;
}

export default ISliderSettings;
