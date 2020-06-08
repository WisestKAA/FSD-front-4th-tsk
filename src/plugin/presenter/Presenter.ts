import { Model } from "../model/Model";
import { View } from "../view/View";
import { ISliderOptions } from "../model/ISliderOptions";

export class Presenter{
    model: Model;
    view: View;

    constructor(elem: HTMLElement, options?: ISliderOptions){
        this.init(elem, options)
        this.addEvents();        
        if(this.model.options.currentVal != 0) this.setCurrentLeftValue(this.model.options.currentVal);
    }

    init(elem: HTMLElement, options?: ISliderOptions): void{        
        this.model = new Model(options);
        this.view = new View(elem, this);
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
        let maxVal = this.model.getMaxValue();
        let maxHandlePosition = this.view.getMaxHandlePosition();
        let correctPosition = this.getCorrectPosition(position, maxHandlePosition, false);
        let newCurrentVal = maxVal  * correctPosition / 100;
        this.setCurrentValueModel(newCurrentVal);
    }

    setCurrentValueView(currentValue: number): void{
        this.view.setCurrentValue(currentValue);
    }

    setCurrentValueModel(newCurrentVal: number): void{
        this.model.setCurrentValue(newCurrentVal);
    }

    getCorrectPosition(position: number, maxHandlePosition: number, isForView: boolean): number{
        if(isForView){
            return position * maxHandlePosition / 100;
        } else {
            return 100 * position / maxHandlePosition;
        }
    }

    setCurrentLeftValue(currentVal: number, maxValue = this.model.options.maxVal, maxHandlePosition = this.view.getMaxHandlePosition()): void{        
        let position = (100 * currentVal) / maxValue;
        position = this.getCorrectPosition(position, maxHandlePosition, true);
        this.view.setNewSliderHandleLeftPosition(position);
    }
}