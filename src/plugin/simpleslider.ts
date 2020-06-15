import { ISliderOptions } from'./model/ISliderOptions';
import { Presenter } from './presenter/Presenter';


declare global {
    interface Window {
        $: JQuery;
    }
    interface JQuery {
        SimpleSlider: (
        options?: ISliderOptions | "setNewOptions" | "getOptions",
        additionalOptions?: ISliderOptions | Function
        ) => JQuery<Element> | JQuery<Object>;
    }
}

;(function init($: JQueryStatic){
    $.fn.SimpleSlider = function start(options?, additionalOptions?: ISliderOptions){ 
        return this.map((i: number, elem: HTMLElement) => {
            if(typeof options === 'object' || !options){
                const presenter = new Presenter(elem, options as ISliderOptions);
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
        
        
        
        //return presenter.getReadySlider();
    }
}(jQuery));