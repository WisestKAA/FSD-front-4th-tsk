import SliderDirection from '../view/SliderDirection';

interface IPresenter{
  sliderHandleChangedPosition(direction: SliderDirection): void;
  scaleClicked(value: number): void;
  lineClicked(position: number): void;
}

export default IPresenter;
