import LiteEvent from '../../LiteEvent/LiteEvent';
import ILiteEvent from '../../LiteEvent/ILiteEvent';
import IScaleItem from '../ScaleItem/IScaleItem';
import AbstractElement from '../AbstractElement/AbstractElement';
import StyleClasses from '../StyleClasses';
import IScaleWrapper from './IScaleWrapper';

class ScaleWrapper extends AbstractElement implements IScaleWrapper {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private scaleItems: IScaleItem[];

  private onScaleItemClicked: LiteEvent<number>;

  constructor(isHorizontal: boolean, scaleItems: IScaleItem[]) {
    super();
    this.isHorizontal = isHorizontal;
    this.scaleItems = scaleItems;
    this.onScaleItemClicked = new LiteEvent<number>();
    this.init();
    this.addEvents();
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.SCALEWRAPPER,
      StyleClasses.SCALEWRAPPERV
    );
    this.scaleItems.forEach((value) => {
      this.$elem.append(value.$elem);
    });
  }

  private addEvents(): void{
    this.scaleItems.forEach((value) => {
      value.scaleItemClickedEvent.on((val) => {
        this.onScaleItemClicked.trigger(val);
      });
    });
  }

  public get scaleItemClickedEvent(): ILiteEvent<number> {
    return this.onScaleItemClicked.expose();
  }
}

export default ScaleWrapper;
