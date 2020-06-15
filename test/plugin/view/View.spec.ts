import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import { Presenter } from "../../../src/plugin/presenter/Presenter";
import { View } from "../../../src/plugin/view/View";
import { SliderDirection } from "../../../src/plugin/view/SliderDirection";

describe('Check View', () => {
    let view : View;

    beforeEach(() => {
        let elem = $('<div class="slider1" style="width: 100px"></div>');
        $(document.body).append(elem);        
        let presenter = new Presenter(elem.get(0));
        view = presenter.view;
    });

    afterEach(()=>{$(document.body).html("");});

    describe('Check View / check inint property', () => {
        it('After initialization the element must be defined', () => {
            expect(view.slider).toBeDefined();
        });
    
        it('After initialization the line must be defined', () => {
            expect(view.line).toBeDefined();
        });
    
        it('After initialization the handle must be defined', () => {
            expect(view.handle).toBeDefined();
        });
    
        it('After initialization the wrapper must be defined', () => {
            expect(view.wrapper).toBeDefined();
        });
    
        it('After initialization the currentValue must be defined', () => {
            expect(view.currentValue).toBeDefined();
        });
    
        it('After initialization the presenter must be defined', () => {
            expect(view.presenter).toBeDefined();
        });
    });

    describe('Check View / check inint horizontal', () => {
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

    describe('Check View / check inint vertical', () => {
        let el = $('<div class="sliderv" style="width: 100px"></div>');
        $(document.body).append(el);        
        let presenterv = new Presenter(el.get(0), {isHorizontal: false});
        let viewv = presenterv.view;

        it(`Element must have class '${StyleClasses.SLIDERV}'`, () => {
            expect(viewv.slider.get(0).firstElementChild.classList.contains(StyleClasses.SLIDERV)).toBeTrue();
        });
    });

    describe('Check View / check function', () => {
        it("The getSliderHandleLeftPosition function should return the current hadle position", () => {
            expect(view.getSliderHandlePosition()).toBe(view.handle.position);
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
    
        it("The getCurrentValue function should return current value", () => {
            expect(view.getCurrentValue()).toBe(view.currentValue.val);
        });
    
        it("The setCurrentPosition function should change the value of the variable and the contents of the element in the SliderHandle object", () => {
            let beforSliderHandlePositionVal = view.handle.position;
            let beforSliderHandlePositionElem = view.handle.$elem.attr("style");
            view.setCurrentPosition(beforSliderHandlePositionVal+1, SliderDirection.LEFT);
            let afterSliderHandlePositionVal = view.handle.position;
            let afterSliderHandlePositionElem = view.handle.$elem.attr("style");
            expect(beforSliderHandlePositionVal).not.toBe(afterSliderHandlePositionVal);
            expect(beforSliderHandlePositionElem).not.toBe(afterSliderHandlePositionElem);
        });
    
        it("The getLineWidth function should return the line width", () => {
            view.line.$elem.attr("style", "width: 100px;");
            expect(view.getLineWidth()).toBe(100);
        });

        it("The setOrientation function must change orientation in all elements", () => {
            let mainDiv = view.slider.get(0).firstElementChild.classList.value;
            let line = view.line.$elem.get(0).classList.value;
            let wrapper = view.wrapper.$elem.get(0).classList.value;
            let handle = view.handle.$elem.get(0).classList.value;
            let isHorizontal = view.handle.isHorizontal;
            view.setOrientation(!isHorizontal);
            expect(mainDiv).not.toEqual(view.slider.get(0).firstElementChild.classList.value);
            expect(line).not.toEqual(view.line.$elem.get(0).classList.value);
            expect(wrapper).not.toEqual(view.wrapper.$elem.get(0).classList.value);
            expect(handle).not.toEqual(view.handle.$elem.get(0).classList.value);
            expect(isHorizontal).not.toEqual(view.handle.isHorizontal);
        });
    });
});