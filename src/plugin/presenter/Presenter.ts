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
        let direction = SliderDirection.getDiraction(true, this.model.options.isHorizontal);
        let correctValFrom = this.model.getCorrectValWithStep(this.model.options.currentVal[0]);
        this.view.setCurrentValue([correctValFrom, 0]);
        this.setCurrentHandlePosition(correctValFrom,  direction);
        if(this.model.options.isRange){
            direction = SliderDirection.getDiraction(false, this.model.options.isHorizontal);
            let correctValTo = this.model.getCorrectValWithStep(this.model.options.currentVal[1]);
            this.view.setCurrentValue([correctValFrom, correctValTo]);
            this.setCurrentHandlePosition(correctValTo,  direction);
        }
    }

    protected addEvents(){
        this.model.changeCurrentValueEvent.on((data) => {
            this.setCurrentValueView(data);
        });
        this.model.changeOptionsEvent.on(() => {
            this.optionsChanged();
        });
    }

    protected setCurrentValueView(currentValue: number[]): void{
        this.view.setCurrentValue(currentValue);
    }

    protected setCurrentValueModel(currentVal?: number[], direction?: SliderDirection): void{
        if(currentVal === null){   
            let newCurrentVal = this.getCurrentValFromPosition(direction);
            let current = this.getCorrectCurrentVal(newCurrentVal, direction);
            this.model.setCurrentValue(current);
        }else{
            this.model.setCurrentValue(currentVal);
        }        
    }

    protected getCorrectPosition(option: {
        position: number, 
        maxHandlePosition: number, 
        isForView: boolean, 
        direction: SliderDirection
    }): number{
        const {position, maxHandlePosition, isForView, direction} = option;
        let correctPosition: number;
        if(isForView){
            correctPosition = position * maxHandlePosition / 100;
            if(!SliderDirection.isFrom(direction)){
                correctPosition = maxHandlePosition - correctPosition
            }
        } else {
            correctPosition = 100 * position / maxHandlePosition;
            if(!SliderDirection.isFrom(direction)){
                correctPosition = 100 - correctPosition
            }
        }        
        return correctPosition;
    }

    protected getCurrentValFromPosition(direction: SliderDirection): number{
        let maxVal = this.model.options.maxVal;
        let minVal = this.model.options.minVal;
        let correctPosition = this.getCorrectPosition({
            position: this.view.getSliderHandlePosition(direction), 
            maxHandlePosition: this.view.getMaxHandlePosition(), 
            isForView: false, 
            direction: direction
        });
        
        let newCurrentVal = ((maxVal - minVal)  * correctPosition / 100) + minVal;
        let precision = Math.pow(10, this.model.options.precision);
        newCurrentVal = Math.round(newCurrentVal * precision) / precision;
        return newCurrentVal;
    }

    protected setCurrentHandlePosition(correctValue: number, direction: SliderDirection): void {
        let position = (100*(correctValue - this.model.options.minVal))/(this.model.options.maxVal-this.model.options.minVal);
        position = this.getCorrectPosition({
            position: position,
            maxHandlePosition: this.view.getMaxHandlePosition(),
            isForView: true,
            direction: direction
        });
        this.view.setHandlePosition(position, direction);
    }

    protected optionsChanged(): void{        
        this.view.reinitialization({
            isHorizontal: this.model.options.isHorizontal,
            isRange: this.model.options.isRange,
            isRangeLineEnabled: this.model.options.isRangeLineEnabled,
            isVisibleCurrentValue: this.model.options.isVisibleCurrentValue,
        });
        this.initViewComponents();
    }

    protected getCorrectCurrentVal(correctValue: number, direction: SliderDirection): number[]{
        let current = this.model.options.currentVal;
        if(this.model.options.isRange){
            if(SliderDirection.isFrom(direction)){
                current[0] = correctValue;
            } else {
                current[1] = correctValue;
            }
        } else {
            current[0] = correctValue;
        }
        return current;
    }

    public sliderHandleChangedPosition(direction: SliderDirection): void {
        let currentVal = this.getCurrentValFromPosition(direction);
        let correctVal = this.model.getCorrectValWithStep(currentVal);
        let current = this.getCorrectCurrentVal(correctVal, direction);
        this.setCurrentValueModel(current);
        let currentValFromPosition = this.getCurrentValFromPosition(direction);
        if(correctVal != currentValFromPosition){
            this.setCurrentHandlePosition(correctVal, direction);
        }        
    }

    @bind 
    public setNewOptions(options: ISliderOptions): void{
        this.model.setNewOptions(options);
    }

    @bind
    public getOptions(): ISliderOptions{
        return this.model.options;
    }

    @bind
    public onCurrentValueChanged(callBack: Function): void{
        this.model.changeCurrentValueEvent.on((data) => {
            callBack(data);
        })
    }
}