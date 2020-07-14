import { AbstractElement } from "../AbstractElement/AbstractElement";
import { IScaleItem } from "./IScaleItem";
import { StyleClasses } from "../StyleClasses";

export class ScaleItem extends AbstractElement implements IScaleItem{
    public $elem: JQuery<HTMLElement>;
    protected isHorizontal: boolean;
    protected value: number;

    constructor(isHorizontal: boolean, value: number){
        super();
        this.isHorizontal = isHorizontal;
        this.value = value;
        this.init();
    }

    protected init(): void {
        let mark = this.isHorizontal ? $("<div>").addClass(StyleClasses.SCALEMARK) : $("<div>").addClass([StyleClasses.SCALEMARK, StyleClasses.SCALEMARKV]);
        let text = $("<div>").addClass(StyleClasses.SCALETEXT);
        text.html(this.value.toString());
        this.$elem = $("<div>");
        this.changeOrientation(this.isHorizontal, StyleClasses.SCALEITEM, StyleClasses.SCALEITEMV);
        this.$elem.append(mark, text);
    }
}