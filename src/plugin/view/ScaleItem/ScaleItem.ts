import AbstractElement from '../AbstractElement/AbstractElement';
import IScaleItem from './IScaleItem';
import StyleClasses from '../StyleClasses';
import LiteEvent from '../../LiteEvent/LiteEvent';
import ILiteEvent from '../../LiteEvent/ILiteEvent';

class ScaleItem extends AbstractElement implements IScaleItem {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  protected value: number;

  protected onScaleItemClicked: LiteEvent<number>;

  constructor(isHorizontal: boolean, value: number) {
    super();
    this.isHorizontal = isHorizontal;
    this.value = value;
    this.onScaleItemClicked = new LiteEvent<number>();

    this.init();
    this.addEvents();
  }

  protected init(): void {
    const $mark = this.isHorizontal
      ? $('<div>').addClass(StyleClasses.SCALEMARK)
      : $('<div>').addClass([StyleClasses.SCALEMARK, StyleClasses.SCALEMARKV]);
    const $text = $('<div>').addClass(StyleClasses.SCALETEXT);
    $text.html(this.value.toString());
    this.$elem = $('<div>');
    this.changeOrientation(this.isHorizontal, StyleClasses.SCALEITEM, StyleClasses.SCALEITEMV);
    this.$elem.append($mark, $text);
  }

  protected addEvents(): void{
    this.$elem.click(() => {
      this.onScaleItemClicked.trigger(this.value);
    });
  }

  public get scaleItemClickedEvent(): ILiteEvent<number> {
    return this.onScaleItemClicked.expose();
  }
}

export default ScaleItem;
