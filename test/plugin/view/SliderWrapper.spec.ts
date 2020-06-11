import { SliderWrapper } from "../../../src/plugin/view/SliderWrapper";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";

describe('Check SliderWrapper', () => {
    const wrapper = new SliderWrapper(true);

    it('After initialization element must be defined', () => {
        expect(wrapper.$elem).toBeDefined();
    });

    it('Tag of element must be DIV', () => {
        expect(wrapper.$elem.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.WRAPPER}'`, () => {
        expect(wrapper.$elem.hasClass(StyleClasses.WRAPPER)).toBeTrue();
    });

    it(`If the slider have vertical orientation - the element must have class '${StyleClasses.WRAPPERV}'`, () => {
        let wrapperv = new SliderWrapper(false);
        expect(wrapperv.$elem.hasClass(StyleClasses.WRAPPERV)).toBeTrue();
    });
});