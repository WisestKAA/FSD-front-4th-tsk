import { Model } from "../model/Model";
import { View } from "../view/View";
import { ISliderOptions } from "../model/ISliderOptions";

export class Presenter{
    private model: Model;
    private view: View;

    constructor(options?: ISliderOptions){
        this.model = new Model(options);
    }

}