import IPresenter from '../../../../src/plugin/presenter/IPresenter';
import SliderDirection from '../../../../src/plugin/view/SliderDirection';

class MockPresenter implements IPresenter {
  lineClicked(position: number): void {
    throw new Error('Method not implemented.');
  }

  scaleClicked(valueMock: number): void {}

  sliderHandleChangedPosition(directionMock: SliderDirection): void {}
}

export default MockPresenter;
