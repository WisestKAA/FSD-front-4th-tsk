import './styles.scss';
import './plugin/simpleslider';

$(document).ready(() => {  
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach((val => {
    $(val).SimpleSlider({currentVal: [50,0], step: 30}); 
  }));

  const sliderV = document.querySelector('.slider-v');
  $(sliderV).SimpleSlider({isHorizontal: false, minVal: -100});
});