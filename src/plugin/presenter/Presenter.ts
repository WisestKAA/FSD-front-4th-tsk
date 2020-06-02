import { Model } from "../model/Model";
import { View } from "../view/View";
import { ISliderOptions } from "../model/ISliderOptions";

export class Presenter{
    model: Model;
    view: View;

    constructor(elem: HTMLElement, options?: ISliderOptions){
        this.model = new Model(options);
        this.view = new View(elem);
    }

    getReadySlider(){
        return this.view.slider;
    }
}