import bind from 'bind-decorator';
import SliderDirection from '../view/SliderDirection';
import IView from '../view/IView';
import IPresenter from './IPresenter';
import ISliderSettings from '../model/ISliderSettings';
import IModel from '../model/IModel';
import IModelFactory from '../model/IModelFactory';
import IViewFactory from '../view/IViewFactory';
import IViewOptions from '../view/IViewOptions';
import ElementsFactory from '../view/ElementsFactory';

class Presenter implements IPresenter {
  protected model: IModel;

  protected view: IView;

  constructor(viewFactory: IViewFactory, modelFactory: IModelFactory) {
    this.init(viewFactory, modelFactory);
    this.addEvents();
  }

  protected init(viewFactory: IViewFactory, modelFactory: IModelFactory): void{
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

  protected initViewComponents(): void{
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

  protected addEvents(): void{
    this.model.changeCurrentValueEvent.on((data) => {
      this.setCurrentValueView(data);
    });
    this.model.changeOptionsEvent.on(() => {
      this.optionsChanged();
    });
  }

  protected setCurrentValueView(currentValue: number[]): void{
    this.view.setCurrentValue(currentValue);
  }

  protected setCurrentValueModel(currentVal?: number[]): void{
    this.model.setCurrentValue(currentVal);
  }

  protected getCorrectPosition(option: {
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
      correctPosition = (position * maxHandlePosition) / 100;
      if (!SliderDirection.isFrom(direction)) {
        correctPosition = maxHandlePosition - correctPosition;
      }
    } else {
      correctPosition = 100 * (position / maxHandlePosition);
      if (!SliderDirection.isFrom(direction)) {
        correctPosition = 100 - correctPosition;
      }
    }
    return correctPosition;
  }

  protected getCurrentValFromPosition(direction: SliderDirection): number {
    const options = this.model.getOptions();
    const { maxVal, minVal } = options;
    const correctPosition = this.getCorrectPosition({
      position: this.view.getSliderHandlePosition(direction),
      maxHandlePosition: this.view.getMaxHandlePosition(),
      isForView: false,
      direction
    });

    let newCurrentVal = (((maxVal - minVal) * correctPosition) / 100) + minVal;
    const precision = Math.pow(10, options.precision);
    newCurrentVal = Math.round(newCurrentVal * precision) / precision;
    return newCurrentVal;
  }

  protected setCurrentHandlePosition(correctValue: number, direction: SliderDirection): void {
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

  protected optionsChanged(): void{
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

  protected getCorrectCurrentVal(correctValue: number, direction: SliderDirection): number[] {
    const options = this.model.getOptions();
    const current = options.currentVal;
    if (options.isRange) {
      if (SliderDirection.isFrom(direction)) {
        current[0] = correctValue;
      } else {
        current[1] = correctValue;
      }
    } else {
      current[0] = correctValue;
    }
    return current;
  }

  protected getValuesForScale(options: {
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

  public sliderHandleChangedPosition(direction: SliderDirection): void {
    const currentVal = this.getCurrentValFromPosition(direction);
    const correctVal = this.model.getCorrectValWithStep(currentVal);
    const current = this.getCorrectCurrentVal(correctVal, direction);
    this.setCurrentValueModel(current);
    const currentValFromPosition = this.getCurrentValFromPosition(direction);
    correctVal !== currentValFromPosition && this.setCurrentHandlePosition(correctVal, direction);
  }

  public scaleClicked(value: number): void{
    const options = this.model.getOptions();
    const val = this.model.getCorrectValWithStep(value);

    if (!options.isRange) {
      this.setCurrentValueModel([val, 0]);
      this.setCurrentHandlePosition(
        val,
        SliderDirection.getDirection(true, options.isHorizontal)
      );
      return;
    }

    if (val < options.currentVal[0]
      || val - options.currentVal[0] < options.currentVal[1] - val
    ) {
      this.setCurrentValueModel([val, options.currentVal[1]]);
      this.setCurrentHandlePosition(val, SliderDirection.getDirection(true, options.isHorizontal));
    } else {
      this.setCurrentValueModel([options.currentVal[0], val]);
      this.setCurrentHandlePosition(val, SliderDirection.getDirection(false, options.isHorizontal));
    }
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
}

export default Presenter;
