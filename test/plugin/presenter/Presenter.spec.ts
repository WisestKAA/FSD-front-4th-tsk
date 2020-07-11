import { Presenter } from "../../../src/plugin/presenter/Presenter";
import { IViewFactory } from "../../../src/plugin/view/ViewFactory";
import { IPresenter } from "../../../src/plugin/presenter/IPresenter";
import { IViewOptions } from "../../../src/plugin/view/IViewOptions";
import { IElementsFactory } from "../../../src/plugin/view/ElementsFactory";
import { IView } from "../../../src/plugin/view/IView";
import { SliderDirection } from "../../../src/plugin/view/SliderDirection";
import { IModelFactory, ModelFactory } from "../../../src/plugin/model/ModelFactory";
import { IModel } from "../../../src/plugin/model/IModel";
import { ISliderSettings } from "../../../src/plugin/model/ISliderSettings";
import { ILiteEvent } from "../../../src/plugin/LiteEvent/ILiteEvent";
import { LiteEvent } from "../../../src/plugin/LiteEvent/LiteEvent";

class MockViewFactory implements IViewFactory{
    view = new MockView(); 
    build(presenter?: IPresenter, option?: IViewOptions, elementsFactory?: IElementsFactory): IView {
        return this.view;
    }
}

class MockView implements IView{
    currentValue: number[];
    handleFromPosition: number;
    handleToPosition: number;
    getSliderHandlePosition(direction: SliderDirection): number {
        return SliderDirection.isFrom(direction) ? this.handleFromPosition : this.handleToPosition;
    }
    setCurrentValue(currentValue: number[]): void {this.currentValue = currentValue;}
    getCurrentValue(): number[] {return this.currentValue;}
    getMaxHandlePosition(): number {return 90;}
    setHandlePosition(position: number, direction: SliderDirection): void {
        if(SliderDirection.isFrom(direction)){
            this.handleFromPosition = position;
        } else {
            this.handleToPosition = position;
        }
    }
    reinitialization(option: IViewOptions): void {}
}

class MockModelFactory implements IModelFactory{
    model: IModel;
    options?: ISliderSettings
    constructor(options?: ISliderSettings){
        this.options = options;
        this.model = new MockModel(this.options); 
    }
    build(): IModel {
        return this.model;
    }
}

class MockModel implements IModel{ 
    private sliderOptions: ISliderSettings
    private onCurrentValueChanged: LiteEvent<number[]>;
    private onOptionsChanged: LiteEvent<void>;
    constructor(sliderOptions?: ISliderSettings){
        this.onCurrentValueChanged = new LiteEvent<number[]>();
        this.onOptionsChanged = new LiteEvent<void>();
        this.sliderOptions =  {
            isHorizontal: true,
            maxVal: 100,
            minVal: 0,
            currentVal: new Array(0, 0),
            step: 1,
            precision: 0,
            isRange: false,
            isRangeLineEnabled: false,
            isVisibleCurrentValue: true,
        };
        this.sliderOptions = $.extend(this.sliderOptions, sliderOptions);
    }
    setCurrentValue(newVal: number[]): void {this.onCurrentValueChanged.trigger(newVal);}
    setNewOptions(options: ISliderSettings): void {
        this.sliderOptions = $.extend(this.sliderOptions, options);
        this.onOptionsChanged.trigger();
    }
    getCorrectValWithStep(currentVal: number): number {
        let options = this.getOptions();
        let step = options.step;
        if(currentVal < options.minVal){
            return options.minVal;
        }
        if(currentVal > options.maxVal - options.maxVal % step){
            return options.maxVal;
        }

        let correctVal: number;
        let shift = step - currentVal % step;
        let middle = step / 2;
        if(shift > middle){            
            correctVal = currentVal - currentVal % step;
        } else {
            correctVal = currentVal + shift;
        }
        let precision = Math.pow(10, options.precision);
        correctVal = Math.round(correctVal * precision) / precision;
        return correctVal;
    }
    getOptions(): ISliderSettings {return this.sliderOptions;}
    public get changeCurrentValueEvent(): ILiteEvent<number[]> {return this.onCurrentValueChanged.expose();}
    public get changeOptionsEvent(): ILiteEvent<void> {return this.onOptionsChanged.expose();}
}

class MockPresenter extends Presenter{
    constructor(viewFactory: IViewFactory, modelFactory: IModelFactory){
        super(viewFactory, modelFactory)
    }
    getView(): IView{return this.view;}
    getModel(): IModel{return this.model;}
}

describe("Test Presenter", () => {
    let presenter: Presenter;
    
    describe("Test Presenter / init", () => {
        it("After initialization view must be defined", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory();
            let view = viewFactory.view;
            presenter = new Presenter(viewFactory, modelFactory);
            expect(view).toBeDefined();
        });  
        
        it("After initialization model must be defined", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: true});
            let model = modelFactory.model;
            presenter = new Presenter(viewFactory, modelFactory);
            expect(model).toBeDefined();
        });

        it("After initialization the currentValue from the view must be equal the currentValue from the model", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: true, currentVal: [1,1]});
            let view = viewFactory.view;
            let model = modelFactory.model;
            presenter = new Presenter(viewFactory, modelFactory);
            expect(view.getCurrentValue()).toEqual(model.getOptions().currentVal);
        });

        it("When initializing the presenter, he must once call the setHandlePosition function from the view if the isRange property is false", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: false});
            let view = viewFactory.view;
            let spy = spyOn(view, "setHandlePosition");
            presenter = new Presenter(viewFactory, modelFactory);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it("When initializing the presenter, he must twice call the setHandlePosition function from the view if the isRange property is true", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: false});
            let view = viewFactory.view;
            let spy = spyOn(view, "setHandlePosition");
            presenter = new Presenter(viewFactory, modelFactory);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it("When initializing the presenter, he must once call the getCorrectValWithStep function from the model if the isRange property is false", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: false});
            let model = modelFactory.model;
            let spy = spyOn(model, "getCorrectValWithStep");
            presenter = new Presenter(viewFactory, modelFactory);
            expect(spy).toHaveBeenCalledTimes(1);
        });

        it("When initializing the presenter, he must twice call the getCorrectValWithStep function from the model if the isRange property is true", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: true});
            let model = modelFactory.model;
            let spy = spyOn(model, "getCorrectValWithStep");
            presenter = new Presenter(viewFactory, modelFactory);
            expect(spy).toHaveBeenCalledTimes(2);
        });
    });

    describe("Test Presenter / functions", () => {
        it("The sliderHandleChangedPosition function must calculate the new current value and set it for the model and view (isRange=false)", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: false});
            presenter = new Presenter(viewFactory, modelFactory);

            let view = viewFactory.view;
            let oldCurValView = view.getCurrentValue();
            let model = modelFactory.model;
            
            view.setHandlePosition(10, SliderDirection.LEFT);
            presenter.sliderHandleChangedPosition(SliderDirection.LEFT);

            expect(view.getCurrentValue()).not.toEqual(oldCurValView);
            expect(view.getCurrentValue()).toEqual(model.getOptions().currentVal);
        });

        it("The sliderHandleChangedPosition function must calculate the new current value and set it for the model and view (isRange=true)", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: true, step: 20});
            presenter = new Presenter(viewFactory, modelFactory);

            let view = viewFactory.view;
            let oldCurValView = view.getCurrentValue();
            let model = modelFactory.model;
            
            view.setHandlePosition(10, SliderDirection.RIGHT);
            presenter.sliderHandleChangedPosition(SliderDirection.RIGHT);

            expect(view.getCurrentValue()).not.toEqual(oldCurValView);
            expect(view.getCurrentValue()).toEqual(model.getOptions().currentVal);
        }); 
        
        it("The sliderHandleChangedPosition function must calculate the new current value and set it for the model and view (isRange=true)", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: true});
            presenter = new Presenter(viewFactory, modelFactory);

            let view = viewFactory.view;
            let oldCurValView = view.getCurrentValue();
            let model = modelFactory.model;
            
            view.setHandlePosition(10, SliderDirection.LEFT);
            presenter.sliderHandleChangedPosition(SliderDirection.LEFT);

            expect(view.getCurrentValue()).not.toEqual(oldCurValView);
            expect(view.getCurrentValue()).toEqual(model.getOptions().currentVal);
        }); 

        it("The getOptions function must return options from model", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory({isRange: true});
            presenter = new Presenter(viewFactory, modelFactory);
            let modelOptions = modelFactory.model.getOptions();
            expect(presenter.getOptions()).toEqual(modelOptions);
        });

        it("The setNewOptions function must set new options for the model and reinitialize the view", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory();
            presenter = new Presenter(viewFactory, modelFactory);
            let model = modelFactory.model;
            let view = viewFactory.view;
            let reinitSpy = spyOn(view, "reinitialization");
            presenter.setNewOptions({currentVal: [100, 500]});
            expect(reinitSpy).toHaveBeenCalled();
            expect(model.getOptions().currentVal).toEqual([100, 500]);
        });   

        it("The onCurrentValueChanged function takes as a parameter a callback function that is called with the parameter as a new current value when it changes", () => {
            let viewFactory = new MockViewFactory();
            let modelFactory = new MockModelFactory();
            presenter = new Presenter(viewFactory, modelFactory);

            let outerObject = {callBack: function (val: number[]){}}
            let callBackSpy = spyOn(outerObject, "callBack");

            presenter.onCurrentValueChanged(outerObject.callBack);
            modelFactory.model.setCurrentValue([100,500]);
            expect(callBackSpy).toHaveBeenCalledWith([100,500]);
        });   
    });
});