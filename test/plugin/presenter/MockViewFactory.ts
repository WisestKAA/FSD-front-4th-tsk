import {
  IElementsFactory,
  IViewFactory,
  IViewOptions,
  IView
} from '../../../src/plugin/view/View.types';
import { IPresenter } from '../../../src/plugin/presenter/Presenter.types';
import MockView from './MockView';

class MockViewFactory implements IViewFactory {
  view = new MockView();

  build(
    presenter?: IPresenter,
    option?: IViewOptions,
    elementsFactory?: IElementsFactory,
    scaleValues?: number[]
  ): IView {
    this.view.setOptions(presenter, option, elementsFactory, scaleValues);
    return this.view;
  }
}

export default MockViewFactory;
