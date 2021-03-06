import bind from 'bind-decorator';

import Observer from '../../Observer/Observer';
import { IObserver } from '../../Observer/Observer.types';
import { IScaleItem } from '../ScaleItem/ScaleItem.types';
import AbstractElement from '../AbstractElement/AbstractElement';
import StyleClasses from '../StyleClasses';
import { IScaleWrapper } from './ScaleWrapper.types';

class ScaleWrapper extends AbstractElement implements IScaleWrapper {
  public $elem: JQuery<HTMLElement>;

  protected isHorizontal: boolean;

  private scaleItems: IScaleItem[];

  private scaleItemsValues: number[] = [];

  private onScaleItemClicked: Observer<number>;

  constructor(isHorizontal: boolean, scaleItems: IScaleItem[]) {
    super();
    this.isHorizontal = isHorizontal;
    this.scaleItems = scaleItems;
    this.onScaleItemClicked = new Observer<number>();
    this.init();
    this.addEvents();
  }

  public get scaleItemClickedEvent(): IObserver<number> {
    return this.onScaleItemClicked.expose();
  }

  public get scaleItemMarkValues(): number[] {
    return this.scaleItemsValues;
  }

  @bind
  public setScaleMarksPosition(positions: number[]): void {
    const direction = this.isHorizontal ? 'left' : 'top';
    for (let i = 0; i < positions.length; i += 1) {
      this.scaleItems[i].$elem.attr('style', `${direction}: ${positions[i]}%`);
    }
    !this.isHorizontal && this.scaleItems[positions.length - 1].$elem.attr('style', '');
  }

  protected init(): void {
    this.$elem = $('<div>');
    this.changeOrientation(
      this.isHorizontal,
      StyleClasses.SCALE_WRAPPER,
      StyleClasses.SCALE_WRAPPER_V
    );
    this.scaleItems.forEach((value) => {
      this.$elem.append(value.$elem);
      this.scaleItemsValues.push(value.scaleMarkValue);
    });
  }

  private addEvents(): void{
    this.scaleItems.forEach((value) => {
      value.scaleItemClickedEvent.on((val) => {
        this.onScaleItemClicked.trigger(val);
      });
    });
  }
}

export default ScaleWrapper;
