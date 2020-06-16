import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";

export class CurrentValue extends AbstractElement {
    $elem: JQuery<HTMLElement>;
    val: number[];
    
    constructor(){
        super();
        this.val = [0, 0];    
        this.init();
    }

    protected init(): void {
        let $val: JQuery<HTMLElement> = $('<div>').addClass(StyleClasses.CURRENT);
        $val.html(`${this.val}`);
        this.$elem = $val;
    }

    setCurrentValue(currentValue: number[], isRange: boolean): void{
        if(isRange){            
            this.$elem.html(`${this.val[0]} - ${this.val[1]}`);
        } else {
            this.$elem.html(`${this.val[0]}`);
        }        
        this.val = currentValue;
    }
}