# ハンバーガーメニュー

## 概要
ハンバーガーメニューUIデモページです。


## 実装手順

### CSS＆JS読み込み

body閉じタグ前に追加する。必要であれば`jquery.smooth-scroll.js`も読み込むと良い。

```html
<script src="/modal/lib/jquery-modal.js"></script>
<script src="/jquery.smooth-scroll/lib/jquery.smooth-scroll.js"></script>
```

### HTML
```html
<nav id="site_menu" aria-labelledby="site_menu_label">
  <p id="site_menu_label" style="display: none;">サイトメニュー</p>
  <!-- BEGIN ハンバーガーメニューを開くボタン -->
  <button
    type="button"
    class="hamburger_menu_btn is_fixed"
    data-modal-open="hamburger_menu"
    aria-labelledby="hamburger_menu_btn_label"
  >
    <span id="hamburger_menu_btn_label" style="display:none">メニューを開く</span>
    <span class="btn_line"></span>
  </button>
  <!-- END ハンバーガーメニューを開くボタン -->
  <!-- モーダル ダイアログ ここから -->
  <dialog
    id="hamburger_menu"
    class="hamburger_menu_dialog"
    data-modal-dialog
    aria-labelledby="hamburger_menu_dialog_ttl"
  >

    <div class="dialog_content">
      <p id="hamburger_menu_dialog_ttl" style="display: none;">折りたたみメニュー</p>

      <ul>
        <li><a href="#demo_content1_ruke">ルーク</a></li>
        <li><a href="/hamburger-menu/scroll-fixed-button-fade/#demo_content1_bell">ベル</a></li>
        <li><a href="/hamburger-menu/scroll-fixed-button-fade/index.html#demo_content1_max">マックス</a></li>
      </ul>

      <button
        class="dialog_close"
        type="button"
        aria-labelledby="hamburger_menu_dialog_close"
        data-modal-close
      >
        <span id="hamburger_menu_dialog_close" style="display:none">メニューを閉じる</span>
      </button>
    </div>

  </dialog>
  <!-- モーダル ダイアログ ここまで -->
</nav>
```

```JavaScript
// ----------------------------------------------------------------------------
// HamburgerMenu
// ----------------------------------------------------------------------------
$(function(){

  let $hamburger_menu =  $('#hamburger_menu'),
      $hamburger_menu_open = $('[data-modal-open="hamburger_menu"]');
      active_class = 'is_active';

  $hamburger_menu.on('modal.after_open', function() {
    $hamburger_menu_open.addClass(active_class);
  });

  $hamburger_menu.on('modal.after_close', function() {
    $hamburger_menu_open.removeClass(active_class);
  });



  $('a:not([data-smooth-scroll="false"])').on('smooth_scroll.before', function () {

    let $hamburger_menu =  $('#hamburger_menu');
    $hamburger_menu.modal('close');
  });
});




// ----------------------------------------------------------------------------
// SmoothScroll
// ----------------------------------------------------------------------------
$('a:not([data-smooth-scroll="false"])').smoothScroll({
  beforeScroll: function () {

    $('a:not([data-smooth-scroll="false"])').trigger('smooth_scroll.before');
  }
});

```


## テスト

- [ ] ページ内リンクをクリックしたときにモーダルダイアログが閉じるか
