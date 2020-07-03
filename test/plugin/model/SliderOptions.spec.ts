import { SliderOptions } from "../../../src/plugin/model/SliderOptions/SliderOptions";

describe('Check SliderOptions', () => {
    const sliderOptions = new SliderOptions({
        isHorizontal: true,
        minVal: 0,
        maxVal: 100,
        currentVal: new Array(0, 0),
        step: 1,
        precision: 0,
        isRange: true,
        isRangeLineEnabled: false
    });

    it('All parametrs must be defined', () => {
        expect(sliderOptions.isHorizontal).toBeDefined();
        expect(sliderOptions.minVal).toBeDefined();
        expect(sliderOptions.maxVal).toBeDefined();
        expect(sliderOptions.currentVal).toBeDefined();
        expect(sliderOptions.step).toBeDefined();
        expect(sliderOptions.precision).toBeDefined();
        expect(sliderOptions.isRange).toBeDefined();
        expect(sliderOptions.isRangeLineEnabled).toBeDefined();
    });
});