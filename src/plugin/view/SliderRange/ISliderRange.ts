import IElement from '../AbstractElement/IElement';

interface ISliderRange extends IElement{
    changeRangeLineTwo(positionFrom: number, positionTo: number): void;
    changeRangeLineOne(positionFrom: number, maxHandlePosition: number): void;
}

export default ISliderRange
