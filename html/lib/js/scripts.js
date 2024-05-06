// タイトル・パンくずリストのデモUI名追加
$(function(){

  // --------------------------------------
  // UI名を追加
  // --------------------------------------
  let ui_name_slug = location.pathname.split('/')[1];
  $.getJSON("/url.json", function(data) {
    let category = data.find(item => item.category_slug === ui_name_slug);
    if (category) {
      let ui_name = category.category_name;
      $('[data-demo-ui], [data-page-ui-name]').text(ui_name);
    }
  });

  // --------------------------------------
  // デモ名を追加
  // --------------------------------------
  let demo_name_slug = location.pathname.split('/')[2];
  $.getJSON("/" + ui_name_slug + "/demos.json", function(data) {
    let demo_obj = data.find(item => item.demo_slug === demo_name_slug);
    if (demo_obj) {
      let demo_name = demo_obj.demo_name;
      $('[data-demo-name], [data-page-demo-name]').text(demo_name);
    }
  });

});
