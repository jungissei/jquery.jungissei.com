// --------------------------------------
// ヘッダー 特定要素を過ぎたら追従
// --------------------------------------
$(window).on('load', function() {

  // ヘッダー要素を取得。この要素に、is_fixedを付与する。
  let $header = $('#template_header');


  // ヘッダー要素が存在しない場合、処理を中断
  if ($header.length === 0) return;

  // 固定時に適用するクラス名
  let fixed_class = 'is_fixed';
  // ヘッダーの高さを取得
  let header_height = parseInt($header.outerHeight(), 10);
  // ヘッダーの上部の位置を取得
  let header_offset_top = parseInt($header.offset().top, 10);
  // ヘッダーを固定するスクロール位置
  let fixed_enable_point = header_offset_top + header_height;
  // ヘッダーの固定を解除するスクロール位置
  let fixed_disable_point = header_offset_top;

  // スクロールイベントを設定
  $(window).on('scroll', function() {
    // 現在のスクロール位置を取得
    let curr_window_scroll_top = parseInt($(window).scrollTop(), 10);

    // スクロール位置が固定ポイントを超えた場合、ヘッダーを固定
    if (curr_window_scroll_top > fixed_enable_point && !$header.hasClass(fixed_class)) {
      $header
        .css('height', header_height)
        .addClass(fixed_class);
    }

    // スクロール位置が固定解除ポイント未満の場合、ヘッダーの固定を解除
    if (curr_window_scroll_top < fixed_disable_point && $header.hasClass(fixed_class)) {
      $header
        .removeClass(fixed_class)
        .css('height', '');
    }
  });

  // 初期スクロール位置での状態を確認
  $(window).trigger('scroll');
});



// --------------------------------------
// 固定ヘッダー横スクロール対応
// --------------------------------------
$(window).on('scroll', function(){

  let $header_inner = $('#template_header > .layout_inner'); // position:fixed; が付与されている要素を設定

  if($header_inner.length > 0 && $header_inner.css('position') === 'fixed'){

    let window_scroll_left = parseInt($(window).scrollLeft());
    let left_value = (window_scroll_left == 0) ? '' : -window_scroll_left;

    // 横スクロールに対応するため、leftプロパティを調整
    $header_inner.css('left', left_value);
  }
});
