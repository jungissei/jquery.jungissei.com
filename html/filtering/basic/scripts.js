$('#card_items').on('htmlContentAdded', function () {

  append_filter_controller({
    list_wrapper_id : '#card_items',
    filter_items : [
      {
        template_id : 'filter_button', // text/x-handlebars-template のID
        data_name : 'birthplace',
        order : [
          '北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県', '茨城県', '栃木県', '群馬県',
          '埼玉県', '千葉県', '東京都', '神奈川県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県',
          '岐阜県', '静岡県', '愛知県', '三重県', '滋賀県', '京都府', '大阪府', '兵庫県', '奈良県', '和歌山県',
          '鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県', '福岡県',
          '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'
        ]
      }
    ]
  });
});

/**
 * フィルタリングコントローラを追加する関数
 * @param {Object} filter - フィルタリングコントローラの設定
 */
function append_filter_controller(filter){

  let list_wrapper_id = filter['list_wrapper_id'];
  let filter_items = filter['filter_items'];

  $.each(filter_items, function (index, filter_item) {

    const data_name = filter_item['data_name'];

    // データを取得
    let item_values = get_list_item_data_values_for_filter(
      list_wrapper_id,
      'filter-' + data_name
    );

    // ソート
    if (typeof filter_item['order'] !== 'undefined' && filter_item['order']) {

      item_values = sort_item_values_for_filter(item_values, filter_item['order']);
    }

    // テンプレートの取得
    const source = document.getElementById('filter_button').innerHTML;
    const template = Handlebars.compile(source);

    // 各アイテムを処理してレンダリング
    const renderedHtml = template({
      items: item_values,
      data_name: data_name
    });

    const result = document.querySelector('[data-filter-controller-wrapper="' + data_name + '"]');
    result.insertAdjacentHTML('beforeend', renderedHtml);
  });
}

/**
 * リストアイテムの値を取得する関数
 * @param {string} list_wrapper_id リストのHTML要素のID
 * @param {string} data_name データの属性名
 * @returns {Array} リストアイテムの値の配列
 */
function get_list_item_data_values_for_filter(list_wrapper_id, data_name){

  const item_values = [];

  $(list_wrapper_id)
    .find('[data-' + data_name + ']').each(function () {

    const filter_value = $(this).data(data_name);

    if (!item_values.includes(filter_value)) {
      item_values.push(filter_value);
    }
  });

  return item_values;
}

/**
 * アイテムの値をソートする関数
 * @param {Array} item_values アイテムの値の配列
 * @param {Array} order ソート順序の配列
 * @returns {Array} ソートされたアイテムの値の配列
 */
function sort_item_values_for_filter(item_values, order){

  item_values.sort(function (a, b) {
    return order.indexOf(a) - order.indexOf(b);
  });

  return item_values;
}





// --------------------------------------
// フィルタリング処理
// --------------------------------------
$('#card_filter_prefecture').on('filter_controller_added', function () {

  // 全てのフィルタリングボタンを取得
  const $buttons = $(this).find('button');
  const active_class = 'active';
  const data_attr_name = 'filter-birthplace';


  // 初期化
  $buttons.filter('[data-'+ data_attr_name + '=""]').addClass(active_class);



  // --------------------------------------
  // クリックイベント
  // --------------------------------------
  let flag = true;
  $buttons.on('click', function () {

    if (flag == false) return;
    flag = false;
    setTimeout(function () { flag = true; }, 500);

    filtering_job(this);
  });

  // --------------------------------------
  // フォーカスイベント
  // --------------------------------------
  $buttons.on('focus', function () {

    filtering_job(this);
  });

  // --------------------------------------
  // キーボードナビゲーション
  // --------------------------------------
  $buttons.on('keydown', function (event) {

    const current_index = $buttons.index(event.currentTarget);

    const key_actions = {
      ArrowLeft: function () {
        return current_index - 1 >= 0 ? current_index - 1 : $buttons.length - 1;
      },
      ArrowRight: function () {
        return (current_index + 1) % $buttons.length;
      }
    };

    const action = key_actions[event.key];

    if (action) {
      event.preventDefault();
      const new_index = action();
      $buttons.eq(new_index).focus();

      filtering_job($buttons.eq(new_index));
    }
  });


  /**
   * フィルタリングジョブを実行する関数
   * @param {HTMLElement} clicked_button_html クリックされたボタンのHTML要素
   */
  function filtering_job(clicked_button_html) {

    // 出身地でフィルタリングを行う
    filter_by_birthplace(clicked_button_html);
  }


  /**
   * 出身地でフィルタリングを行う関数
   * @param clicked_button_html クリックされたボタンのHTML要素
   */
  function filter_by_birthplace(clicked_button_html) {

    const $clicked_button = $(clicked_button_html);

    // すでにアクティブなボタンがクリックされた場合は何もしない
    if ($clicked_button.hasClass(active_class)) return;

    // すべてのボタンからアクティブクラスを削除し、クリックされたボタンにアクティブクラスを追加
    $buttons.removeClass(active_class);
    $clicked_button.addClass(active_class);

    const birthplace = $clicked_button.attr('data-' + data_attr_name);

    // カードアイテムを出身地でフィルタリング
    $('#card_items [data-' + data_attr_name + ']').each(function () {
      const $item = $(this);
      $item.hide();

      // 出身地が空の場合、または一致する場合は表示
      if (birthplace === '' || birthplace === $item.attr('data-' + data_attr_name)) {
        $item.fadeIn(300);
      }
    });
  }
});
