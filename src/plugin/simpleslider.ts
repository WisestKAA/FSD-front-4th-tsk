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
        let $elem = $(this);
        $elem.html(`it's slider`);
        let a = new Presenter(options);
        return $elem;
    }
}(jQuery));