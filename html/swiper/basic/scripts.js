
$(function(){
  let swiper_block = '.swiper-block ';

  new Swiper(swiper_block + '.swiper-container', {
    effect: 'fade',
    pagination: {
      el: swiper_block + '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: swiper_block + '.swiper-button-next',
      prevEl: swiper_block + '.swiper-button-prev'
    }
  });

});
