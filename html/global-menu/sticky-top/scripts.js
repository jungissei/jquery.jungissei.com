// --------------------------------------
// ヘッダーが上にスクロールした際に追従する機能
// --------------------------------------
// CSSが読み込まれた後に実行する必要があるため、windowのloadイベント内で処理を行う
$(window).on('load', function() {

  // ヘッダー要素を取得し、固定用のクラスを操作する
  let $header = $('#template_header');

  // ヘッダー要素が存在しない場合は処理を中断
  if ($header.length === 0) return;

  // 固定時に適用するクラス名
  let fixed_class = 'is_fixed';
  // 上にスクロールした際に適用するクラス名
  let hide_class = 'is_hide';
  // 下にスクロールした際に適用するクラス名
  let show_class = 'is_show';
  // ヘッダーの高さと初期位置を取得
  let header_height = parseInt($header.outerHeight(), 10);
  // ヘッダーの上部の位置を取得
  let header_offset_top = parseInt($header.offset().top, 10);
  // スクロールによるヘッダーの表示状態を管理するための変数
  let last_window_scroll_top = parseInt($(window).scrollTop(), 10);

  // スクロールイベントを設定
  $(window).on('scroll', function() {

    let current_window_scroll_top = parseInt($(window).scrollTop(), 10);

    // スクロール位置によってヘッダーの固定を切り替え
    if (current_window_scroll_top > header_offset_top && !$header.hasClass(fixed_class)) {

      $header
        .addClass(fixed_class)
        .css('height', header_height);

    } else if (current_window_scroll_top < header_offset_top && $header.hasClass(fixed_class)) {

      $header
        .removeClass([fixed_class, hide_class, show_class])
        .css('height', '');
    }

    // スクロール方向に応じてヘッダーの表示/非表示を切り替え
    if (header_offset_top < current_window_scroll_top && last_window_scroll_top !== current_window_scroll_top) {

      if (last_window_scroll_top < current_window_scroll_top) {

        $header
          .removeClass(show_class)
          .addClass(hide_class);

      } else {

        $header
          .removeClass(hide_class)
          .addClass(show_class);
      }

      last_window_scroll_top = current_window_scroll_top;
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
