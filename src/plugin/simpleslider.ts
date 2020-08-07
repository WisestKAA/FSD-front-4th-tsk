import Presenter from './presenter/Presenter';
import ISliderSettings from './model/ISliderSettings';
import ModelFactory from './model/ModelFactory';
import SliderOptionsFactory from './model/SliderOptions/SliderOptionsFactory';
import ViewFactory from './view/ViewFactory';
import './styles.scss';

declare global {
    interface Window {
        $: JQuery;
    }
    interface JQuery {
        SimpleSlider: (
            options?: ISliderSettings | 'setNewOptions' | 'getOptions',
            additionalOptions?: ISliderSettings | Function
        ) => JQuery<Element> | JQuery<Object>;
    }
}

(function ($: JQueryStatic) {
  $.fn.SimpleSlider = function start (options?, additionalOptions?: ISliderSettings) {
    return this.map((iter: number, elem: HTMLElement) => {
      if (typeof options === 'object' || !options) {
        const sliderOptionsFactory = new SliderOptionsFactory(options as ISliderSettings);
        const modelFactory = new ModelFactory(sliderOptionsFactory);
        const viewFactory = new ViewFactory(elem);
        const presenter = new Presenter(viewFactory, modelFactory);
        this.data('presenter', presenter);
        return this;
      }

      const presenter: Presenter = this.data('presenter');
      if (typeof options === 'string' && presenter) {
        if (presenter[options]) {
          return presenter[options].call(presenter, additionalOptions);
        }
      }
      return null;
    });
  };
}(jQuery));
