import SliderDirection from './SliderDirection';
import IViewOptions from './IViewOptions';

interface IView {
  getSliderHandlePosition(direction: SliderDirection): number;
  getScaleMarkValues(): number[];
  getHintValue(): number[];
  getMaxHandlePosition(): number;
  setHandlePosition(
    position: number,
    direction: SliderDirection,
    isNewPosition?: boolean
  ): void;
  setHintPosition(direction: SliderDirection): void;
  setHintValue(hintValue: number[]): void;
  setScaleMarksPosition(positions: number[]): void;
  reinitialization(option: IViewOptions, scaleValues?: number[]): void;
}

export default IView;
