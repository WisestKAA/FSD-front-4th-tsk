import ScaleItem from '../../../../src/plugin/view/ScaleItem/ScaleItem';
import StyleClasses from '../../../../src/plugin/view/StyleClasses';
import { MockEvent } from '../../../mocks/MockEvent';

describe(
  'Test ScaleItem',
  () => {
    let scaleItem: ScaleItem;

    describe(
      'Test ScaleItem / init',
      () => {
        it(
          `The element must have class ${StyleClasses.SCALE_ITEM} if the isHorizontal property is true`,
          () => {
            scaleItem = new ScaleItem(true, 0);
            expect(scaleItem.$elem.attr('class')).toBe(StyleClasses.SCALE_ITEM);
          }
        );

        it(
          `The element must have classes ${StyleClasses.SCALE_ITEM} and ${StyleClasses.SCALE_ITEM_V} if the isHorizontal property is false`,
          () => {
            scaleItem = new ScaleItem(false, 0);
            expect(scaleItem.$elem.attr('class')).toBe(`${StyleClasses.SCALE_ITEM} ${StyleClasses.SCALE_ITEM_V}`);
          }
        );

        it(
          `The element must have sub-element with class ${StyleClasses.SCALE_MARK} if the isHorizontal property is true`,
          () => {
            scaleItem = new ScaleItem(true, 0);
            expect(scaleItem.$elem.find(`.${StyleClasses.SCALE_MARK}`).attr('class')).toBe(StyleClasses.SCALE_MARK);
          }
        );

        it(
          `The element must have sub-element with classes ${StyleClasses.SCALE_MARK} and ${StyleClasses.SCALE_MARK_V} if the isHorizontal property  is true`,
          () => {
            scaleItem = new ScaleItem(false, 0);
            expect(scaleItem.$elem.find(`.${StyleClasses.SCALE_MARK}`).attr('class')).toBe(`${StyleClasses.SCALE_MARK} ${StyleClasses.SCALE_MARK_V}`);
          }
        );

        it(
          `The element must have sub-element with class ${StyleClasses.SCALE_TEXT}`,
          () => {
            scaleItem = new ScaleItem(true, 0);
            expect(scaleItem.$elem.find(`.${StyleClasses.SCALE_TEXT}`).attr('class')).toBe(StyleClasses.SCALE_TEXT);
          }
        );

        it(
          `An element with class ${StyleClasses.SCALE_TEXT} must have text equal to the initial value`,
          () => {
            scaleItem = new ScaleItem(true, 0);
            expect(scaleItem.$elem.find(`.${StyleClasses.SCALE_TEXT}`).html()).toBe('0');
          }
        );
      }
    );

    describe(
      'Test ScaleItem / functions',
      () => {
        it(
          'When user clicked on element, he must call scaleItemClickedEvent',
          () => {
            scaleItem = new ScaleItem(true, 0);
            const mockEvent = new MockEvent(scaleItem.scaleItemClickedEvent);
            const clickSpy = spyOn(mockEvent, 'eventHandler');
            scaleItem.$elem.click();
            expect(clickSpy).toHaveBeenCalledWith(0);
          }
        );
      }
    );
  }
);
