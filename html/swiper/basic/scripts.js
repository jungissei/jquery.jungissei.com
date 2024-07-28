
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
    },
    // キーボード操作
    keyboard: {
      enabled: true,
    },
    // aria-labelの内容を変更
    a11y: {
      containerMessage:'デモのカルーセル',
      prevSlideMessage: '前のスライドへ',
      nextSlideMessage: '次のスライドへ',
      slideLabelMessage:'{{index}}枚目のスライド',
      paginationBulletMessage: '{{index}}枚目のスライドを表示'
    }
  });

});
