import { ScaleItem } from "../../../src/plugin/view/ScaleItem/ScaleItem";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import { IScaleItem } from "../../../src/plugin/view/ScaleItem/IScaleItem";

class MockEvent{
    scaleItem: IScaleItem;
    constructor(scaleItem: IScaleItem){
        this.scaleItem = scaleItem;
        this.scaleItem.scaleItemClickedEvent.on((value) => {
            this.eventHandler(value);
        });
    }
    eventHandler(val: number): void{};
}

describe("Test ScaleItem", () => {
    let scaleItem: ScaleItem;

    describe("Test ScaleItem / init", () => {
        it(`The element must have class ${StyleClasses.SCALEITEM} if the isHorizontal property is true`, () => {
            scaleItem = new ScaleItem(true, 0);
            expect(scaleItem.$elem.attr("class")).toBe(StyleClasses.SCALEITEM);
        });

        it(`The element must have classes ${StyleClasses.SCALEITEM} and ${StyleClasses.SCALEITEMV} if the isHorizontal property is false`, () => {
            scaleItem = new ScaleItem(false, 0);
            expect(scaleItem.$elem.attr("class")).toBe(`${StyleClasses.SCALEITEM} ${StyleClasses.SCALEITEMV}`);
        });
        
        it(`The element must have subelement with class ${StyleClasses.SCALEMARK} if the isHorizontal property is true`, () => {
            scaleItem = new ScaleItem(true, 0);
            expect(scaleItem.$elem.find(`.${StyleClasses.SCALEMARK}`).attr("class")).toBe(StyleClasses.SCALEMARK);
        });

        it(`The element must have subelement with classes ${StyleClasses.SCALEMARK} and ${StyleClasses.SCALEMARKV} if the isHorizontal property  is true`, () => {
            scaleItem = new ScaleItem(false, 0);
            expect(scaleItem.$elem.find(`.${StyleClasses.SCALEMARK}`).attr("class")).toBe(`${StyleClasses.SCALEMARK} ${StyleClasses.SCALEMARKV}`);
        });

        it(`The element must have subelement with class ${StyleClasses.SCALETEXT}`, () => {
            scaleItem = new ScaleItem(true, 0);
            expect(scaleItem.$elem.find(`.${StyleClasses.SCALETEXT}`).attr("class")).toBe(StyleClasses.SCALETEXT);
        });

        it(`An element with class ${StyleClasses.SCALETEXT} must have text equal to the initial value`, () => {
            scaleItem = new ScaleItem(true, 0);
            expect(scaleItem.$elem.find(`.${StyleClasses.SCALETEXT}`).html()).toBe("0");
        });
    });

    describe("Test ScaleItem / functions", () => {
        it("When user cliced on element, he must call scaleItemClickedEvent", () => {
            scaleItem = new ScaleItem(true, 0);
            let mockEvent = new MockEvent(scaleItem);
            let clickSpy = spyOn(mockEvent, "eventHandler");
            scaleItem.$elem.click();
            expect(clickSpy).toHaveBeenCalledWith(0);
        });
    });
});