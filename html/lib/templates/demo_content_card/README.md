# カード一覧

## 実装

### リストアイテムテンプレート
```html
<section id="demo_content_card" class="page_layout layout1">
  <div class="layout_inner">
    <div class="layout_container">
      <div class="layout_width">

        <div id="card_items" class="card_items"></div>

      </div>
    </div>
  </div>
</section>
```


### Assets SSI
```html
<!--#include virtual="/lib/templates/demo_content_card/demo_content_card.shtml" -->
```


### Event
```js
$('#card_items').on('htmlContentAdded', function(event) {

  // ここに処理を追加
});
```
