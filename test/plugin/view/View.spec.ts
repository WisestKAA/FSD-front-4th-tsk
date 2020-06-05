import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import { Presenter } from "../../../src/plugin/presenter/Presenter";

describe('Check View', () => {
    let elem = $('<div class="slider" style="width: 100px"></div>');
    let presenter = new Presenter(elem.get(0));
    let view = presenter.view;

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

    it('After initialization currentValue must be defined', () => {
        expect(view.currentValue).toBeDefined();
    });

    it('After initialization currentValue must be defined', () => {
        expect(view.currentValue).toBeDefined();
    });

    it('Tag of element must be DIV', () => {
        expect(view.slider.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.SLIDER}'`, () => {
        expect(view.slider.get(0).firstElementChild.classList.contains(StyleClasses.SLIDER)).toBeTrue();
    });

    it(`Header with static current value must have element with class ${StyleClasses.CURRENT}`, () => {
        let $header = view.buildHeaderWithStaticCurrentValue();
        expect($header.get(0).firstElementChild.classList.contains(StyleClasses.CURRENT)).toBeTrue();
    });
});