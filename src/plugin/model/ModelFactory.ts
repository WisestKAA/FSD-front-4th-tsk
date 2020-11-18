import bind from 'bind-decorator';

import { ISliderOptionsFactory } from './SliderOptions/SliderOptions.types';
import { IModel, IModelFactory } from './Model.types';
import Model from './Model';

class ModelFactory implements IModelFactory {
  private sliderOptionsFactory: ISliderOptionsFactory;

  constructor(sliderOptionsFactory: ISliderOptionsFactory) {
    this.sliderOptionsFactory = sliderOptionsFactory;
  }

  @bind
  public build(): IModel {
    return new Model(this.sliderOptionsFactory);
  }
}

export default ModelFactory;
