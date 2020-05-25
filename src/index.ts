import './style.scss';
import './plugin/simpleslider';

$(document).ready(() => {  
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach((val => {
    $(val).SimpleSlider({isHorizontal: true, minVal: 0, maxVal: 100});
  }));
});