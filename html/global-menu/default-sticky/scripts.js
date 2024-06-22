// --------------------------------------
// 固定ヘッダー横スクロール対応
// --------------------------------------
$(window).on('scroll', function(){

  if (window.matchMedia( '(min-width: 768px)' ).matches) {
    let $header_inner = $('#template_header > .layout_inner'); // position:fixed; が付与されている要素を設定

    if($header_inner.length > 0 && $header_inner.css('position') === 'fixed'){

      let window_scroll_left = parseInt($(window).scrollLeft());
      let left_value = (window_scroll_left == 0) ? '' : -window_scroll_left;

      // 横スクロールに対応するため、leftプロパティを調整
      $header_inner.css('left', left_value);
    }
  }
});
