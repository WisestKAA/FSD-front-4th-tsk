import bind from 'bind-decorator';
import ISliderSettings from './ISliderSettings';
import IFormInputs from './IFormInputs';

class SliderCard {
    protected $elem: JQuery<HTMLElement>;

    protected $slider: JQuery<Object>;

    protected formInputs: IFormInputs;

    protected options: ISliderSettings;

    constructor(elem: HTMLElement) {
      this.$elem = $(elem);
      this.init();
      this.addEvents();
    }

    protected initSlider(slider: HTMLElement, sliderSettings: ISliderSettings): void{
      this.$slider = $(slider);
      $(slider).SimpleSlider(sliderSettings);
    }

    private init(): void{
      const $form = this.$elem.find('.js-slider-card__form');
      this.initFormInputs($form);
      this.options = this.getSliderSettings();
      const $sliderDiv = this.$elem.find('.js-slider-card__slider');
      this.initSlider($sliderDiv.get(0), this.options);
    }

    private addEvents(): void{
      this.$slider.SimpleSlider(
        'onCurrentValueChanged',
        (val: number[]) => {
          this.handleSliderCurrentValueChanged(val);
        }
      );

      $(this.formInputs.isHorizontal).on('change', this.handleHorizontalChanged);
      $(this.formInputs.isRange).on('change', this.handleRangeChanged);
      $(this.formInputs.isRangeLineEnabled).on('change', this.handleRangeLineEnabledChanged);
      $(this.formInputs.isScaleEnabled).on('change', this.handleScaleEnabledChanged);
      $(this.formInputs.isVisibleCurrentValue).on('change', this.handleVisibleCurrentValueChanged);

      this.formInputs.minVal.on('focusout', this.handleMinValFocusOut);
      this.formInputs.minVal.on('keyup', this.handleInputEnterKeyUp);
      this.formInputs.maxVal.on('focusout', this.handleMaxValFocusOut);
      this.formInputs.maxVal.on('keyup', this.handleInputEnterKeyUp);
      this.formInputs.currentVal.on('focusout', this.handleCurrentValFocusOut);
      this.formInputs.currentVal.on('keyup', this.handleInputEnterKeyUp);
      this.formInputs.step.on('focusout', this.handleStepFocusOut);
      this.formInputs.step.on('keyup', this.handleInputEnterKeyUp);
      this.formInputs.numberOfScaleMarks.on('focusout', this.handleNumOfScaleMarksFocusOut);
      this.formInputs.numberOfScaleMarks.on('keyup', this.handleInputEnterKeyUp);
    }

    private handleSliderCurrentValueChanged(val: number[]): void{
      (<HTMLInputElement> this.formInputs.currentVal.get(0)).value = this.formInputs.isRange.checked
        ? `${val[0]} ${val[1]}`
        : `${val[0]}`;
      this.options.currentVal = val;
    }

    @bind
    private handleInputEnterKeyUp(event: JQuery.KeyUpEvent): void {
      if (event.key === 'Enter') {
        switch (event.target.name) {
        case 'minVal': {
          this.handleMinValFocusOut();
          break;
        }
        case 'maxVal': {
          this.handleMaxValFocusOut();
          break;
        }
        case 'currentValue': {
          this.handleCurrentValFocusOut();
          break;
        }
        case 'step': {
          this.handleStepFocusOut();
          break;
        }
        case 'numOfScaleMark': {
          this.handleNumOfScaleMarksFocusOut();
          break;
        }
        default: null;
        }
      }
    }

    @bind
    private handleHorizontalChanged(): void{
      this.formInputs.isHorizontal.checked
        ? this.$slider.removeClass('slider-card__slider_vertical')
        : this.$slider.addClass('slider-card__slider_vertical');
      this.optionsChanged({ isHorizontal: this.formInputs.isHorizontal.checked });
    }

    @bind
    private handleMinValFocusOut(): void{
      this.inputValidation(
        'Invalid input! The minimum value must be a number and less than max value',
        this.formInputs.minVal,
        this.options.minVal.toString(),
        () => {
          const minVal = this.getNumInputValue(this.formInputs.minVal);
          minVal !== this.options.minVal && this.optionsChanged({ minVal });
        }
      );
    }

    @bind
    private handleMaxValFocusOut(): void{
      this.inputValidation(
        'Invalid input! The maximum value must be a number',
        this.formInputs.maxVal,
        this.options.maxVal.toString(),
        () => {
          const maxVal = this.getNumInputValue(this.formInputs.maxVal);
          maxVal !== this.options.maxVal && this.optionsChanged({ maxVal });
        }
      );
    }

    @bind
    private handleCurrentValFocusOut(): void{
      this.inputValidation(
        'The current value must be one or two digits separated by a space',
        this.formInputs.currentVal,
        this.options.currentVal.join(' '),
        () => {
          const curVal = this.formInputs.currentVal.val().toString();
          const isRange = this.formInputs.isRange.checked;
          const currentVal = this.parseCurrentValue(curVal, isRange);
          this.optionsChanged({ currentVal });
        }
      );
    }

    @bind
    private handleStepFocusOut(): void{
      this.inputValidation(
        'Invalid input values. The step must be a number and less than maxVal - minVal',
        this.formInputs.step,
        this.options.step.toString(),
        () => {
          const step = this.getNumInputValue(this.formInputs.step);
          step !== this.options.step && this.optionsChanged({ step });
        }
      );
    }

    @bind
    private handleNumOfScaleMarksFocusOut(): void{
      this.inputValidation(
        'Invalid input values. numberOfScaleMarks must be a number and greater than or equal to two and be an integer',
        this.formInputs.numberOfScaleMarks,
        this.options.numberOfScaleMarks.toString(),
        () => {
          const numberOfScaleMarks = this.getNumInputValue(this.formInputs.numberOfScaleMarks);
          numberOfScaleMarks !== this.options.numberOfScaleMarks
            && this.optionsChanged({ numberOfScaleMarks });
        }
      );
    }

    @bind
    private handleRangeChanged(): void{
      this.optionsChanged({ isRange: this.formInputs.isRange.checked });
    }

    @bind
    private handleRangeLineEnabledChanged(): void{
      this.optionsChanged({ isRangeLineEnabled: this.formInputs.isRangeLineEnabled.checked });
    }

    @bind
    private handleVisibleCurrentValueChanged(): void{
      this.optionsChanged({ isVisibleCurrentValue: this.formInputs.isVisibleCurrentValue.checked });
    }

    @bind
    private handleScaleEnabledChanged(): void{
      this.optionsChanged({ isScaleEnabled: this.formInputs.isScaleEnabled.checked });
    }

    private getSliderSettings(): ISliderSettings {
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

    private parseCurrentValue(curVal: String, isRange: boolean): number[] {
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

    private getNumInputValue(elem: JQuery<HTMLElement>): number {
      const val = elem.val() as string;
      val.trim();
      const value = Number(val);
      if (value || value === 0) {
        return value;
      }
      throw new Error();
    }

    private initFormInputs(form: JQuery<HTMLElement>): void {
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

    private optionsChanged(option: Object): void{
      this.$elem.find('.js-slider-card__error').remove();
      this.options = $.extend(this.options, option);
      this.$slider.SimpleSlider('setNewOptions', this.options);
    }

    private inputValidation(
      errorMessage: string,
      $element: JQuery<HTMLElement>,
      oldValue: string, func: Function
    ): void{
      try {
        func();
      } catch (error) {
        $element.val(oldValue);
        func();
        $element.before(`<div class="slider-card__error js-slider-card__error">${errorMessage}</div>`);
      }
    }
}

export default SliderCard;
