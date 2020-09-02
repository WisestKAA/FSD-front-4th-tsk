import SliderOptions from './SliderOptions';
import ISliderSettings from '../ISliderSettings';
import ISliderOptions from './ISliderOptions';
import ISliderOptionsFactory from './ISliderOptionsFactory';

class SliderOptionsFactory implements ISliderOptionsFactory {
    options?: ISliderSettings;

    constructor(options?: ISliderSettings) {
      this.options = options;
    }

    public build(): ISliderOptions {
      return new SliderOptions(this.options);
    }
}

export default SliderOptionsFactory;
