$(function () {

  // JSONファイルを読み込む
  $.getJSON('/lib/templates/demo_content_card/list_items.json', function(data) {

    // テンプレートの取得
    const source = document.getElementById('demo_content_card_item_template').innerHTML;
    const template = Handlebars.compile(source);

    // Handlebarsヘルパーの登録
    Handlebars.registerHelper('formatAge', function(birthday) {
      return calculate_formatted_age({birthday: birthday}).formattedAge;
    });

    // 各アイテムを処理してレンダリング
    const renderedHtml = template({items: data});
    const result = document.getElementById('card_items');
    result.innerHTML = renderedHtml;

    // HTMLが追加完了したときにカスタムイベントを発火
    const event = new CustomEvent('htmlContentAdded', { detail: { items: data } });
    result.dispatchEvent(event);

  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.error('JSONファイルの読み込みに失敗しました:', textStatus, errorThrown);
  });


  /**
   * 誕生日から年齢を計算し、フォーマットされた年齢を含むデータアイテムを返す関数
   * @param {*} item - 処理するデータアイテム
   * @returns {Object} 処理されたデータアイテムとフォーマットされた年齢
   */
  function calculate_formatted_age(item) {

    const birthDate = new Date(item.birthday);
    const now = new Date();
    const years = now.getFullYear() - birthDate.getFullYear();
    const months = now.getMonth() - birthDate.getMonth();

    let ageString = '';
    if (years > 0) {
      ageString += years + '歳';
    }
    if (months > 0 || (years === 0 && months === 0)) {
      ageString += months + 'ヶ月';
    }

    return {...item, formattedAge: ageString};
  }
});
