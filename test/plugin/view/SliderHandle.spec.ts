import { SliderHandle } from "../../../src/plugin/view/SliderHandle";
import { SliderLine } from "../../../src/plugin/view/SliderLine";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import '../../../src/plugin/simpleslider';

describe('Check SliderHandle',()=>{
    let line = new SliderLine();
    let handle = new SliderHandle(line);
    
    $(document.body).append('<div class="slider" style="width: 100px"></div>');
    $(document.head).append('<link href="http://localhost:8080/style.css" rel="stylesheet">')   
    $('.slider').SimpleSlider(); 
       

    it('Tag of element must be DIV', () => {
        expect(handle.$elem.get(0).nodeName).toEqual('DIV');
    });

    it(`Element must have class '${StyleClasses.HANDLE}'`, () => {
        expect(handle.$elem.hasClass(StyleClasses.HANDLE)).toBeTrue();
    });

    it('Element must have an event handler function for "onmousedown"', () => {
        let spy = spyOn(handle, "onMouseDown");
        handle.$elem.mousedown();
        expect(spy).toHaveBeenCalled();
    });

    it('After the onmousedown element event, the document should call the event handler function for onmousemove and onmouseup', () =>{
        let spyMouseMove = spyOn(handle, 'onMouseMove');
        let spyMouseUp = spyOn(handle, 'onMouseUp');
        handle.$elem.mousedown();
        $(document).mousemove();
        $(document).mouseup();
        expect(spyMouseMove).toHaveBeenCalled();
        expect(spyMouseUp).toHaveBeenCalled();
    });

    it('After the onmouseup document event, the document should\'t call the event handler function for onmousemove and onmouseup', () =>{
        handle.$elem.mousedown();
        $(document).mouseup();
        let spyMouseMove = spyOn(handle, 'onMouseMove');
        let spyMouseUp = spyOn(handle, 'onMouseUp');
        $(document).mousemove();
        $(document).mouseup();
        expect(spyMouseMove).not.toHaveBeenCalled();
        expect(spyMouseUp).not.toHaveBeenCalled();
    });

    it('After the onmousemove document event, element must have attribute "style"', () => {
        handle.$elem.mousedown();
        $(document).mousemove(); 
        expect(handle.$elem.attr('style')).toBeDefined();
    });

    it("The handle should be in line area", () =>{
        handle.shiftX=0;
        let offsetLeft = 0;
        let lineWidth = 100;
        let handleWidth = 10;
        expect(handle.getNewLeft(-10, offsetLeft, lineWidth, handleWidth)).toEqual(0);
        expect(handle.getNewLeft(20, offsetLeft, lineWidth, handleWidth)).toEqual(20);
        expect(handle.getNewLeft(100, offsetLeft, lineWidth, handleWidth)).toEqual(90);
    });
});