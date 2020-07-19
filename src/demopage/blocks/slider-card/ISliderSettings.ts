export interface ISliderSettings {
    isHorizontal: boolean;
    minVal: number;
    maxVal: number;
    currentVal: number[];
    step: number;
    isRange: boolean;
    isRangeLineEnabled: boolean;
    isVisibleCurrentValue: boolean;
    isScaleEnabled: boolean;
    numberOfScaleMarks: number;
}