import ISliderSettings from '../../src/plugin/model/ISliderSettings';

class MockElement {
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

  defOpt: ISliderSettings = {
    currentVal: [0, 0],
    minVal: 0,
    maxVal: 100,
    step: 1,
    numberOfScaleMarks: 2,
    isHorizontal: true,
    isRange: false,
    isVisibleCurrentValue: true,
    isRangeLineEnabled: false,
    isScaleEnabled: false
  };

  constructor() {
    this.$slider = $('<div>').addClass('slider-card__slider js-slider-card__slider');
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
  }): JQuery<HTMLSpanElement> {
    const option = $.extend(this.defOpt, options);
    const {
      currentVal,
      minVal,
      maxVal,
      step,
      numberOfScaleMarks,
      isHorizontal,
      isRange,
      isVisibleCurrentValue,
      isRangeLineEnabled,
      isScaleEnabled
    } = option;
    this.$currentValue = $('<input>').addClass('text-field')
      .attr('type', 'text')
      .attr('name', 'currentValue')
      .attr('value', `${currentVal[0]} ${currentVal[1]}`);
    this.$minVal = $('<input>').addClass('text-field')
      .attr('type', 'text')
      .attr('name', 'minVal')
      .attr('value', minVal.toString());
    this.$maxVal = $('<input>').addClass('text-field')
      .attr('type', 'text')
      .attr('name', 'maxVal')
      .attr('value', maxVal.toString());
    this.$step = $('<input>').addClass('text-field')
      .attr('type', 'text')
      .attr('name', 'step')
      .attr('value', step.toString());
    this.$numOfScaleMark = $('<input>').addClass('text-field')
      .attr('type', 'text')
      .attr('name', 'numOfScaleMark')
      .attr('value', numberOfScaleMarks.toString());

    this.$horizontal = $('<input>').addClass('checkbox-button__input')
      .attr('type', 'checkbox')
      .attr('name', 'horizontal');
    if (isHorizontal) {
      this.$horizontal.attr('checked', 'checked');
    }
    this.$range = $('<input>').addClass('checkbox-button__input')
      .attr('type', 'checkbox')
      .attr('name', 'range');
    if (isRange) {
      this.$range.attr('checked', 'checked');
    }
    this.$visibleCurrentValue = $('<input>').addClass('checkbox-button__input')
      .attr('type', 'checkbox')
      .attr('name', 'visibleCurrentValue');
    if (isVisibleCurrentValue) {
      this.$visibleCurrentValue.attr('checked', 'checked');
    }
    this.$rangeLine = $('<input>').addClass('checkbox-button__input')
      .attr('type', 'checkbox')
      .attr('name', 'rangeLine');
    if (isRangeLineEnabled) {
      this.$rangeLine.attr('checked', 'checked');
    }
    this.$scale = $('<input>').addClass('checkbox-button__input')
      .attr('type', 'checkbox')
      .attr('name', 'scale');
    if (isScaleEnabled) {
      this.$scale.attr('checked', 'checked');
    }

    this.$elem = $('<div>').addClass('slider-card')
      .append(
        $('<div>').addClass('slider-card__slider-wrapper')
          .append(this.$slider),
        $('<form>').addClass('slider-card__form js-slider-card__form')
          .append(
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

export default MockElement;
