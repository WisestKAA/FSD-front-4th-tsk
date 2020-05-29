import { SliderHandle } from "../../../src/plugin/view/SliderHandle";
import { SliderLine } from "../../../src/plugin/view/SliderLine";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";

describe('Check SliderHandle',()=>{
    let line = new SliderLine();
    let handle = new SliderHandle(line);    

    it('Tag of element must be DIV', () => {
        expect(handle.$elem.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.HANDLE}'`, () => {
        expect(handle.$elem.hasClass(StyleClasses.HANDLE)).toBeTrue();
    });

    it('Element must have an event handler function for "onmousedown"', () => {
        //spyOn(handle, handle.onMouseDown);

        
        // $(document.body).append(handle.$elem);
        // let spyEvent = spyOnEvent('#'+StyleClasses.HANDLE, 'mousedown');
        // handle.$elem.mousedown();
        // //expect('mousedown').toHaveBeenTriggeredOn(StyleClasses.HANDLE);
        // expect(spyEvent).toHaveBeenTriggered();
        //expect().toHandle("mousedown");
    });
});