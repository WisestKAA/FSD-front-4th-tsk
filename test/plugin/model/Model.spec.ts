import { Model } from "../../../src/plugin/model/Model";
import { ISliderOptions } from "../../../src/plugin/model/ISliderOptions";

describe('Check Model', () => {
    let model = new Model();

    it('After initialization options must be defined', () => {
        expect(model.options).toBeDefined();
    });

    it('If the options are empty - the model should have default options', () => {
        expect(model.options).toBe(model.defaultOption);
    });

    it('The current value must be between the minimum value and the maximum value', () => {
        let sub = model.defaultOption.minVal - 1;
        let over = model.defaultOption.maxVal + 1;
        let normal = Math.max(model.defaultOption.minVal, model.defaultOption.maxVal) / 2;

        let subOptions = {isHorizontal: true, minVal: 0, maxVal: 100, currentVal: sub} as ISliderOptions;
        let overOptions = {isHorizontal: true, minVal: 0, maxVal: 100, currentVal: over} as ISliderOptions;
        let normalOptions = {isHorizontal: true, minVal: 0, maxVal: 100, currentVal: normal} as ISliderOptions;
        
        expect(model.checkCurrentVal(subOptions)).toBe(subOptions.minVal);
        expect(model.checkCurrentVal(overOptions)).toBe(overOptions.maxVal);
        expect(model.checkCurrentVal(normalOptions)).toBeGreaterThanOrEqual(subOptions.minVal);
        expect(model.checkCurrentVal(normalOptions)).toBeLessThanOrEqual(subOptions.maxVal);
    });

    it("Function setCurrentValue should change the current value and trigger event onCurrentValueChanged", () => {
        let spy = spyOn(model.onCurrentValueChanged, "trigger");
        model.setCurrentValue(10);
        expect(model.options.currentVal).toBe(10);
        expect(spy).toHaveBeenCalled();
    });

    it("Function getMaxValue must return options.maxVal", () => {
        expect(model.getMaxValue()).toBe(model.options.maxVal);
    });
});