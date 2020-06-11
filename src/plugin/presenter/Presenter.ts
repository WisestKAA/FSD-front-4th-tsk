import { Model } from "../model/Model";
import { View } from "../view/View";
import { ISliderOptions } from "../model/ISliderOptions";
import { SliderDirection } from "../view/SliderDirection";
import { IView } from "../view/IView";

export class Presenter{
    model: Model;
    view: View;

    constructor(elem: HTMLElement, options?: ISliderOptions){
        this.init(elem, options)
        this.addEvents();        
        //if(this.model.options.currentVal != 0) 
        this.setCurrentLeftValue(this.model.options.currentVal);
    }

    init(elem: HTMLElement, options?: ISliderOptions): void{        
        this.model = new Model(options);
        this.view = new View(elem, this, {isHorizontal: this.model.options.isHorizontal});
        this.setSliderInitPosition();
    }

    getReadySlider(){
        return this.view.getReadySlider();
    }

    addEvents(){
        let that = this;
        
        this.model.changeCurrentValueEvent.on((data) => {
            that.setCurrentValueView(data);
        });
    }

    sliderHandleLeftChange(): void {
        let correctVal = this.getCorrectValWithStep();
        this.setCurrentValueModel(correctVal);
        let currentValFromPosition = this.getCurrentValFromPosition();
        if(correctVal != currentValFromPosition){
            this.setCurrentLeftValue(correctVal);
        }        
    }

    setCurrentValueView(currentValue: number): void{
        this.view.setCurrentValue(currentValue);
    }

    setCurrentValueModel(currentVal?: number): void{
        if(currentVal === null){
            let newCurrentVal = this.getCurrentValFromPosition();
            this.model.setCurrentValue(newCurrentVal);
        }else{
            this.model.setCurrentValue(currentVal);
        }        
    }

    getCorrectPosition(position: number, maxHandlePosition: number, isForView: boolean): number{
        if(isForView){
            return position * maxHandlePosition / 100;
        } else {
            return 100 * position / maxHandlePosition;
        }
    }

    setCurrentLeftValue(currentVal: number, maxValue = this.model.options.maxVal, maxHandlePosition = this.view.getMaxHandlePosition()): void{        
        let position = Math.abs(100 * (this.model.options.minVal + this.model.options.currentVal) / 
            (Math.abs(this.model.options.minVal) + Math.abs(this.model.options.maxVal)));
        position = this.getCorrectPosition(position, maxHandlePosition, true);
        let direction = this.model.options.isHorizontal ? SliderDirection.LEFT : SliderDirection.BOTTOM;
        this.view.setNewSliderHandlePosition(position, direction);
    }

    getCurrentValFromPosition(): number{
        let position = this.view.getSliderHandleLeftPosition();
        let maxVal = Math.abs(this.model.options.minVal) + Math.abs(this.model.options.maxVal);
        let maxHandlePosition = this.view.getMaxHandlePosition();
        let correctPosition = this.getCorrectPosition(position, maxHandlePosition, false);
        let newCurrentVal = maxVal  * correctPosition / 100;
        let precision = Math.pow(10, this.model.options.precision);
        newCurrentVal = Math.round(newCurrentVal * precision) / precision;
        return newCurrentVal;
    }

    getCorrectValWithStep(currentVal: number = this.getCurrentValFromPosition()): number {
        let step = this.model.options.step;
        if(currentVal < this.model.options.minVal){
            return this.model.options.minVal;
        }
        if(currentVal > this.model.options.maxVal - this.model.options.maxVal % step){
            return this.model.options.maxVal;
        }

        let correctVal: number;
        let shift = step - currentVal % step;
        let middle = step / 2;
        if(shift > middle){            
            correctVal = currentVal - currentVal % step;
        } else {
            correctVal = currentVal + shift;
        }
        return correctVal;
    }

    setSliderInitPosition(): void {
        let direction = this.model.options.isHorizontal ? SliderDirection.LEFT : SliderDirection.BOTTOM;
        let position = Math.abs(100 * (this.model.options.minVal + this.model.options.currentVal) / 
            (Math.abs(this.model.options.minVal) + Math.abs(this.model.options.maxVal)));
        position = this.getCorrectPosition(position, this.view.getMaxHandlePosition(), true);
        this.view.setInitPosition(position, direction);
    }
}