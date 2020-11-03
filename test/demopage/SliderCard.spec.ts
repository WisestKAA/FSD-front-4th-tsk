import MockElement from './MockElement';
import MockSliderCard from './MockSliderCard';

describe(
  'Test SliderCard',
  () => {
    let sliderCard: MockSliderCard;

    describe(
      'Test SliderCard / init',
      () => {
        it(
          'After initialization the SliderCard must init slider with options from form elements',
          () => {
            const mockElem = new MockElement();
            sliderCard = new MockSliderCard(mockElem.getElement({}).get(0));
            expect(mockElem.defOpt).toEqual(sliderCard.presenter.sliderSettings);
          }
        );

        it(
          'After initialization the SliderCard must init slider with options from form elements (isRange=true)',
          () => {
            const mockElem = new MockElement();
            sliderCard = new MockSliderCard(mockElem.getElement({ isRange: true }).get(0));
            expect(mockElem.defOpt).toEqual(sliderCard.presenter.sliderSettings);
          }
        );
      }
    );

    describe(
      'Test SliderCard / functions',
      () => {
        const mockElem = new MockElement();
        sliderCard = new MockSliderCard(mockElem.getElement({}).get(0));

        it(
          'If the current value field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            const elem = new MockElement();
            sliderCard = new MockSliderCard(elem.getElement({}).get(0));
            sliderCard.getFormInputs().currentVal.val('5 0');
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            sliderCard.getFormInputs().currentVal.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().currentVal).toEqual([5, 0]);
          }
        );

        it(
          'If the minimum value field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().minVal.val('5');
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            sliderCard.getFormInputs().minVal.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().minVal).toEqual(5);
          }
        );

        it(
          'If the maximum value field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().maxVal.val('99');
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            sliderCard.getFormInputs().maxVal.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().maxVal).toEqual(99);
          }
        );

        it(
          'If the step field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().step.val('99');
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            sliderCard.getFormInputs().step.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().step).toEqual(99);
          }
        );

        it(
          'If the numberOfScaleMarks field changed then after focusout the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().numberOfScaleMarks.val('3');
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            sliderCard.getFormInputs().numberOfScaleMarks.focusout();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().numberOfScaleMarks).toEqual(3);
          }
        );

        it(
          'If the isHorizontal field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().isHorizontal.checked = false;
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            $(sliderCard.getFormInputs().isHorizontal).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isHorizontal).toEqual(false);
          }
        );

        it(
          'If the isHorizontal field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().isHorizontal.checked = true;
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            $(sliderCard.getFormInputs().isHorizontal).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isHorizontal).toEqual(true);
          }
        );

        it(
          'If the isRange field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().isRange.checked = true;
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            $(sliderCard.getFormInputs().isRange).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isRange).toEqual(true);
          }
        );

        it(
          'If the isScaleEnabled field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().isScaleEnabled.checked = true;
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            $(sliderCard.getFormInputs().isScaleEnabled).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isScaleEnabled).toEqual(true);
          }
        );

        it(
          'If the isRangeLineEnabled field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().isRangeLineEnabled.checked = true;
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            $(sliderCard.getFormInputs().isRangeLineEnabled).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isRangeLineEnabled).toEqual(true);
          }
        );

        it(
          'If the isVisibleCurrentValue field changed then after changed the SliderCard must call the setNewOptions function from presenter with new options',
          () => {
            sliderCard.getFormInputs().isVisibleCurrentValue.checked = true;
            const setNewOptionsSpy = spyOn(sliderCard.presenter, 'setNewOptions');
            $(sliderCard.getFormInputs().isVisibleCurrentValue).change();
            expect(setNewOptionsSpy).toHaveBeenCalled();
            expect(sliderCard.getOpt().isVisibleCurrentValue).toEqual(true);
          }
        );

        it(
          'If the slider change current value, the current value field must change to',
          () => {
            const elem = new MockElement();
            sliderCard = new MockSliderCard(elem.getElement({ isRange: false }).get(0));
            sliderCard.presenter.mockTriggerEvent([10, 15]);
            expect(sliderCard.getOpt().currentVal).toEqual([10, 15]);
          }
        );

        it(
          'If the slider change current value, the current value field must change to (isRage=true)',
          () => {
            const elem = new MockElement();
            sliderCard = new MockSliderCard(elem.getElement({ isRange: true }).get(0));
            sliderCard.presenter.mockTriggerEvent([10, 15]);
            expect(sliderCard.getOpt().currentVal).toEqual([10, 15]);
          }
        );

        it(
          'If the input value is incorrect, then the inputValidation function must throw an error and display it on the form before the input element',
          () => {
            sliderCard.getFormInputs().maxVal.val('asd');
            sliderCard.getFormInputs().maxVal.focusout();
            expect(sliderCard.getElem().find('.slider-card__error')
              .html())
              .toBe('Invalid input! The maximum value must be a number');
          }
        );
      }
    );
  }
);
