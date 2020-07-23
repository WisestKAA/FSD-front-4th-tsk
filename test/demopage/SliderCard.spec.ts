import { ISliderSettings } from "../../src/demopage/blocks/slider-card/ISliderSettings";
import { SliderCard } from "../../src/demopage/blocks/slider-card/slider-card";
import { IFormIntputs } from "../../src/demopage/blocks/slider-card/IFormIntputs";

class MockElement{
    $elem: JQuery<HTMLElement>;
    $slider: JQuery<HTMLElement>;
    $currentValue: JQuery<HTMLElement>;
    $minVal: JQuery<HTMLElement>;
    $maxVal: JQuery<HTMLElement>;
    $step: JQuery<HTMLElement>;
    $numOfScaleMark: JQuery<HTMLElement>;
    $horizontal: JQuery<HTMLElement>;
    $range: JQuery<HTMLElement>;
    $visibleCurrentValue: JQuery<HTMLElement>;
    $rangeLine: JQuery<HTMLElement>;
    $scale: JQuery<HTMLElement>;
    defOpt = {
        currentVal: [0, 0],
        minVal: 0,
        maxVal: 100,
        step: 1,
        numberOfScaleMarks: 2,
        isHorizontal: true,
        isRange: false,
        isVisibleCurrentValue: true,
        isRangeLineEnabled: false,
        isScaleEnabled: false,
    };

    constructor(){
        this.$slider = $("<div>").addClass("slider-card__slider");
    }
    
    public getElement(options: {
        currentVal?: number[],
        minVal?: number,
        maxVal?: number,
        step?: number,
        numberOfScaleMarks?: number,
        isHorizontal?: boolean,
        isRange?: boolean,
        isVisibleCurrentValue?: boolean,
        isRangeLineEnabled?: boolean,
        isScaleEnabled?: boolean,
    }): JQuery<HTMLSpanElement>{
        let option = $.extend(this.defOpt, options);
        const {currentVal, minVal, maxVal, step, numberOfScaleMarks, isHorizontal, isRange, isVisibleCurrentValue, isRangeLineEnabled, isScaleEnabled} = option;
        this.$currentValue = $("<input>").addClass("text-field").attr("type", "text").attr("name","currentValue").attr("value", `${currentVal[0]} ${currentVal[1]}`);
        this.$minVal = $("<input>").addClass("text-field").attr("type", "text").attr("name","minVal").attr("value", minVal.toString());
        this.$maxVal = $("<input>").addClass("text-field").attr("type", "text").attr("name","maxVal").attr("value", maxVal.toString());
        this.$step = $("<input>").addClass("text-field").attr("type", "text").attr("name","step").attr("value", step.toString());
        this.$numOfScaleMark = $("<input>").addClass("text-field").attr("type", "text").attr("name","numOfScaleMark").attr("value", numberOfScaleMarks.toString());

        this.$horizontal = $("<input>").addClass("checkbox-button__input").attr("type", "checkbox").attr("name","horizontal");
        if(isHorizontal){
            this.$horizontal.attr("checked", "checked");
        }
        this.$range = $("<input>").addClass("checkbox-button__input").attr("type", "checkbox").attr("name","range");
        if(isRange){
            this.$range.attr("checked", "checked");
        }
        this.$visibleCurrentValue = $("<input>").addClass("checkbox-button__input").attr("type", "checkbox").attr("name","visibleCurrentValue");
        if(isVisibleCurrentValue){
            this.$visibleCurrentValue.attr("checked", "checked");
        }
        this.$rangeLine = $("<input>").addClass("checkbox-button__input").attr("type", "checkbox").attr("name","rangeLine");
        if(isRangeLineEnabled){
            this.$rangeLine.attr("checked", "checked");
        }
        this.$scale = $("<input>").addClass("checkbox-button__input").attr("type", "checkbox").attr("name","scale")
        if(isScaleEnabled){
            this.$scale.attr("checked", "checked");
        }
                
        this.$elem = $("<div>").addClass("slider-card").append(
            $("<div>").addClass("slider-card__slider-wrapper").append(
                this.$slider
            ),
            $("<form>").addClass("slider-card__form").append(
                this.$currentValue,
                this.$minVal,
                this.$maxVal,
                this.$step,
                this.$numOfScaleMark,
                this.$horizontal,
                this.$range,
                this.$visibleCurrentValue,
                this.$rangeLine,
                this.$scale        
            )
        );
        return this.$elem;
    }
}

class Presenter{
    callBack: Function;
    sliderSettings: ISliderSettings;
    constructor(sliderSettings: ISliderSettings){
        this.sliderSettings = sliderSettings;
    }
    setNewOptions(options: ISliderSettings): void{
        this.sliderSettings = options;
    }
    onCurrentValueChanged(func: Function) {this.callBack = func;}
    mockTriggerEvent(val: number[]){
        this.callBack(val);
    }
}

class MockSliderCard extends SliderCard {
    presenter: Presenter;
    constructor(elem: HTMLElement){
        super(elem);
    }

    initSlider(slider: HTMLElement, sliderSettings: ISliderSettings): void{
        this.slider = $(slider);
        this.presenter = new Presenter(sliderSettings);
        $(slider).data("presenter", this.presenter);
    }

    getOpt(): ISliderSettings{
        return this.options;
    }

    getFormInputs(): IFormIntputs{
        return this.formInputs;
    }

    getElem(): JQuery<HTMLElement>{
        return this.$elem;
    }
}

describe("Test SliderCard", () => {
    let sliderCard: MockSliderCard;

    describe("Test SliderCard / init", () => {
        it("After initialization the SliderCard must init slider with options from form elements", () => {
            let mockElem = new MockElement();
            sliderCard = new MockSliderCard(mockElem.getElement({}).get(0));
            expect(mockElem.defOpt as ISliderSettings).toEqual(sliderCard.presenter.sliderSettings);
        });

        it("After initialization the SliderCard must init slider with options from form elements (isRange=true)", () => {
            let mockElem = new MockElement();
            sliderCard = new MockSliderCard(mockElem.getElement({isRange: true}).get(0));
            expect(mockElem.defOpt as ISliderSettings).toEqual(sliderCard.presenter.sliderSettings);
        });
    });

    describe("Test SliderCard / functions", () => {
        let mockElem = new MockElement();
        sliderCard = new MockSliderCard(mockElem.getElement({}).get(0));
        
        it("If the current value field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options", () => {
            let mockElem = new MockElement();
            sliderCard = new MockSliderCard(mockElem.getElement({}).get(0));
            sliderCard.getFormInputs().currentVal.attr("value", "5 0");
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            sliderCard.getFormInputs().currentVal.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().currentVal).toEqual([5, 0]);
        });

        it("If the minimum value field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().minVal.attr("value", "5");
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            sliderCard.getFormInputs().minVal.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().minVal).toEqual(5);
        });

        it("If the maximum value field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().maxVal.attr("value", "99");
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            sliderCard.getFormInputs().maxVal.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().maxVal).toEqual(99);
        });

        it("If the step field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().step.attr("value", "99");
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            sliderCard.getFormInputs().step.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().step).toEqual(99);
        });

        it("If the numberOfScaleMarks field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().numberOfScaleMarks.attr("value", "3");
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            sliderCard.getFormInputs().numberOfScaleMarks.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().numberOfScaleMarks).toEqual(3);
        });

        it("If the isHorizontal field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().isHorizontal.checked = false;
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            $(sliderCard.getFormInputs().isHorizontal).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isHorizontal).toEqual(false);
        });

        it("If the isHorizontal field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().isHorizontal.checked = true;
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            $(sliderCard.getFormInputs().isHorizontal).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isHorizontal).toEqual(true);
        });

        it("If the isRange field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().isRange.checked = true;
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            $(sliderCard.getFormInputs().isRange).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isRange).toEqual(true);
        });

        it("If the isScaleEnabled field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().isScaleEnabled.checked = true;
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            $(sliderCard.getFormInputs().isScaleEnabled).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isScaleEnabled).toEqual(true);
        });

        it("If the isRangeLineEnabled field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().isRangeLineEnabled.checked = true;
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            $(sliderCard.getFormInputs().isRangeLineEnabled).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isRangeLineEnabled).toEqual(true);
        });

        it("If the isVisibleCurrentValue field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options", () => {
            sliderCard.getFormInputs().isVisibleCurrentValue.checked = true;
            let setNewOptionsSpy = spyOn(sliderCard.presenter, "setNewOptions");
            $(sliderCard.getFormInputs().isVisibleCurrentValue).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isVisibleCurrentValue).toEqual(true);
        });

        it("If the slider change current value, the current value fieald must change to", () => {
            let mockElem = new MockElement();
            sliderCard = new MockSliderCard(mockElem.getElement({isRange: false}).get(0));
            sliderCard.presenter.mockTriggerEvent([10,15]);
            expect(sliderCard.getOpt().currentVal).toEqual([10, 15]);
        });

        it("If the slider change current value, the current value fieald must change to (isRage=true)", () => {
            let mockElem = new MockElement();
            sliderCard = new MockSliderCard(mockElem.getElement({isRange: true}).get(0));
            sliderCard.presenter.mockTriggerEvent([10,15]);
            expect(sliderCard.getOpt().currentVal).toEqual([10, 15]);
        });

        it("If the input value is incorrect, then the inputValidation function must throw an error and display it on the form before the input element", () => {
            sliderCard.getFormInputs().maxVal.attr("value", "asd");            
            sliderCard.getFormInputs().maxVal.focusout();
            expect(sliderCard.getElem().find(".slider-card__error").html()).toBe("Invalid input! The maximum value must be a number");
        });
    });
});