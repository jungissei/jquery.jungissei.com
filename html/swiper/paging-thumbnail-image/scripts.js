$(function(){

  // --------------------------------------
  // 基本設定
  // --------------------------------------
  let swiper_block     = '.swiper-block';                          // スライダー全体を囲む要素
  let swiper_container = swiper_block + ' ' + '.swiper-container'; // スライダーアイテムを囲む要素

  // スライダーアイテムが存在しない場合は処理を中断
  if($(swiper_container).length === 0){
    return;
  }

  // --------------------------------------
  // 以下処理
  // --------------------------------------
  let swiper_pagination  = swiper_block + ' ' + '.swiper-pagination-thumb';  // ページネーション要素
  let swiper_button_next = swiper_block + ' ' + '.swiper-button-next'; // 次のスライドボタン要素
  let swiper_button_prev = swiper_block + ' ' + '.swiper-button-prev'; // 前のスライドボタン要素

  new Swiper(swiper_container, {
    effect: 'fade',
    pagination: {
      el: swiper_pagination,
      clickable: true
    },
    navigation: {
      nextEl: swiper_button_next,
      prevEl: swiper_button_prev
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
    },
    on: {
      init: function() {
        let bullets = $(swiper_pagination + ' .swiper-pagination-bullet');
        let slides = $(swiper_container + ' .swiper-slide img');
        bullets.each(function(index, bullet) {
          if (slides[index]) {
            let img = $('<img>').attr('src', $(slides[index]).attr('src')).attr('alt', '');
            $(bullet).append(img);
          }
        });
      }
    }
  });
});
