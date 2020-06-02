import { CurrentValue } from "../../../src/plugin/view/CurrentValue";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";

describe('Check CurrentValue', () => {
    let currentValue = new CurrentValue(0);

    it('Tag of element must be DIV', () => {
        expect(currentValue.$elem.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.CURRENT}'`, () => {
        expect(currentValue.$elem.hasClass(StyleClasses.CURRENT)).toBeTrue();
    });

    it('Value must be defined', () => {
        expect(currentValue.val).toBeDefined();
    });

    it('Inside the element must be current value', () => {
        expect(currentValue.$elem.get(0).textContent).toEqual(currentValue.val.toString());
    });


    // it('', () => {

    // });
});