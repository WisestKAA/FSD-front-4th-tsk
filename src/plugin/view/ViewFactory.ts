import bind from 'bind-decorator';

import { IPresenter } from '../presenter/Presenter.types';
import {
  IElementsFactory,
  IView, IViewOptions,
  IViewFactory
} from './View.types';
import View from './View';

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
