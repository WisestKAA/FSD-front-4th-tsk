import bind from 'bind-decorator';
import { Model } from "../model/Model";
import { View } from "../view/View";
import { ISliderOptions } from "../model/ISliderOptions";
import { SliderDirection } from "../view/SliderDirection";

export class Presenter{
    model: Model;
    view: View;

    constructor(elem: HTMLElement, options?: ISliderOptions){
        this.init(elem, options)
        this.addEvents(); 
    }

    init(elem: HTMLElement, options?: ISliderOptions): void{        
        this.model = new Model(options);
        this.view = new View(elem, this, 
            {
                isHorizontal: this.model.options.isHorizontal,
                isRange: this.model.options.isRange,
            }
        );
        
        let direction = this.model.options.isHorizontal ? SliderDirection.LEFT : SliderDirection.BOTTOM;
        let correctValFrom = this.getCorrectValWithStep(this.model.options.currentVal[0]);
        this.setCurrentHandlePosition(correctValFrom,  direction);
        this.view.setCurrentValue([correctValFrom, 0]);
        if(this.model.options.isRange){
            direction = this.model.options.isHorizontal ? SliderDirection.RIGHT : SliderDirection.TOP;
            let correctValTo = this.getCorrectValWithStep(this.model.options.currentVal[1]);
            this.setCurrentHandlePosition(correctValTo,  direction);
            this.view.setCurrentValue([correctValFrom, correctValTo]);
        }
    }

    addEvents(){
        let that = this;

        this.model.changeCurrentValueEvent.on((data) => {
            that.setCurrentValueView(data);
        });

        this.model.changeOptionsEvent.on(() => {
            that.optionsChanged();
        });
    }

    sliderHandleChangedPosition(direction: SliderDirection): void {
        let currentVal = this.getCurrentValFromPosition(direction);
        let correctVal = this.getCorrectValWithStep(currentVal);
        let current = this.getCorrectCurrentVal(correctVal, direction);
        this.setCurrentValueModel(current);
        let currentValFromPosition = this.getCurrentValFromPosition(direction);
        if(correctVal != currentValFromPosition){
            this.setCurrentHandlePosition(correctVal, direction);
        }        
    }

    setCurrentValueView(currentValue: number[]): void{
        this.view.setCurrentValue(currentValue);
    }

    setCurrentValueModel(currentVal?: number[], direction?: SliderDirection): void{
        if(currentVal === null){   
            let newCurrentVal = this.getCurrentValFromPosition(direction);
            let current = this.getCorrectCurrentVal(newCurrentVal, direction);
            this.model.setCurrentValue(current);
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

    getCurrentValFromPosition(direction: SliderDirection): number{
        let position = this.view.getSliderHandlePosition(direction);
        let maxVal = this.model.options.maxVal;
        let minVal = this.model.options.minVal;
        let maxHandlePosition = this.view.getMaxHandlePosition();
        let correctPosition = this.getCorrectPosition(position, maxHandlePosition, false);
        let newCurrentVal = ((maxVal - minVal)  * correctPosition / 100) + minVal;
        let precision = Math.pow(10, this.model.options.precision);
        newCurrentVal = Math.round(newCurrentVal * precision) / precision;
        return newCurrentVal;
    }

    getCorrectValWithStep(currentVal: number): number {
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

    setCurrentHandlePosition(correctValue: number, direction: SliderDirection): void {
        let position = Math.abs(100 * (this.model.options.minVal + correctValue) / 
            (Math.abs(this.model.options.minVal) + Math.abs(this.model.options.maxVal)));
        position = this.getCorrectPosition(position, this.view.getMaxHandlePosition(), true);
        this.view.setCurrentPosition(position, direction);
    }

    @bind 
    setNewOptions(options: ISliderOptions): void{
        this.model.setNewOptions(options);
    }

    @bind
    getOptions(): ISliderOptions{
        return this.model.options;
    }

    @bind
    onCurrentValueChanged(callBack: Function): void{
        this.model.changeCurrentValueEvent.on((data) => {
            callBack(data);
        })
    }

    optionsChanged(): void{
        this.setCurrentValueView(this.model.options.currentVal);
        
        let correctVal = this.getCorrectValWithStep(this.model.options.currentVal[0]);
        let direction = this.model.options.isHorizontal ? SliderDirection.LEFT : SliderDirection.BOTTOM;
        this.setCurrentHandlePosition(correctVal, direction);
        if(this.model.options.isRange){
            correctVal = this.getCorrectValWithStep(this.model.options.currentVal[1]);
            direction = this.model.options.isHorizontal ? SliderDirection.RIGHT : SliderDirection.TOP;
            this.setCurrentHandlePosition(correctVal, direction);
        }
        this.view.setOrientation(this.model.options.isHorizontal);        
    }

    getCorrectCurrentVal(correctValue: number, direction: SliderDirection): number[]{
        let current = this.model.options.currentVal;
        if(this.model.options.isRange){
            if(direction === SliderDirection.LEFT || direction === SliderDirection.BOTTOM){
                current[0] = correctValue;
            } else {
                current[1] = correctValue;
            }
        } else {
            current[0] = correctValue;
        }
        return current;
    }
}