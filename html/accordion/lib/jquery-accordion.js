(function ($) {
  function Accordion(element, options) {
    this.element = element;
    this.settings = $.extend({
      openClass: 'is_open',
      openOnly1: false,
      speed: 200
    }, options);
    this.init();
  }

  Accordion.prototype = {
    init: function () {
      let $accordion = $(this.element);
      let settings = this.settings;

      // Event listener for accordion trigger click
      $accordion.find('[data-accordion="trigger"]').on('click', function () {
        let $clicked_accordion_item = $(this).closest('[data-accordion="item"]');
        Accordion.prototype.accordion_toggle($clicked_accordion_item, settings.openClass, settings.speed);
        if (settings.openOnly1) {
          Accordion.prototype.open_only_1($clicked_accordion_item, settings.openClass, settings.speed);
        }
      });

      // Event listener for open only one accordion item
      if (settings.openOnly1) {
        $accordion.find('[data-accordion="item"]').on('before.accordion_open', function () {
          Accordion.prototype.open_only_1($(this), settings.openClass, settings.speed);
        });
      }
    },
    accordion_toggle: function ($clicked_accordion_item, open_class, speed) {
      if ($clicked_accordion_item.hasClass(open_class)) {
        // Close accordion item
        $clicked_accordion_item.trigger('before.accordion_close');
        $clicked_accordion_item.find('[data-accordion="trigger"]').attr('aria-expanded', false);
        $clicked_accordion_item.removeClass(open_class).find('[data-accordion="panel"]').slideUp(speed);
        $clicked_accordion_item.trigger('after.accordion_close');
      } else {
        // Open accordion item
        $clicked_accordion_item.trigger('before.accordion_open');
        $clicked_accordion_item.find('[data-accordion="trigger"]').attr('aria-expanded', true);
        $clicked_accordion_item.addClass(open_class).find('[data-accordion="panel"]').slideDown(speed);
        $clicked_accordion_item.trigger('after.accordion_open');
      }
    },
    open_only_1: function ($event_accordion_item, open_class, speed) {
      let $accordion = $event_accordion_item.closest('[data-accordion-type="open_only_1"]');
      if ($accordion.length === 0) {
        return;
      }
      let $accordion_items = $accordion.find('[data-accordion="item"]');
      $accordion_items.each(function () {
        if (!$(this).is($event_accordion_item) && $(this).hasClass(open_class)) {
          $(this).removeClass(open_class).find('[data-accordion="panel"]').slideUp(speed);
        }
      });
    }
  };

  $.fn.accordion = function (options) {
    return this.each(function () {
      new Accordion(this, options);
    });
  };
}(jQuery));
