// ----------------------------------------------------------------------------
// HamburgerMenu
// ----------------------------------------------------------------------------
$(function(){

  let $hamburger_menu =  $('#hamburger_menu'),
      $hamburger_menu_open = $('[data-modal-open="hamburger_menu"]');
      active_class = 'is_active';

  $hamburger_menu.on('modal.before_open', function() {

    if($hamburger_menu_open.css('position') == 'fixed'){

      $hamburger_menu_open.css(
        'right',
        parseInt($hamburger_menu_open.css('right')) + (window.innerWidth - document.body.clientWidth)
      );
    }
  });

  $hamburger_menu.on('modal.after_open', function() {
    $hamburger_menu_open.addClass(active_class);
  });

  $hamburger_menu.on('modal.before_close', function() {

    if($hamburger_menu_open.css('position') == 'fixed'){
      $hamburger_menu_open.css('right','');
    }
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
