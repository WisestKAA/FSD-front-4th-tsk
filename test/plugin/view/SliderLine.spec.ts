import { SliderLine } from "../../../src/plugin/view/SliderLine";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";

describe('Check SliderLine', () => {
    let line : SliderLine;

    beforeEach(()=>{
        line  = new SliderLine(true);
    });

    it('After initialization element must be defined', () => {
        expect(line.$elem).toBeDefined();
    });

    it('Tag of element must be DIV', () => {
        expect(line.$elem.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.LINE}'`, () => {
        expect(line.$elem.hasClass(StyleClasses.LINE)).toBeTrue();
    });

    it(`If the slider have vertical orientation - the element must have class '${StyleClasses.LINEV}'`, () => {
        let linev = new SliderLine(false);
        expect(linev.$elem.hasClass(StyleClasses.LINEV)).toBeTrue();
    });

    it("The getLineWidth function shuld return line width", () => {
        line.$elem.attr('style', 'width: 100px;')
        expect(line.getLineWidth()).toBe(100);
    });
});