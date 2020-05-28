export abstract class AbstractElement{
    abstract $elem: JQuery<HTMLElement>;

    constructor(){
    }

    protected abstract init(): void ;
}