import StyleClasses from '../StyleClasses';
import SliderDirection from '../SliderDirection';
import ICurrentValue from './ICurrentValue';

class CurrentValue implements ICurrentValue {
  public $elem: JQuery<HTMLElement>;

  private $text: JQuery<HTMLElement>;

  private $arrow: JQuery<HTMLElement>;

  private val: number;

  private isFrom: boolean;

  private isHorizontal: boolean;

  private position: number;

  constructor(isFrom: boolean, isHorizontal: boolean) {
    this.val = 0;
    this.isFrom = isFrom;
    this.isHorizontal = isHorizontal;
    this.init(isHorizontal);
  }

  private init(isHorizontal: boolean): void {
    this.$text = $('<div>').addClass(StyleClasses.CURRENTVALTEXT);
    this.$text.html(`${this.val}`);

    this.$arrow = $('<div>');
    this.changeOrientation({
      isHorizontal,
      $elem: this.$arrow,
      horizontalClass: StyleClasses.CURRENTVALARROW,
      verticalClass: StyleClasses.CURRENTVALARROWV
    });

    this.$elem = $('<div>');
    this.changeOrientation({
      isHorizontal,
      $elem: this.$elem,
      horizontalClass: StyleClasses.CURRENTVAL,
      verticalClass: StyleClasses.CURRENTVALV
    });
    this.$elem.append(this.$text, this.$arrow);
  }

  public setCurrentValue(currentValue: number): void{
    this.$text.html(`${currentValue}`);
    this.val = currentValue;
  }

  public setPosition(
    position: number,
    handlePercent?: number,
    lineWidth?: number,
    isCorrect?: boolean
  ): void{
    const correctPosition = this.isHorizontal && !isCorrect
      ? this.getCorrectPosition(position, handlePercent, lineWidth)
      : position;
    this.position = correctPosition;
    const direction = SliderDirection.getDirection(this.isFrom, this.isHorizontal);
    this.$elem.attr('style', `${direction}: ${correctPosition}%;`);
  }

  private getCorrectPosition(
    position: number,
    handlePercent: number,
    lineWidth: number
  ): number {
    const currentPercent = (this.$elem.get(0).offsetWidth * 100) / lineWidth;
    const shiftPosition = (currentPercent - handlePercent) / 2;
    const currentPosition = position - shiftPosition;
    return currentPosition;
  }

  public getCurrentValueSize(): number {
    if (this.isHorizontal) {
      return this.$elem.get(0).offsetWidth;
    }
    return this.$elem.get(0).offsetHeight;
  }

  public getCurrentValue(): number {
    return this.val;
  }

  public getCurrentValuePosition(): number {
    return this.position;
  }

  public changeOrientation(options: {
    isHorizontal: boolean,
    $elem: JQuery<HTMLElement>,
    horizontalClass: StyleClasses,
    verticalClass: StyleClasses
  }): void{
    const {
      isHorizontal,
      $elem,
      horizontalClass,
      verticalClass
    } = options;
    const elem = $elem.get(0);
    elem.classList.remove(horizontalClass, verticalClass);
    isHorizontal
      ? elem.classList.add(horizontalClass)
      : elem.classList.add(horizontalClass, verticalClass);
  }
}

export default CurrentValue;
