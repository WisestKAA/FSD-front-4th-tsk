import bind from 'bind-decorator';

import StyleClasses from '../StyleClasses';
import SliderDirection from '../SliderDirection';
import IHint from './IHint';

class Hint implements IHint {
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

  @bind
  public setHintValue(currentValue: number): void{
    this.$text.html(`${currentValue}`);
    this.val = currentValue;
  }

  @bind
  public setHintPosition(
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

  @bind
  public getHintSize(): number {
    if (this.isHorizontal) {
      return this.$elem.get(0).offsetWidth;
    }
    return this.$elem.get(0).offsetHeight;
  }

  @bind
  public getHintValue(): number {
    return this.val;
  }

  @bind
  public getHintPosition(): number {
    return this.position;
  }

  @bind
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

  private init(isHorizontal: boolean): void {
    this.$text = $('<div>').addClass(StyleClasses.HINT_TEXT);
    this.$text.html(`${this.val}`);

    this.$arrow = $('<div>');
    this.changeOrientation({
      isHorizontal,
      $elem: this.$arrow,
      horizontalClass: StyleClasses.HINT_ARROW,
      verticalClass: StyleClasses.HINT_ARROW_V
    });

    this.$elem = $('<div>');
    this.changeOrientation({
      isHorizontal,
      $elem: this.$elem,
      horizontalClass: StyleClasses.HINT,
      verticalClass: StyleClasses.HINT_V
    });
    this.$elem.append(this.$text, this.$arrow);
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
}

export default Hint;
