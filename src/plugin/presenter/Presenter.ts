import { Model } from "../model/Model";
import { View } from "../view/View";
import { ISliderOptions } from "../model/ISliderOptions";

export class Presenter{
    model: Model;
    view: View;

    constructor(elem: HTMLElement, options?: ISliderOptions){
        this.model = new Model(options);
        this.view = new View(elem, this.model.options.currentVal, this);
        this.addEvents();
    }

    getReadySlider(){
        return this.view.slider;
    }

    addEvents(){
        let that = this;
        
        this.model.changeCurrentValueEvent.on((data) => {
            that.setCurrentValueView(data);
        });
    }

    sliderHandleLeftChange(): void {
        let position = this.view.getSliderHandleLeftPosition();
        let newCurrentVal = this.model.getMaxValue() * this.getCorrectPosition(position, false) / 100;
        this.model.setCurrentValue(newCurrentVal);
    }

    sliderCurrentValueChange(): void {
        let newCurrentVal = this.view.getCurrentValue();
        let currentVal = this.model.getMaxValue() * this.getCorrectPosition(this.view.getSliderHandleLeftPosition(), false) / 100;
        if(currentVal != newCurrentVal){
            //this.setCurrentValueModel(newCurrentVal);            
            //let newPosition = 100 * newCurrentVal / this.model.getMaxValue();
            //this.view.setNewSliderHandleLeftPosition(this.getCorrectPosition(newPosition,true));
        }
    }

    setCurrentValueView(currentValue: number): void{
        this.view.setCurrentValue(currentValue);
    }

    setCurrentValueModel(newCurrentVal: number): void{
        this.model.setCurrentValue(newCurrentVal);
    }

    getCorrectPosition(position: number, isForView: boolean): number{
        let maxPosition = this.view.getMaxHandlePosition();
        if(isForView){
            return position * maxPosition / 100;
        } else {
            return 100 * position / maxPosition;
        }
    }
}