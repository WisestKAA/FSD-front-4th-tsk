import IPresenter from '../../../../src/plugin/presenter/IPresenter';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';

class MockPresenter implements IPresenter {
  scaleClicked(valueMock: number): void {}

  sliderHandleChangedPosition(directionMock: SliderDirection): void {}
}

export default MockPresenter;
