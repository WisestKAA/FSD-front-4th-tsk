import { SliderWrapper } from "../../../src/plugin/view/SliderWrapper";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";

describe('Check SliderWrapper', () => {
    const wrapper = new SliderWrapper();

    it('After initialization element must be defined', () => {
        expect(wrapper.$elem).toBeDefined();
    });

    it('Tag of element must be DIV', () => {
        expect(wrapper.$elem.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.WRAPPER}'`, () => {
        expect(wrapper.$elem.hasClass(StyleClasses.WRAPPER)).toBeTrue();
    });
});