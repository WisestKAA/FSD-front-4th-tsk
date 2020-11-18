import bind from 'bind-decorator';

import IPresenter from '../presenter/IPresenter';
import IView from './IView';
import View from './View';
import IViewOptions from './IViewOptions';
import IElementsFactory from './IElementsFactory';
import IViewFactory from './IViewFactory';

class ViewFactory implements IViewFactory {
  private elem: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem;
  }

  @bind
  public build(
    presenter: IPresenter,
    option: IViewOptions,
    elementsFactory: IElementsFactory,
    scaleValues?: number[]
  ): IView {
    return new View({
      elem: this.elem,
      presenter,
      options: option,
      elementsFactory,
      scaleValues
    });
  }
}

export default ViewFactory;
