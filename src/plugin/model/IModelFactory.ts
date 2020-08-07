import IModel from './IModel';

interface IModelFactory {
  build(): IModel;
}

export default IModelFactory;
