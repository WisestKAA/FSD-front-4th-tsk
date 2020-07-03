import { Presenter } from "../../../src/plugin/presenter/Presenter";
import '../../../src/plugin/simpleslider';
import { SliderDirection } from "../../../src/plugin/view/SliderDirection";
import { ISliderOptions } from "../../../src/plugin/model/SliderOptions/ISliderOptions";

describe('Check Presenter', () => {    
    let presenter: Presenter; 

    beforeEach(() => {  
        let elem = $('<div class="slider" style="width: 100px"></div>');
        $(document.body).append(elem);      
        presenter = new Presenter(elem.get(0));
    });

    afterAll(()=>{ $(document.body).html('');});

    describe('Check Presenter / init', () => {
        it('After initialization model must be defined', () => {
            expect(presenter.model).toBeDefined();
        });
    
        it('After initialization view must be defined', () => {
            expect(presenter.view).toBeDefined();
        });
    
        it("Ready slider must have class 'slider'", () => {
            expect(presenter.view.getReadySlider().get(0).classList.contains('slider')).toBeTrue();
        });
    });

    it("Function sliderHandleChangedPosition must change current value in model", () => { 
        presenter.view.handleFrom.setNewPosition(0, SliderDirection.LEFT);
        let befor = presenter.model.options.currentVal;
        presenter.view.handleFrom.setNewPosition(50, SliderDirection.LEFT);
        let after = presenter.model.options.currentVal;
        expect(befor).not.toBe(after);

        let spy = spyOn(presenter, "sliderHandleChangedPosition"); 
        presenter.view.handleFrom.setNewPosition(60, SliderDirection.LEFT);
        expect(spy).toHaveBeenCalled();
    });

    it("Function setCurrentValueView must change only view level", () => {
        let beforView = presenter.view.currentValueFrom.val;
        let beforModel = presenter.model.options.currentVal;
        presenter.setCurrentValueView([beforView + 1, 0]);
        let afterView = presenter.view.currentValueFrom.val;
        let afterModel = presenter.model.options.currentVal;
        expect(beforView).not.toBe(afterView);
        expect(beforModel).toBe(afterModel);
    });

    it("Function setCurrentValueModel must change view & model level", () => {
        let beforView = presenter.view.currentValueFrom.val;
        let beforModel = presenter.model.options.currentVal;
        presenter.setCurrentValueModel([beforView + 1, 0]);
        let afterView = presenter.view.currentValueFrom.val;
        let afterModel = presenter.model.options.currentVal;
        expect(beforView).not.toBe(afterView);
        expect(beforModel).not.toBe(afterModel);
    });

    // it("Function setCurrentValueModel must change view & model level (without number)", () => {
    //     let beforView = presenter.view.currentValueFrom.val;
    //     let beforModel = presenter.model.options.currentVal;
    //     presenter.setCurrentValueModel(null, SliderDirection.LEFT);
    //     let afterView = presenter.view.currentValueFrom.val;
    //     let afterModel = presenter.model.options.currentVal;
    //     expect(beforView).not.toBe(afterView);
    //     expect(beforModel).not.toBe(afterModel);
    // });

    it("Function getCorrectPosition must return correct value (TY Cap:))", () => {
        let pos = 50;
        let maxHandlePosition = 100;
        expect(presenter.getCorrectPosition(pos, maxHandlePosition, true, SliderDirection.LEFT)).toBe(50);
        expect(presenter.getCorrectPosition(pos, maxHandlePosition, false, SliderDirection.RIGHT)).toBe(50);
    });

    it("The getCurrentValFromPosition function should calculate the current value from the handle position", () => {        
        presenter.setCurrentHandlePosition(10, SliderDirection.LEFT);
        let calcVal = presenter.getCurrentValFromPosition(SliderDirection.LEFT);
        expect(calcVal).toBe(10);
    });

    it("The getCorrectValWithStep function should return the correct value with step", () => {
        let currentVal = 9.4;
        expect(presenter.getCorrectValWithStep(currentVal)).toBe(9);
        expect(presenter.getCorrectValWithStep(-5)).toBe(presenter.model.options.minVal);      
        
        expect(presenter.getCorrectValWithStep(1000)).toBe(100);   
    });

    it("The setCurrentHandlePosition function should change the 'position' property and the 'style' attribute in the SliderHande class", () => {
        presenter.setCurrentHandlePosition(1, SliderDirection.LEFT);
        let correctPosition = presenter.getCorrectPosition(1, presenter.view.getMaxHandlePosition(), true, SliderDirection.LEFT);
        expect(presenter.view.getSliderHandlePosition(SliderDirection.LEFT)).toBe(correctPosition);
    });

    it("The setNewOptions function should change options in model and view components", () => {
        let elem = $('<div class="slider" style="width: 100px"></div>');
        let presenter = new Presenter(elem.get(0), {isRange: true, isRangeLineEnabled: true})
        presenter.view.handleFrom.position = 10;
        presenter.view.handleTo.position = 15;
        presenter.view.currentValueFrom.val = 2;
        presenter.view.currentValueTo.val = 15;
        presenter.view.range.changeRangeLineTwo(2, 15);

        
        let optionsBefor = presenter.model.options;
        let handleFromProsition = presenter.view.handleFrom.position;
        let handleToProsition = presenter.view.handleTo.position;
        let viewCurrentVal = presenter.view.getCurrentValue();
        let rangeLineStyle = presenter.view.range.$elem.attr("style");
        let options: ISliderOptions = {
            currentVal: new Array(-1,20), 
            isHorizontal: true,
            isRange: true,
            isRangeLineEnabled: true,
            maxVal: 150,
            minVal: -10,
            precision: 2,
            step: 0.1,
            isVisibleCurrentValue: false,
        };
        presenter.setNewOptions(options);
        expect(presenter.model.options).not.toEqual(optionsBefor);
        expect(presenter.view.handleFrom.position).not.toEqual(handleFromProsition);
        expect(presenter.view.handleTo.position).not.toBe(handleToProsition);
        expect(presenter.view.getCurrentValue()).not.toBe(viewCurrentVal);
        expect(presenter.view.range.$elem.attr("style")).not.toBe(rangeLineStyle);
        expect(presenter.model.options).toEqual(options);
    });

    it("The optionsChanged function should call next functions: initViewComponents, view.setOrientation", () => {
        let spyIC = spyOn(presenter, "initViewComponents");
        let speSO = spyOn(presenter.view, "setOrientation");
        presenter.optionsChanged();
        expect(spyIC).toHaveBeenCalled();
        expect(speSO).toHaveBeenCalled();
    });

    it("The getOptions function should return the current slider options", () => {
        expect(presenter.getOptions()).toBe(presenter.model.options);
    });

    it("The onCurrentValueChanged function should add an event listener with the passed function and triggered when currentValue changed", () => {
        class mock {func = function(data: number) {console.log(data);};}
        let mockObj = new mock;
        let spy = spyOn(mockObj, 'func');
        presenter.onCurrentValueChanged(mockObj.func);
        presenter.setCurrentValueModel(new Array(5, 5));
        expect(spy).toHaveBeenCalled();
    });

    it("The getCorrectCurrentVal function should set value in currentValue array correct", () => {
        presenter.model.options.isRange = false;
        let correctVal = 10;
        expect(presenter.getCorrectCurrentVal(correctVal, SliderDirection.LEFT)).toEqual([10, 0]);
        expect(presenter.getCorrectCurrentVal(correctVal, SliderDirection.BOTTOM)).toEqual([10, 0]);
        presenter.model.options.isRange = true;
        expect(presenter.getCorrectCurrentVal(correctVal, SliderDirection.LEFT)).toEqual([10, 0]);
        expect(presenter.getCorrectCurrentVal(correctVal, SliderDirection.BOTTOM)).toEqual([10, 0]);
        presenter.model.options.isRange = true;
        expect(presenter.getCorrectCurrentVal(correctVal, SliderDirection.RIGHT)).toEqual([10, 10]);
        expect(presenter.getCorrectCurrentVal(correctVal, SliderDirection.TOP)).toEqual([10, 10]);
    });
});