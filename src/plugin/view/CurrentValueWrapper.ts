import { AbstractElement } from "./AbstractElement";
import { CurrentValue } from "./CurrentValue";
import { StyleClasses } from "./StyleClasses";

export class CurrentValueWrapper extends AbstractElement{
    $elem: JQuery<HTMLElement>;
    valFrom: CurrentValue;
    valTo: CurrentValue;
    isHorizontal: boolean;
    isRange: boolean;

    constructor(isHorizontal: boolean, valFrom: CurrentValue, valTo?: CurrentValue){
        super();
        this.valFrom = valFrom;
        this.isHorizontal = isHorizontal;
        if(valTo){
            this.valTo = valTo;
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
        $wrapper.append(this.valFrom.$elem);
        if(this.isRange){
            $wrapper.append(this.valTo.$elem);
        }
        this.$elem = $wrapper;
    }
}