// --------------------------------------
// --------------------------------------
// --------------------------------------
$(function(){

  let $anchor = $('a:not([data-smooth-scroll="false"])');

  $anchor.smoothScroll({
    beforeScroll: function () {
      $(this).trigger('smooth_scroll.before');
    },
    afterScroll: function(options) {

      const $tgt = $(options.scrollTarget);
      $tgt[0].focus();

      if (!$tgt.is(document.activeElement)) {
        $tgt.attr('tabIndex', '-1');
        $tgt[0].focus();
      }
    }
  });
});
