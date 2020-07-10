import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import { View } from "../../../src/plugin/view/View";
import { IPresenter } from "../../../src/plugin/presenter/IPresenter";
import { SliderDirection } from "../../../src/plugin/view/SliderDirection";
import { IViewOptions } from "../../../src/plugin/view/IViewOptions";
import { ICurrentValueWrapper } from "../../../src/plugin/view/CurrentValueWrapper/ICurrentValueWrapper";
import { ISliderMainWrapper } from "../../../src/plugin/view/SliderMainWrapper/ISliderMainWrapper";
import { IElementsFactory } from "../../../src/plugin/view/ElementsFactory";
import { ISliderRange } from "../../../src/plugin/view/SliderRange/ISliderRange";
import { ISliderLine } from "../../../src/plugin/view/SliderLine/ISliderLine";
import { ISliderHandle } from "../../../src/plugin/view/SliderHandle/ISliderHandle";
import { ISliderHandleWrapper } from "../../../src/plugin/view/SliderHandleWrapper/ISliderHandleWrapper";
import { ICurrentValue } from "../../../src/plugin/view/CurrentValue/ICurrentValue";
import { ISetRangeOptions } from "../../../src/plugin/view/SliderLine/ISetRangeOptions";
import { ILiteEvent } from "../../../src/plugin/LiteEvent/ILiteEvent";
import { ISetCurrentValuePositionOptions } from "../../../src/plugin/view/CurrentValueWrapper/ISetCurrentValuePositionOptions";
import { AbstractElement } from "../../../src/plugin/view/AbstractElement/AbstractElement";
import { LiteEvent } from "../../../src/plugin/LiteEvent/LiteEvent";

class MockPresenter implements IPresenter{
    constructor(){}
    sliderHandleChangedPosition(direction: SliderDirection): void {}    
}

class MockView extends View{
    constructor(elem: HTMLElement, presenter: IPresenter, options: IViewOptions){
        super({
            elem: elem,
            presenter: presenter,
            options: options,
            elementsFactory: new MockElementsFactory(options)
        });        
    }
    getCurrentValueWrapper(): ICurrentValueWrapper{return this.currentValueWrapper;}
    getMainWrapper(): ISliderMainWrapper{return this.mainWrapper;}
    getOptions():IViewOptions{return this.options;}
    init(){super.init();}
    addEvents(){super.addEvents();}
}

class MockElementsFactory implements IElementsFactory{
    options: IViewOptions;
    constructor(options: IViewOptions){this.setNewOptions(options);}
    buildRange(): ISliderRange {return new MockRange();}
    buildLine(range?: ISliderRange): ISliderLine {return new MockLine();}
    buildHandle(line: ISliderLine, isFrom: boolean): ISliderHandle {return new MockHandle()}
    buildHandleWrapper(handleFrom: ISliderHandle, handleTo?: ISliderHandle): ISliderHandleWrapper {return new MockHandleWrapper();}
    buildMainWrapper(sliderLine: ISliderLine, sliderHandleWrapper: ISliderHandleWrapper): ISliderMainWrapper {return new MockMainWrapper(this.options.isHorizontal);}
    buildCurrentValue(isFrom: boolean): ICurrentValue {return new MockCurrentValue()}
    buildCurrentValueWrapper(valueFrom: ICurrentValue, valueTo?: ICurrentValue): ICurrentValueWrapper {return new MockCurrentValueWrapper(this.options.isHorizontal);}
    setNewOptions(options: IViewOptions): void {this.options = options;}
}

class MockRange implements ISliderRange{
    $elem: JQuery<HTMLElement> = $("<div>");   
    changeRangeLineTwo(positionFrom: number, positionTo: number): void {}
    changeRangeLineOne(positionFrom: number, maxHandlePosition: number): void {}
    changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void {}
}

class MockLine implements ISliderLine{
    changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void {}
    public $elem: JQuery<HTMLElement> = $("<div>");     
    getLineSize(): number {return 100;}
    setRange(setRangeOptions: ISetRangeOptions): void {}    
}

class MockHandle implements ISliderHandle{
    setNewPosition(position: number, direction: SliderDirection): void {}
    getSliderHandleMaxPosition(): number {return 0;}
    setCurrentPosition(position: number, direction: SliderDirection): void {}
    getHandleSize(): number {return 10;}
    getPosition(): number {return 0;}
    positionChangedEvent: ILiteEvent<SliderDirection>;
    $elem: JQuery<HTMLElement> = $("<div>"); 
    changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void {}
}

class MockHandleWrapper implements ISliderHandleWrapper{
    protected onHandlePositionChanged: LiteEvent<SliderDirection>;
    constructor(){this.onHandlePositionChanged = new LiteEvent<SliderDirection>();}
    getMaxHandlePosition(): number {return 90;}
    setHandlePosition(position: number, direction: SliderDirection): void {}
    getSliderHandlePosition(direction: SliderDirection): number {return 0}
    getHandleFromPosition(): number {return 0;}
    getHandleToPosition(): number {return 0;}
    getIsRange(): boolean {return false;}
    public get handlePositionChangedEvent(): ILiteEvent<SliderDirection> {return this.onHandlePositionChanged.expose();}
    $elem: JQuery<HTMLElement> = $("<div>"); 
    changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void {}
}

class MockMainWrapper extends AbstractElement implements ISliderMainWrapper{
    protected isHorizontal: boolean;
    protected onHandlePositionChanged: LiteEvent<SliderDirection>;
    constructor(isHorizontal: boolean){
        super();
        this.isHorizontal = isHorizontal;
        this.init();
    }
    protected init(): void {
       this.$elem  = $("<div>");
       this.changeOrientation(this.isHorizontal, StyleClasses.MAINWRAPPER, StyleClasses.MAINWRAPPERV);
       this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
    }
    getSliderHandlePosition(direction: SliderDirection): number {return 0;}
    getMaxHandlePosition(): number {return 90;}
    setHandlePosition(position: number, direction: SliderDirection): void {this.onHandlePositionChanged.trigger(direction);}
    getHandleFromPosition(): number {return 0;}
    getHandleToPosition(): number {return 0;}
    getLineSize(): number {return 100;}
    public get handlePositionChangedEvent(): ILiteEvent<SliderDirection> {return this.onHandlePositionChanged.expose();}
    $elem: JQuery<HTMLElement>; 
}

class MockCurrentValue implements ICurrentValue{
    $elem: JQuery<HTMLElement>;
    setCurrentValue(currentValue: number): void {}
    getCurrentValue(): number {return 0;}
    setPosition(position: number, handlePercent?: number, lineWidth?: number, isCorrect?: boolean): void {}
    getCurrentValueSize(): number {return 5;}
    getCurrentValuePosition(): number {return 0;}
}

class MockCurrentValueWrapper extends AbstractElement implements ICurrentValueWrapper{
    protected isHorizontal: boolean;
    constructor(isHorizontal: boolean){
        super();
        this.isHorizontal = isHorizontal;
        this.init();
    }
    protected init(): void {
       this.$elem  = $("<div>");
       this.changeOrientation(this.isHorizontal, StyleClasses.CURRENTVALWRAPPER, StyleClasses.CURRENTVALWRAPPERV);
    }
    setCurrentValuePosition(setCurrentValuePositionOptions: ISetCurrentValuePositionOptions): void {}
    setCurrentValue(currentValue: number[]): void {}
    getCurrentValue(): number[] {return [0, 0];}
    $elem: JQuery<HTMLElement> = $("<div>"); 
}

describe("Test View", () => {
    let view: View;    
    let presenter: MockPresenter;

    describe("Test View / init", () => {
        it(`The element must have class ${StyleClasses.SLIDER} if the isHorizontal property is true`, () => {
            let elem = $("<div>").get(0);
            let options: IViewOptions = {isHorizontal: true, isRange: false, isRangeLineEnabled: false, isVisibleCurrentValue: false}
            view = new View({
                elem: elem,
                options: options,
                presenter: new MockPresenter(),
                elementsFactory: new MockElementsFactory(options)
            });
            expect(view.slider.find(`.${StyleClasses.SLIDER}`).attr("class")).toBe(StyleClasses.SLIDER);
        });

        it(`The element must have classes ${StyleClasses.SLIDER} and ${StyleClasses.SLIDERV} if the isHorizontal property is false`, () => {
            let elem = $("<div>").get(0);
            let options: IViewOptions = {isHorizontal: false, isRange: false, isRangeLineEnabled: false, isVisibleCurrentValue: false};
            view = new View({
                elem: elem,
                options: options,
                presenter: new MockPresenter(),
                elementsFactory: new MockElementsFactory(options)
            });
            expect(view.slider.find(`.${StyleClasses.SLIDER}`).attr("class")).toBe(`${StyleClasses.SLIDER} ${StyleClasses.SLIDERV}`);
        });

        it(`The element must have have subelement with class ${StyleClasses.CURRENTVALWRAPPER} if the isHorizontal property is true`, () => {
            let elem = $("<div>").get(0);
            let options: IViewOptions = {isHorizontal: true, isRange: true, isRangeLineEnabled: false, isVisibleCurrentValue: false};
            view = new View({
                elem: elem,
                options: options,
                presenter: new MockPresenter(),
                elementsFactory: new MockElementsFactory(options)
            });
            expect(view.slider.find(`.${StyleClasses.CURRENTVALWRAPPER}`).attr("class")).toBe(StyleClasses.CURRENTVALWRAPPER);
        });

        it(`The element must have have subelement with classes ${StyleClasses.CURRENTVALWRAPPER} and ${StyleClasses.CURRENTVALWRAPPERV} if the isHorizontal property is false`, () => {
            let elem = $("<div>").get(0);
            let options: IViewOptions = {isHorizontal: false, isRange: false, isRangeLineEnabled: true, isVisibleCurrentValue: false};
            view = new View({
                elem: elem,
                options: options,
                presenter: new MockPresenter(),
                elementsFactory: new MockElementsFactory(options)
            });
            expect(view.slider.find(`.${StyleClasses.CURRENTVALWRAPPER}`).attr("class")).toBe(`${StyleClasses.CURRENTVALWRAPPER} ${StyleClasses.CURRENTVALWRAPPERV}`);
        });

        it(`The element must have have subelement with class ${StyleClasses.MAINWRAPPER} if the isHorizontal property is true`, () => {
            let elem = $("<div>").get(0);
            let options: IViewOptions = {isHorizontal: true, isRange: true, isRangeLineEnabled: false, isVisibleCurrentValue: false};
            view = new View({
                elem: elem,
                options: options,
                presenter: new MockPresenter(),
                elementsFactory: new MockElementsFactory(options)
            });
            expect(view.slider.find(`.${StyleClasses.MAINWRAPPER}`).attr("class")).toBe(StyleClasses.MAINWRAPPER);
        });

        it(`The element must have have subelement with classes ${StyleClasses.MAINWRAPPER} and ${StyleClasses.MAINWRAPPERV} if the isHorizontal property is false`, () => {
            let elem = $("<div>").get(0);
            let options: IViewOptions = {isHorizontal: false, isRange: false, isRangeLineEnabled: true, isVisibleCurrentValue: false};
            view = new View({
                elem: elem,
                options: options,
                presenter: new MockPresenter(),
                elementsFactory: new MockElementsFactory(options)
            });
            expect(view.slider.find(`.${StyleClasses.MAINWRAPPER}`).attr("class")).toBe(`${StyleClasses.MAINWRAPPER} ${StyleClasses.MAINWRAPPERV}`);
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