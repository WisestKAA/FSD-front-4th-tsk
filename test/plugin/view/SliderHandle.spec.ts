import { SliderHandle } from "../../../src/plugin/view/SliderHandle/SliderHandle";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import { ISliderLine } from "../../../src/plugin/view/SliderLine/ISliderLine";
import { ISetRangeOptions } from "../../../src/plugin/view/SliderLine/ISetRangeOptions";

class MockSliderLine implements ISliderLine {
    $elem: JQuery<HTMLElement>;
    isHorizontal: boolean 
    
    constructor(isHorizontal: boolean){
        this.$elem = $("<div>");
        this.isHorizontal = isHorizontal;
    }
    
    getLineSize(): number {
        return 100;
    }
    setRange(setRangeOptions: ISetRangeOptions): void {
        throw new Error("Method not implemented.");
    }
    changeOrientation(isHorizontal: boolean, horizontalClass: StyleClasses, verticalClass: StyleClasses): void {
        throw new Error("Method not implemented.");
    }
    
}

describe("Test SliderHandle", () => {
    //$(document.head).append('<link href="http://localhost:8080/style.css" rel="stylesheet">');
    let handle: SliderHandle;
    let line: MockSliderLine;

    describe("Test SliderHandle / init", () => {
        it(`The element must have class ${StyleClasses.HANDLE} if the isHorizontal property is true`, () =>{
            handle = new SliderHandle({
                isHorizontal: true,
                isRange: false,
                sliderLine: new MockSliderLine(true),
                isFrom: true
            });
            expect(handle.$elem.attr("class")).toBe(StyleClasses.HANDLE);
        });

        it(`The element must have classes ${StyleClasses.HANDLE} and ${StyleClasses.HANDLEV} if the isHorizontal property is false`, () =>{
            handle = new SliderHandle({
                isHorizontal: false,
                isRange: false,
                sliderLine: new MockSliderLine(false),
                isFrom: true
            });
            expect(handle.$elem.attr("class")).toBe(`${StyleClasses.HANDLE} ${StyleClasses.HANDLEV}`);
        });
    });

    describe("Test SliderHandle / functions", () => {
        it("When click on an element, and then change the position of the mouse, the position of the element must change (LEFT)", () => {
            let isHorizontal = true;
            let line = new MockSliderLine(isHorizontal);
            line.$elem.outerWidth(100);
            handle = new SliderHandle({
                isHorizontal: isHorizontal,
                isRange: false,
                sliderLine: line,
                isFrom: true
            });
            handle.$elem.width(10);
            setFixtures(line.$elem.html());
            let eventMouseDown  = document.createEvent("MouseEvent");
            eventMouseDown.initMouseEvent("mousedown", true, true, window, 25, 25, 25, 25, 25, false, false, true, false, 0, null)
            handle.$elem.get(0).dispatchEvent(eventMouseDown);
            let eventMouseMove = document.createEvent("MouseEvent");
            eventMouseMove.initMouseEvent("mousemove", true, true, window, 1, 40, 40, 40, 40, false, false, true, false, 0, null);
            document.dispatchEvent(eventMouseMove);
            expect(handle.getPosition()).toBe(15);
        });

        it("When click on an element, and then change the position of the mouse, the position of the element must change (RIGHT)", () => {
            let isHorizontal = true;
            let line = new MockSliderLine(isHorizontal);
            line.$elem.outerWidth(100);
            handle = new SliderHandle({
                isHorizontal: isHorizontal,
                isRange: false,
                sliderLine: line,
                isFrom: false
            });
            handle.$elem.width(10);
            setFixtures(line.$elem.html());
            let eventMouseDown  = document.createEvent("MouseEvent");
            eventMouseDown.initMouseEvent("mousedown", true, true, window, 25, 25, 25, 25, 25, false, false, true, false, 0, null)
            handle.$elem.get(0).dispatchEvent(eventMouseDown);
            let eventMouseMove = document.createEvent("MouseEvent");
            eventMouseMove.initMouseEvent("mousemove", true, true, window, 1, 40, 40, 40, 40, false, false, true, false, 0, null);
            document.dispatchEvent(eventMouseMove);
            $(document).mouseup();
            expect(handle.getPosition()).toBe(85);
        });

        it("When click on an element, and then change the position of the mouse, the position of the element must change (BOTTOM)", () => {
            let isHorizontal = false;
            let line = new MockSliderLine(isHorizontal);
            line.$elem.outerHeight(100);
            handle = new SliderHandle({
                isHorizontal: isHorizontal,
                isRange: false,
                sliderLine: line,
                isFrom: true
            });
            handle.$elem.width(10);
            handle.$elem.height(10);
            setFixtures(line.$elem.html());
            let eventMouseDown  = document.createEvent("MouseEvent");
            eventMouseDown.initMouseEvent("mousedown", true, true, window, 80, 80, 80, 80, 80, false, false, true, false, 0, null)
            handle.$elem.get(0).dispatchEvent(eventMouseDown);
            let eventMouseMove = document.createEvent("MouseEvent");
            eventMouseMove.initMouseEvent("mousemove", true, true, window, 1, 40, 40, 40, 40, false, false, true, false, 0, null);
            document.dispatchEvent(eventMouseMove);
            $(document).mouseup();
            expect(handle.getPosition()).toBe(90);
        });

        it("When click on an element, and then change the position of the mouse, the position of the element must change (TOP)", () => {
            let isHorizontal = false;
            let line = new MockSliderLine(isHorizontal);
            line.$elem.outerHeight(100);
            handle = new SliderHandle({
                isHorizontal: isHorizontal,
                isRange: false,
                sliderLine: line,
                isFrom: false
            });
            handle.$elem.width(10);
            handle.$elem.height(10);
            setFixtures(line.$elem.html());
            let eventMouseDown  = document.createEvent("MouseEvent");
            eventMouseDown.initMouseEvent("mousedown", true, true, window, 60, 60, 60, 60, 60, false, false, true, false, 0, null)
            handle.$elem.get(0).dispatchEvent(eventMouseDown);
            let eventMouseMove = document.createEvent("MouseEvent");
            eventMouseMove.initMouseEvent("mousemove", true, true, window, 1, 40, 40, 40, 40, false, false, true, false, 0, null);
            document.dispatchEvent(eventMouseMove);
            $(document).mouseup();
            expect(handle.getPosition()).toBe(0);
        });

        it("", () => {

        });
    });
});