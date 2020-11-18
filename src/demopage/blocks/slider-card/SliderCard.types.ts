interface IFormInputs{
  isHorizontal: HTMLInputElement,
  minVal: JQuery<HTMLElement>,
  maxVal: JQuery<HTMLElement>,
  currentVal: JQuery<HTMLElement>,
  step: JQuery<HTMLElement>,
  isRange: HTMLInputElement,
  isRangeLineEnabled: HTMLInputElement,
  isVisibleHint: HTMLInputElement,
  isScaleEnabled: HTMLInputElement,
  numberOfScaleMarks: JQuery<HTMLElement>
}

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

export { IFormInputs, ISliderSettings };
