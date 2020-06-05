import { AbstractElement } from "./AbstractElement";
import { StyleClasses } from "./StyleClasses";
import { LiteEvent } from "../LiteEvent/LiteEvent";
import { ILiteEvent } from "../LiteEvent/ILiteEvent";

export class CurrentValue extends AbstractElement {
    $elem: JQuery<HTMLElement>;
    val: number;
    onCurrentValueChange: LiteEvent<void>;
    
    constructor(value: number){
        super();
        this.val = value;    
        this.init();
        this.onCurrentValueChange = new LiteEvent<void>();
    }

    protected init(): void {
        let $val: JQuery<HTMLElement> = $('<div>').addClass(StyleClasses.CURRENT);
        $val.html(`${this.val}`);
        this.$elem = $val;
    }

    setCurrentValue(currentValue: number): void{
        this.val = currentValue;
        this.$elem.html(`${this.val}`);
        this.onCurrentValueChange.trigger();
    }

    public get currentValueChangedEvent(): ILiteEvent<void> {return this.onCurrentValueChange.expose();}
}