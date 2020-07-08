import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import { View } from "../../../src/plugin/view/View";
import { IPresenter } from "../../../src/plugin/presenter/IPresenter";
import { SliderDirection } from "../../../src/plugin/view/SliderDirection";
import { IViewOptions } from "../../../src/plugin/view/IViewOptions";
import { ICurrentValueWrapper } from "../../../src/plugin/view/CurrentValueWrapper/ICurrentValueWrapper";
import { ISliderMainWrapper } from "../../../src/plugin/view/SliderMainWrapper/ISliderMainWrapper";

class MockPresenter implements IPresenter{
    constructor(){}
    sliderHandleChangedPosition(direction: SliderDirection): void {}    
}

class MockView extends View{
    constructor(elem: HTMLElement, presenter: IPresenter, option: IViewOptions){
        super(elem, presenter, option);        
    }
    getCurrentValueWrapper(): ICurrentValueWrapper{
        return this.currentValueWrapper;
    }
    getMainWrapper(): ISliderMainWrapper{
        return this.mainWrapper;
    }
    getOptions():IViewOptions{
        return this.options;
    }
    init(){
        super.init();
    }
    addEvents(){
        super.addEvents();
    }
}

describe("Test View", () => {
    let view: View;    
    let presenter: MockPresenter;

    describe("Test View / init", () => {
        it(`The element must have class ${StyleClasses.SLIDER} if the isHorizontal property is true`, () => {
            let elem = $("<div>").get(0);
            view = new View(elem, new MockPresenter(), {isHorizontal: true, isRange: false, isRangeLineEnabled: false, isVisibleCurrentValue: false});
            expect(view.slider.find(`.${StyleClasses.SLIDER}`).attr("class")).toBe(StyleClasses.SLIDER);
        });

        it(`The element must have classes ${StyleClasses.SLIDER} and ${StyleClasses.SLIDERV} if the isHorizontal property is false`, () => {
            let elem = $("<div>").get(0);
            view = new View(elem, new MockPresenter(), {isHorizontal: false, isRange: false, isRangeLineEnabled: false, isVisibleCurrentValue: false});
            expect(view.slider.find(`.${StyleClasses.SLIDER}`).attr("class")).toBe(`${StyleClasses.SLIDER} ${StyleClasses.SLIDERV}`);
        });

        it(`The element must have have subelement with class ${StyleClasses.CURRENTVALWRAPPER} if the isHorizontal property is true`, () => {
            let elem = $("<div>").get(0);
            view = new View(elem, new MockPresenter(), {isHorizontal: true, isRange: true, isRangeLineEnabled: false, isVisibleCurrentValue: false});
            expect(view.slider.find(`.${StyleClasses.CURRENTVALWRAPPER}`).attr("class")).toBe(StyleClasses.CURRENTVALWRAPPER);
        });

        it(`The element must have have subelement with classes ${StyleClasses.CURRENTVALWRAPPER} and ${StyleClasses.CURRENTVALWRAPPERV} if the isHorizontal property is false`, () => {
            let elem = $("<div>").get(0);
            view = new View(elem, new MockPresenter(), {isHorizontal: false, isRange: false, isRangeLineEnabled: true, isVisibleCurrentValue: false});
            expect(view.slider.find(`.${StyleClasses.CURRENTVALWRAPPER}`).attr("class")).toBe(`${StyleClasses.CURRENTVALWRAPPER} ${StyleClasses.CURRENTVALWRAPPERV}`);
        });
    });

    describe("Test View / functions", () => {
        it("The getSliderHandlePosition function must call the getSliderHandlePosition function from mainWrapper", () => {
            let elem = $("<div>").get(0);
            let view = new MockView(elem, new MockPresenter(), {isHorizontal: false, isRange: false, isRangeLineEnabled: true, isVisibleCurrentValue: false});
            let mainWrapper = view.getMainWrapper();
            let spy = spyOn(mainWrapper, "getSliderHandlePosition");
            view.getSliderHandlePosition(SliderDirection.BOTTOM);
            expect(spy).toHaveBeenCalledWith(SliderDirection.BOTTOM);
        });

        it("The setCurrentValue function must call the setCurrentValue function from currentValueWrapper", () => {
            let elem = $("<div>").get(0);
            let view = new MockView(elem, new MockPresenter(), {isHorizontal: false, isRange: false, isRangeLineEnabled: true, isVisibleCurrentValue: false});
            let currentValueWrapper = view.getCurrentValueWrapper();
            let spy = spyOn(currentValueWrapper, "setCurrentValue");
            view.setCurrentValue([0, 0]);
            expect(spy).toHaveBeenCalledWith([0, 0]);
        });

        it("The getCurrentValue function must call the getCurrentValue function from currentValueWrapper", () => {
            let elem = $("<div>").get(0);
            let view = new MockView(elem, new MockPresenter(), {isHorizontal: false, isRange: false, isRangeLineEnabled: true, isVisibleCurrentValue: false});
            let currentValueWrapper = view.getCurrentValueWrapper();
            let spy = spyOn(currentValueWrapper, "getCurrentValue");
            view.getCurrentValue();
            expect(spy).toHaveBeenCalled();
        });

        it("The getMaxHandlePosition function must call the getMaxHandlePosition function from mainWrapper", () => {
            let elem = $("<div>").get(0);
            let view = new MockView(elem, new MockPresenter(), {isHorizontal: false, isRange: false, isRangeLineEnabled: true, isVisibleCurrentValue: false});
            let mainWrapper = view.getMainWrapper();
            let spy = spyOn(mainWrapper, "getMaxHandlePosition");
            view.getMaxHandlePosition();
            expect(spy).toHaveBeenCalled();
        });

        it("The setHandlePosition function must call the setHandlePosition function from mainWrapper", () => {
            let elem = $("<div>").get(0);
            let view = new MockView(elem, new MockPresenter(), {isHorizontal: false, isRange: false, isRangeLineEnabled: true, isVisibleCurrentValue: false});
            let mainWrapper = view.getMainWrapper();
            let spy = spyOn(mainWrapper, "setHandlePosition");
            view.setHandlePosition(0, SliderDirection.BOTTOM);
            expect(spy).toHaveBeenCalledWith(0, SliderDirection.BOTTOM);
        });

        it("When the handle position changed the View must call the sliderHandleChangedPosition function from presenter", () => {
            let elem = $("<div>").get(0);
            presenter = new MockPresenter();
            let view = new MockView(elem, presenter, {isHorizontal: true, isRange: false, isRangeLineEnabled: true, isVisibleCurrentValue: false});
            let spy = spyOn(presenter, "sliderHandleChangedPosition");
            view.setHandlePosition(1000, SliderDirection.LEFT);
            expect(spy).toHaveBeenCalled();
        });

        it("When the handle position changed the View must call the setCurrentValuePosition function from currentValueWrapper", () => {
            let elem = $("<div>").get(0);
            let view = new MockView(elem, new MockPresenter(), {isHorizontal: true, isRange: true, isRangeLineEnabled: true, isVisibleCurrentValue: false});
            let currentValueWrapper = view.getCurrentValueWrapper();
            let spy = spyOn(currentValueWrapper, "setCurrentValuePosition");
            view.setHandlePosition(1000, SliderDirection.RIGHT);
            expect(spy).toHaveBeenCalled();
        });

        it("The reinitialization function must clear slider, change options and call next functions: init and addEvents", () => {
            let elem = $("<div>").get(0);
            let oldOptions: IViewOptions = {
                isHorizontal: true,
                isRange: false,
                isRangeLineEnabled: false,
                isVisibleCurrentValue: true
            };
            let newOptions: IViewOptions = {
                isHorizontal: false,
                isRange: false,
                isRangeLineEnabled: true,
                isVisibleCurrentValue: true
            };
            let view = new MockView(elem, new MockPresenter(), oldOptions);
            let spySlider = spyOn(view.slider, "html");
            let spyInit = spyOn(view, "init");
            let spyAddEvents = spyOn(view, "addEvents");
            view.reinitialization(newOptions);
            expect(view.getOptions()).toEqual(newOptions);
            expect(spySlider).toHaveBeenCalled();
            expect(spyInit).toHaveBeenCalled();
            expect(spyAddEvents).toHaveBeenCalled();
        });
    });
});