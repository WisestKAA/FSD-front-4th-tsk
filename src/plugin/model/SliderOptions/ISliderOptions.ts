import ISliderSettings from '../ISliderSettings';

interface ISliderOptions {
    getOptions(): ISliderSettings;
    setCurrentValue(currentVal: number[]): void;
    setNewOptions(options: ISliderSettings): void;
}

export default ISliderOptions;
