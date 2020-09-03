import SliderCard from '../../src/demopage/blocks/slider-card/slider-card';
import MockPresenter from './MockPresenter';
import ISliderSettings from '../../src/plugin/model/ISliderSettings';
import IFormIntputs from '../../src/demopage/blocks/slider-card/IFormIntputs';

class MockSliderCard extends SliderCard {
  presenter: MockPresenter;

  initSlider(slider: HTMLElement, sliderSettings: ISliderSettings): void{
    this.$slider = $(slider);
    this.presenter = new MockPresenter(sliderSettings);
    $(slider).data('presenter', this.presenter);
  }

  getOpt(): ISliderSettings {
    return this.options;
  }

  getFormInputs(): IFormIntputs {
    return this.formInputs;
  }

  getElem(): JQuery<HTMLElement> {
    return this.$elem;
  }
}

export default MockSliderCard;
