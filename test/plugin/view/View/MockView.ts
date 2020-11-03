import ICurrentValueWrapper from '../../../../src/plugin/view/CurrentValueWrapper/ICurrentValueWrapper';
import ISliderMainWrapper from '../../../../src/plugin/view/SliderMainWrapper/ISliderMainWrapper';
import IScaleWrapper from '../../../../src/plugin/view/ScaleWrapper/IScaleWrapper';
import View from '../../../../src/plugin/view/View';
import IViewOptions from '../../../../src/plugin/view/IViewOptions';
import IPresenter from '../../../../src/plugin/presenter/IPresenter';
import MockElementsFactory from './MockElementsFactory';

class MockView extends View {
  constructor(
    elem: HTMLElement,
    presenter: IPresenter,
    options: IViewOptions,
    scaleValues: number[]
  ) {
    super({
      elem,
      presenter,
      options,
      elementsFactory: new MockElementsFactory(options.isHorizontal, options.isRange),
      scaleValues
    });
  }

  getCurrentValueWrapper(): ICurrentValueWrapper {
    return this.currentValueWrapper;
  }

  getMainWrapper(): ISliderMainWrapper {
    return this.mainWrapper;
  }

  getOptions():IViewOptions {
    return this.options;
  }

  init() {
    super.init();
  }

  addEvents() {
    super.addEvents();
  }

  getScaleWrapper():IScaleWrapper {
    return this.scaleWrapper;
  }
}

export default MockView;
