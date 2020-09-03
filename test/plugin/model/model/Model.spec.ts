import Model from '../../../../src/plugin/model/Model';
import MockOptionsFactory from './MockOptionsFactory';
import MockEvent from './MockEvent';

describe('Test Model', () => {
  let model: Model;

  describe(
    'Test Model / init',
    () => {
      it(
        'When the model is initialized, the build  function from the Mock OptionsFactors should be called',
        () => {
          const factory = new MockOptionsFactory();
          const spy = spyOn(factory, 'build');
          model = new Model(factory);
          expect(spy).toHaveBeenCalled();
        }
      );
    }
  );

  describe(
    'Test Model / functions',
    () => {
      it(
        'The setCurrentValue function must set the current value for the options and trigger the onCurrentValueChanged event',
        () => {
          const factory = new MockOptionsFactory();
          const { options } = factory;
          model = new Model(factory);
          const spyCurrentValue = spyOn(options, 'setCurrentValue');
          const event = new MockEvent(model);
          const spyEvent = spyOn(event, 'changeCurrentValue');
          model.setCurrentValue([0, 0]);
          expect(spyCurrentValue).toHaveBeenCalledWith([0, 0]);
          expect(spyEvent).toHaveBeenCalledWith([0, 0]);
        }
      );

      it(
        'The setNewOptions function must set the new options for the options and trigger the onOptionsChanged event',
        () => {
          const factory = new MockOptionsFactory();
          const { options } = factory;
          model = new Model(factory);
          const spyNewOptions = spyOn(options, 'setNewOptions');
          const event = new MockEvent(model);
          const spyEvent = spyOn(event, 'changeOptions');
          model.setNewOptions({ currentVal: [0, 0] });
          expect(spyNewOptions).toHaveBeenCalledWith({ currentVal: [0, 0] });
          expect(spyEvent).toHaveBeenCalled();
        }
      );

      it(
        'The getCorrectValWithStep function must return the correct current value taking into account the step (2.5)',
        () => {
          model = new Model(new MockOptionsFactory());
          expect(model.getCorrectValWithStep(2.5)).toBe(3);
        }
      );

      it(
        'The getCorrectValWithStep function must return the correct current value taking into account the step (2.4)',
        () => {
          model = new Model(new MockOptionsFactory());
          expect(model.getCorrectValWithStep(2.4)).toBe(2);
        }
      );

      it(
        'The getCorrectValWithStep function must return minVal if newCurrentVal is less than minVal',
        () => {
          model = new Model(new MockOptionsFactory());
          expect(model.getCorrectValWithStep(-1)).toBe(0);
        }
      );

      it(
        'The getCorrectValWithStep function must return minVal if newCurrentVal is greater than maxVal',
        () => {
          model = new Model(new MockOptionsFactory());
          expect(model.getCorrectValWithStep(101)).toBe(100);
        }
      );

      it(
        'The getOptions function must return options',
        () => {
          const factory = new MockOptionsFactory();
          const { options } = factory;
          model = new Model(factory);
          expect(model.getOptions()).toEqual(options.getOptions());
        }
      );
    }
  );
});
