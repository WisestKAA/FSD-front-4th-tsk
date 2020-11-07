import SliderDirection from './SliderDirection';
import IViewOptions from './IViewOptions';

interface IView {
  getSliderHandlePosition(direction: SliderDirection): number;
  getScaleMarkValues(): number[];
  getCurrentValue(): number[];
  getMaxHandlePosition(): number;
  setHandlePosition(
    position: number,
    direction: SliderDirection,
    isNewPosition?: boolean
  ): void;
  setCurrentValuePosition(direction: SliderDirection): void;
  setCurrentValue(currentValue: number[]): void;
  setScaleMarksPosition(positions: number[]): void;
  reinitialization(option: IViewOptions, scaleValues?: number[]): void;
}

export default IView;
