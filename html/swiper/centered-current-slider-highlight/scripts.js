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
  let swiper_pagination  = swiper_block + ' ' + '.swiper-pagination';  // ページネーション要素
  let swiper_button_next = swiper_block + ' ' + '.swiper-button-next'; // 次のスライドボタン要素
  let swiper_button_prev = swiper_block + ' ' + '.swiper-button-prev'; // 前のスライドボタン要素

  new Swiper(swiper_container, {
    slidesPerView: 1.5, // 中央のスライドと左右のスライドの一部を表示
    centeredSlides: true,
    loop: true,
    spaceBetween: 15,
    observer: true, // DOM変更を監視（resize時もbreakpointsの変更を適用）
    observeParents: true, // 親要素の変更を監視（resize時もbreakpointsの変更を適用）
    breakpoints: {
      769: {
        slidesPerView: 3,
      }
    },
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
    }
  });
});
