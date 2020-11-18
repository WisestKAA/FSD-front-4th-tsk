import { ISliderOptions, ISliderOptionsFactory } from '../../../../src/plugin/model/SliderOptions/SliderOptions.types';
import MockSliderOptions from './MockSliderOptions';

class MockOptionsFactory implements ISliderOptionsFactory {
  options: ISliderOptions;

  constructor() {
    this.options = new MockSliderOptions();
  }

  build(): ISliderOptions {
    return this.options;
  }
}

export default MockOptionsFactory;
