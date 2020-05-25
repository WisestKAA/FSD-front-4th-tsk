import { ISliderOptions } from'./model/ISliderOptions';

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
        var $elem = $(this);
        $elem.html(`isHorizontal: ${options.isHorizontal}, minVal: ${options.maxVal}, etc`);
        return $elem;
    }
}(jQuery));