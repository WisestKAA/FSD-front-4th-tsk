import IViewFactory from '../../../src/plugin/view/IViewFactory';
import IPresenter from '../../../src/plugin/presenter/IPresenter';
import IViewOptions from '../../../src/plugin/view/IViewOptions';
import IElementsFactory from '../../../src/plugin/view/IElementsFactory';
import IView from '../../../src/plugin/view/IView';
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
