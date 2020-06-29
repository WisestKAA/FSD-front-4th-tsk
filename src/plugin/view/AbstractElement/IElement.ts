import { StyleClasses } from "../StyleClasses";

export interface IElement{
    $elem: JQuery<HTMLElement>;
    changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void;
}