import { Presenter } from './presenter/Presenter';
import { ISliderSettings } from './model/ISliderSettings';


declare global {
    interface Window {
        $: JQuery;
    }
    interface JQuery {
        SimpleSlider: (
            options?: ISliderSettings | "setNewOptions" | "getOptions",
            additionalOptions?: ISliderSettings | Function
        ) => JQuery<Element> | JQuery<Object>;
    }
}

;(function init($: JQueryStatic){
    $.fn.SimpleSlider = function start(options?, additionalOptions?: ISliderSettings){ 
        return this.map((i: number, elem: HTMLElement) => {
            if(typeof options === 'object' || !options){
                const presenter = new Presenter(elem, options as ISliderSettings);
                this.data('presenter', presenter);
                return this;
            }

            const presenter: Presenter = this.data('presenter');
            if(typeof options === "string" && presenter){
                if(presenter[options]){
                    return presenter[options].call(presenter, additionalOptions);
                }
            }
        });
    }
}(jQuery));