import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";

export class CurrentValue extends AbstractElement {
    $elem: JQuery<HTMLElement>;
    val: number;
    
    constructor(value: number){
        super();
        this.val = value;    
        this.init();
    }

    protected init(): void {
        let $val: JQuery<HTMLElement> = $('<div>').addClass(StyleClasses.CURRENT);
        $val.html(`${this.val}`);
        this.$elem = $val;
    }
}