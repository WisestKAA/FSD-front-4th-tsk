import { StyleClasses } from "../../../src/plugin/view/StyleClasses";
import { Presenter } from "../../../src/plugin/presenter/Presenter";
import { View } from "../../../src/plugin/view/View";
import { SliderDirection } from "../../../src/plugin/view/SliderDirection";

describe('Check View', () => {
    let view : View;

    beforeEach(() => {
        let elem = $('<div class="slider1" style="width: 100px"></div>');
        $(document.body).append(elem);        
        let presenter = new Presenter(elem.get(0));
        view = presenter.view;
    });

    afterAll(()=>{$(document.body).html("");});

    describe('Check View / check inint property', () => {
        it('After initialization the element must be defined', () => {
            expect(view.slider).toBeDefined();
        });
    
        it('After initialization the line must be defined', () => {
            expect(view.line).toBeDefined();
        });
    
        it('After initialization the handle must be defined', () => {
            expect(view.handleFrom).toBeDefined();
        });
    
        it('After initialization the mainWrapper must be defined', () => {
            expect(view.mainWrapper).toBeDefined();
        });
    
        it('After initialization the currentValue must be defined', () => {
            expect(view.currentValueFrom).toBeDefined();
        });
    
        it('After initialization the presenter must be defined', () => {
            expect(view.presenter).toBeDefined();
        });
    });

    describe('Check View / check inint horizontal', () => {
        it('Tag of element must be DIV', () => {
            expect(view.slider.get(0).nodeName).toEqual('DIV');
        });
    
        it(`Element must have class '${StyleClasses.SLIDER}'`, () => {
            expect(view.slider.get(0).firstElementChild.classList.contains(StyleClasses.SLIDER)).toBeTrue();
        });
    
        // it(`Header with static current value must have element with class ${StyleClasses.CURRENT}`, () => {
        //     let $header = view.buildHeader();
        //     expect($header.get(0).firstElementChild.classList.contains(StyleClasses.CURRENT)).toBeTrue();
        // });
    });    

    describe('Check View / check inint vertical', () => {
        let el = $('<div class="sliderv" style="width: 100px"></div>');
        $(document.body).append(el);        
        let presenterv = new Presenter(el.get(0), {isHorizontal: false});
        let viewv = presenterv.view;

        it(`Element must have class '${StyleClasses.SLIDERV}'`, () => {
            expect(viewv.slider.get(0).firstElementChild.classList.contains(StyleClasses.SLIDERV)).toBeTrue();
        });
    });

    describe('Check View / check inint range', () => {
        let el = $('<div class="slider" style="width: 100px"></div>');
        $(document.body).append(el);        
        let presenterv = new Presenter(el.get(0), {isHorizontal: true, isRange: true});
        let view = presenterv.view;

        it("After initialization with option 'isRange' propertys handleFrom and handleTo must be defined", () => {
            expect(view.handleTo).toBeDefined();
            expect(view.handleFrom).toBeDefined();
        });        
        
    });

    describe('Check View / check inint range line', () => {
        let el = $('<div class="slider" style="width: 100px"></div>');
        $(document.body).append(el);        
        let presenterv = new Presenter(el.get(0), {isHorizontal: true, isRangeLineEnabled: true, isRange: true});
        let view = presenterv.view;

        it("After initialization with option 'isRangeLineEnabled' propertys range must be defined", () => {
            expect(view.range).toBeDefined();
        });
        
        it("The setRange function must call the changeRangeLineOne function: ", () => {            
            let spy = spyOn(view.range, "changeRangeLineOne")
            view.options.isRange = false;
            view.setRange(true);
            expect(spy).toHaveBeenCalled();      
        });

        it("The setRange function must call the changeRangeLineTwo function: ", () => {            
            let spy = spyOn(view.range, "changeRangeLineTwo")
            view.options.isRange = true;
            view.setRange(true);
            expect(spy).toHaveBeenCalled();      
        }); 
    });

    describe('Check View / check function', () => {
        it("The getSliderHandleLeftPosition function should return the current hadle position", () => {
            expect(view.getSliderHandlePosition(SliderDirection.LEFT)).toBe(view.handleFrom.position);
        });
    
        // it("The setCurrentValue function should change the value of the variable and the contents of the element in the CurrentValue object", () => {
        //     let beforCurrentValueVal = view.currentValueFrom.val;
        //     let beforCurrentValueElementContent = view.currentValueFrom.$elem.html();
        //     view.setCurrentValue([beforCurrentValueVal + 1,0]);
        //     let afterCurrentValueVal = view.currentValueFrom.val;
        //     let afterCurrentValueElementContent = view.currentValueFrom.$elem.html();
        //     expect(beforCurrentValueVal).not.toBe(afterCurrentValueVal);
        //     expect(beforCurrentValueElementContent).not.toBe(afterCurrentValueElementContent);
        // });
    
        // it("The getCurrentValue function should return current value", () => {
        //     expect(view.getCurrentValue()).toBe(view.currentValue.val);
        // });
    
        it("The setCurrentPosition function should change the value of the variable and the contents of the element in the SliderHandle object", () => {
            let beforSliderHandlePositionVal = view.handleFrom.position;
            let beforSliderHandlePositionElem = view.handleFrom.$elem.attr("style");
            view.setCurrentPosition(beforSliderHandlePositionVal+1, SliderDirection.LEFT);
            let afterSliderHandlePositionVal = view.handleFrom.position;
            let afterSliderHandlePositionElem = view.handleFrom.$elem.attr("style");
            expect(beforSliderHandlePositionVal).not.toBe(afterSliderHandlePositionVal);
            expect(beforSliderHandlePositionElem).not.toBe(afterSliderHandlePositionElem);
        });
    
        // it("The getLineWidth function should return the line width", () => {
        //     view.line.$elem.attr("style", "width: 100px;");
        //     expect(view.getLineWidth()).toBe(100);
        // });

        it("The setOrientation function must change orientation in all elements", () => {
            let mainDiv = view.slider.get(0).firstElementChild.classList.value;
            let line = view.line.$elem.get(0).classList.value;
            let wrapper = view.mainWrapper.$elem.get(0).classList.value;
            let handle = view.handleFrom.$elem.get(0).classList.value;
            let isHorizontal = view.handleFrom.isHorizontal;
            view.setOrientation({isHorizontal: !isHorizontal, isRange: false, isRangeLineEnabled: false, isVisibleCurrentValue: true});
            expect(mainDiv).not.toEqual(view.slider.get(0).firstElementChild.classList.value);
            expect(line).not.toEqual(view.line.$elem.get(0).classList.value);
            expect(wrapper).not.toEqual(view.mainWrapper.$elem.get(0).classList.value);
            expect(handle).not.toEqual(view.handleFrom.$elem.get(0).classList.value);
            expect(isHorizontal).not.toEqual(view.handleFrom.isHorizontal);
        });        

        it("The checkHandleIntersection function must call the setCurrentPosition and not to be true if positionFrom > maxPos - positionTo", () => {
            let spy = spyOn(view, "setCurrentPosition");
            expect(view.checkHandleIntersection(100, 5, SliderDirection.LEFT)).not.toBe(true);
            expect(spy).toHaveBeenCalled();
            expect(view.checkHandleIntersection(100, 5, SliderDirection.TOP)).not.toBe(true);

        });

        it("The checkHandleIntersection function must return false if positionFrom < maxPos - positionTo", () => {
            expect(view.checkHandleIntersection(-10, 5, SliderDirection.LEFT)).toBe(false);
        });
    });
});