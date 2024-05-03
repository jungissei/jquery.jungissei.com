# jQuery Modalプラグイン

## 概要

このjQueryプラグインは、ウェブページにモーダルダイアログを簡単に追加することができます。シンプルなAPIを提供し、モーダルの開閉、アニメーション、背景のスクロール固定などの機能を備えています。

## 実装手順

1. プラグインファイルを読み込みます。
```html
<link rel="stylesheet" href="/path/to/jquery-modal.css">
<script src="path/to/jquery-modal.js"></script>
```

2. モーダルダイアログの要素を作成します。
```html
<dialog id="modal_demo" class="modal_dialog" aria-label="モーダルデモ" data-modal-dialog aria-labelledby="demo_modal_dialog_ttl" aria-describedby="demo_modal_dialog_desc">
  <div class="dialog_content">
    <h2 id="demo_modal_dialog_ttl" class="demo_common_ttl1">モーダルデモのタイトル</h2>
    <div id="demo_modal_dialog_desc" class="demo_common_txt1">
      <p>モーダルデモのテキストです。...</p>
      <p>モーダルデモのテキストです。...</p>
      <p>モーダルデモのテキストです。...</p>
    </div>
    <button class="dialog_close" type="button" aria-labelledby="modal_demo_close" data-modal-close>
      <span id="modal_demo_close" style="display:none">モーダルを閉じる</span>
    </button>
  </div>
</dialog>
```

3. モーダルを開くトリガー要素を作成します。
```html
<button type="button" class="demo_btn" data-modal-open="modal_demo">
  モーダルデモを開く
</button>
```

4. プラグインを初期化します。
```javascript
$("#modal_demo").modal();
```
※`data-modal-dialog`を付与すると自動適用されます。

## オプション

プラグインの初期化時にオプションを指定できます。

- `open`: モーダルを自動的に開くかどうかを指定します（デフォルト: `false`）。

```javascript
$("#modal_demo").modal({
  open: true
});
```

## イベント

プラグインは以下のカスタムイベントをトリガーします。

- `modal.before_open`: モーダルが開く前にトリガーされます。
- `modal.after_open`: モーダルが開いた後にトリガーされます。
- `modal.before_close`: モーダルが閉じる前にトリガーされます。
- `modal.after_close`: モーダルが閉じた後にトリガーされます。

```javascript
$("#modal_demo").on("modal.before_open", function() {
  console.log("モーダルが開く前のイベント");
});
$("#modal_demo").on("modal.after_open", function() {
  console.log("モーダルが開いた後のイベント");
});

$("#modal_demo").on("modal.before_close", function() {
  console.log("モーダルが閉じる前のイベント");
});
$("#modal_demo").on("modal.after_close", function() {
  console.log("モーダルが閉じた後のイベント");
});
```

これらのイベントを使用して、モーダルの開閉に応じたカスタムの処理を行うことができます。

## テスト

- [ ] モーダルを開いている時 : 背面スクロール無効。
- [ ] モーダルオーバーレイクリック時 : モーダル閉じる
- [ ] モーダルが閉じた時 : モーダルが開くボタンにフォーカス


## 参考
[dialog要素を使用したモーダルウィンドウの実装例](https://www.tak-dcxi.com/article/implementation-example-of-a-modal-created-using-the-dialog-element/)
