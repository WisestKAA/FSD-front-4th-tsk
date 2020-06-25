import { CurrentValue } from "../../../src/plugin/view/CurrentValue";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";

describe('Check CurrentValue', () => {
    let currentValue = new CurrentValue(true, true);

    it('Tag of element must be DIV', () => {
        expect(currentValue.$elem.get(0).nodeName).toEqual('DIV');
    });

    // it(`Element must have class '${StyleClasses.CURRENT}'`, () => {
    //     expect(currentValue.$elem.hasClass(StyleClasses.CURRENT)).toBeTrue();
    // });

    it('Value must be defined', () => {
        expect(currentValue.val).toBeDefined();
    });

    // it('After initialization, the current value must be inside the element', () => {
    //     expect(currentValue.$elem.get(0).textContent).toEqual(currentValue.val[0].toString());
    // });

    // it('After changing the current value, the variable $elem & val should be changed to the current', () => {
    //     let currentValue = new CurrentValue(true, true);
    //     currentValue.setCurrentValue([5,0], false);
    //     expect(currentValue.$elem.html()).toBe('5');
    //     expect(currentValue.val).toEqual([5,0]);
    //     currentValue.setCurrentValue([5,10], true);
    //     expect(currentValue.$elem.html()).toBe('5 - 10');
    //     expect(currentValue.val).toEqual([5,10]);
    // });
});