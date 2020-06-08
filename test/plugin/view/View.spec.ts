import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import { Presenter } from "../../../src/plugin/presenter/Presenter";
import { View } from "../../../src/plugin/view/View";

describe('Check View', () => {
    let elem = $('<div class="slider" style="width: 100px"></div>');
    let view : View;

    beforeEach(() => {        
        let presenter = new Presenter(elem.get(0));
        view = presenter.view;
    });

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

    it("The getSliderHandleLeftPosition function shuld return the current hadle position", () => {
        expect(view.getSliderHandleLeftPosition()).toBe(view.handle.position);
    });

    it("The setCurrentValue function should change the value of the variable and the contents of the element in the CurrentValue object", () => {
        let beforCurrentValueVal = view.currentValue.val;
        let beforCurrentValueElementContent = view.currentValue.$elem.html();
        view.setCurrentValue(10);
        let afterCurrentValueVal = view.currentValue.val;
        let afterCurrentValueElementContent = view.currentValue.$elem.html();
        expect(beforCurrentValueVal).not.toBe(afterCurrentValueVal);
        expect(beforCurrentValueElementContent).not.toBe(afterCurrentValueElementContent);
    });

    it("The getCurrentValue function shuld return current value", () => {
        expect(view.getCurrentValue()).toBe(view.currentValue.val);
    });

    it("The setNewSliderHandleLeftPosition function shuld change the value of the variable and the contents of the element in the SliderHandle object", () => {
        let beforSliderHandlePositionVal = view.handle.position;
        let beforSliderHandlePositionElem = view.handle.$elem.attr("style");
        view.setNewSliderHandleLeftPosition(beforSliderHandlePositionVal+1);
        let afterSliderHandlePositionVal = view.handle.position;
        let afterSliderHandlePositionElem = view.handle.$elem.attr("style");
        expect(beforSliderHandlePositionVal).not.toBe(afterSliderHandlePositionVal);
        expect(beforSliderHandlePositionElem).not.toBe(afterSliderHandlePositionElem);
    });

    it("The getLineWidth function shuld return the line width", () => {
        view.line.$elem.attr("style", "width: 100px;");
        expect(view.getLineWidth()).toBe(100);
    });
});