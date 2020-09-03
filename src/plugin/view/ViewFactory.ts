import IView from './IView';
import View from './View';
import IPresenter from '../presenter/IPresenter';
import IViewOptions from './IViewOptions';
import IElementsFactory from './IElementsFactory';
import IViewFactory from './IViewFactory';

class ViewFactory implements IViewFactory {
  protected elem: HTMLElement;

  constructor(elem: HTMLElement) {
    this.elem = elem;
  }

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
