import { Model } from "../../../src/plugin/model/Model";

describe('Check Model', () => {
    let model = new Model();

    it('After initialization options must be defined', () => {
        expect(model.options).toBeDefined();
    });

    it('If the options are empty - the model should have default options', () => {
        expect(model.options).toEqual(model.defaultOption);
    });
});