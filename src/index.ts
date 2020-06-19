import './styles.scss';
import './plugin/simpleslider';

$(document).ready(() => {  
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach((val => {
    $(val).SimpleSlider({currentVal: [50,0], step: 30, isRangeLineEnabled: true}); 
  }));

  const sliderV = document.querySelector('.slider-v');
  $(sliderV).SimpleSlider({isHorizontal: false, minVal: -100});

  const sliderR = document.querySelector('.slider-r');
  $(sliderR).SimpleSlider({isRange: true, currentVal: [10, 80], isRangeLineEnabled: true});
  const sliderRV = document.querySelector('.slider-rv');
  $(sliderRV).SimpleSlider({isRange: true, currentVal: [-90, 50], isRangeLineEnabled: true, minVal:-100, maxVal: 100, isHorizontal: false});
});