$(function() {

  // --------------------------------------
  // 基本設定
  // --------------------------------------
  const $go_top_button    = $('#go_top'); // ボタンのセレクタを設定

  // ボタンが存在しない場合は処理を中断
  if ($go_top_button.length === 0) return;

  const top_area_selector = 'header';     // ページ上部のセレクタを設定
  const fixed_class       = 'is_fixed';   // ボタンを固定するときに付与するクラス名

  // --------------------------------------
  // ウィンドウのロードとスクロールイベント時に表示・非表示切り替え
  // --------------------------------------
  $(window).on('load scroll', function() {

    const $window = $(window);
    const current_window_top = $window.scrollTop();

    // ページの上部セクションの位置を取得
    const $top_area = $(top_area_selector);
    const top_area_bottom = $top_area.offset().top + $top_area.outerHeight();

    // 現在のスクロール位置がページ上部セクションの下にある場合、ボタンにクラスを追加
    if (current_window_top > top_area_bottom) {
      $go_top_button.addClass(fixed_class);
    } else {
      $go_top_button.removeClass(fixed_class);
    }
  });
});
