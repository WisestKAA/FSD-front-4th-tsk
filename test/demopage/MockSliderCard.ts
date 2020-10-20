import SliderCard from '../../src/demopage/blocks/slider-card/SliderCard';
import ISliderSettings from '../../src/plugin/model/ISliderSettings';
import IFormInputs from '../../src/demopage/blocks/slider-card/IFormInputs';
import MockPresenter from './MockPresenter';

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

  getFormInputs(): IFormInputs {
    return this.formInputs;
  }

  getElem(): JQuery<HTMLElement> {
    return this.$elem;
  }
}

export default MockSliderCard;
