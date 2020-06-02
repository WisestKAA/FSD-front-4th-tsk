import { Presenter } from "../../../src/plugin/presenter/Presenter";

describe('Check Presenter', () => {
    let elem = $('<div class="slider" style="width: 100px"></div>');
    let presenter = new Presenter(elem.get(0));

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