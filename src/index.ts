import './styles.scss';
import './plugin/simpleslider';

$(document).ready(() => {  
  const sliders = document.querySelectorAll('.slider');

  sliders.forEach((val => {
    $(val).SimpleSlider(); 
  }));
});