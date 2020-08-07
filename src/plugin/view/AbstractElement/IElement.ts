import StyleClasses from '../StyleClasses';

interface IElement{
    $elem: JQuery<HTMLElement>;
    changeOrientation(
      isHorizontal: boolean,
      horizontalClass: StyleClasses,
      verticalClass: StyleClasses
    ): void;
}

export default IElement;
