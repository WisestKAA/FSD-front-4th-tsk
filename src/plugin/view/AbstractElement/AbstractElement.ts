import bind from 'bind-decorator';

import StyleClasses from '../StyleClasses';

abstract class AbstractElement {
  public abstract $elem: JQuery<HTMLElement>;

  protected abstract isHorizontal: boolean;

  protected abstract init(): void ;

  @bind
  public changeOrientation(
    isHorizontal: boolean,
    horizontalClass: StyleClasses,
    verticalClass: StyleClasses
  ): void{
    const elem = this.$elem.get(0);
    elem.classList.remove(horizontalClass, verticalClass);
    isHorizontal
      ? elem.classList.add(horizontalClass)
      : elem.classList.add(horizontalClass, verticalClass);
    this.isHorizontal = isHorizontal;
  }
}

export default AbstractElement;
