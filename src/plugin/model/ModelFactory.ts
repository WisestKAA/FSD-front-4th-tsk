import { IModel } from "./IModel";
import { Model } from "./Model";
import { ISliderOptionsFactory } from "./SliderOptions/SliderOptionsFactory";

export class ModelFactory implements IModelFactory{
    protected sliderOptionsFactory: ISliderOptionsFactory;

    constructor(sliderOptionsFactory: ISliderOptionsFactory){
        this.sliderOptionsFactory = sliderOptionsFactory;
    }

    public build(): IModel{
        return new Model(this.sliderOptionsFactory);
    }
}

export interface IModelFactory{
    build(): IModel;
}