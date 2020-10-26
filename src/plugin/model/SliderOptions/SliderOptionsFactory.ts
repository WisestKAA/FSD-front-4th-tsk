import ISliderSettings from '../ISliderSettings';
import SliderOptions from './SliderOptions';
import ISliderOptions from './ISliderOptions';
import ISliderOptionsFactory from './ISliderOptionsFactory';

class SliderOptionsFactory implements ISliderOptionsFactory {
  private options?: ISliderSettings;

  constructor(options?: ISliderSettings) {
    this.options = options;
  }

  public build(): ISliderOptions {
    return new SliderOptions(this.options);
  }
}

export default SliderOptionsFactory;
