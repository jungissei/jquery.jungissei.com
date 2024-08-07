// ----------------------------------------------------------------------------
// Go top
// ----------------------------------------------------------------------------

$(function() {

  // --------------------------------------
  // 基本設定
  // --------------------------------------
  const $go_top_button    = $('#go_top'); // ボタンのセレクタを設定

  // ボタンが存在しない場合は処理を中断
  if ($go_top_button.length === 0) return;

  // --------------------------------------
  // TOPに移動
  // --------------------------------------
  $go_top_button.on('click', function(event) {

    $.smoothScroll({
      scrollTo: 'body',
      beforeScroll: function () {

        $go_top_button.trigger('smooth_scroll.before');

      },
      afterScroll: function() {

        $('body').focus();
      }
    });

    return false;
  });
});
