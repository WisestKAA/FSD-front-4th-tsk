import { StyleClasses } from "../StyleClasses";
import { SliderDirection } from "../SliderDirection";
import { ICurrentValue } from "./ICurrentValue";

export class CurrentValue implements ICurrentValue{
    $elem: JQuery<HTMLElement>;
    protected $text: JQuery<HTMLElement>;
    protected $arrow: JQuery<HTMLElement>;
    protected val: number;
    protected isFrom: boolean;
    protected isHorizontal: boolean;
    protected position: number;
    
    constructor(isFrom: boolean, isHorizontal: boolean){
        this.val = 0;
        this.isFrom = isFrom;
        this.isHorizontal = isHorizontal;    
        this.init(isHorizontal);
    }    

    protected init(isHorizontal: boolean): void {        
        this.$text = $("<div>").addClass(StyleClasses.CURRENTVALTEXT);
        this.$text.html(`${this.val}`);
        
        this.$arrow = $("<div>");
        this.changeOrientation(isHorizontal, this.$arrow, StyleClasses.CURRENTVALARROW, StyleClasses.CURRENTVALARROWV);

        this.$elem = $("<div>");
        this.changeOrientation(isHorizontal, this.$elem, StyleClasses.CURRENTVAL, StyleClasses.CURRENTVALV);
        this.$elem.append(this.$text, this.$arrow);  
    }

    public setCurrentValue(currentValue: number): void{
        this.$text.html(`${currentValue}`);
        this.val = currentValue;
    }

    public setPosition(position: number, handlePercent?: number, lineWidth?: number, isCorrect?: boolean): void{
        let correctPosition = this.isHorizontal && !isCorrect ? this.getCorrectPosition(position, handlePercent, lineWidth) : position;
        this.position = correctPosition;
        let direction = SliderDirection.getDiraction(this.isFrom, this.isHorizontal);
        this.$elem.attr("style", `${direction}: ${correctPosition}%;`);
    }

    protected getCorrectPosition(position: number, handlePercent: number, lineWidth: number): number {
        let currentPercent = this.$elem.outerWidth() * 100 / lineWidth;
        let shiftPosition = (currentPercent - handlePercent) / 2;
        let currentPosition = position - shiftPosition;
        return currentPosition;
    }

    public getCurrentValueSize(): number{
        if(this.isHorizontal){
            return this.$elem.outerWidth();
        } else {
            return this.$elem.outerHeight();
        }
    }

    public getCurrentValue(): number{
        return this.val;
    }

    public getCurrentValuePosition(): number {
        return this.position;
    }

    public changeOrientation(isHorizontal: boolean, $elem: JQuery<HTMLElement>, horizontalClass: StyleClasses, verticalClass: StyleClasses): void{        
        let elem = $elem.get(0);
        elem.classList.remove(horizontalClass, verticalClass);
        if(isHorizontal){
            elem.classList.add(horizontalClass)
        } else {
            elem.classList.add(horizontalClass, verticalClass)
        }
    }
}