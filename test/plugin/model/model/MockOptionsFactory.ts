import ISliderOptionsFactory from '../../../src/plugin/model/SliderOptions/ISliderOptionsFactory';
import ISliderOptions from '../../../src/plugin/model/SliderOptions/ISliderOptions';
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
