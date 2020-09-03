import IModelFactory from '../../../src/plugin/model/IModelFactory';
import IModel from '../../../src/plugin/model/IModel';
import ISliderSettings from '../../../src/plugin/model/ISliderSettings';
import MockModel from './MockModel';

class MockModelFactory implements IModelFactory {
  model: IModel;

  options?: ISliderSettings;

  constructor(options?: ISliderSettings) {
    this.options = options;
    this.model = new MockModel(this.options);
  }

  build(): IModel {
    return this.model;
  }
}

export default MockModelFactory;
