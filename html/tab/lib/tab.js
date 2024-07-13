(function ($) {
  /**
   * タブ機能を初期化するコンストラクタ
   * @param {HTMLElement} element タブを適用するDOM要素
   * @param {Object} options タブの設定オプション
   */
  function Tabs(element, options) {
    this.element = element;
    this.settings = $.extend({}, Tabs.defaults, options);
    this.$root = $(this.element);
    this.$tablist = this.$root.find('[role="tablist"]');
    this.$tabs = this.$root.find('[role="tab"]');
    this.$tabpanels = this.$root.find('[role="tabpanel"]');
    this.current_index = Math.max(0, this.settings.first_view - 1);

    this.init();
  }

  // デフォルト設定
  Tabs.defaults = {
    first_view: 1
  };

  Tabs.prototype = {
    /**
     * タブ機能の初期化
     */
    init: function () {
      // タブリスト、タブ、タブパネルが存在しない場合は初期化を中止
      if (this.$tablist.length === 0 || this.$tabs.length === 0 || this.$tabpanels.length === 0) return;

      this.set_tab_attributes();
      this.activate_tab(this.current_index);

      // イベントリスナーの設定
      this.$tabs.on('click', this.handle_click.bind(this));
      this.$tabs.on('keydown', this.handle_key_navigation.bind(this));
      this.$tabpanels.on('beforematch', this.handle_before_match.bind(this));
    },

    /**
     * タブとタブパネルに必要な属性を設定
     */
    set_tab_attributes: function () {
      this.$tabs.each((index, tab) => {
        $(tab).attr({
          'aria-selected': 'false',
          'aria-controls': this.$tabpanels.eq(index).attr('id'),
          'tabindex': '-1'
        });
      });
    },

    /**
     * 指定されたインデックスのタブをアクティブにする
     * @param {number} index アクティブにするタブのインデックス
     */
    activate_tab: function (index) {
      // タブの状態を更新
      this.$tabs.each((i, tab) => {
        const is_selected = i === index;
        $(tab).attr({
          'aria-selected': String(is_selected),
          'tabindex': is_selected ? '0' : '-1'
        });
      });

      // タブパネルの表示/非表示を切り替え
      this.$tabpanels.each((i, panel) => {
        if (i !== index) {
          $(panel).prop('hidden', true).removeAttr('tabindex');
          panel.setAttribute('hidden', 'until-found');  // SEOのために'until-found'を使用
        } else {
          $(panel).prop('hidden', false).attr('tabindex', '0');
        }
      });
    },

    /**
     * タブのクリックイベントを処理
     * @param {Event} event クリックイベント
     */
    handle_click: function (event) {
      event.preventDefault();
      const clicked_index = this.$tabs.index(event.currentTarget);
      this.activate_tab(clicked_index);
    },

    /**
     * キーボードナビゲーションを処理
     * @param {KeyboardEvent} event キーボードイベント
     */
    handle_key_navigation: function (event) {
      const $tab = $(event.currentTarget);
      const current_index = this.$tabs.index($tab);
      const orientation = this.$tablist.attr('aria-orientation') || 'horizontal';

      const key_actions = {
        [orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft']: () =>
          current_index - 1 >= 0 ? current_index - 1 : this.$tabs.length - 1,
        [orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight']: () =>
          (current_index + 1) % this.$tabs.length,
        Home: () => 0,
        End: () => this.$tabs.length - 1
      };

      const action = key_actions[event.key];

      if (action) {
        event.preventDefault();
        const new_index = action();
        this.$tabs.eq(new_index).focus();
        this.activate_tab(new_index);
      }
    },

    /**
     * beforematchイベントを処理（hidden="until-found"用）
     * @param {Event} event beforematchイベント
     */
    handle_before_match: function (event) {
      const $panel = $(event.currentTarget);
      const tab_index = this.$tabpanels.index($panel);

      if (tab_index !== -1) {
        this.activate_tab(tab_index);
      }
    }
  };

  /**
   * jQueryプラグインとしてタブ機能を初期化
   * @param {Object} options タブの設定オプション
   */
  $.fn.tabs = function (options) {
    return this.each(function () {
      let tabs = $(this).data('tabs');

      if (!tabs) {
        tabs = new Tabs(this, options);
        $(this).data('tabs', tabs);
      }
    });
  };

  // DOM読み込み完了時に自動的にタブを初期化
  $(document).ready(function() {
    $('[data-tab]').each(function () {
      $(this).tabs();
    });
  });

})(jQuery);
