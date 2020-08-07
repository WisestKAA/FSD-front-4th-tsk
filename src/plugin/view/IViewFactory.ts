import IView from './IView';
import IPresenter from '../presenter/IPresenter';
import IViewOptions from './IViewOptions';
import IElementsFactory from './IElementsFactory';

 interface IViewFactory {
  build(
    presenter: IPresenter, 
    option: IViewOptions, 
    elementsFactory: IElementsFactory, 
    scaleValues?: number[]
  ): IView;
}

export default IViewFactory
