// ----------------------------------------------------------------------------
// Global Menu
// ----------------------------------------------------------------------------
// --------------------------------------
// Sub Menu
// --------------------------------------
$(function(){

  // 設定変数
  let $submenu_item = $('#header_nav [data-submenu]'); // グローバルメニューアイテム
  let $submenu_item_button = $submenu_item.find('button'); // グローバルメニューアイテム ボタン要素
  let show_class = 'is_show'; // 表示切替クラス


  // グローバルナビアイテムボタンの初期化
  $(function(){
    $submenu_item_button.each(function(){
      $(this).closest('[data-submenu]').removeClass(show_class);
    });
  });


  // クリック時の処理
  $submenu_item_button.on('click', function(event){
    event.preventDefault();

    // クリックしたアイテム以外のアイテムを非表示する
    $submenu_item_button.not(event.target).closest('[data-submenu]').removeClass(show_class);

    // クリックしたアイテムを表示切替
    $(this).closest('[data-submenu]').toggleClass(show_class);
  });


  // フォーカス時の処理
  $submenu_item_button.on('focus', function(event){

    // フォーカスしたアイテム以外のアイテムを非表示する
    $submenu_item_button.not(event.target).closest('[data-submenu]').removeClass(show_class);

    // フォーカスしたアイテムを表示切替
    $(this).closest('[data-submenu]').toggleClass(show_class);
  });


  // マウスオーバー時の処理
  $submenu_item.on('mouseover', function(event){

    // マウスオーバーしたアイテム以外のアイテムを非表示する
    $submenu_item.not(event.target).removeClass(show_class);

    // マウスオーバーしたアイテムを表示切替
    $(this).toggleClass(show_class);
  });


  // マウスリーブ時の処理
  $submenu_item.on('mouseleave', function(){

    $submenu_item.each(function(){
      $(this).removeClass(show_class);
    });
  });
});
