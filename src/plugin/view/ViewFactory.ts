import { IView } from "./IView";
import { View } from "./View";
import { IPresenter } from "../presenter/IPresenter";
import { IViewOptions } from "./IViewOptions";

export class ViewFactory implements IViewFactory{
    protected elem: HTMLElement;

    constructor(elem: HTMLElement){
        this.elem = elem;
    }

    public build(presenter: IPresenter, option: IViewOptions): IView{
        return new View(this.elem, presenter, option);
    }
}

export interface IViewFactory{
    build(presenter: IPresenter, option: IViewOptions): IView;
}