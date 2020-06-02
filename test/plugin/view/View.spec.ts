import { View } from "../../../src/plugin/view/View";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";

describe('Check View', () => {
    let elem = $('<div class="slider" style="width: 100px"></div>');
    let view = new View(elem.get(0));

    it('After initialization element must be defined', () => {
        expect(view.slider).toBeDefined();
    });

    it('After initialization line must be defined', () => {
        expect(view.line).toBeDefined();
    });

    it('After initialization handle must be defined', () => {
        expect(view.handle).toBeDefined();
    });

    it('After initialization wrapper must be defined', () => {
        expect(view.wrapper).toBeDefined();
    });

    it('Tag of element must be DIV', () => {
        expect(view.slider.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.SLIDER}'`, () => {
        expect(view.slider.get(0).firstElementChild.classList.contains(StyleClasses.SLIDER)).toBeTrue();
    });
});