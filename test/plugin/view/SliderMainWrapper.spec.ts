import ISliderLine from "../../../src/plugin/view/SliderLine/ISliderLine";
import ISetRangeOptions from "../../../src/plugin/view/SliderLine/ISetRangeOptions";
import StyleClasses from "../../../src/plugin/view/StyleClasses";
import ISliderHandleWrapper from "../../../src/plugin/view/SliderHandleWrapper/ISliderHandleWrapper";
import LiteEvent from "../../../src/plugin/LiteEvent/LiteEvent";
import SliderDirection from "../../../src/plugin/view/SliderDirection";
import ILiteEvent from "../../../src/plugin/LiteEvent/ILiteEvent";
import ISliderMainWrapper from "../../../src/plugin/view/SliderMainWrapper/ISliderMainWrapper";
import SliderMainWrapper from "../../../src/plugin/view/SliderMainWrapper/SliderMainWrapper";

class MockLine implements ISliderLine{
    $elem: JQuery<HTMLElement>;
    constructor(){

    }
    getLineSize(): number {
       return 100;
    }
    setRange(setRangeOptions: ISetRangeOptions): void {
       
    }
    changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void {
       
    }
}

class MockHandleWrapper implements ISliderHandleWrapper{
    $elem: JQuery<HTMLElement>;
    isRange: boolean = true;
    foromPosition: number = 10;
    toPosition: number = 10;
    protected onHandlePositionChanged: LiteEvent<SliderDirection>;
    public get handlePositionChangedEvent(): ILiteEvent<SliderDirection> {return this.onHandlePositionChanged.expose()}
    constructor(isHorizontal?: boolean){
        this.onHandlePositionChanged = new LiteEvent<SliderDirection>();
        this.$elem = isHorizontal ? $("<div>").attr("class", `${StyleClasses.HANDLEWRAPPER}`):
            $("<div>").attr("class", `${StyleClasses.HANDLEWRAPPER} ${StyleClasses.HANDLEWRAPPERV}`)
    }
    getMaxHandlePosition(): number {
        return 90;
    }
    setHandlePosition(position: number, direction: SliderDirection): void {
        this.onHandlePositionChanged.trigger(direction);
    }
    getSliderHandlePosition(direction: SliderDirection): number {
        return 10;
    }
    getHandleFromPosition(): number {
        return this.foromPosition;
    }
    getHandleToPosition(): number {
        return this.toPosition;
    }
    getIsRange(): boolean {
        return this.isRange;
    }
    changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void {
        throw new Error("Method not implemented.");
    }
}

class MockWrapperEvent{
    wrapper: ISliderMainWrapper;
    constructor(wrapper: ISliderMainWrapper){
        this.wrapper = wrapper;
        this.wrapper.handlePositionChangedEvent.on((direction) => {
            this.eventHandler(direction);
        });
    }
    eventHandler(direction: SliderDirection){

    }
}

describe("Tests SliderMainWrapper", () => {
let wrapper: SliderMainWrapper;

    describe("Tests SliderMainWrapper / init", () => {
        it(`The element must have class ${StyleClasses.MAINWRAPPER} if the isHorizontal property is true`, () => {
            wrapper = new SliderMainWrapper(true, new MockLine, new MockHandleWrapper());
            expect(wrapper.$elem.attr("class")).toBe(StyleClasses.MAINWRAPPER);
        });

        it(`The element must have classes ${StyleClasses.MAINWRAPPER} and ${StyleClasses.MAINWRAPPERV} if the isHorizontal property is false`, () => {
            wrapper = new SliderMainWrapper(false, new MockLine, new MockHandleWrapper());
            expect(wrapper.$elem.attr("class")).toBe(`${StyleClasses.MAINWRAPPER} ${StyleClasses.MAINWRAPPERV}`);
        });

        it(`The element must have subelement with class ${StyleClasses.HANDLEWRAPPER} if the isHorizontal property is true`, () => {
            wrapper = new SliderMainWrapper(true, new MockLine, new MockHandleWrapper(true));
            expect(wrapper.$elem.find(`.${StyleClasses.HANDLEWRAPPER}`).attr("class")).toBe(StyleClasses.HANDLEWRAPPER);
        });

        it(`The element must have subelement with classes ${StyleClasses.HANDLEWRAPPER} and ${StyleClasses.HANDLEWRAPPERV} if the isHorizontal property is false`, () => {
            wrapper = new SliderMainWrapper(false, new MockLine, new MockHandleWrapper(false));
            expect(wrapper.$elem.find(`.${StyleClasses.HANDLEWRAPPER}`).attr("class")).toBe(`${StyleClasses.HANDLEWRAPPER} ${StyleClasses.HANDLEWRAPPERV}`);
        });
    });

    describe("Tests SliderMainWrapper / functions", () => {
        it("The getSliderHandlePosition function must call the getSliderHandlePosition funtion from the sliderHandleWrapper", () => {
            let handleWrapper = new MockHandleWrapper();
            wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
            let spy = spyOn(handleWrapper, "getSliderHandlePosition");
            wrapper.getSliderHandlePosition(SliderDirection.LEFT);
            expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
        });

        it("The getMaxHandlePosition function must call the getMaxHandlePosition funtion from the sliderHandleWrapper", () => {
            let handleWrapper = new MockHandleWrapper();
            wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
            let spy = spyOn(handleWrapper, "getMaxHandlePosition");
            wrapper.getMaxHandlePosition();
            expect(spy).toHaveBeenCalled();
        });

        it("The setHandlePosition function must call the setHandlePosition funtion from the sliderHandleWrapper", () => {
            let handleWrapper = new MockHandleWrapper();
            wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
            let spy = spyOn(handleWrapper, "setHandlePosition");
            wrapper.setHandlePosition(0, SliderDirection.LEFT);
            expect(spy).toHaveBeenCalledWith(0, SliderDirection.LEFT);
        });

        it("The getHandleFromPosition function must call the getHandleFromPosition funtion from the sliderHandleWrapper", () => {
            let handleWrapper = new MockHandleWrapper();
            wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
            let spy = spyOn(handleWrapper, "getHandleFromPosition");
            wrapper.getHandleFromPosition();
            expect(spy).toHaveBeenCalled();
        });   

        it("The getHandleToPosition function must call the getHandleToPosition funtion from the sliderHandleWrapper", () => {
            let handleWrapper = new MockHandleWrapper();
            wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
            let spy = spyOn(handleWrapper, "getHandleToPosition");
            wrapper.getHandleToPosition();
            expect(spy).toHaveBeenCalled();
        });        

        it("The getLineSize function must call the getLineSize funtion from the sliderLine", () => {
            let line = new MockLine();
            wrapper = new SliderMainWrapper(true, line, new MockHandleWrapper());
            let spy = spyOn(line, "getLineSize");
            wrapper.getLineSize();
            expect(spy).toHaveBeenCalled();
        });   

        it("When handle change position the SliderMainWrapper must call handlePositionChangedEvent (isRange=true)", () => {
            let handleWrapper = new MockHandleWrapper();
            wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
            let mockWrapperEvent = new MockWrapperEvent(wrapper);
            let spy = spyOn(mockWrapperEvent, "eventHandler");
            handleWrapper.setHandlePosition(0, SliderDirection.LEFT);
            expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
        });

        it("When handle change position the SliderMainWrapper must call handlePositionChangedEvent (isRange=false)", () => {
            let handleWrapper = new MockHandleWrapper();
            handleWrapper.isRange = false;
            wrapper = new SliderMainWrapper(true, new MockLine(), handleWrapper);
            let mockWrapperEvent = new MockWrapperEvent(wrapper);
            let spy = spyOn(mockWrapperEvent, "eventHandler");
            handleWrapper.setHandlePosition(0, SliderDirection.LEFT);
            expect(spy).toHaveBeenCalledWith(SliderDirection.LEFT);
        });
    });
});