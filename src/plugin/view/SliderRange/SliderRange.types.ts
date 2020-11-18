import { IElement } from '../AbstractElement/AbstractElement.types';

interface ISliderRange extends IElement{
  changeRangeLineTwo(positionFrom: number, positionTo: number): void;
  changeRangeLineOne(positionFrom: number, maxHandlePosition: number): void;
}

export { ISliderRange };
