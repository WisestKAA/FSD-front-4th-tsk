import { IPresenter } from '../presenter/Presenter.types';
import { IHint } from './Hint/Hint.types';
import { IHintWrapper } from './HintWrapper/HintWrapper.types';
import { IScaleItem } from './ScaleItem/ScaleItem.types';
import { IScaleWrapper } from './ScaleWrapper/ScaleWrapper.types';
import { ISliderHandle } from './SliderHandle/SliderHandle.types';
import { ISliderHandleWrapper } from './SliderHandleWrapper/SliderHandleWrapper.types';
import { ISliderLine } from './SliderLine/SliderLine.types';
import { ISliderMainWrapper } from './SliderMainWrapper/SliderMainWrapper.types';
import { ISliderRange } from './SliderRange/SliderRange.types';
import SliderDirection from './SliderDirection';

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
  setRange(): void;
  reinitialization(option: IViewOptions, scaleValues?: number[]): void;
}

interface IElementsFactory {
  buildRange(): ISliderRange;
  buildLine(range?: ISliderRange): ISliderLine;
  buildHandle(line: ISliderLine, isFrom: boolean): ISliderHandle;
  buildHandleWrapper(handleFrom: ISliderHandle, handleTo?: ISliderHandle): ISliderHandleWrapper;
  buildMainWrapper(
    sliderLine: ISliderLine,
    sliderHandleWrapper: ISliderHandleWrapper
  ): ISliderMainWrapper;
  buildHint(isFrom: boolean): IHint;
  buildHintWrapper(valueFrom: IHint, valueTo?: IHint): IHintWrapper;
  buildScaleItem(value: number): IScaleItem;
  buildScaleWrapper(scaleItems: IScaleItem[]): IScaleWrapper;
  setNewOptions(isHorizontal: boolean, isRange: boolean): void;
}

interface IViewFactory {
  build(
    presenter: IPresenter,
    option: IViewOptions,
    elementsFactory: IElementsFactory,
    scaleValues?: number[]
  ): IView;
}

interface IViewOptions{
  isHorizontal: boolean;
  isRange: boolean;
  isRangeLineEnabled: boolean;
  isVisibleHint: boolean;
  isScaleEnabled: boolean;
}

export {
  IView,
  IElementsFactory,
  IViewFactory,
  IViewOptions
};
