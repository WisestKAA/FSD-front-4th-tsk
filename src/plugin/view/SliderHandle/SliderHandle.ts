import AbstractElement from '../AbstractElement/AbstractElement';
import StyleClasses from '../StyleClasses';
import LiteEvent from '../../LiteEvent/LiteEvent';
import ILiteEvent from '../../LiteEvent/ILiteEvent';
import SliderDirection from '../SliderDirection';
import ISliderHandleOptions from './ISliderHandleOptions';
import ISliderHandle from './ISliderHandle';
import ISliderLine from '../SliderLine/ISliderLine';

class SliderHandle extends AbstractElement implements ISliderHandle {
    public $elem: JQuery<HTMLElement>;
    protected shiftX: number;
    protected shiftXR: number;
    protected shiftY: number;
    protected shiftYT: number;
    protected position: number;
    protected line: ISliderLine;
    protected onPositionChanged: LiteEvent<SliderDirection>;
    protected isHorizontal: boolean;
    protected maxPosition: number;
    protected isRange: boolean;
    protected isFrom: boolean;

    constructor (sliderHandleOptions: ISliderHandleOptions) {
      super();
      this.line = sliderHandleOptions.sliderLine;
      this.isHorizontal = sliderHandleOptions.isHorizontal;
      this.isRange = sliderHandleOptions.isRange;
      this.isFrom = sliderHandleOptions.isFrom;
      this.init();
      this.addEvents();
    }

    protected init (): void {
      this.$elem =  this.isHorizontal ? 
        $('<div>').addClass(StyleClasses.HANDLE) : 
        $('<div>').addClass([StyleClasses.HANDLE, StyleClasses.HANDLEV]);
      this.position = 0;
      this.shiftX = 0;
      this.shiftXR = 0;
      this.shiftY = 0;
      this.shiftYT = 0;
      this.onPositionChanged = new LiteEvent<SliderDirection>();
    }

    protected addEvents (): void {
      const that = this;

      this.$elem.on('mousedown', function (event) {
        that.onMouseDown(this, event);
      });

      this.$elem.on('dragstart', false);
    }

    protected onMouseDown (elem: HTMLElement, event: JQuery.MouseDownEvent): void {
      const that = this;
      event.preventDefault();
      this.shiftX = event.clientX - elem.getBoundingClientRect().left;
      this.shiftXR = event.clientX - elem.getBoundingClientRect().right;
      this.shiftY = event.clientY - elem.getBoundingClientRect().top;
      this.shiftYT = event.clientY - elem.getBoundingClientRect().bottom;

      $(document).on('mousemove', (event) => {
        if (that.isHorizontal) {
          that.onMouseMoveX(event);
        } else {
          that.onMouseMoveY(event);
        }
      });

      $(document).on('mouseup', () => {
        that.onMouseUp();
      });
    }

    protected onMouseMoveX (event: JQuery.MouseMoveEvent): void {
      const lineHTMLElement = this.line.$elem;
      const offset = lineHTMLElement.offset().left;
      const lineWidth = lineHTMLElement.outerWidth();
      const handleWidth = this.$elem.outerWidth();
      if (this.isFrom) {
        const newLeft = this.getNewLeft(event.pageX, offset, lineWidth, handleWidth); 
        this.setNewPosition(newLeft, SliderDirection.LEFT);
      } else {
        const newRight = this.getNewRight(event.pageX, offset, lineWidth, handleWidth); 
        this.setNewPosition(newRight, SliderDirection.RIGHT);
      }        
    }

    protected onMouseMoveY (event: JQuery.MouseMoveEvent): void {
      const lineHTMLElement = this.line.$elem;
      const offset = lineHTMLElement.offset().top;
      const lineHieght = lineHTMLElement.outerHeight();
      const handleHeight = this.$elem.outerHeight();
      if (this.isFrom) {
        const newBot = this.getNewBot(event.pageY, offset, lineHieght, handleHeight); 
        this.setNewPosition(newBot, SliderDirection.BOTTOM);
      } else {
        const newTop = this.getNewTop(event.pageY, offset, lineHieght, handleHeight); 
        this.setNewPosition(newTop, SliderDirection.TOP);
      }
    }

    protected onMouseUp (): void{
      $(document).off('mousemove');
      $(document).off('mouseup');
    }

    protected getNewLeft (
      pageX: number, 
      offsetLeft: number, 
      lineWidth: number, 
      handleWidth: number
    ): number {
      const newLeft = pageX - this.shiftX - offsetLeft;
      const newLeftPosition = this.getCorrectPositionFrom(newLeft, lineWidth, handleWidth);
      return newLeftPosition;
    }

    protected getNewRight (
      pageX: number, 
      offsetLeft: number, 
      lineWidth: number, 
      handleWidth: number
    ): number {
      const newRight = pageX - this.shiftXR - offsetLeft;
      const newRightPosition = this.getCorrectPositionTo(newRight, lineWidth, handleWidth);        
      return 100 - newRightPosition;
    }

    protected getNewBot (
      pageY: number, 
      offsetTop: number, 
      lineHieght: number, 
      handleHeight: number
    ): number {
      const newBot = lineHieght - (pageY - offsetTop - this.shiftYT); 
      const newBotPosition = this.getCorrectPositionFrom(newBot, lineHieght, handleHeight);
      return newBotPosition;
    }

    protected getNewTop (
      pageY: number, 
      offsetTop: number, 
      lineHieght: number, 
      handleHeight: number
    ): number {
      const newTop = lineHieght - (pageY - offsetTop - this.shiftY);
      const newBTopPosition = this.getCorrectPositionTo(newTop, lineHieght, handleHeight);
      return 100 - newBTopPosition;
    }

    protected getCorrectPositionFrom (
      newCoordinate: number, 
      linesize: number, 
      handleSize: number
    ): number {
      let coordinate = newCoordinate
      if (coordinate < 0) {
        return 0;
      }
      const edge = linesize - handleSize;
      if (coordinate > edge) {
        coordinate = edge;
      }
      const correctPosition = (100 * coordinate) / linesize;
      return correctPosition;
    }

    protected getCorrectPositionTo (
      newCoordinate: number, 
      linesize: number, handleSize: number
    ): number {
      let coordinate = newCoordinate  
      if (coordinate < handleSize) {
        coordinate = handleSize; 
      }
      if (coordinate > linesize) {
        coordinate = linesize;
      }
      const correctPosition = (100 * coordinate) / linesize;
      return correctPosition;
    }
    
    public setNewPosition (position: number, direction: SliderDirection): void {
      this.setCurrentPosition(position, direction);
      this.onPositionChanged.trigger(direction);
    }

    public getSliderHandleMaxPosition (): number {        
      const lineSize = this.isHorizontal ? 
        this.line.$elem.outerWidth() : 
        this.line.$elem.outerHeight();
      const handleSize = this.getHandleSize();
      const maxWidth = lineSize - handleSize;
      this.maxPosition = (100 * maxWidth) / lineSize;
      return this.maxPosition;        
    }

    public setCurrentPosition (position: number, direction: SliderDirection): void{
      this.position = position;
      if (position >= this.getSliderHandleMaxPosition()) {
        this.$elem.attr('style', `${direction}: ${position}%; z-index: 100;`)
      } else {
        this.$elem.attr('style', `${direction}: ${position}%`);
      }
    }

    public getHandleSize (): number {
      return this.isHorizontal ? this.$elem.outerWidth() : this.$elem.outerHeight();
    }

    public getPosition (): number {
      return this.position;
    }

    public get positionChangedEvent (): ILiteEvent<SliderDirection> {
      return this.onPositionChanged.expose();
    }
}

export default SliderHandle;
