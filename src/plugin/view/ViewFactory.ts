import { IView } from "./IView";
import { View } from "./View";
import { IPresenter } from "../presenter/IPresenter";
import { IViewOptions } from "./IViewOptions";
import { IElementsFactory } from "./ElementsFactory";

export class ViewFactory implements IViewFactory{
    protected elem: HTMLElement;

    constructor(elem: HTMLElement){
        this.elem = elem;
    }

    public build(presenter: IPresenter, option: IViewOptions, elementsFactory: IElementsFactory, scaleValues?: number[]): IView{
        return new View({
            elem: this.elem, 
            presenter: presenter,
            options: option,
            elementsFactory: elementsFactory,
            scaleValues: scaleValues
        });
    }
}

export interface IViewFactory{
    build(presenter: IPresenter, option: IViewOptions, elementsFactory: IElementsFactory, scaleValues?: number[]): IView;
}