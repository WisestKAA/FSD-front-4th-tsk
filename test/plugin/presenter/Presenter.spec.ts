import Presenter from '../../../src/plugin/presenter/Presenter';
import IViewFactory from '../../../src/plugin/view/IViewFactory';
import IPresenter from '../../../src/plugin/presenter/IPresenter';
import IViewOptions from '../../../src/plugin/view/IViewOptions';
import IElementsFactory from '../../../src/plugin/view/IElementsFactory';
import IView from '../../../src/plugin/view/IView';
import SliderDirection from '../../../src/plugin/view/SliderDirection';
import IModelFactory from '../../../src/plugin/model/IModelFactory';
import IModel from '../../../src/plugin/model/IModel';
import ISliderSettings from '../../../src/plugin/model/ISliderSettings';
import ILiteEvent from '../../../src/plugin/LiteEvent/ILiteEvent';
import LiteEvent from '../../../src/plugin/LiteEvent/LiteEvent';

class MockViewFactory implements IViewFactory {
    view = new MockView();
    build (presenter?: IPresenter, option?: IViewOptions, elementsFactory?: IElementsFactory, scaleValues?: number[]): IView {
      this.view.setOptions(presenter, option, elementsFactory, scaleValues);
      return this.view;
    }
}

class MockView implements IView {
    currentValue: number[];
    handleFromPosition: number;
    handleToPosition: number;
    scaleValues?: number[];
    constructor () {}
    getSliderHandlePosition (direction: SliderDirection): number {
      return SliderDirection.isFrom(direction) ? this.handleFromPosition : this.handleToPosition;
    }
    setCurrentValue (currentValue: number[]): void {
      this.currentValue = currentValue;
    }
    getCurrentValue (): number[] {
      return this.currentValue;
    }
    getMaxHandlePosition (): number {
      return 90;
    }
    setHandlePosition (position: number, direction: SliderDirection): void {
      if (SliderDirection.isFrom(direction)) {
        this.handleFromPosition = position;
      } else {
        this.handleToPosition = position;
      }
    }
    reinitialization (option: IViewOptions): void {}
    setOptions (presenter?: IPresenter, option?: IViewOptions, elementsFactory?: IElementsFactory, scaleValues?: number[]):void{
      this.scaleValues = scaleValues;
    }
}

class MockModelFactory implements IModelFactory {
    model: IModel;
    options?: ISliderSettings
    constructor (options?: ISliderSettings) {
      this.options = options;
      this.model = new MockModel(this.options);
    }
    build (): IModel {
      return this.model;
    }
}

class MockModel implements IModel {
    private sliderOptions: ISliderSettings
    private onCurrentValueChanged: LiteEvent<number[]>;
    private onOptionsChanged: LiteEvent<void>;
    constructor (sliderOptions?: ISliderSettings) {
      this.onCurrentValueChanged = new LiteEvent<number[]>();
      this.onOptionsChanged = new LiteEvent<void>();
      this.sliderOptions =  {
        'isHorizontal': true,
        'maxVal': 100,
        'minVal': 0,
        'currentVal': new Array(0, 0),
        'step': 1,
        'precision': 0,
        'isRange': false,
        'isRangeLineEnabled': false,
        'isVisibleCurrentValue': true,
        'isScaleEnabled': false,
        'numberOfScaleMarks': 2,
      };
      this.sliderOptions = $.extend(this.sliderOptions, sliderOptions);
    }
    setCurrentValue (newVal: number[]): void {
      this.onCurrentValueChanged.trigger(newVal);
    }
    setNewOptions (options: ISliderSettings): void {
      this.sliderOptions = $.extend(this.sliderOptions, options);
      this.onOptionsChanged.trigger();
    }
    getCorrectValWithStep (currentVal: number): number {
      const options = this.getOptions();
      const { step } = options;
      if (currentVal < options.minVal) {
        return options.minVal;
      }
      if (currentVal > options.maxVal - options.maxVal % step) {
        return options.maxVal;
      }

      let correctVal: number;
      const shift = step - currentVal % step;
      const middle = step / 2;
      if (shift > middle) {
        correctVal = currentVal - currentVal % step;
      } else {
        correctVal = currentVal + shift;
      }
      const precision = Math.pow(10, options.precision);
      correctVal = Math.round(correctVal * precision) / precision;
      return correctVal;
    }
    getOptions (): ISliderSettings {
      return this.sliderOptions;
    }
    public get changeCurrentValueEvent (): ILiteEvent<number[]> {
      return this.onCurrentValueChanged.expose();
    }
    public get changeOptionsEvent (): ILiteEvent<void> {
      return this.onOptionsChanged.expose();
    }
}

describe('Test Presenter', () => {
  let presenter: Presenter;
    
  describe('Test Presenter / init', () => {
    it('After initialization view must be defined', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory();
      const { view } = viewFactory;
      presenter = new Presenter(viewFactory, modelFactory);
      expect(view).toBeDefined();
    });
        
    it('After initialization model must be defined', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': true });
      const { model } = modelFactory;
      presenter = new Presenter(viewFactory, modelFactory);
      expect(model).toBeDefined();
    });

    it('After initialization the currentValue from the view must be equal the currentValue from the model', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': true, 'currentVal': [1, 1] });
      const { view } = viewFactory;
      const { model } = modelFactory;
      presenter = new Presenter(viewFactory, modelFactory);
      expect(view.getCurrentValue()).toEqual(model.getOptions().currentVal);
    });

    it('When initializing the presenter, he must once call the setHandlePosition function from the view if the isRange property is false', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': false });
      const { view } = viewFactory;
      const spy = spyOn(view, 'setHandlePosition');
      presenter = new Presenter(viewFactory, modelFactory);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('When initializing the presenter, he must twice call the setHandlePosition function from the view if the isRange property is true', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': false });
      const { view } = viewFactory;
      const spy = spyOn(view, 'setHandlePosition');
      presenter = new Presenter(viewFactory, modelFactory);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('When initializing the presenter, he must once call the getCorrectValWithStep function from the model if the isRange property is false', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': false });
      const { model } = modelFactory;
      const spy = spyOn(model, 'getCorrectValWithStep');
      presenter = new Presenter(viewFactory, modelFactory);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('When initializing the presenter, he must twice call the getCorrectValWithStep function from the model if the isRange property is true', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': true });
      const { model } = modelFactory;
      const spy = spyOn(model, 'getCorrectValWithStep');
      presenter = new Presenter(viewFactory, modelFactory);
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('If the isScaleEnabled propertys is true after initialization the scaleValues property in the view must be defined', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': false, 'isScaleEnabled': true });
      presenter = new Presenter(viewFactory, modelFactory);
      expect(viewFactory.view.scaleValues).toBeDefined();
    });

    it('If the isScaleEnabled propertys is true and the numberOfScaleMarks property more than 2 after initialization the scaleValues property must have more than 2 values', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': false, 'isScaleEnabled': true, 'numberOfScaleMarks': 3 });
      presenter = new Presenter(viewFactory, modelFactory);
      expect(viewFactory.view.scaleValues).toEqual([0, 50, 100]);
    });
  });

  describe('Test Presenter / functions', () => {
    it('The sliderHandleChangedPosition function must calculate the new current value and set it for the model and view (isRange=false)', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': false });
      presenter = new Presenter(viewFactory, modelFactory);

      const { view } = viewFactory;
      const oldCurValView = view.getCurrentValue();
      const { model } = modelFactory;
            
      view.setHandlePosition(10, SliderDirection.LEFT);
      presenter.sliderHandleChangedPosition(SliderDirection.LEFT);

      expect(view.getCurrentValue()).not.toEqual(oldCurValView);
      expect(view.getCurrentValue()).toEqual(model.getOptions().currentVal);
    });

    it('The sliderHandleChangedPosition function must calculate the new current value and set it for the model and view (isRange=true)', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': true, 'step': 20 });
      presenter = new Presenter(viewFactory, modelFactory);

      const { view } = viewFactory;
      const oldCurValView = view.getCurrentValue();
      const { model } = modelFactory;
            
      view.setHandlePosition(10, SliderDirection.RIGHT);
      presenter.sliderHandleChangedPosition(SliderDirection.RIGHT);

      expect(view.getCurrentValue()).not.toEqual(oldCurValView);
      expect(view.getCurrentValue()).toEqual(model.getOptions().currentVal);
    });
        
    it('The sliderHandleChangedPosition function must calculate the new current value and set it for the model and view (isRange=true)', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': true });
      presenter = new Presenter(viewFactory, modelFactory);

      const { view } = viewFactory;
      const oldCurValView = view.getCurrentValue();
      const { model } = modelFactory;
            
      view.setHandlePosition(10, SliderDirection.LEFT);
      presenter.sliderHandleChangedPosition(SliderDirection.LEFT);

      expect(view.getCurrentValue()).not.toEqual(oldCurValView);
      expect(view.getCurrentValue()).toEqual(model.getOptions().currentVal);
    });

    it('The getOptions function must return options from model', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isRange': true });
      presenter = new Presenter(viewFactory, modelFactory);
      const modelOptions = modelFactory.model.getOptions();
      expect(presenter.getOptions()).toEqual(modelOptions);
    });

    it('The setNewOptions function must set new options for the model and reinitialize the view', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory();
      presenter = new Presenter(viewFactory, modelFactory);
      const { model } = modelFactory;
      const { view } = viewFactory;
      const reinitSpy = spyOn(view, 'reinitialization');
      presenter.setNewOptions({ 'currentVal': [100, 500] });
      expect(reinitSpy).toHaveBeenCalled();
      expect(model.getOptions().currentVal).toEqual([100, 500]);
    });

    it('The setNewOptions function must set new options for the model and reinitialize the view (isScaleEnabled=true)', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isScaleEnabled': true });
      presenter = new Presenter(viewFactory, modelFactory);
      const { model } = modelFactory;
      const { view } = viewFactory;
      const reinitSpy = spyOn(view, 'reinitialization');
      presenter.setNewOptions({ 'currentVal': [100, 500] });
      expect(reinitSpy).toHaveBeenCalled();
      expect(model.getOptions().currentVal).toEqual([100, 500]);
    });

    it('The onCurrentValueChanged function takes as a parameter a callback function that is called with the parameter as a new current value when it changes', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory();
      presenter = new Presenter(viewFactory, modelFactory);

      const outerObject = { 'callBack' (val: number[]) {} };
      const callBackSpy = spyOn(outerObject, 'callBack');

      presenter.onCurrentValueChanged(outerObject.callBack);
      modelFactory.model.setCurrentValue([100, 500]);
      expect(callBackSpy).toHaveBeenCalledWith([100, 500]);
    });
        
    it('The scaleClicked function must call the setCurrentValue function from model and the setHandlePosition function from view (isRange=false)', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isScaleEnabled': true });
      presenter = new Presenter(viewFactory, modelFactory);
      const spyView = spyOn(viewFactory.view, 'setHandlePosition');
      const spyModel = spyOn(modelFactory.model, 'setCurrentValue');
      presenter.scaleClicked(10);
            
      expect(spyModel).toHaveBeenCalledWith([10, 0]);
      expect(spyView).toHaveBeenCalledWith(9, SliderDirection.LEFT);
    });

    it('The scaleClicked function must call the setCurrentValue function from model and the setHandlePosition function from view (isRange=true, clicked left)', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isScaleEnabled': true, 'isRange': true, 'currentVal': [5, 50] });
      presenter = new Presenter(viewFactory, modelFactory);
      const spyView = spyOn(viewFactory.view, 'setHandlePosition');
      const spyModel = spyOn(modelFactory.model, 'setCurrentValue');
      presenter.scaleClicked(10);
            
      expect(spyModel).toHaveBeenCalledWith([10, 50]);
      expect(spyView).toHaveBeenCalledWith(9, SliderDirection.LEFT);
    });

    it('The scaleClicked function must call the setCurrentValue function from model and the setHandlePosition function from view (isRange=true, clicked right)', () => {
      const viewFactory = new MockViewFactory();
      const modelFactory = new MockModelFactory({ 'isScaleEnabled': true, 'isRange': true, 'currentVal': [5, 50] });
      presenter = new Presenter(viewFactory, modelFactory);
      const spyView = spyOn(viewFactory.view, 'setHandlePosition');
      const spyModel = spyOn(modelFactory.model, 'setCurrentValue');
      presenter.scaleClicked(40);
            
      expect(spyModel).toHaveBeenCalledWith([5, 40]);
      expect(spyView).toHaveBeenCalledWith(54, SliderDirection.RIGHT);
    });
  });
});
