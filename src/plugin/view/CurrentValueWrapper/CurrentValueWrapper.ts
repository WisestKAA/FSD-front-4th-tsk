import { AbstractElement } from "../AbstractElement/AbstractElement";
import { StyleClasses } from "../StyleClasses";
import { ICurrentValue } from "../CurrentValue/ICurrentValue";
import { SliderDirection } from "../SliderDirection";
import { ISetCurrentValuePositionOptions } from "./ISetCurrentValuePositionOptions";

export class CurrentValueWrapper extends AbstractElement{
    $elem: JQuery<HTMLElement>;
    currentValueFrom: ICurrentValue;
    currentValueTo: ICurrentValue;
    isHorizontal: boolean;
    isRange: boolean;

    constructor(isHorizontal: boolean, valFrom: ICurrentValue, valTo?: ICurrentValue){
        super();
        this.currentValueFrom = valFrom;
        this.isHorizontal = isHorizontal;
        if(valTo){
            this.currentValueTo = valTo;
            this.isRange = true;
        } else {
            this.isRange = false;
        }
        this.init();
    }

    protected init(): void {
        let wrapperStyleClass = this.isHorizontal ? StyleClasses.CURRENTVALWRAPPER : 
            [StyleClasses.CURRENTVALWRAPPER, StyleClasses.CURRENTVALWRAPPERV];
        let $wrapper = $("<div>").addClass(wrapperStyleClass);
        $wrapper.append(this.currentValueFrom.$elem);
        if(this.isRange){
            $wrapper.append(this.currentValueTo.$elem);
        }
        this.$elem = $wrapper;
    }

    setCurrentValuePosition(setCurrentValuePositionOptions: ISetCurrentValuePositionOptions): void {
        switch(setCurrentValuePositionOptions.direction){
            case SliderDirection.LEFT:{
                let maxPosition = setCurrentValuePositionOptions.maxHandlePosition;
                let handlePercent = 100 - maxPosition;
                this.currentValueFrom.setPosition(setCurrentValuePositionOptions.position, handlePercent, setCurrentValuePositionOptions.lineSize);
                break;
            }
            case SliderDirection.BOTTOM:{
                this.currentValueFrom.setPosition(setCurrentValuePositionOptions.position);
                break;
            }
            case SliderDirection.RIGHT:{
                let maxPosition = setCurrentValuePositionOptions.maxHandlePosition;
                let handlePercent = 100 - maxPosition;
                this.currentValueTo.setPosition(setCurrentValuePositionOptions.position, handlePercent, setCurrentValuePositionOptions.lineSize);
                break;
            }
            case SliderDirection.TOP:{
                this.currentValueTo.setPosition(setCurrentValuePositionOptions.position);
                break;
            }
        }

        if(this.isRange){
            this.checkCurrentValueIntersection(
                setCurrentValuePositionOptions.lineSize,
                setCurrentValuePositionOptions.handleFromPosition,
                setCurrentValuePositionOptions.handleToPosition
            );
        }
    }

    checkCurrentValueIntersection(lineSize: number, handleFromPosition: number, handleToPosition: number): void{
        let currentValueFromSize = this.currentValueFrom.getCurrentValueSize() + 1;
        let currentValueToSize = this.currentValueTo.getCurrentValueSize();
        let maxSize = lineSize - currentValueFromSize - currentValueToSize;
        let maxSizePercent = maxSize * 100 / lineSize;
        let sumPosition = this.currentValueFrom.getCurrentValuePosition() + this.currentValueTo.getCurrentValuePosition();
        let precision = Math.pow(10, 10);
        maxSizePercent = Math.round(maxSizePercent * precision) / precision;
        sumPosition = Math.round(sumPosition * precision) / precision;
        if(sumPosition >= maxSizePercent){
            let shiftMiddlePosition = (100 - handleFromPosition - handleToPosition) / 2;
            let currentValueFromPercent = currentValueFromSize * 100 / lineSize;
            let currentValueToPercent = currentValueToSize * 100 / lineSize;
            let currentPositionValueFrom = handleFromPosition + shiftMiddlePosition - currentValueFromPercent;
            let currentPositionValueTo = handleToPosition + shiftMiddlePosition - currentValueToPercent;
            this.currentValueFrom.setPosition(currentPositionValueFrom, null, null, true);
            this.currentValueTo.setPosition(currentPositionValueTo, null, null, true);
        }
    }
}