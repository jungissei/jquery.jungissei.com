$(function(){

  let swiper_block     = '.swiper-block';     // スライダー全体を囲む要素
  let swiper_container = '.swiper-container'; // スライダーアイテムを囲む要素

  // スライダーアイテムが存在しない場合は処理を中断
  if($(swiper_block + ' ' + swiper_container).length === 0){
    return;
  }




  let swiper_thumbnail = new Swiper(swiper_block + ' ' + swiper_container, {
    effect: 'fade',
    pagination: {
      el: swiper_block + ' ' + swiper_pagination,
      clickable: true
    },
    navigation: false,
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


  let swiper_pagination  = '.swiper-pagination';  // ページネーション要素

  new Swiper(swiper_block + ' ' + swiper_container, {
    effect: 'fade',
    thumbs: {
      swiper: swiper_thumbnail,
    },
    pagination: {
      el: swiper_block + ' ' + swiper_pagination,
      clickable: true
    },
    navigation: false,
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
