import bind from 'bind-decorator';
import ISliderSettings from './ISliderSettings';
import IFormIntputs from './IFormIntputs';

class SliderCard {
    protected $elem: JQuery<HTMLElement>;

    protected $slider: JQuery<Object>;

    protected formInputs: IFormIntputs;

    protected options: ISliderSettings;

    constructor(elem: HTMLElement) {
      this.$elem = $(elem);
      this.init();
      this.addEvents();
    }

    protected init(): void{
      const $form = this.$elem.find('.js-slider-card__form');
      this.initFormInputs($form);
      this.options = this.getSliderSettings();
      const $sliderDiv = this.$elem.find('.js-slider-card__slider');
      this.initSlider($sliderDiv.get(0), this.options);
    }

    protected addEvents(): void{
      this.$slider.data('presenter').onCurrentValueChanged((val: number[]) => {
        this.handleSliderCurrentValueChanged(val);
      });

      $(this.formInputs.isHorizontal).on('change', this.handleHorizontalChanged);
      $(this.formInputs.isRange).on('change', this.handleRangeChanged);
      $(this.formInputs.isRangeLineEnabled).on('change', this.handleRangeLineEnabledChanged);
      $(this.formInputs.isScaleEnabled).on('change', this.handleScaleEnabledChanged);
      $(this.formInputs.isVisibleCurrentValue).on('change', this.handleVisibleCurrentValueChanged);

      this.formInputs.minVal.on('focusout', this.handleMinValFocusOut);
      this.formInputs.maxVal.on('focusout', this.handleMaxValFocusOut);
      this.formInputs.currentVal.on('focusout', this.handleCurrentValFocusOut);
      this.formInputs.step.on('focusout', this.handleStepFocusOut);
      this.formInputs.numberOfScaleMarks.on('focusout', this.handleNumOfScaleMarksFocusOut);
    }

    protected handleSliderCurrentValueChanged(val: number[]): void{
      if (this.formInputs.isRange.checked) {
        (<HTMLInputElement> this.formInputs.currentVal.get(0)).value = `${val[0]} ${val[1]}`;
      } else {
        (<HTMLInputElement> this.formInputs.currentVal.get(0)).value = `${val[0]}`;
      }
      this.options.currentVal = val;
    }

    @bind
    protected handleHorizontalChanged(): void{
      if (this.formInputs.isHorizontal.checked) {
        this.$slider.removeClass('slider-card__slider_vertical');
      } else {
        this.$slider.addClass('slider-card__slider_vertical');
      }
      this.optionsChanged({ isHorizontal: this.formInputs.isHorizontal.checked });
    }

    @bind
    protected handleMinValFocusOut(): void{
      this.inputValidation(
        'Invalid input! The minimum value must be a number',
        this.formInputs.minVal,
        this.options.minVal.toString(),
        () => {
          const minVal = this.getNumInputValue(this.formInputs.minVal);
          if (minVal !== this.options.minVal) {
            this.optionsChanged({ minVal });
          }
        }
      );
    }

    @bind
    protected handleMaxValFocusOut(): void{
      this.inputValidation(
        'Invalid input! The maximum value must be a number',
        this.formInputs.maxVal,
        this.options.maxVal.toString(),
        () => {
          const maxVal = this.getNumInputValue(this.formInputs.maxVal);
          if (maxVal !== this.options.maxVal) {
            this.optionsChanged({ maxVal });
          }
        }
      );
    }

    @bind
    protected handleCurrentValFocusOut(): void{
      this.inputValidation(
        'The current value must be one or two digits separated by a space',
        this.formInputs.currentVal,
        this.options.currentVal.toString(),
        () => {
          const curVal = this.formInputs.currentVal.val().toString();
          const isRange = this.formInputs.isRange.checked;
          const currentVal = this.parseCurrentValue(curVal, isRange);
          this.optionsChanged({ currentVal });
        }
      );
    }

    @bind
    protected handleStepFocusOut(): void{
      this.inputValidation(
        'Invalid input values. The step must be a number and less than maxVal - minVal',
        this.formInputs.step,
        this.options.step.toString(),
        () => {
          const step = this.getNumInputValue(this.formInputs.step);
          if (step !== this.options.step) {
            this.optionsChanged({ step });
          }
        }
      );
    }

    @bind
    protected handleNumOfScaleMarksFocusOut(): void{
      this.inputValidation(
        'Invalid input values. numberOfScaleMarks must be a number and greater than or equal to two and be an integer',
        this.formInputs.numberOfScaleMarks,
        this.options.numberOfScaleMarks.toString(),
        () => {
          const numberOfScaleMarks = this.getNumInputValue(this.formInputs.numberOfScaleMarks);
          if (numberOfScaleMarks !== this.options.numberOfScaleMarks) {
            this.optionsChanged({ numberOfScaleMarks });
          }
        }
      );
    }

    @bind
    protected handleRangeChanged(): void{
      this.optionsChanged({ isRange: this.formInputs.isRange.checked });
    }

    @bind
    protected handleRangeLineEnabledChanged(): void{
      this.optionsChanged({ isRangeLineEnabled: this.formInputs.isRangeLineEnabled.checked });
    }

    @bind
    protected handleVisibleCurrentValueChanged(): void{
      this.optionsChanged({ isVisibleCurrentValue: this.formInputs.isVisibleCurrentValue.checked });
    }

    @bind
    protected handleScaleEnabledChanged(): void{
      this.optionsChanged({ isScaleEnabled: this.formInputs.isScaleEnabled.checked });
    }

    protected getSliderSettings(): ISliderSettings {
      const curVal = this.formInputs.currentVal.val() as String;
      const isRange = this.formInputs.isRange.checked;
      const currentValue = this.parseCurrentValue(curVal, isRange);
      return {
        isHorizontal: this.formInputs.isHorizontal.checked,
        minVal: this.getNumInputValue(this.formInputs.minVal),
        maxVal: this.getNumInputValue(this.formInputs.maxVal),
        currentVal: currentValue,
        step: this.getNumInputValue(this.formInputs.step),
        isRange,
        isRangeLineEnabled: this.formInputs.isRangeLineEnabled.checked,
        isVisibleCurrentValue: this.formInputs.isVisibleCurrentValue.checked,
        isScaleEnabled: this.formInputs.isScaleEnabled.checked,
        numberOfScaleMarks: this.getNumInputValue(this.formInputs.numberOfScaleMarks)
      };
    }

    protected parseCurrentValue(curVal: String, isRange: boolean): number[] {
      curVal.trim();
      const indexSpace = curVal.indexOf(' ');
      const valFrom = curVal.slice(0, indexSpace);
      const currentValue: number[] = [];
      if (isRange) {
        const valTo = curVal.slice(indexSpace + 1, curVal.length);
        currentValue.push(Number(valFrom));
        currentValue.push(Number(valTo));
      } else {
        currentValue.push(Number(valFrom));
        currentValue.push(Number(0));
      }
      return currentValue;
    }

    protected getNumInputValue(elem: JQuery<HTMLElement>): number {
      const val = elem.val() as string;
      val.trim();
      const value = Number(val);
      if (value || value === 0) {
        return value;
      }
      throw new Error();
    }

    protected initSlider(slider: HTMLElement, sliderSettings: ISliderSettings): void{
      this.$slider = $(slider);
      $(slider).SimpleSlider(sliderSettings);
    }

    protected initFormInputs(form: JQuery<HTMLElement>): void {
      this.formInputs = {
        isHorizontal: <HTMLInputElement>form.find('input[name=horizontal]').get(0),
        minVal: form.find('input[name=minVal]'),
        maxVal: form.find('input[name=maxVal]'),
        currentVal: form.find('input[name=currentValue]'),
        step: form.find('input[name=step]'),
        isRange: <HTMLInputElement>form.find('input[name=range]').get(0),
        isRangeLineEnabled: <HTMLInputElement>form.find('input[name=rangeLine]').get(0),
        isVisibleCurrentValue: <HTMLInputElement>form
          .find('input[name=visibleCurrentValue]').get(0),
        isScaleEnabled: <HTMLInputElement>form.find('input[name=scale]').get(0),
        numberOfScaleMarks: form.find('input[name=numOfScaleMark]')
      };
    }

    protected optionsChanged(option: Object): void{
      this.$elem.find('.js-slider-card__error').remove();
      this.options = $.extend(this.options, option);
      this.$slider.data('presenter').setNewOptions(this.options);
    }

    protected inputValidation(
      errorMessage: string,
      $element: JQuery<HTMLElement>,
      oldValue: string, func: Function
    ): void{
      try {
        func();
      } catch (error) {
        $element.before(`<div class="slider-card__error js-slider-card__error">${errorMessage}</div>`);
        $element.attr('value', oldValue);
      }
    }
}

$(document).ready(() => {
  const $sliderCards = $(document).find('.js-slider-card');
  $sliderCards.each((index, element) => {
    new SliderCard(element);
  });
});

export default SliderCard;
