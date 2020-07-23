import { ISliderSettings } from "./ISliderSettings";
import { IFormIntputs } from "./IFormIntputs";

export class SliderCard{
    protected $elem: JQuery<HTMLElement>;
    protected slider: JQuery<Object>;
    protected formInputs: IFormIntputs;
    protected options: ISliderSettings;

    constructor(elem: HTMLElement){
        this.$elem = $(elem);
        this.init();
        this.addEvents();
    }

    protected init(): void{
        let form = this.$elem.find("form");
        this.initFormInputs(form);
        this.options = this.getSliderSettings();
        let sliderDiv = this.$elem.find(".slider-card__slider");
        this.initSlider(sliderDiv.get(0), this.options);
    }

    protected addEvents(): void{
        let that = this;
        this.slider.data("presenter").onCurrentValueChanged((val: number[]) => {
            if(this.formInputs.isRange.checked){
                (<HTMLInputElement>this.formInputs.currentVal.get(0)).value = `${val[0]} ${val[1]}`;
            } else {
                (<HTMLInputElement>this.formInputs.currentVal.get(0)).value = `${val[0]}`;
            }
            that.options.currentVal = val;
        });

        $(this.formInputs.isHorizontal).change(() => {
            if(this.formInputs.isHorizontal.checked){
                this.slider.removeClass("slider-card__slider_vertical");
            } else {
                this.slider.addClass("slider-card__slider_vertical");
            }
            this.optionsChanged({isHorizontal: this.formInputs.isHorizontal.checked});
        });
        $(this.formInputs.isRange).change(() => {
            this.optionsChanged({isRange: this.formInputs.isRange.checked});
        });
        $(this.formInputs.isRangeLineEnabled).change(() => {
            this.optionsChanged({isRangeLineEnabled: this.formInputs.isRangeLineEnabled.checked});
        });
        $(this.formInputs.isScaleEnabled).change(() => {
            this.optionsChanged({isScaleEnabled: this.formInputs.isScaleEnabled.checked});
        });
        $(this.formInputs.isVisibleCurrentValue).change(() => {
            this.optionsChanged({isVisibleCurrentValue: this.formInputs.isVisibleCurrentValue.checked});
        });

        this.formInputs.minVal.focusout(() => {            
            this.inputValidation("Invalid input! The minimum value must be a number", this.formInputs.minVal, this.options.minVal.toString(), () => {
                let minVal = this.getNumInputValue(this.formInputs.minVal);
                if(minVal !== this.options.minVal){
                    this.optionsChanged({minVal: minVal});
                }
            });            
        });   
        this.formInputs.maxVal.focusout(() => {
            this.inputValidation("Invalid input! The maximum value must be a number", this.formInputs.maxVal, this.options.maxVal.toString(), () => {
                let maxVal = this.getNumInputValue(this.formInputs.maxVal);
                if(maxVal !== this.options.maxVal){
                    this.optionsChanged({maxVal: maxVal});
                }
            });
        }); 
        this.formInputs.currentVal.focusout(() => {
            this.inputValidation("The current value must be one or two digits separated by a space", this.formInputs.currentVal, this.options.currentVal.toString(), () => {
                let curVal = this.formInputs.currentVal.val().toString();
                let isRange = this.formInputs.isRange.checked;
                let currentVal = this.parseCurrentValue(curVal, isRange);               
                this.optionsChanged({currentVal: currentVal});
            });
        }); 
        this.formInputs.step.focusout(() => {
            this.inputValidation("Invalid input values. The step must be a number and less than maxVal - minVal", this.formInputs.step, this.options.step.toString(), () => {
                let step = this.getNumInputValue(this.formInputs.step);
                if(step !== this.options.step){
                    this.optionsChanged({step: step});
                }
            });
        }); 
        this.formInputs.numberOfScaleMarks.focusout(() => {
            this.inputValidation("Invalid input values. numberOfScaleMarks must be a number and greater than or equal to two and be an integer", 
            this.formInputs.numberOfScaleMarks, this.options.numberOfScaleMarks.toString(), () => {
                let numberOfScaleMarks = this.getNumInputValue(this.formInputs.numberOfScaleMarks);
                if(numberOfScaleMarks !== this.options.numberOfScaleMarks){
                    this.optionsChanged({numberOfScaleMarks: numberOfScaleMarks});
                }
            });
        });
    }

    protected getSliderSettings(): ISliderSettings{
        let options: ISliderSettings;
        let curVal = this.formInputs.currentVal.val() as String;
        let isRange = this.formInputs.isRange.checked;            
        let currentValue = this.parseCurrentValue(curVal, isRange); 
        options = {
            isHorizontal: this.formInputs.isHorizontal.checked,
            minVal: this.getNumInputValue(this.formInputs.minVal),
            maxVal: this.getNumInputValue(this.formInputs.maxVal),
            currentVal: currentValue,
            step: this.getNumInputValue(this.formInputs.step),
            isRange: isRange,
            isRangeLineEnabled: this.formInputs.isRangeLineEnabled.checked,
            isVisibleCurrentValue: this.formInputs.isVisibleCurrentValue.checked,
            isScaleEnabled: this.formInputs.isScaleEnabled.checked,
            numberOfScaleMarks: this.getNumInputValue(this.formInputs.numberOfScaleMarks)
        }           
        return options;
    }

    protected parseCurrentValue(curVal: String, isRange: boolean): number[]{
        curVal.trim();
        let indexSpace = curVal.indexOf(" ");
        let valFrom = curVal.slice(0, indexSpace);
        let currentValue = new Array<number>();
        if(isRange){
            let valTo = curVal.slice(indexSpace + 1, curVal.length);
            currentValue.push(Number(valFrom));
            currentValue.push(Number(valTo));
        } else {
            currentValue.push(Number(valFrom));
            currentValue.push(Number(0));
        }
        return currentValue;
    }

    protected getNumInputValue(elem: JQuery<HTMLElement>): number{
        let val = elem.val() as string;
        val.trim();
        let value = Number(val);
        if(value || value === 0){                 
            return value;
        } else {     
            throw new Error();  
        }
    }

    protected initSlider(slider: HTMLElement, sliderSettings: ISliderSettings): void{
        this.slider = $(slider);
        $(slider).SimpleSlider(sliderSettings);
    }

    protected initFormInputs(form: JQuery<HTMLElement>): void {
        this.formInputs = {
            isHorizontal: <HTMLInputElement>form.find("input[name=horizontal]").get(0),
            minVal: form.find("input[name=minVal]"),
            maxVal: form.find("input[name=maxVal]"),
            currentVal: form.find("input[name=currentValue]"),
            step: form.find("input[name=step]"),
            isRange: <HTMLInputElement>form.find("input[name=range]").get(0),
            isRangeLineEnabled: <HTMLInputElement>form.find("input[name=rangeLine]").get(0),
            isVisibleCurrentValue: <HTMLInputElement>form.find("input[name=visibleCurrentValue]").get(0),
            isScaleEnabled: <HTMLInputElement>form.find("input[name=scale]").get(0),
            numberOfScaleMarks: form.find("input[name=numOfScaleMark]")
        }
    }

    protected optionsChanged(option: Object): void{
        this.$elem.find(".slider-card__error").remove();
        this.options = $.extend(this.options, option);
        this.slider.data("presenter").setNewOptions(this.options);
    }

    protected inputValidation(errorMessage: string, element: JQuery<HTMLElement>, oldValue: string, func: Function): void{
        try{
            func();
        } catch (e){
            element.before(`<div class="slider-card__error">${errorMessage}</div>`);
            element.attr("value", oldValue);
        }
    }    
}



$(document).ready(() => {
    let sliderCards = $(document).find(".slider-card");
    sliderCards.each((index, element) => {
        new SliderCard(element);
    });
});