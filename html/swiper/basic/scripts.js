$(function(){

  let swiper_block     = '.swiper-block';     // スライダー全体を囲む要素
  let swiper_container = '.swiper-container'; // スライダーアイテムを囲む要素

  // スライダーアイテムが存在しない場合は処理を中断
  if($(swiper_block + ' ' + swiper_container).length === 0){
    return;
  }


  let swiper_pagination  = '.swiper-pagination';  // ページネーション要素
  let swiper_button_next = '.swiper-button-next'; // 次のスライドボタン要素
  let swiper_button_prev = '.swiper-button-prev'; // 前のスライドボタン要素

  new Swiper(swiper_block + ' ' + swiper_container, {
    effect: 'fade',
    pagination: {
      el: swiper_block + ' ' + swiper_pagination,
      clickable: true
    },
    navigation: {
      nextEl: swiper_block + ' ' + swiper_button_next,
      prevEl: swiper_block + ' ' + swiper_button_prev
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
