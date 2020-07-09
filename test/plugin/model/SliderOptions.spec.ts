import { SliderOptions } from "../../../src/plugin/model/SliderOptions/SliderOptions";
import { ISliderSettings } from "../../../src/plugin/model/ISliderSettings";

describe("Test SliderOptions", () => {
    let options: SliderOptions;
    let defaultOption: ISliderSettings = {
        isHorizontal: true,
        maxVal: 100,
        minVal: 0,
        currentVal: new Array(0, 0),
        step: 1,
        precision: 0,
        isRange: false,
        isRangeLineEnabled: false,
        isVisibleCurrentValue: true,
    }
    
    describe("Test SliderOptions / init", () => {
        it("If the SliderOptions initial without options then the options property must be default", () => {
            options = new SliderOptions();
            expect(options.getOptions()).toEqual(defaultOption);
        });

        it("If minVal is greater than maxVal in the options, initialization must throw error", () => {
            let opt: ISliderSettings = {minVal: 100, maxVal: 99};
            expect(() => {options = new SliderOptions(opt);}).toThrowError("Invalid input values. minVal must be less than maxVal");
        });

        it("If currentVal is less than minVal in the options, then after initialization currentVal===minVal (isRange is false)", () => {
            let opt: ISliderSettings = {currentVal: [-5, 0]};
            options = new SliderOptions(opt);
            expect(options.getOptions().currentVal[0]).toBe(0);
        });        

        it("If currentVal is greater than maxVal in the options, then after initialization currentVal===maxVal (isRange is false)", () => {
            let opt: ISliderSettings = {currentVal: [101, 0]};
            options = new SliderOptions(opt);
            expect(options.getOptions().currentVal[0]).toBe(100);
        });

        it("If currentVal[0] is less than minVal in the options, then after initialization currentVal[0]===minVal (isRange is true)", () => {
            let opt: ISliderSettings = {currentVal: [-5, 0], isRange: true};
            options = new SliderOptions(opt);
            expect(options.getOptions().currentVal[0]).toBe(0);
        });

        it("If currentVal[0] is greater than maxVal in the options, then after initialization currentVal[0]===maxVal (isRange is true)", () => {
            let opt: ISliderSettings = {currentVal: [101,0], isRange: true};
            options = new SliderOptions(opt);
            expect(options.getOptions().currentVal[0]).toBe(100);
        });

        it("If currentVal[0] is greater than currentVal[1] in the options, then after initialization currentVal[0]===currentVal[1] (isRange is true)", () => {
            let opt: ISliderSettings = {currentVal: [50,0], isRange: true};
            options = new SliderOptions(opt);
            expect(options.getOptions().currentVal[0]).toBe(50);
            expect(options.getOptions().currentVal[0]).toBe(50);
        });

        it("If currentVal[1] is less than minVal in the options, then after initialization currentVal[1]===minVal (isRange is true)", () => {
            let opt: ISliderSettings = {currentVal: [0, -5], isRange: true};
            options = new SliderOptions(opt);
            expect(options.getOptions().currentVal[1]).toBe(0);
        });

        it("If currentVal[1] is greater than maxVal in the options, then after initialization currentVal[1]===maxVal (isRange is true)", () => {
            let opt: ISliderSettings = {currentVal: [0,101], isRange: true};
            options = new SliderOptions(opt);
            expect(options.getOptions().currentVal[1]).toBe(100);
        });

        it("If (step > (maxVal - minVal)) === true, then initialization must throw error", () => {
            let opt: ISliderSettings = {step: 101};
            expect(() => {options = new SliderOptions(opt);}).toThrowError("Invalid input values. The step must be less than maxVal - minVal");
        });

        it("If the precision is not intager or subzero, then initialization must throw error", () => {
            let opt: ISliderSettings = {precision: 0.5};
            expect(() => {options = new SliderOptions(opt);}).toThrowError("Invalid input values. Precision must be greater than or equal to zero and be an integer");
        });
    });

    describe("Test SliderOptions / functions", () => {
        it("The getOptions function must return current options", () => {
            options = new SliderOptions();
            expect(options.getOptions()).toEqual(defaultOption);
        });    

        it("The setCurrentValue function must set the current value for the current options", () => {
            options = new SliderOptions();
            options.setCurrentValue([10, 15]);
            expect(options.getOptions().currentVal).toEqual([10, 15]);
        });    

        it("The setNewOptions function must change the current options", () => {
            options = new SliderOptions();
            options.setNewOptions({currentVal: [10, 2], isRange: true});
            expect(options.getOptions()).not.toEqual(defaultOption);
            expect(options.getOptions().currentVal).toEqual([10, 10]);
        });  
    });
});