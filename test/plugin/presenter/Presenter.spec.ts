import { Presenter } from "../../../src/plugin/presenter/Presenter";
import '../../../src/plugin/simpleslider';

describe('Check Presenter', () => {
    let elem = $('<div class="slider" style="width: 100px"></div>');
    let presenter: Presenter; 

    beforeEach(() => {
        presenter = new Presenter(elem.get(0));
    });

    it('After initialization model must be defined', () => {
        expect(presenter.model).toBeDefined();
    });

    it('After initialization iew must be defined', () => {
        expect(presenter.view).toBeDefined();
    });

    it("Ready slider must have class 'slider'", () => {
        expect(presenter.getReadySlider().get(0).classList.contains('slider')).toBeTrue();
    });

    it("Function sliderHandleLeftChange must change current value in model", () => { 
        let befor = presenter.model.options.currentVal;
        presenter.view.handle.setNewPositionLeft(50);
        let after = presenter.model.options.currentVal;
        expect(befor).not.toBe(after);

        let spy = spyOn(presenter, "sliderHandleLeftChange");
        presenter.view.handle.setNewPositionLeft(60);
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

    it("The setCurrentLeftValue function shuld change the position of handle and the current value", () => {
        let beforPosition = presenter.view.getSliderHandleLeftPosition();
        presenter.setCurrentLeftValue(beforPosition+1, 100, 84);
        let afterPosition = presenter.view.getSliderHandleLeftPosition();
        expect(beforPosition).not.toBe(afterPosition);
    });
});