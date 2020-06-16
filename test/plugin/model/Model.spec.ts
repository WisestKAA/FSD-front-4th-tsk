import { Model } from "../../../src/plugin/model/Model";
import { ISliderOptions } from "../../../src/plugin/model/ISliderOptions";

describe('Check Model', () => {
    let model = new Model();

    it('After initialization options must be defined', () => {
        expect(model.options).toBeDefined();
        expect(model.options.isHorizontal).toBeDefined();
        expect(model.options.minVal).toBeDefined();
        expect(model.options.maxVal).toBeDefined();
        expect(model.options.currentVal).toBeDefined();
        expect(model.options.step).toBeDefined();
        expect(model.options.precision).toBeDefined();        
    });

    it("after ininialization the events must be defined", () => {
        expect(model.onOptionsChanged).toBeDefined();
        expect(model.onCurrentValueChanged).toBeDefined();
    });

    it('If the options are empty - the model should have default options', () => {
        expect(model.options).toBe(model.defaultOption);
    });

    it('The current value must be between the minimum value and the maximum value', () => {
        let sub = model.defaultOption.minVal - 1;
        let over = model.defaultOption.maxVal + 1;
        let normal = Math.max(model.defaultOption.minVal, model.defaultOption.maxVal) / 2;

        let subOptions = {isHorizontal: true, minVal: 0, maxVal: 100, currentVal: [sub, 0]} as ISliderOptions;
        let overOptions = {isHorizontal: true, minVal: 0, maxVal: 100, currentVal: [over, 0]} as ISliderOptions;
        let normalOptions = {isHorizontal: true, minVal: 0, maxVal: 100, currentVal: [normal, 0]} as ISliderOptions;
        
        expect(model.checkCurrentVal(subOptions)).toBe([subOptions.minVal, 0]);
        expect(model.checkCurrentVal(overOptions)).toBe([overOptions.maxVal, 0]);
        expect(model.checkCurrentVal(normalOptions)).toBeGreaterThanOrEqual(subOptions.minVal);
        expect(model.checkCurrentVal(normalOptions)).toBeLessThanOrEqual(subOptions.maxVal);
    });

    it("The setCurrentValue function should change the current value", () => {
        model.setCurrentValue([10, 0]);
        expect(model.options.currentVal).toBe([10, 0]);
    });

    it("The setCurrentValue function should call a trigger from onCurrentValueChanged", () => {
        let spy = spyOn(model.onCurrentValueChanged, "trigger"); 
        model.setCurrentValue([10, 0]);
        expect(spy).toHaveBeenCalled();
    });

    it("The setNewOptions function should reinitialize options", () => {
        let befor = model.options;
        model.setNewOptions({step: 123123});
        expect(befor).not.toBe(model.options);
    });

    it("The setNewOptions function should call a trigger from onOptionsChanged", () => {
        let spy = spyOn(model.onOptionsChanged, "trigger");        
        model.setNewOptions({step: 123123});
        expect(spy).toHaveBeenCalled();
    });
});