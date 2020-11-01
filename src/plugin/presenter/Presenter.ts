import bind from 'bind-decorator';

import SliderDirection from '../view/SliderDirection';
import IView from '../view/IView';
import IViewFactory from '../view/IViewFactory';
import IViewOptions from '../view/IViewOptions';
import ElementsFactory from '../view/ElementsFactory';
import ISliderSettings from '../model/ISliderSettings';
import IModel from '../model/IModel';
import IModelFactory from '../model/IModelFactory';
import IPresenter from './IPresenter';

class Presenter implements IPresenter {
  private model: IModel;

  private view: IView;

  constructor(viewFactory: IViewFactory, modelFactory: IModelFactory) {
    this.init(viewFactory, modelFactory);
    this.addEvents();
  }

  public sliderHandleChangedPosition(direction: SliderDirection): void {
    const currentVal = this.getCurrentValFromPosition(
      direction,
      this.view.getSliderHandlePosition(direction)
    );
    const correctVal = this.model.getCorrectValWithStep(currentVal);
    const current = this.getCorrectCurrentVal(correctVal, direction);
    this.setCurrentValueModel(current);
    const currentValFromPosition = this.getCurrentValFromPosition(
      direction,
      this.view.getSliderHandlePosition(direction)
    );
    correctVal !== currentValFromPosition && this.setCurrentHandlePosition(correctVal, direction);
  }

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

  private init(viewFactory: IViewFactory, modelFactory: IModelFactory): void{
    this.model = modelFactory.build();
    const currentOptions = this.model.getOptions();
    const viewOptions: IViewOptions = {
      isHorizontal: currentOptions.isHorizontal,
      isRange: currentOptions.isRange,
      isRangeLineEnabled: currentOptions.isRangeLineEnabled,
      isVisibleCurrentValue: currentOptions.isVisibleCurrentValue
    };

    const valuesForeScale = currentOptions.isScaleEnabled
      ? this.getValuesForScale({
        maxVal: currentOptions.maxVal,
        minVal: currentOptions.minVal,
        numberOfScaleMarks: currentOptions.numberOfScaleMarks
      })
      : null;

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
      this.setCurrentValueModel([val, 0]);
      this.setCurrentHandlePosition(
        val,
        SliderDirection.getDirection(true, isHorizontal)
      );
      return;
    }

    if (val < currentVal[0]
      || val - currentVal[0] < currentVal[1] - val
    ) {
      this.setCurrentValueModel([val, currentVal[1]]);
      this.setCurrentHandlePosition(val, SliderDirection.getDirection(true, isHorizontal));
    } else {
      this.setCurrentValueModel([currentVal[0], val]);
      this.setCurrentHandlePosition(val, SliderDirection.getDirection(false, isHorizontal));
    }
  }

  private initViewComponents(): void{
    const options = this.model.getOptions();
    let direction = SliderDirection.getDirection(true, options.isHorizontal);
    const correctValFrom = this.model.getCorrectValWithStep(options.currentVal[0]);
    this.setCurrentValueView([correctValFrom, 0]);
    this.setCurrentHandlePosition(correctValFrom, direction);
    if (options.isRange) {
      direction = SliderDirection.getDirection(false, options.isHorizontal);
      const correctValTo = this.model.getCorrectValWithStep(options.currentVal[1]);
      this.setCurrentValueView([correctValFrom, correctValTo]);
      this.setCurrentHandlePosition(correctValTo, direction);
    }
  }

  private addEvents(): void{
    this.model.changeCurrentValueEvent.on((data) => { this.setCurrentValueView(data); });
    this.model.changeOptionsEvent.on(() => { this.optionsChanged(); });
  }

  private setCurrentValueView(currentValue: number[]): void{
    this.view.setCurrentValue(currentValue);
  }

  private setCurrentValueModel(currentVal?: number[]): void{
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

  private setCurrentHandlePosition(correctValue: number, direction: SliderDirection): void {
    const options = this.model.getOptions();
    let position = (100 * (correctValue - options.minVal)) / (options.maxVal - options.minVal);
    position = this.getCorrectPosition({
      position,
      maxHandlePosition: this.view.getMaxHandlePosition(),
      isForView: true,
      direction
    });
    this.view.setHandlePosition(position, direction);
  }

  private optionsChanged(): void{
    const options = this.model.getOptions();
    if (options.isScaleEnabled) {
      const scaleValues = this.getValuesForScale({
        minVal: options.minVal,
        maxVal: options.maxVal,
        numberOfScaleMarks: options.numberOfScaleMarks
      });
      this.view.reinitialization({
        isHorizontal: options.isHorizontal,
        isRange: options.isRange,
        isRangeLineEnabled: options.isRangeLineEnabled,
        isVisibleCurrentValue: options.isVisibleCurrentValue
      }, scaleValues);
    } else {
      this.view.reinitialization({
        isHorizontal: options.isHorizontal,
        isRange: options.isRange,
        isRangeLineEnabled: options.isRangeLineEnabled,
        isVisibleCurrentValue: options.isVisibleCurrentValue
      });
    }
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
    return scaleValues;
  }
}

export default Presenter;
