import { SliderHandle } from "../../../src/plugin/view/SliderHandle";
import { SliderLine } from "../../../src/plugin/view/SliderLine";
import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import '../../../src/plugin/simpleslider';
import { SliderDirection } from "../../../src/plugin/view/SliderDirection";

class MockEventTest {
    handle: SliderHandle;
    constructor(handle: SliderHandle){
        this.handle = handle;
        this.handle.positionChangedEvent.on(()=>{this.event()});
    }
    event(): void {}
}

describe('Check SliderHandle',()=>{    
    $(document.head).append('<link href="http://localhost:8080/style.css" rel="stylesheet">'); 

    describe('Check SliderHandle / common',()=>{
        let line = new SliderLine(true);
        let handle = new SliderHandle({sliderLine: line, isHorizontal: true, isFrom: true, isRange: false});       

        describe('Check SliderHandle / common / init', () => {
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

            it('The $elem property must be defined', () => {
                expect(handle.$elem).toBeDefined();
            });

            it('The position property must be defined', () => {
                expect(handle.position).toBeDefined();
            });

            it('The onPositionChanged property must be defined', () => {
                expect(handle.onPositionChanged).toBeDefined();
            });            

            it('The isHorizontal property must be defined', () => {
                expect(handle.isHorizontal).toBeDefined();
            });

            it('The isRange property must be defined', () => {
                expect(handle.isRange).toBeDefined();
            });

            it('The isFrom property must be defined', () => {
                expect(handle.isFrom).toBeDefined();
            });
        });        

        it('After the onmousedown element event, the document should call the event handler function for onmousemove and onmouseup', () =>{
            let spyMouseMove = spyOn(handle, 'onMouseMoveX');
            let spyMouseUp = spyOn(handle, 'onMouseUp');
            handle.$elem.mousedown();
            $(document).mousemove();
            $(document).mouseup();
            expect(spyMouseMove).toHaveBeenCalled();
            expect(spyMouseUp).toHaveBeenCalled();
        });

        it('After the onmouseup document event, the document should\'t call the event handler function for onmousemove and onmouseup', () =>{
            handle.isFrom = false;
            handle.$elem.mousedown();
            $(document).mouseup();
            let spyMouseMove = spyOn(handle, 'onMouseMoveX');
            let spyMouseUp = spyOn(handle, 'onMouseUp');
            $(document).mousemove();
            $(document).mouseup();
            expect(spyMouseMove).not.toHaveBeenCalled();
            expect(spyMouseUp).not.toHaveBeenCalled();
            handle.isFrom = true;
        });

        it('After the onmousemove document event, element must have attribute "style"', () => {            
            handle.$elem.mousedown();
            $(document).mousemove(); 
            expect(handle.$elem.attr('style')).toBeDefined();
        });         

        it("After the handle has changed position, the positionChangedEvent event should triggered", () => {
            let mock = new MockEventTest(handle);
            let spy = spyOn(mock, "event");
            handle.setNewPosition(handle.position + 1, SliderDirection.LEFT);
            expect(spy).toHaveBeenCalled();
        });

        it("The getSliderHandleMaxPosition function shuld return the maximum position of the handle", () => {
            line.$elem.outerWidth(100);
            handle.$elem.outerWidth(16);
            expect(handle.getSliderHandleMaxPosition()).toBe(84);
        });

        it("The getCorrectPosition function shuld return position from 0 to SliderHandleMaxPosition", () => {
            let maxPosition = 84;
            let lineSize = 100;
            let handleSize = 16;
            expect(handle.getCorrectPositionFrom(-1, lineSize, handleSize)).toBe(0);
            expect(handle.getCorrectPositionFrom(50, lineSize, handleSize)).toBe(50);
            expect(handle.getCorrectPositionFrom(2000, lineSize, handleSize)).toBe(maxPosition);
        });
    });

    describe('Check SliderHandle / horizontal',()=>{
        let line = new SliderLine(true);
        let handle = new SliderHandle({sliderLine: line, isHorizontal: true, isFrom: true, isRange: true});

        it("The handle should be in line area", () =>{
            let offsetLeft = 0;
            let lineWidth = 100;
            let handleWidth = 10;
            expect(handle.getNewLeft(-10, offsetLeft, lineWidth, handleWidth)).toEqual(0);
            expect(handle.getNewLeft(20, offsetLeft, lineWidth, handleWidth)).toEqual(20);
            expect(handle.getNewLeft(100, offsetLeft, lineWidth, handleWidth)).toEqual(90);
        });
    
        it("The setNewPosition function should call the setCurrentPosition function and trigered the onPositionChanged event", () => {
            let spy = spyOn(handle, "setCurrentPosition");
            let spyT = spyOn(handle.onPositionChanged, "trigger");
            handle.setNewPosition(50, SliderDirection.LEFT);
            expect(spy).toHaveBeenCalled();
            expect(spyT).toHaveBeenCalled();
        });
        
        it("The setNewPosition function should set position to teh HTML element and to the property position", () =>{
            handle.setNewPosition(50, SliderDirection.LEFT);
            expect(handle.$elem.attr('style')).toBe('left: 50%')
            handle.setNewPosition(50, SliderDirection.RIGHT);            
            expect(handle.$elem.attr('style')).toBe('right: 50%')
        });

        it("The getNewRight function should retern new right position", () => {
            let offsetLeft = 5;          
            let lineWidth = 100;
            let handleWidth = 5;
            expect(handle.getNewRight(25, offsetLeft, lineWidth, handleWidth)).toBe(80);
            expect(handle.getNewRight(0, offsetLeft, lineWidth, handleWidth)).toBe(95);
            expect(handle.getNewRight(100, offsetLeft, lineWidth, handleWidth)).toBe(5);
        });


    });

    describe('Check SliderHandle / vertical',()=>{
        let line = new SliderLine(false);        
        let handle = new SliderHandle({sliderLine: line, isHorizontal: false, isFrom: true, isRange: true});        

        it("The handle should be in line area (bottom)", () =>{
            let li = new SliderLine(false);        
            let h = new SliderHandle({sliderLine: li, isHorizontal: false, isFrom: true, isRange: true}); 
            let offsetBot = 0;
            let lineHeight = 100;
            let handleHeight = 10;
            expect(h.getNewBot(110, offsetBot, lineHeight, handleHeight)).toEqual(0);
            expect(h.getNewBot(80, offsetBot, lineHeight, handleHeight)).toEqual(20);
            expect(h.getNewBot(0, offsetBot, lineHeight, handleHeight)).toEqual(90);
        });

        it("The handle should be in line area (top)", () =>{
            let l = new SliderLine(false);        
            let hand = new SliderHandle({sliderLine: l, isHorizontal: false, isFrom: false, isRange: true});
            let offsetTop = 0;
            let lineHeight = 100;
            let handleHeight = 10;
            expect(hand.getNewTop(110, offsetTop, lineHeight, handleHeight)).toEqual(90);
            expect(hand.getNewTop(80, offsetTop, lineHeight, handleHeight)).toEqual(80);
            expect(hand.getNewTop(0, offsetTop, lineHeight, handleHeight)).toEqual(0);
        });

        it('After the onmousedown element event, the document should call the event handler function for onmousemove and onmouseup', () =>{
            let spyMouseMove = spyOn(handle, 'onMouseMoveY');
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
            let spyMouseMove = spyOn(handle, 'onMouseMoveY');
            let spyMouseUp = spyOn(handle, 'onMouseUp');
            $(document).mousemove();
            $(document).mouseup();
            expect(spyMouseMove).not.toHaveBeenCalled();
            expect(spyMouseUp).not.toHaveBeenCalled();
        });        
        
        it("The setNewPosition function should set position to teh HTML element and to the property position", () =>{
            handle.setNewPosition(50, SliderDirection.TOP);
            expect(handle.$elem.attr('style')).toBe('top: 50%')
            handle.setNewPosition(50, SliderDirection.BOTTOM);            
            expect(handle.$elem.attr('style')).toBe('bottom: 50%')
        });

        it('After the onmousedown element event, the document should call the event handler function for onmousemoveY', () =>{
            let spyMouseMove = spyOn(handle, 'onMouseMoveY');
            handle.$elem.mousedown();
            $(document).mousemove();
            $(document).mouseup();
            expect(spyMouseMove).toHaveBeenCalled();
        });

        it("The getCorrectPositionTo function shuld return position from handleSize to 100", () => {          
            let lineSize = 100;
            let handleSize = 16;
            expect(handle.getCorrectPositionTo(0, lineSize, handleSize)).toBe(handleSize);
            expect(handle.getCorrectPositionTo(50, lineSize, handleSize)).toBe(50);
            expect(handle.getCorrectPositionTo(2000, lineSize, handleSize)).toBe(lineSize);
        });
    });        
});