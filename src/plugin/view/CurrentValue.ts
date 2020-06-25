import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";
import { SliderDirection } from "./SliderDirection";

export class CurrentValue extends AbstractElement {
    $elem: JQuery<HTMLElement>;
    $text: JQuery<HTMLElement>;
    $arrow: JQuery<HTMLElement>;
    val: number;
    isFrom: boolean;
    isHorizontal: boolean;
    
    constructor(isFrom: boolean, isHorizontal: boolean){
        super();
        this.val = 0;
        this.isFrom = isFrom;
        this.isHorizontal = isHorizontal;    
        this.init();
    }

    protected init(): void {        
        this.$text = $("<div>").addClass(StyleClasses.CURRENTVALTEXT);
        this.$text.html(`${this.val}`);
        
        let arrowStyleClass = this.isHorizontal ? StyleClasses.CURRENTVALARROW : [StyleClasses.CURRENTVALARROW, StyleClasses.CURRENTVALARROWV];
        this.$arrow = $("<div>").addClass(arrowStyleClass);

        let mainDivStyleClass = this.isHorizontal ? StyleClasses.CURRENTVAL : [StyleClasses.CURRENTVAL, StyleClasses.CURRENTVALV]
        let $mainDiv = $("<div>").addClass(mainDivStyleClass);
        $mainDiv.append(this.$text, this.$arrow);
        this.$elem = $mainDiv;        
    }

    setCurrentValue(currentValue: number): void{
        this.$text.html(`${currentValue}`);
        this.val = currentValue;
    }

    setPosition(position: number, direction: SliderDirection, handlePercent?: number, lineWidth?: number): void{
        let correctPosition = this.isHorizontal ? this.getCorrectPosition(position, handlePercent, lineWidth) : position;
        this.$elem.attr("style", `${direction}: ${correctPosition}%;`);
    }

    getCorrectPosition(position: number, handlePercent: number, lineWidth: number): number {
        let currentPercent = this.$elem.outerWidth() * 100 / lineWidth;
        let shiftPosition = (currentPercent - handlePercent) / 2;
        let currentPosition = position - shiftPosition;
        return currentPosition;
    }
}