interface ISliderSettings {
  isHorizontal?: boolean;
  minVal?: number;
  maxVal?: number;
  currentVal?: number[];
  step?: number;
  isRange?: boolean;
  isRangeLineEnabled?: boolean;
  isVisibleHint?: boolean;
  isScaleEnabled?: boolean;
  numberOfScaleMarks?: number;
}

export default ISliderSettings;
