$(function(){

  // --------------------------------------
  // 基本設定
  // --------------------------------------
  let swiper_block     = '.swiper-block';     // スライダー全体を囲む要素
  let swiper_container = '.swiper-container'; // スライダーアイテムを囲む要素

  // Swiperインスタンスを格納する配列
  let swiperInstances = [];

  // スライダーの初期化関数
  function initializeSwiper() {
    // 既存のSwiperインスタンスを破棄
    swiperInstances.forEach(instance => {
      if (instance && instance.destroy) {
        instance.destroy(true, true);
      }
    });
    swiperInstances = [];

    // 各swiper-blockに対して個別に処理を適用
    $(swiper_block).each(function(index) {
      const $this = $(this);
      const $container = $this.find(swiper_container);

      // スライダーアイテムが存在しない場合は処理を中断
      if($container.length === 0){
        return;
      }

      // --------------------------------------
      // 以下処理
      // --------------------------------------
      let $swiper_button_next = $this.find('.swiper-button-next'); // 次のスライドボタン要素
      let $swiper_button_prev = $this.find('.swiper-button-prev'); // 前のスライドボタン要素

      // swiper_containerのwidthを取得
      const swiper_container_width = $container.outerWidth(true);

      // スライドアイテムを取得
      const originalSlides = $container.find('.swiper-slide').not('.swiper-slide-cloned');
      const totalSlides = originalSlides.length;
      const slideWidth = originalSlides.first().outerWidth(); // スライドの実際の幅を取得

      // クローンされたスライドを削除
      $container.find('.swiper-slide-cloned').remove();

      // スライドの合計幅がコンテナの幅を超えない場合は処理を中断
      if (totalSlides * slideWidth <= swiper_container_width) {
        $container.addClass('swiper-container-no-scroll');
        return;
      }

      $container.removeClass('swiper-container-no-scroll');

      // スライドアイテムを複製
      // @see https://codeyu.jp/blog/swiper-fix-width
      const clonedSlides = originalSlides.clone().addClass('swiper-slide-cloned');
      $container.find('.swiper-wrapper').append(clonedSlides);

      const swiper = new Swiper($container[0], {
        slidesPerView: 1.2,
        loop: true,
        centeredSlides: true,
        navigation: {
          nextEl: $swiper_button_next[0],
          prevEl: $swiper_button_prev[0]
        },
        spaceBetween: 15,
        breakpoints: {
          769: {
            slidesPerView: 'auto',
            spaceBetween: 0,
          }
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

      swiperInstances.push(swiper);

      // ナビゲーションボタンのクリックイベントを確認
      $swiper_button_next.on('click', function() {
        swiper.slideNext();
      });

      $swiper_button_prev.on('click', function() {
        swiper.slidePrev();
      });
    });
  }

  // 初期化
  initializeSwiper();

  // ウィンドウリサイズ時に再初期化
  let resizeTimer;
  $(window).resize(function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      initializeSwiper();
    }, 200);
  });
});
