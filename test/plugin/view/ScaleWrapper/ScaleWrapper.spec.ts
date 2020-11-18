import ScaleWrapper from '../../../../src/plugin/view/ScaleWrapper/ScaleWrapper';
import { IScaleItem } from '../../../../src/plugin/view/ScaleItem/ScaleItem.types';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import MockScaleItem from './MockScaleItem';
import { MockEvent } from '../../../mocks/MockEvent';

describe(
  'Test ScaleWrapper',
  () => {
    let scaleWrapper: ScaleWrapper;

    describe(
      'Test ScaleWrapper / init',
      () => {
        const items: IScaleItem[] = [];
        items.push(new MockScaleItem(0));
        items.push(new MockScaleItem(100));

        it(
          `The element must have class ${StyleClasses.SCALE_WRAPPER} if the isHorizontal property is true`,
          () => {
            scaleWrapper = new ScaleWrapper(true, items);
            expect(scaleWrapper.$elem.attr('class')).toBe(StyleClasses.SCALE_WRAPPER);
          }
        );

        it(
          `The element must have classes ${StyleClasses.SCALE_WRAPPER} and ${StyleClasses.SCALE_WRAPPER_V} if the isHorizontal property is false`,
          () => {
            scaleWrapper = new ScaleWrapper(false, items);
            expect(scaleWrapper.$elem.attr('class'))
              .toBe(`${StyleClasses.SCALE_WRAPPER} ${StyleClasses.SCALE_WRAPPER_V}`);
          }
        );

        it(
          `The element must have sub-elements with class ${StyleClasses.SCALE_ITEM}`,
          () => {
            scaleWrapper = new ScaleWrapper(false, items);
            let numItems = 0;
            const children = scaleWrapper.$elem.find(`.${StyleClasses.SCALE_ITEM}`);
            children.each(() => {
              numItems += 1;
            });
            expect(numItems).toBe(2);
          }
        );
      }
    );

    describe(
      'Test ScaleWrapper / functions',
      () => {
        it(
          'When user clicked on element from ISliderItem, the ScaleWrapper must call scaleItemClickedEvent with a value from ISliderItem',
          () => {
            const items: IScaleItem[] = [];
            const itemFrom = new MockScaleItem(0);
            const itemTo = new MockScaleItem(100);
            items.push(itemFrom);
            items.push(itemTo);
            scaleWrapper = new ScaleWrapper(true, items);
            const mockEvent = new MockEvent(scaleWrapper.scaleItemClickedEvent);
            const eventSpy = spyOn(mockEvent, 'eventHandler');
            itemFrom.$elem.click();
            expect(eventSpy).toHaveBeenCalledWith(0);
            itemTo.$elem.click();
            expect(eventSpy).toHaveBeenCalledWith(100);
          }
        );

        it(
          'The scaleItemMarkValues function must return scale mark values',
          () => {
            const items: IScaleItem[] = [];
            const itemFrom = new MockScaleItem(0);
            const itemTo = new MockScaleItem(100);
            items.push(itemFrom);
            items.push(itemTo);
            scaleWrapper = new ScaleWrapper(true, items);
            const checkItems = scaleWrapper.scaleItemMarkValues;
            expect(checkItems).toEqual([0, 100]);
          }
        );

        it(
          'The setScaleMarksPosition function must set position to scaleItems',
          () => {
            const items: IScaleItem[] = [];
            const itemFrom = new MockScaleItem(0);
            const itemTo = new MockScaleItem(100);
            items.push(itemFrom);
            items.push(itemTo);
            scaleWrapper = new ScaleWrapper(true, items);
            scaleWrapper.setScaleMarksPosition([10, 15]);
            expect(items[0].$elem.attr('style')).toBe('left: 10%');
            expect(items[1].$elem.attr('style')).toBe('left: 15%');
          }
        );

        it(
          'If the isHorizontal property is false the setScaleMarksPosition function don`t must set position to lust of scaleItems',
          () => {
            const items: IScaleItem[] = [];
            const itemFrom = new MockScaleItem(0);
            const itemTo = new MockScaleItem(100);
            items.push(itemFrom);
            items.push(itemTo);
            scaleWrapper = new ScaleWrapper(false, items);
            scaleWrapper.setScaleMarksPosition([10, 15]);
            expect(items[0].$elem.attr('style')).toBe('top: 10%');
            expect(items[1].$elem.attr('style')).toBe('');
          }
        );
      }
    );
  }
);
