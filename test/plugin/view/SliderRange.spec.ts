import { SliderRange } from "../../../src/plugin/view/SliderRange";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";

describe("Check SliderRange", () => {
    const range = new SliderRange(true);

    it('After initialization element must be defined', () => {
        expect(range.$elem).toBeDefined();
    });

    it('Tag of element must be DIV', () => {
        expect(range.$elem.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.RANGE}'`, () => {
        expect(range.$elem.hasClass(StyleClasses.RANGE)).toBeTrue();
    });

    it(`If the slider have vertical orientation - the element must have class '${StyleClasses.RANGEV}'`, () => {
        let rangev = new SliderRange(false);
        expect(rangev.$elem.hasClass(StyleClasses.RANGEV)).toBeTrue();
    });
});