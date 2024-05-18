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
});
