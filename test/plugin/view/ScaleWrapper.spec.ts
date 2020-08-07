import ScaleWrapper from '../../../src/plugin/view/ScaleWrapper/ScaleWrapper';
import IScaleItem from '../../../src/plugin/view/ScaleItem/IScaleItem';
import ILiteEvent from '../../../src/plugin/LiteEvent/ILiteEvent';
import StyleClasses from '../../../src/plugin/view/StyleClasses';
import LiteEvent from '../../../src/plugin/LiteEvent/LiteEvent';
import IScaleWrapper from '../../../src/plugin/view/ScaleWrapper/IScaleWrapper';

class MockScaleItem implements IScaleItem {
    $elem: JQuery<HTMLElement>;
    onScaleItemClicked: LiteEvent<number>;
    value: number;
    constructor (value: number) {
      this.$elem = $('<div>').addClass(StyleClasses.SCALEITEM);
      this.onScaleItemClicked = new LiteEvent<number>();
      this.value = value;
      this.$elem.click(() => {
        this.onScaleItemClicked.trigger(this.value);
      });
    }
    changeOrientation (isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void {}
    public get scaleItemClickedEvent (): ILiteEvent<number> {
      return this.onScaleItemClicked.expose();
    }
}

class MockEvent {
    wrapper: IScaleWrapper;
    constructor (wrapper: IScaleWrapper) {
      this.wrapper = wrapper;
      this.wrapper.scaleItemClickedEvent.on((val) => {
        this.eventHandler(val);
      });
    }
    eventHandler (val: number):void{}
}

describe('Test ScaleWrapper', () => {
  let scaleWrapper: ScaleWrapper;

  describe('Test ScaleWrapper / init', () => {
    const items = new Array<IScaleItem>();
    items.push(new MockScaleItem(0));
    items.push(new MockScaleItem(100));
        
    it(`The element must have class ${StyleClasses.SCALEWRAPPER} if the isHorizontal property is true`, () => {
      scaleWrapper = new ScaleWrapper(true, items);
      expect(scaleWrapper.$elem.attr('class')).toBe(StyleClasses.SCALEWRAPPER);
    });

    it(`The element must have classes ${StyleClasses.SCALEWRAPPER} and ${StyleClasses.SCALEWRAPPERV} if the isHorizontal property is false`, () => {
      scaleWrapper = new ScaleWrapper(false, items);
      expect(scaleWrapper.$elem.attr('class')).toBe(`${StyleClasses.SCALEWRAPPER} ${StyleClasses.SCALEWRAPPERV}`);
    });

    it(`The element must have subelements with class ${StyleClasses.SCALEITEM}`, () => {
      scaleWrapper = new ScaleWrapper(false, items);
      let numItems = 0;
      const childrens = scaleWrapper.$elem.find(`.${StyleClasses.SCALEITEM}`);
      childrens.each(() => {
        numItems++;
      });
      expect(numItems).toBe(2);
    });
  });

  describe('Test ScaleWrapper / functions', () => {
    it('When user cliced on element from ISliderItem, the ScaleWrapper must call scaleItemClickedEvent whith a value from ISliderItem', () => {
      const items = new Array<IScaleItem>();
      const itemFrom = new MockScaleItem(0);
      const itemTo = new MockScaleItem(100);
      items.push(itemFrom);
      items.push(itemTo);
      scaleWrapper = new ScaleWrapper(true, items);
      const mockEvent = new MockEvent(scaleWrapper);
      const eventSpy = spyOn(mockEvent, 'eventHandler');
      itemFrom.$elem.click();
      expect(eventSpy).toHaveBeenCalledWith(0);
      itemTo.$elem.click();
      expect(eventSpy).toHaveBeenCalledWith(100);
    });
  });
});
