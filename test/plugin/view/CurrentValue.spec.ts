import CurrentValue from "../../../src/plugin/view/CurrentValue/CurrentValue";
import StyleClasses from "../../../src/plugin/view/StyleClasses";

describe("Test CurrentValue", () => {
    let currentValue: CurrentValue;

    describe("Test CurrentValue / init", () => {
        it(`The element must have class ${StyleClasses.CURRENTVAL} if the isHorizontal property is true`, () => {
            currentValue = new CurrentValue(true, true);
            expect(currentValue.$elem.attr("class")).toBe(StyleClasses.CURRENTVAL);
        });

        it(`The element must have classes ${StyleClasses.CURRENTVAL} and ${StyleClasses.CURRENTVALV} if the isHorizontal property is false`, () => {
            currentValue = new CurrentValue(true, false);
            expect(currentValue.$elem.attr("class")).toBe(`${StyleClasses.CURRENTVAL} ${StyleClasses.CURRENTVALV}`);
        });

        it(`The element must have subelement with class ${StyleClasses.CURRENTVALARROW} if the isHorizontal property is true`, () => {
            currentValue = new CurrentValue(true, true);
            expect(currentValue.$elem.find(`.${StyleClasses.CURRENTVALARROW}`).attr("class")).toBe(StyleClasses.CURRENTVALARROW);
        });

        it(`The element must have subelement with classes ${StyleClasses.CURRENTVALARROW} and ${StyleClasses.CURRENTVALARROWV} if the isHorizontal property  is true`, () => {
            currentValue = new CurrentValue(true, false);
            expect(currentValue.$elem.find(`.${StyleClasses.CURRENTVALARROW}`).attr("class")).toBe(`${StyleClasses.CURRENTVALARROW} ${StyleClasses.CURRENTVALARROWV}`);
        });

        it(`The element must have subelement with class ${StyleClasses.CURRENTVALTEXT}`, () => {
            currentValue = new CurrentValue(true, true);
            expect(currentValue.$elem.find(`.${StyleClasses.CURRENTVALTEXT}`).attr("class")).toBe(StyleClasses.CURRENTVALTEXT);
        });
    });

    describe("Test CurrentValue / functions", () => {
        it("The setCurrentValue function should set the current value for the currentValue property and change the text subelement of the $element", () => {
            currentValue = new CurrentValue(true, true);
            currentValue.setCurrentValue(10);
            expect(currentValue.getCurrentValue()).toBe(10);
            expect(currentValue.$elem.find(`.${StyleClasses.CURRENTVALTEXT}`).html()).toBe("10");
        });

        it("The setPosition function must set the position for the $element and check the position if the isHorizontal property is true", () => {
            currentValue = new CurrentValue(true, true);
            currentValue.setPosition(90, 10, 100, false);
            expect(currentValue.getCurrentValuePosition()).toBe(95);
        });

        it("The setPosition function must set the position for the $element and don't check the position if the isCorrect property is true", () => {
            currentValue = new CurrentValue(true, true);
            currentValue.setPosition(90, 10, 100, true);
            expect(currentValue.getCurrentValuePosition()).toBe(90);
        });

        it("The getCurrentValueSize function must return $element width if the isHorizontal property is true", () => {
            currentValue = new CurrentValue(true, true);
            currentValue.$elem.attr("style", "width: 100px;");
            $(document.body).append(currentValue.$elem);
            expect(currentValue.getCurrentValueSize()).toBe(100);            
        });

        it("The getCurrentValueSize function must return $element height if the isHorizontal property is false", () => {
            currentValue = new CurrentValue(true, false);
            currentValue.$elem.attr("style", "height: 100px;");
            $(document.body).append(currentValue.$elem);
            expect(currentValue.getCurrentValueSize()).toBe(100);            
        });
    });
});