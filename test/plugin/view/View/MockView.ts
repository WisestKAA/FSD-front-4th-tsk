import { IHintWrapper } from '../../../../src/plugin/view/HintWrapper/HintWrapper.types';
import { ISliderMainWrapper } from '../../../../src/plugin/view/SliderMainWrapper/SliderMainWrapper.types';
import { IScaleWrapper } from '../../../../src/plugin/view/ScaleWrapper/ScaleWrapper.types';
import View from '../../../../src/plugin/view/View';
import { IViewOptions } from '../../../../src/plugin/view/View.types';
import { IPresenter } from '../../../../src/plugin/presenter/Presenter.types';
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

  getHintWrapper(): IHintWrapper {
    return this.hintWrapper;
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
