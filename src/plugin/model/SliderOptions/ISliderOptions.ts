import { ISliderSettings } from "../ISliderSettings";

export interface ISliderOptions {
    getOptions(): ISliderSettings;
    setCurrentValue(currentVal: number[]): void;
    setNewOptions(options: ISliderSettings): void;
}