export abstract class AbstractElement{
    abstract $elem: JQuery<HTMLElement>;

    constructor(){

    }

    abstract init(): void ;
    abstract getReadyElement(): JQuery<HTMLElement>;
}