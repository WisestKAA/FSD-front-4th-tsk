import { StyleClasses } from "../StyleClasses";

export abstract class AbstractElement{
    public abstract $elem: JQuery<HTMLElement>;
    protected abstract isHorizontal: boolean;

    constructor(){
    }

    protected abstract init(): void ;

    public changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void{
        const elem = this.$elem.get(0);
        elem.classList.remove(horizontalClass, verticalClass);
        if(isHorizontal){
            elem.classList.add(horizontalClass)
        } else {
            elem.classList.add(horizontalClass, verticalClass)
        }
        this.isHorizontal = isHorizontal;
    }
}