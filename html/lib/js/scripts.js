// パンくずリストのデモUI名追加
$(function(){

  let ui_name_slug = location.pathname.split('/')[1];

  $.getJSON("/url.json", function(data) {
    let category = data.find(item => item.category_slug === ui_name_slug);
    if (category) {
      let ui_name = category.category_name;
      $('[data-demo-ui]').text(ui_name);
    }
  });
});
