import bind from 'bind-decorator';
import { Model } from "../model/Model";
import { View } from "../view/View";
import { ISliderOptions } from "../model/ISliderOptions";
import { SliderDirection } from "../view/SliderDirection";
import { IView } from '../view/IView';

export class Presenter{
    protected model: Model;
    protected view: IView;

    constructor(elem: HTMLElement, options?: ISliderOptions){
        this.init(elem, options)
        this.addEvents(); 
    }

    protected init(elem: HTMLElement, options?: ISliderOptions): void{        
        this.model = new Model(options);
        this.view = new View(elem, this, 
            {
                isHorizontal: this.model.options.isHorizontal,
                isRange: this.model.options.isRange,
                isRangeLineEnabled: this.model.options.isRangeLineEnabled,
                isVisibleCurrentValue: this.model.options.isVisibleCurrentValue,
            }
        );        
        this.initViewComponents();
    }

    protected initViewComponents(): void{
        let direction = this.model.options.isHorizontal ? SliderDirection.LEFT : SliderDirection.BOTTOM;
        let correctValFrom = this.getCorrectValWithStep(this.model.options.currentVal[0]);
        this.view.setCurrentValue([correctValFrom, 0]);
        this.setCurrentHandlePosition(correctValFrom,  direction);
        if(this.model.options.isRange){
            direction = this.model.options.isHorizontal ? SliderDirection.RIGHT : SliderDirection.TOP;
            let correctValTo = this.getCorrectValWithStep(this.model.options.currentVal[1]);
            this.view.setCurrentValue([correctValFrom, correctValTo]);
            this.setCurrentHandlePosition(correctValTo,  direction);
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

    getCorrectPosition(position: number, maxHandlePosition: number, isForView: boolean, direction: SliderDirection): number{
        let correctPosition: number;
        if(isForView){
            correctPosition = position * maxHandlePosition / 100;
            if(direction === SliderDirection.RIGHT || direction === SliderDirection.TOP){
                correctPosition = maxHandlePosition - correctPosition
            }
        } else {
            correctPosition = 100 * position / maxHandlePosition;
            if(direction === SliderDirection.RIGHT || direction === SliderDirection.TOP){
                correctPosition = 100 - correctPosition
            }
        }        
        return correctPosition;
    }

    getCurrentValFromPosition(direction: SliderDirection): number{
        let position = this.view.getSliderHandlePosition(direction);
        let maxVal = this.model.options.maxVal;
        let minVal = this.model.options.minVal;
        let maxHandlePosition = this.view.getMaxHandlePosition();
        let correctPosition = this.getCorrectPosition(position, maxHandlePosition, false, direction);
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
        let position = (100*(correctValue - this.model.options.minVal))/(this.model.options.maxVal-this.model.options.minVal);
        position = this.getCorrectPosition(position, this.view.getMaxHandlePosition(), true, direction);
        this.view.setHandlePosition(position, direction);
    }

    optionsChanged(): void{        
        this.view.reinitialization({
            isHorizontal: this.model.options.isHorizontal,
            isRange: this.model.options.isRange,
            isRangeLineEnabled: this.model.options.isRangeLineEnabled,
            isVisibleCurrentValue: this.model.options.isVisibleCurrentValue,
        });
        this.initViewComponents();
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
}