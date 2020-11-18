import { ISliderSettings } from '../../src/plugin/model/Model.types';
import { IPresenter } from '../../src/plugin/presenter/Presenter.types';
import SliderDirection from '../../src/plugin/view/SliderDirection';

class MockPresenter implements IPresenter {
  callBack: Function;

  sliderSettings: ISliderSettings;

  constructor(sliderSettings: ISliderSettings) {
    this.sliderSettings = sliderSettings;
  }

  sliderHandleChangedPosition(direction: SliderDirection): void {
    throw new Error('Method not implemented.');
  }

  scaleClicked(value: number): void {
    throw new Error('Method not implemented.');
  }

  lineClicked(position: number): void {
    throw new Error('Method not implemented.');
  }

  setNewOptions(options: ISliderSettings): void{
    this.sliderSettings = options;
  }

  onCurrentValueChanged(func: Function) {
    this.callBack = func;
  }

  mockTriggerEvent(val: number[]) {
    this.callBack(val);
  }

  getOptions(): ISliderSettings {
    return this.sliderSettings;
  }
}

export default MockPresenter;
