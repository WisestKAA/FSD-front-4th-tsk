import { Presenter } from "../../../src/plugin/presenter/Presenter";
import '../../../src/plugin/simpleslider';
import { SliderDirection } from "../../../src/plugin/view/SliderDirection";

describe('Check Presenter', () => {    
    let presenter: Presenter; 

    beforeEach(() => {  
        let elem = $('<div class="slider" style="width: 100px"></div>');
        $(document.body).append(elem);      
        presenter = new Presenter(elem.get(0));
    });

    afterEach(()=>{ $(document.body).html('');});

    describe('Check Presenter / init', () => {
        it('After initialization model must be defined', () => {
            expect(presenter.model).toBeDefined();
        });
    
        it('After initialization iew must be defined', () => {
            expect(presenter.view).toBeDefined();
        });
    
        it("Ready slider must have class 'slider'", () => {
            expect(presenter.getReadySlider().get(0).classList.contains('slider')).toBeTrue();
        });
    });

    it("Function sliderHandleChangedPosition must change current value in model", () => { 
        presenter.view.handle.setNewPosition(0, SliderDirection.LEFT);
        let befor = presenter.model.options.currentVal;
        presenter.view.handle.setNewPosition(50, SliderDirection.LEFT);
        let after = presenter.model.options.currentVal;
        expect(befor).not.toBe(after);

        let spy = spyOn(presenter, "sliderHandleChangedPosition"); 
        presenter.view.handle.setNewPosition(60, SliderDirection.LEFT);
        expect(spy).toHaveBeenCalled();
    });

    it("Function setCurrentValueView must change only view level", () => {
        let beforView = presenter.view.currentValue.val;
        let beforModel = presenter.model.options.currentVal;
        presenter.setCurrentValueView(beforView + 1);
        let afterView = presenter.view.currentValue.val;
        let afterModel = presenter.model.options.currentVal;
        expect(beforView).not.toBe(afterView);
        expect(beforModel).toBe(afterModel);
    });

    it("Function setCurrentValueModel must change view & model level", () => {
        let beforView = presenter.view.currentValue.val;
        let beforModel = presenter.model.options.currentVal;
        presenter.setCurrentValueModel(beforView + 1);
        let afterView = presenter.view.currentValue.val;
        let afterModel = presenter.model.options.currentVal;
        expect(beforView).not.toBe(afterView);
        expect(beforModel).not.toBe(afterModel);
    });

    it("Function getCorrectPosition must return correct value (TY Cap:))", () => {
        let pos = 50;
        let maxHandlePosition = 100;
        expect(presenter.getCorrectPosition(pos, maxHandlePosition, true)).toBe(50);
        expect(presenter.getCorrectPosition(pos, maxHandlePosition, false)).toBe(50);
    });

    it("The getCurrentValFromPosition function should calculate the current value from the handle position", () => {
        presenter.setCurrentHandlePosition(10);
        let calcVal = presenter.getCurrentValFromPosition();
        expect(calcVal).toBe(10);
    });

    it("The getCorrectValWithStep function should return the correct value with step", () => {
        let currentVal = 9.4;
        expect(presenter.getCorrectValWithStep(currentVal)).toBe(9);
    });

    it("The setCurrentHandlePosition function should change the 'position' property and the 'style' attribute in the SliderHande class", () => {
        presenter.setCurrentHandlePosition(1);
        let correctPosition = presenter.getCorrectPosition(1, presenter.view.getMaxHandlePosition(), true);
        expect(presenter.view.getSliderHandlePosition()).toBe(correctPosition);
    });
});