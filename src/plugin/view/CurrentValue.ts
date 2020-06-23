import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";

export class CurrentValue extends AbstractElement {
    $elem: JQuery<HTMLElement>;
    val: number[];
    isFrom: boolean;
    isHorizontal: boolean;
    
    constructor(isFrom: boolean, isHorizontal: boolean){
        super();
        this.val = new Array(0,0);
        this.isFrom = isFrom;
        this.isHorizontal = isHorizontal;    
        this.init();
    }

    protected init(): void {
        let $val: JQuery<HTMLElement> = $('<div>').addClass(StyleClasses.CURRENT);
        $val.html(`${this.val[0]}`);
        this.$elem = $val;
    }

    setCurrentValue(currentValue: number[], isRange: boolean): void{
        if(isRange){            
            this.$elem.html(`${currentValue[0]} - ${currentValue[1]}`);
        } else {
            this.$elem.html(`${currentValue[0]}`);
        }        
        this.val = currentValue;
    }
}