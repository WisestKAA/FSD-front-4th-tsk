import SliderDirection from '../view/SliderDirection';

interface IPresenter{
    sliderHandleChangedPosition(direction: SliderDirection): void;
    scaleClicked(value: number): void;
}

export default IPresenter;
