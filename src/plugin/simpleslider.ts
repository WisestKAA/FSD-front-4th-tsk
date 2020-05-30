import { ISliderOptions } from'./model/ISliderOptions';
import { Presenter } from './presenter/Presenter';


declare global {
    interface Window {
        $: JQuery;
    }
    interface JQuery {
        SimpleSlider: (
        options?: ISliderOptions,
        ) => JQuery<Element> | JQuery<Object>;
    }
}

(function ($: JQueryStatic){
    $.fn.SimpleSlider = function (options?: ISliderOptions){ 
        let presenter = new Presenter(this, options);
        return presenter.getReadySlider();
    }
}(jQuery));