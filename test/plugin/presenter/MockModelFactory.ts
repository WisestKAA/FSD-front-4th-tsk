import { IModel, IModelFactory, ISliderSettings } from '../../../src/plugin/model/Model.types';
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
