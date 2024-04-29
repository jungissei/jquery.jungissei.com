// ----------------------------------------------------------------------------
// TOC
//
// Categories INDEX PAGE （TOP）
// DEMO INDEX PAGE
// ハンバーガーメニュー
// コピーライト
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// Categories INDEX PAGE （TOP）
// ----------------------------------------------------------------------------
$(function() {

  // UIカテゴリーアイテムのコンテナを取得
  let $ui_category_items = $('[data-site-nav="ui_category_items"]');

  // コンテナが存在しない場合は処理を終了
  if ($ui_category_items.length === 0) return;

  // カテゴリーアイテムのデータを取得
  $.ajax({
    url: '/url.json',
    type: 'GET',
    dataType: 'json',
  }).done(function(category_items) {
    // カテゴリーアイテムの追加
    add_ui_category_items(category_items);
  }).fail(function(error) {
    console.error('Error:', error);
  });

  // カテゴリーアイテムを追加する関数
  function add_ui_category_items(category_items) {
    let html = '';
    $.each(category_items, function() {
      html += get_ui_category_item_template(this);
    });
    $ui_category_items.append(html);
  }
});






// ----------------------------------------------------------------------------
// DEMO INDEX PAGE
// ----------------------------------------------------------------------------
// --------------------------------------
// カテゴリ一覧 ナビゲーション
// --------------------------------------
$(function() {
  // UIカテゴリーアイテムのコンテナを取得
  let $nav_items = $('[data-site-nav="nav_items"]');

  // コンテナが存在しない場合は処理を終了
  if ($nav_items.length === 0) return;

  // カテゴリーアイテムのデータを取得し、UIに追加
  fetch_category_items();

  // カテゴリーアイテムのデータを取得する関数
  function fetch_category_items() {
    $.ajax({
      url: '/url.json',
      type: 'GET',
      dataType: 'json',
    }).done(function(category_items) {
      add_nav_items(category_items);
    }).fail(function(error) {
      console.error('Error:', error);
    });
  }

  // カテゴリーアイテムをUIに追加する関数
  function add_nav_items(category_items) {
    let html = '';
    $.each(category_items, function() {
      html += get_nav_item_template(this);
    });
    $nav_items.append(html);

    // カテゴリーアイテムの完了後の処理を設定
    handle_nav_items_appended(category_items);
  }

  // カテゴリーアイテムが追加された後の処理を行う関数
  function handle_nav_items_appended(category_items) {
    let interval_id = setInterval(function() {
      if ($nav_items.find('.nav_item').length === category_items.length * $nav_items.length) {
        $nav_items.trigger('appended', [category_items]);
        clearInterval(interval_id);
      }
    }, 100);
  }

  // カテゴリーアイテムテンプレートを取得する関数
  function get_nav_item_template(category_item) {
    let current_page = is_current_page(category_item.category_slug) ? ' aria-current="page"' : '';
    return `<li class="nav_item"${current_page} data-category-slug="${category_item.category_slug}">
              <a href="/${category_item.category_slug}" class="item_link">
                <span class="item_name">${category_item.category_name}</span>
              </a>
            </li>`;
  }

  // 現在のページかどうかを判定する関数
  function is_current_page(category_slug) {
    let url_path = window.location.pathname;
    let url_segments = url_path.split('/').filter(Boolean);
    return category_slug === url_segments[0];
  }

  // 'appended'イベントが発生した際の処理を定義
  $nav_items.on('appended', function(event, category_items) {
    $.each(category_items, function() {
      fetch_demo_items(this.category_slug);
    });
  });

  // デモアイテムのデータを取得する関数
  function fetch_demo_items(category_slug) {
    $.ajax({
      url: `/${category_slug}/demos.json`,
      type: 'GET',
      dataType: 'json',
    }).done(function(demo_items) {
      update_nav_item_with_demo_count(category_slug, demo_items.length);
    }).fail(function(error) {
      console.error('Error:', error);
    });
  }

  // ナビゲーションアイテムにデモ数を追加する関数
  function update_nav_item_with_demo_count(category_slug, demo_items_length) {
    let $nav_item = $nav_items.find(`[data-category-slug="${category_slug}"]`);
    $nav_item.each(function() {
      let $this = $(this);
      if ($this.find('.item_demos_length').length === 0) {
        $this.find('.item_link').append(`<span class="item_demos_length"><span class="length_label">デモの数</span>${demo_items_length}</span>`);
      }
    });
  }
});



// --------------------------------------
// デモ一覧
// --------------------------------------
$(function(){

  let $demo_list = $('[data-table-demo-list]');

  if($demo_list.length === 0) return;

  fetch_demo_items();

  function fetch_demo_items() {

    let current_page_category_slug = get_current_page_category_slug();

    $.ajax({
      url: `/${current_page_category_slug}/demos.json`,
      type: 'GET',
      dataType: 'json',
    }).done(function(demo_items) {
      add_demo_items(demo_items);
    }).fail(function(error) {
      console.error('Error:', error);
    });
  }

  function get_current_page_category_slug() {

    let url_path = window.location.pathname;
    return url_path.split('/').filter(Boolean);
  }

  function add_demo_items(demo_items){

    let html;

    $.each(demo_items, function(){

      html += `
        <tr>
          <th><a href="/modal/${this.demo_slug}/">${this.demo_name}</a></th>
          <td>${this.demo_description}</td>
        </tr>
      `;
    });


    $demo_list.find('tbody').append(html);
  }

});





// ----------------------------------------------------------------------------
// ハンバーガーメニュー
// ----------------------------------------------------------------------------
$(function(){

  let $hamburger_menu        = $('#hamburger_menu'),        // ハンバーガーメニュー
      $hamburger_menu_off_bg = $('#hamburger_menu_off_bg'), // ハンバーガーメニューオフエリア
      $hamburger_menu_open   = $('#hamburger_menu_open'),   // ハンバーガーメニュー開くボタン
      $hamburger_menu_close  = $('#hamburger_menu_close'),  // ハンバーガーメニュー閉じるボタン
      open_flag              = true,                        // ハンバーガーメニュー開くフラグ
      close_flag             = true;                        // ハンバーガーメニューとじるフラグ

  // --------------------------------------
  // イベント関連
  // --------------------------------------
  /**
   * ハンバーガーメニュー開くボタンクリック時
   */
  $hamburger_menu_open.on('click', function(){

    if(!is_hamburger_menu_open() && open_flag == false) return;
    open_flag = false;
    setTimeout(function(){ open_flag = true; }, 500);

    open_hamburger_menu();
  });

  /**
   * ハンバーガーメニュー閉じるボタンクリック時
   */
  $hamburger_menu_close.on('click', function(){

    if(is_hamburger_menu_open() && close_flag == false) return;
    close_flag = false;
    setTimeout(function(){ close_flag = true; }, 500);

    close_hamburger_menu();
  });

  /**
   * ハンバーガーメニューオフエリアクリック時
   */
  $hamburger_menu_off_bg.on('click', function(){

    if(is_hamburger_menu_open() && close_flag == false) return;
    close_flag = false;
    setTimeout(function(){ close_flag = true; }, 500);

    close_hamburger_menu();
  });

  /**
   * キーボード押下時
   */
  $(window).keyup(function (event) {

    let event_key = event.key;

    // Escキー 押下時
    if (is_hamburger_menu_open() && event_key === 'Escape') {

      if(close_flag == false) return;
      close_flag = false;
      setTimeout(function(){ close_flag = true; }, 500);

      close_hamburger_menu();

      return;
    }

    // Tabキー 押下時
    if (is_hamburger_menu_open() && event_key === 'Tab') {

      let $event_target            = $(event.target),  // タブフォーカスされた要素
          $hamburger_menu_tabbable = $hamburger_menu   // ハンバーガーメニュー中のタブフォーカス可能な要素
            .find('[tabindex], a, button, :input, [contenteditable=true]')
            .not('[tabindex=-1], :disabled, [data-focus-trap]');

      // ハンバーガーメニュー以外にフォーカスした時
      if ($event_target.closest($hamburger_menu).length === 0) {

        $hamburger_menu_tabbable.eq(0).trigger('focus');
        return;
      }

      // data-focus-trap="begin"にフォーカスした時
      if ($event_target.data('focus-trap') === 'begin') {

        $hamburger_menu_tabbable.eq(-1).trigger('focus');
        return;
      }

      // data-focus-trap="end"にフォーカスした時
      if ($event_target.data('focus-trap') === 'end') {

        $hamburger_menu_tabbable.eq(0).trigger('focus');
        return;
      }
    }
  });

  /**
   * Windowリサイズ時
   */
  $(window).on('resize', function(){

    if(
      window.matchMedia( '(min-width: 1025px)' ).matches
      && is_hamburger_menu_open()
    ){
      close_hamburger_menu();
    }
  });

  // --------------------------------------
  // メソッド
  // --------------------------------------
  /**
   * ハンバーガーメニュー開が開いた状態か
   */
  function is_hamburger_menu_open(){
    return $hamburger_menu.hasClass('is_show') &&
            $hamburger_menu_off_bg.addClass('is_show');
  }

  /**
   * ハンバーガーメニュー開く
   */
  function open_hamburger_menu(){

    if(is_hamburger_menu_open() === false){

      $hamburger_menu_open.attr('aria-expanded', true);
      $hamburger_menu_close.attr('aria-expanded', true);
      $hamburger_menu.addClass('is_show');
      $hamburger_menu_off_bg.addClass('is_show');
    }
  }

  /**
   * ハンバーガーメニュー閉じる
   */
  function close_hamburger_menu(){
    if(is_hamburger_menu_open()){
      $hamburger_menu_open.attr('aria-expanded', false);
      $hamburger_menu_close.attr('aria-expanded', false);
      $hamburger_menu.removeClass('is_show');
      $hamburger_menu_off_bg.removeClass('is_show');
    }
  }
});


// ----------------------------------------------------------------------------
// コピーライト
// ----------------------------------------------------------------------------
/**
 * コピーライトの年を追加
 */
$(function(){
  let start_year = 2022, // 開始年を代入する
      current_date = new Date(),
      current_year = current_date.getFullYear (),
      text = start_year;

  if(start_year < current_year){
    text += '-' + current_year;
  }

  $('#copyright_year').text(text);
});
