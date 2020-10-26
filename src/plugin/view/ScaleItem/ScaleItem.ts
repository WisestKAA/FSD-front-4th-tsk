import LiteEvent from '../../LiteEvent/LiteEvent';
import ILiteEvent from '../../LiteEvent/ILiteEvent';
import AbstractElement from '../AbstractElement/AbstractElement';
import StyleClasses from '../StyleClasses';
import IScaleItem from './IScaleItem';

class ScaleItem extends AbstractElement implements IScaleItem {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private value: number;

  private onScaleItemClicked: LiteEvent<number>;

  constructor(isHorizontal: boolean, value: number) {
    super();
    this.isHorizontal = isHorizontal;
    this.value = value;
    this.onScaleItemClicked = new LiteEvent<number>();

    this.init();
    this.addEvents();
  }

  public get scaleItemClickedEvent(): ILiteEvent<number> {
    return this.onScaleItemClicked.expose();
  }

  protected init(): void {
    const $mark = this.isHorizontal
      ? $('<div>').addClass(StyleClasses.SCALE_MARK)
      : $('<div>').addClass([StyleClasses.SCALE_MARK, StyleClasses.SCALE_MARK_V]);
    const $text = $('<div>').addClass(StyleClasses.SCALE_TEXT);
    $text.html(this.value.toString());
    this.$elem = $('<div>');
    this.changeOrientation(this.isHorizontal, StyleClasses.SCALE_ITEM, StyleClasses.SCALE_ITEM_V);
    this.$elem.append($mark, $text);
  }

  private addEvents(): void{
    this.$elem.click(() => {
      this.onScaleItemClicked.trigger(this.value);
    });
  }
}

export default ScaleItem;
