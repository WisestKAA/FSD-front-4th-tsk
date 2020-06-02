import { SliderLine } from "../../../src/plugin/view/SliderLine";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";

describe('Check SliderLine', () => {
    let line = new SliderLine();

    it('After initialization element must be defined', () => {
        expect(line.$elem).toBeDefined();
    });

    it('Tag of element must be DIV', () => {
        expect(line.$elem.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.LINE}'`, () => {
        expect(line.$elem.hasClass(StyleClasses.LINE)).toBeTrue();
    });
});