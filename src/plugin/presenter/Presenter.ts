import bind from 'bind-decorator';

import SliderDirection from '../view/SliderDirection';
import { IView, IViewFactory, IViewOptions } from '../view/View.types';
import ElementsFactory from '../view/ElementsFactory';
import { IModel, IModelFactory, ISliderSettings } from '../model/Model.types';
import { IPresenter } from './Presenter.types';
import LiteEvent from '../LiteEvent/LiteEvent';

class Presenter implements IPresenter {
  private model: IModel;

  private view: IView;

  private onOptionsChangedEvent: LiteEvent<ISliderSettings>;

  constructor(viewFactory: IViewFactory, modelFactory: IModelFactory) {
    this.init(viewFactory, modelFactory);
    this.addEvents();
    this.onOptionsChangedEvent = new LiteEvent<ISliderSettings>();
  }

  @bind
  public sliderHandleChangedPosition(direction: SliderDirection): void {
    const currentVal = this.getCurrentValFromPosition(
      direction,
      this.view.getSliderHandlePosition(direction)
    );

    const currentValFromModel = SliderDirection.isFrom(direction)
      ? this.model.getOptions().currentVal[0]
      : this.model.getOptions().currentVal[1];
    if (currentVal === currentValFromModel) {
      this.setCurrentHandlePosition(currentVal, direction, false);
      this.view.setHintPosition(direction);
      return;
    }

    const correctVal = this.model.getCorrectValWithStep(currentVal);
    const current = this.getCorrectCurrentVal(correctVal, direction);
    this.setCurrentValue(current);
    const currentValFromPosition = this.getCurrentValFromPosition(
      direction,
      this.view.getSliderHandlePosition(direction)
    );
    correctVal !== currentValFromPosition && this.setCurrentHandlePosition(correctVal, direction);
  }

  @bind
  public scaleClicked(value: number): void{
    const {
      currentVal,
      isHorizontal,
      isRange
    } = this.model.getOptions();
    const val = this.model.getCorrectValWithStep(value);

    this.setNewValue({
      currentVal,
      isHorizontal,
      isRange,
      val
    });
  }

  @bind
  public lineClicked(position: number): void {
    const {
      currentVal,
      isHorizontal,
      isRange
    } = this.model.getOptions();

    const newVal = this.getCurrentValFromPosition(
      isHorizontal ? SliderDirection.LEFT : SliderDirection.TOP,
      position
    );
    const val = this.model.getCorrectValWithStep(newVal);
    this.setNewValue({
      currentVal,
      isHorizontal,
      isRange,
      val
    });
  }

  @bind
  public setNewOptions(options: ISliderSettings): void{
    this.model.setNewOptions(options);
    this.onOptionsChangedEvent.trigger(this.model.getOptions());
  }

  @bind
  public getOptions(): ISliderSettings {
    return this.model.getOptions();
  }

  @bind
  public onCurrentValueChanged(callBack: Function): void{
    this.model.changeCurrentValueEvent.on((data) => {
      callBack(data);
    });
  }

  @bind
  public onOptionsChanged(callBack: Function): void{
    this.onOptionsChangedEvent.on(options => {
      callBack(options);
    });
  }

  private init(viewFactory: IViewFactory, modelFactory: IModelFactory): void{
    this.model = modelFactory.build();
    const {
      isHorizontal,
      isRange,
      isRangeLineEnabled,
      isVisibleHint,
      isScaleEnabled,
      maxVal,
      minVal,
      numberOfScaleMarks
    } = this.model.getOptions();
    const viewOptions: IViewOptions = {
      isHorizontal,
      isRange,
      isRangeLineEnabled,
      isVisibleHint,
      isScaleEnabled
    };

    const valuesForeScale = isScaleEnabled
      ? this.getValuesForScale({
        maxVal,
        minVal,
        numberOfScaleMarks
      })
      : this.getValuesForScale({
        maxVal,
        minVal,
        numberOfScaleMarks: 2
      });

    this.view = viewFactory.build(
      this,
      viewOptions,
      new ElementsFactory(viewOptions.isHorizontal, viewOptions.isRange),
      valuesForeScale
    );
    this.initViewComponents();
  }

  private setNewValue(options: {
    isRange: boolean,
    val: number,
    isHorizontal: boolean,
    currentVal: number[]
  }): void {
    const {
      isRange,
      val,
      isHorizontal,
      currentVal
    } = options;

    if (!isRange) {
      this.setCurrentValue([val, 0]);
      this.setCurrentHandlePosition(
        val,
        SliderDirection.getDirection(true, isHorizontal)
      );
      return;
    }

    if (val < currentVal[0]
      || val - currentVal[0] < currentVal[1] - val
    ) {
      this.setCurrentValue([val, currentVal[1]]);
      this.setCurrentHandlePosition(val, SliderDirection.getDirection(true, isHorizontal));
    } else {
      this.setCurrentValue([currentVal[0], val]);
      this.setCurrentHandlePosition(val, SliderDirection.getDirection(false, isHorizontal));
    }
  }

  private initViewComponents(): void{
    const options = this.model.getOptions();
    const directionFrom = SliderDirection.getDirection(true, options.isHorizontal);

    const correctValFrom = this.model.getCorrectValWithStep(options.currentVal[0]);
    this.setHintValue([correctValFrom, 0]);
    this.setCurrentHandlePosition(correctValFrom, directionFrom);
    if (options.isRange) {
      const directionTo = SliderDirection.getDirection(false, options.isHorizontal);
      const correctValTo = this.model.getCorrectValWithStep(options.currentVal[1]);
      this.setHintValue([correctValFrom, correctValTo]);
      this.setCurrentHandlePosition(correctValTo, directionTo);
    }

    const scaleItemMarkValues = this.view.getScaleMarkValues();
    const scaleMarksPosition = scaleItemMarkValues.map(
      val => this.getPositionFromValue(val, directionFrom)
    );
    !options.isHorizontal && scaleMarksPosition.reverse();
    this.view.setScaleMarksPosition(scaleMarksPosition);
  }

  private addEvents(): void{
    this.model.changeCurrentValueEvent.on((data) => { this.setHintValue(data); });
    this.model.changeOptionsEvent.on(() => { this.optionsChanged(); });
  }

  private setHintValue(hintValue: number[]): void{
    this.view.setHintValue(hintValue);
  }

  private setCurrentValue(currentVal?: number[]): void{
    this.model.setCurrentValue(currentVal);
  }

  private getCorrectPosition(option: {
    position: number,
    maxHandlePosition: number,
    isForView: boolean,
    direction: SliderDirection
  }): number {
    const {
      position,
      maxHandlePosition,
      isForView,
      direction
    } = option;
    let correctPosition: number;
    if (isForView) {
      correctPosition = !SliderDirection.isFrom(direction)
        ? maxHandlePosition - (position * maxHandlePosition) / 100
        : (position * maxHandlePosition) / 100;
    } else {
      correctPosition = !SliderDirection.isFrom(direction)
        ? 100 - 100 * (position / maxHandlePosition)
        : 100 * (position / maxHandlePosition);
    }
    return correctPosition;
  }

  private getCurrentValFromPosition(direction: SliderDirection, position: number): number {
    const { maxVal, minVal, precision } = this.model.getOptions();
    const correctPosition = this.getCorrectPosition({
      position,
      maxHandlePosition: this.view.getMaxHandlePosition(),
      isForView: false,
      direction
    });

    const newCurrentVal = (((maxVal - minVal) * correctPosition) / 100) + minVal;
    const correctPrecision = Math.pow(10, precision);
    return Math.round(newCurrentVal * correctPrecision) / correctPrecision;
  }

  private setCurrentHandlePosition(
    correctValue: number,
    direction: SliderDirection,
    isNewPosition: boolean = true
  ): void {
    const position = this.getPositionFromValue(correctValue, direction);
    this.view.setHandlePosition(position, direction, isNewPosition);
  }

  private getPositionFromValue(correctValue: number, direction: SliderDirection): number {
    const { minVal, maxVal } = this.model.getOptions();
    let position = (100 * (correctValue - minVal)) / (maxVal - minVal);
    position = this.getCorrectPosition({
      position,
      maxHandlePosition: this.view.getMaxHandlePosition(),
      isForView: true,
      direction
    });
    return position;
  }

  private optionsChanged(): void{
    const {
      minVal,
      maxVal,
      isScaleEnabled,
      numberOfScaleMarks,
      isHorizontal,
      isRange,
      isRangeLineEnabled,
      isVisibleHint
    } = this.model.getOptions();
    const scaleValues = this.getValuesForScale({
      minVal,
      maxVal,
      numberOfScaleMarks: isScaleEnabled ? numberOfScaleMarks : 2
    });

    this.view.reinitialization(
      {
        isHorizontal,
        isRange,
        isRangeLineEnabled,
        isVisibleHint,
        isScaleEnabled
      },
      scaleValues
    );
    this.initViewComponents();
  }

  private getCorrectCurrentVal(correctValue: number, direction: SliderDirection): number[] {
    const options = this.model.getOptions();
    const current = options.currentVal;
    if (options.isRange) {
      current[SliderDirection.isFrom(direction) ? 0 : 1] = correctValue;
    } else {
      current[0] = correctValue;
    }
    return current;
  }

  private getValuesForScale(options: {
      minVal: number,
      maxVal: number,
      numberOfScaleMarks: number
  }): number[] {
    const { minVal, maxVal, numberOfScaleMarks } = options;
    const scaleValues: number[] = [];
    scaleValues.push(minVal);
    if (numberOfScaleMarks === 2) {
      scaleValues.push(maxVal);
    } else {
      const step = (maxVal - minVal) / (numberOfScaleMarks - 1);
      for (let i = 0; i < numberOfScaleMarks - 2; i += 1) {
        scaleValues.push(scaleValues[i] + step);
      }
      scaleValues.push(maxVal);
    }
    return this.getFixedScaleValues(scaleValues);
  }

  private getFixedScaleValues(values: number[]): number[] {
    let currentValues = values.slice(1, values.length - 1);
    currentValues = currentValues.map(val => this.model.getCorrectValWithStep(val));
    currentValues.unshift(values[0]);
    currentValues.push(values[values.length - 1]);
    return currentValues;
  }
}

export default Presenter;
