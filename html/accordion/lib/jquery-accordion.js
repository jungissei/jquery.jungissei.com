(function ($) {
  /**
   * アコーディオン機能を初期化するコンストラクタ
   * @param {HTMLElement} element アコーディオンを適用するDOM要素
   */
  function Accordion(element) {
    this.element = element; // アコーディオンの基となる要素を設定
    this.isTransitioning = false; // トランジション中かどうかの状態

    // 初期化メソッドを呼び出し
    this.init();
  }

  Accordion.prototype = {
    /**
     * 初期化
     */
    init: function () {
      const accordion = this.element;
      const detailsElements = $(accordion).find("details");

      // 各details要素にイベントリスナーを追加
      detailsElements.each(function (index, details) {
        const summary = $(details).find("summary")[0];
        const panel = $(details).find("summary + *")[0];

        if (!(details && summary && panel)) return; // 必要要素が揃ってない場合は処理をやめる

        $(summary).on("click", function (event) {
          event.preventDefault();
          if (details.open) {
            this.onClose(details, panel);
          } else {
            this.onOpen(details, panel);
          }
        }.bind(this));
      }.bind(this));
    },

    /**
     * アコーディオンを開く処理
     * @param {HTMLElement} details 開くdetails要素
     * @param {HTMLElement} panel 開くパネル要素
     */
    onOpen: function (details, panel) {
      if (details.open || this.isTransitioning) {
        return;
      }

      this.isTransitioning = true;
      details.setAttribute('open', '');
      panel.style.blockSize = '0px';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          panel.style.blockSize = panel.scrollHeight + 'px';
        });
      });

      panel.addEventListener('transitionend', function () {
        panel.style.blockSize = '';
        this.isTransitioning = false;
      }.bind(this), { once: true });
    },

    /**
     * アコーディオンを閉じる処理
     * @param {HTMLElement} details 閉じるdetails要素
     * @param {HTMLElement} panel 閉じるパネル要素
     */
    onClose: function (details, panel) {
      if (!details.open || this.isTransitioning) {
        return;
      }

      this.isTransitioning = true;
      panel.style.blockSize = panel.scrollHeight + 'px';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          panel.style.blockSize = '0';
        });
      });

      panel.addEventListener('transitionend', function () {
        details.removeAttribute('open');
        panel.style.blockSize = '';
        this.isTransitioning = false;
      }.bind(this), { once: true });
    }
  };

  /**
   * jQueryプラグインとしてアコーディオン機能を初期化します。
   */
  $.fn.accordion = function () {
    return this.each(function () {
      let accordion = $(this).data("accordion");

      if (!accordion) {
        accordion = new Accordion(this);
        $(this).data("accordion", accordion);
      }
    });
  };

  /**
   * data-accordion属性を持つ要素に対してアコーディオン機能を適用します。
   */
  $("[data-accordion]").each(function () {
    $(this).accordion();
  });
})(jQuery);
