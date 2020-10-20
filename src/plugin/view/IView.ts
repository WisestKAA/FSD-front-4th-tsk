import SliderDirection from './SliderDirection';
import IViewOptions from './IViewOptions';

interface IView {
  getSliderHandlePosition(direction: SliderDirection): number;
  setCurrentValue(currentValue: number[]): void;
  getCurrentValue(): number[];
  getMaxHandlePosition(): number;
  setHandlePosition(position: number, direction: SliderDirection): void;
  reinitialization(option: IViewOptions, scaleValues?: number[]): void;
}

export default IView;
