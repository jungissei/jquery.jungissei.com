$(function () {
  // JSONファイルを読み込む
  $.getJSON('/lib/templates/demo_content_card/list_items.json', function(data) {
    const result = document.getElementById('card_items');

    // テンプレートの取得（<template>タグの中身を取得）
    const template = document.getElementById('demo_content_card_item_template').innerHTML;

    // データを処理する関数
    function processData(item) {
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

    // 各アイテムを処理してレンダリング
    data.forEach(function(item) {
      const processedItem = processData(item);
      const renderedHtml = Mustache.render(template, processedItem);
      result.innerHTML += renderedHtml;
    });

  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.error('JSONファイルの読み込みに失敗しました:', textStatus, errorThrown);
  });
});
