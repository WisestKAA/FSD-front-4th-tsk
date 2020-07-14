import bind from 'bind-decorator';
import { SliderDirection } from "../view/SliderDirection";
import { IView } from '../view/IView';
import { IPresenter } from './IPresenter';
import { ISliderSettings } from '../model/ISliderSettings';
import { IModel } from '../model/IModel';
import { IModelFactory } from '../model/ModelFactory';
import { IViewFactory } from '../view/ViewFactory';
import { IViewOptions } from '../view/IViewOptions';
import { ElementsFactory } from '../view/ElementsFactory';

export class Presenter implements IPresenter{
    protected model: IModel;
    protected view: IView;

    constructor(viewFactory: IViewFactory, modelFactory: IModelFactory){
        this.init(viewFactory, modelFactory)
        this.addEvents(); 
    }

    protected init(viewFactory: IViewFactory, modelFactory: IModelFactory): void{        
        this.model = modelFactory.build();
        let currentOptions = this.model.getOptions();
        let viewOptions: IViewOptions ={
            isHorizontal: currentOptions.isHorizontal,
            isRange: currentOptions.isRange,
            isRangeLineEnabled: currentOptions.isRangeLineEnabled,
            isVisibleCurrentValue: currentOptions.isVisibleCurrentValue,
        };
        let valuesForeScale = currentOptions.isScaleEnabled ? this.getValuesForScale({
                maxVal: currentOptions.maxVal,
                minVal: currentOptions.minVal,
                numberOfScaleMarks: currentOptions.numberOfScaleMarks
            }) : null;
        this.view = viewFactory.build(this, viewOptions, new ElementsFactory(viewOptions.isHorizontal, viewOptions.isRange), valuesForeScale);
        this.initViewComponents();
    }

    protected initViewComponents(): void{
        let options = this.model.getOptions();
        let direction = SliderDirection.getDiraction(true, options.isHorizontal);
        let correctValFrom = this.model.getCorrectValWithStep(options.currentVal[0]);
        this.setCurrentValueView([correctValFrom, 0]);
        this.setCurrentHandlePosition(correctValFrom,  direction);
        if(options.isRange){
            direction = SliderDirection.getDiraction(false, options.isHorizontal);
            let correctValTo = this.model.getCorrectValWithStep(options.currentVal[1]);
            this.setCurrentValueView([correctValFrom, correctValTo]);
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

    protected setCurrentValueModel(currentVal?: number[]): void{       
        this.model.setCurrentValue(currentVal);            
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
        let options = this.model.getOptions();
        let maxVal = options.maxVal;
        let minVal = options.minVal;
        let correctPosition = this.getCorrectPosition({
            position: this.view.getSliderHandlePosition(direction), 
            maxHandlePosition: this.view.getMaxHandlePosition(), 
            isForView: false, 
            direction: direction
        });
        
        let newCurrentVal = ((maxVal - minVal)  * correctPosition / 100) + minVal;
        let precision = Math.pow(10, options.precision);
        newCurrentVal = Math.round(newCurrentVal * precision) / precision;
        return newCurrentVal;
    }

    protected setCurrentHandlePosition(correctValue: number, direction: SliderDirection): void {
        let options = this.model.getOptions();
        let position = (100*(correctValue - options.minVal))/(options.maxVal-options.minVal);
        position = this.getCorrectPosition({
            position: position,
            maxHandlePosition: this.view.getMaxHandlePosition(),
            isForView: true,
            direction: direction
        });
        this.view.setHandlePosition(position, direction);
    }

    protected optionsChanged(): void{
        let options = this.model.getOptions(); 
        this.view.reinitialization({
            isHorizontal: options.isHorizontal,
            isRange: options.isRange,
            isRangeLineEnabled: options.isRangeLineEnabled,
            isVisibleCurrentValue: options.isVisibleCurrentValue,
        });
        this.initViewComponents();
    }

    protected getCorrectCurrentVal(correctValue: number, direction: SliderDirection): number[]{
        let options = this.model.getOptions();
        let current = options.currentVal;
        if(options.isRange){
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

    protected getValuesForScale(options: {
        minVal: number,
        maxVal: number,
        numberOfScaleMarks: number
    }): number[]{
        const {minVal, maxVal, numberOfScaleMarks} = options;
        let scaleValues = new Array<number>();
        scaleValues.push(minVal);
        if(numberOfScaleMarks === 2){
            scaleValues.push(maxVal);
        } else {
            let step = (maxVal - minVal) / (numberOfScaleMarks - 1);
            for(let i = 0; i < numberOfScaleMarks - 2; i++){
                scaleValues.push(scaleValues[i] + step);
            }
            scaleValues.push(maxVal);
        }
        return scaleValues;
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

    public scaleClicked(value: number): void{
        let options = this.model.getOptions();
        value = this.model.getCorrectValWithStep(value);

        if(!options.isRange){
            this.setCurrentValueModel([value, 0]);
            this.setCurrentHandlePosition(value, SliderDirection.getDiraction(true, options.isHorizontal));
            return;
        }

        if(value < options.currentVal[0] || value - options.currentVal[0] < options.currentVal[1] - value){
            this.setCurrentValueModel([value, options.currentVal[1]]);
            this.setCurrentHandlePosition(value, SliderDirection.getDiraction(true, options.isHorizontal));
        } else {
            this.setCurrentValueModel([options.currentVal[0], value]);
            this.setCurrentHandlePosition(value, SliderDirection.getDiraction(false, options.isHorizontal));
        }
    }

    @bind 
    public setNewOptions(options: ISliderSettings): void{
        this.model.setNewOptions(options);
    }

    @bind
    public getOptions(): ISliderSettings{
        return this.model.getOptions();
    }

    @bind
    public onCurrentValueChanged(callBack: Function): void{
        this.model.changeCurrentValueEvent.on((data) => {
            callBack(data);
        })
    }
}