import { StyleClasses } from "../StyleClasses";

export abstract class AbstractElement{
    abstract $elem: JQuery<HTMLElement>;

    constructor(){
    }

    protected abstract init(): void ;

    public changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void{
        let elem = this.$elem.get(0);
        elem.classList.remove(horizontalClass, verticalClass);
        if(isHorizontal){
            elem.classList.add(horizontalClass)
        } else {
            elem.classList.add(horizontalClass, verticalClass)
        }
    }
}