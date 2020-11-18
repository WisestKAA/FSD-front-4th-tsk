import { SliderCard } from './SliderCard';

$(document).ready(() => {
  const $sliderCards = $(document).find('.js-slider-card');
  $sliderCards.each((_, element) => {
    new SliderCard(element);
  });
});
