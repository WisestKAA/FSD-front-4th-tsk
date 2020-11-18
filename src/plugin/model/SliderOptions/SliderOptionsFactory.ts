import bind from 'bind-decorator';

import { ISliderSettings } from '../Model.types';
import SliderOptions from './SliderOptions';
import { ISliderOptions, ISliderOptionsFactory } from './SliderOptions.types';

class SliderOptionsFactory implements ISliderOptionsFactory {
  private options?: ISliderSettings;

  constructor(options?: ISliderSettings) {
    this.options = options;
  }

  @bind
  public build(): ISliderOptions {
    return new SliderOptions(this.options);
  }
}

export default SliderOptionsFactory;
