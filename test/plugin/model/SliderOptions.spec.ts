import { SliderOptions } from "../../../src/plugin/model/SliderOptions";

describe('Check SliderOptions', () => {
    const sliderOptions = new SliderOptions({
        isHorizontal: true,
        minVal: 0,
        maxVal: 100,
        currentVal: 0,
    });

    it('All parametrs must be defined', () => {
        expect(sliderOptions.isHorizontal).toBeDefined();
        expect(sliderOptions.minVal).toBeDefined();
        expect(sliderOptions.maxVal).toBeDefined();
        expect(sliderOptions.currentVal).toBeDefined();
    });
});