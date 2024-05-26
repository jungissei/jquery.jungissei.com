(function ($) {
  /**
   * モーダル機能を初期化するコンストラクタ
   * @param {HTMLElement} element モーダルを適用するDOM要素
   * @param {Object} options モーダルの設定オプション
   */
  function Modal(element, options) {

    this.element = element; // モーダルの基となる要素を設定
    this.settings = $.extend({}, Modal.defaults, options); // デフォルト設定とユーザー設定をマージ
    this.eventListenersMap = new Map(); // イベントリスナーを管理するためのMapオブジェクト
    this.currentOpenTrigger = null; // 現在モーダルを開いているトリガーを保持
    this.isTransitioning = false; // トランジション中かどうかの状態

    // 初期化メソッドを呼び出し
    this.init();
  }


  Modal.defaults = {
    // デフォルトオプションをここに追加
  };

  Modal.prototype = {

    /**
     * 初期化
     */
    init: function () {

      const modal = this.element;

      // モーダルを開くトリガーと閉じるトリガーを取得
      const openTriggers = $(`[data-modal-open="${modal.id}"]`);
      const closeTriggers = $(modal).find("[data-modal-close]");

      // 開くトリガーにイベントリスナーを追加
      openTriggers.on("click", function(event) {
        this.handleOpenTriggerClick(event, modal, event.currentTarget);
      }.bind(this));
      openTriggers.on("mousedown keydown", this.handleTriggerFocus);

      // 閉じるトリガーにイベントリスナーを追加
      closeTriggers.on("click", function(event) {
        this.handleCloseTriggerClick(event, modal);
      }.bind(this));

      // data-modal-dialog-default-open属性を持つ場合、ページ読み込み時にモーダルを開く
      if ($(modal).is("[data-modal-dialog-default-open]") && !$("[data-modal-dialog-default-open]:visible").length) {
        this.openModal(modal);
      }
    },

    /**
     * モーダルのアニメーションが完了するのを待つ
     * @param {HTMLElement} modal モーダルダイアログ要素
     * @returns Promiseの配列が解決された後の結果を返す
     */
    waitModalAnimation: function (modal) {

      // モーダル内のアニメーションがない場合、すぐに解決されたPromiseを返す
      // if ($(modal).find(":animated").length === 0 && !$(modal).is(":hidden")){
      if (modal.getAnimations().length === 0){
        console.log("no animation");
        return Promise.resolve([]);
      }

      // モーダル内の全てのアニメーションが完了するのを待つ
      return Promise.allSettled(
        [...modal.getAnimations()].map(function(animation) {
          return animation.finished;
        })
      );
    },

    /**
     * モーダルのイベントリスナーを管理。
     * @param {HTMLElement} modal イベントリスナーを追加または削除するモーダル要素
     * @param {boolean} add trueの場合はイベントリスナーを追加し、falseの場合は削除します
     */
    manageEventListeners: function (modal, add) {

      // バックドロップクリックリスナーを作成
      const backdropClickListener = function(event) {
        this.handleBackdropClick(event, modal);
      }.bind(this);

      // キーダウンリスナーを作成
      const keyDownListener = function(event) {
        this.handleKeyDown(event, modal);
      }.bind(this);

      if (add) {
        // イベントリスナーをモーダルとウィンドウに追加
        $(modal).on("click", backdropClickListener);
        $(window).on("keydown", keyDownListener);
        // イベントリスナーマップにリスナーを追加
        this.eventListenersMap.set(modal, {
          backdropClickListener,
          keyDownListener,
        });
      } else {
        // イベントリスナーをモーダルとウィンドウから削除
        const listeners = this.eventListenersMap.get(modal);
        if (listeners) {
          $(modal).off("click", listeners.backdropClickListener);
          $(window).off("keydown", listeners.keyDownListener);
          // イベントリスナーマップからリスナーを削除
          this.eventListenersMap.delete(modal);
        }
      }
    },

    /**
     * トリガーをクリックした際にモーダルを開く処理を行います。
     * @param {Event} event イベントオブジェクト
     * @param {HTMLElement} modal 開くモーダルの要素
     * @param {HTMLElement} trigger トリガーとなる要素
     */
    handleOpenTriggerClick: function (event, modal, trigger) {
      // デフォルトのイベントをキャンセル
      event.preventDefault();
      // 現在開いているトリガーを設定
      this.currentOpenTrigger = trigger;
      // モーダルを開く
      this.openModal(modal);
    },

    /**
     * トリガーをクリックした際にモーダルを閉じる処理を行います。
     * @param {Event} event イベントオブジェクト
     * @param {HTMLElement} modal 閉じるモーダルの要素
     */
    handleCloseTriggerClick: function (event, modal) {
      // デフォルトのイベントをキャンセル
      event.preventDefault();
      // モーダルを閉じる
      this.closeModal(modal);
    },

    /**
     * モーダルを開く
     */
    open: function () {
      this.openModal(this.element);
    },

    /**
     * モーダルを閉じる
     */
    close: function () {
      this.closeModal(this.element);
    },

    /**
     * トリガーがフォーカスされた際のイベントを処理します。
     * @param {Event} event - マウスダウンまたはキーダウンイベントオブジェクト
     */
    handleTriggerFocus: function (event) {
      // マウスダウンイベントが発生した場合、HTML要素に属性を設定
      if (event.type === "mousedown") {
        $("html").attr("data-mousedown", "true");
      }
      // キーダウンイベントが発生した場合、HTML要素から属性を削除
      if (event.type === "keydown") {
        $("html").removeAttr("data-mousedown");
      }
    },

    /**
     * モーダルのバックドロップをクリックした際の処理。
     * @param {Event} event - イベントオブジェクト
     * @param {HTMLElement} modal - 対象のモーダル要素
     */
    handleBackdropClick: function (event, modal) {
      // クリックされた要素がモーダル自体である場合、モーダルを閉じる
      if (event.target === modal) {
        this.closeModal(modal);
      }
    },

    /**
     * キーダウンイベントが発生した際の処理を行う。
     * Escapeキーが押された場合、モーダルを閉じる。
     * @param {Event} event - イベントオブジェクト
     * @param {HTMLElement} modal - 対象のモーダル要素
     */
    handleKeyDown: function (event, modal) {
      // HTML要素からマウスダウンのデータ属性を削除
      $("html").removeAttr("data-mousedown");
      // Escapeキーが押された場合の処理
      if (event.key === "Escape") {
        // デフォルトのイベントをキャンセル
        event.preventDefault();
        // モーダルを閉じる
        this.closeModal(modal);
      }
    },

    /**
     * モーダルを開く処理を行います。
     * @param {HTMLElement} modal - 対象のモーダル要素
     */
    openModal: function (modal) {

      // トランジション中であれば処理を中断
      if (this.isTransitioning) return;

      // トランジション状態を開始に設定
      this.isTransitioning = true;

      // 他のモーダルを閉じる
      this.closeOtherModals(modal);

      const $modal = $(modal);

      // モーダルが開く前のイベントをトリガー
      $modal.trigger("modal.before_open");

      // モーダルを表示状態にする
      modal.showModal();
      // 背景を固定する処理を呼び出し
      this.backfaceFixed(true);
      // イベントリスナーを管理する処理を呼び出し
      this.manageEventListeners(modal, true);

      // アニメーションフレームをリクエストして非同期処理を実行
      requestAnimationFrame(async function() {
        // モーダルがアクティブであることを示す属性を設定
        $modal.attr("data-modal-active", "true");
        // モーダルのアニメーション完了を待機
        await this.waitModalAnimation(modal);
        // トランジション状態を終了に設定
        this.isTransitioning = false;

        // モーダルが開いた後のイベントをトリガー
        $modal.trigger("modal.after_open");
      }.bind(this));
    },

    /**
     * 他のモーダルを閉じる
     * @param {HTMLElement} currentModal - 現在開こうとしているモーダル要素
     */
    closeOtherModals: function (currentModal) {
      $("[data-modal-dialog]").each(function () {
        let modal = $(this).data("modal");
        if (modal && this !== currentModal && $(this).attr("data-modal-active") === "true") {
          modal.close();
        }
      });
    },

    /**
     * モーダルを閉じる処理を行う。
     * トランジション中は処理を中断し、モーダルのアクティブ状態を解除後、イベントリスナーを削除し、アニメーション完了後にモーダルを閉じる。
     * @param {HTMLElement} modal - 対象のモーダル要素
     */
    closeModal: async function (modal) {

      // トランジション中であれば処理を中断
      if (this.isTransitioning) return;

      // トランジション状態を開始に設定
      this.isTransitioning = true;

      let $modal = $(modal);
      // モーダルが閉じる前のイベントをトリガー
      $modal.trigger("modal.before_close");

      // モーダルのアクティブ状態を解除
      $modal.attr("data-modal-active", "false");
      // 背景固定を解除
      this.backfaceFixed(false);
      // イベントリスナーを削除
      this.manageEventListeners(modal, false);

      // モーダルのアニメーション完了を待機
      await this.waitModalAnimation(modal);
      // モーダルを閉じる
      modal.close();

      // 開いていたトリガーがあればフォーカスを戻す
      if (this.currentOpenTrigger) {
        $(this.currentOpenTrigger).focus();
        this.currentOpenTrigger = null;
      }

      // トランジション状態を終了に設定
      this.isTransitioning = false;

      // モーダルが閉じた後のイベントをトリガー
      $modal.trigger("modal.after_close");
    },

    /**
     * HTML要素の書き込みモードが垂直かどうかを判断する関数
     * @returns {boolean} 垂直書きの場合はtrue、それ以外はfalse
     */
    isVerticalWritingMode: function () {
      const writingMode = $("html").css("writing-mode");
      return writingMode.includes("vertical");
    },

    /**
     * スクロールバーのサイズを取得する関数
     * 垂直書きの場合は水平スクロールバーのサイズを、それ以外の場合は垂直スクロールバーのサイズを返す。
     * @returns {number} スクロールバーのサイズ
     */
    getScrollBarSize: function () {
      // 水平スクロールバーのサイズを計算
      const scrollBarXSize = window.innerHeight - $("body").height();
      // 垂直スクロールバーのサイズを計算
      const scrollBarYSize = window.innerWidth - $("body").width();
      // 垂直書きの場合は水平スクロールバーのサイズを、それ以外の場合は垂直スクロールバーのサイズを返す
      return this.isVerticalWritingMode() ? scrollBarXSize : scrollBarYSize;
    },

    /**
     * スクロール位置を取得する関数
     * @param {boolean} fixed 固定されているかどうかの真偽値
     * @returns {number} スクロール位置の数値
     */
    getScrollPosition: function (fixed) {
      // 固定されている場合
      if (fixed) {
        // 垂直書きの場合は水平スクロール位置を、それ以外の場合は垂直スクロール位置を返す
        return this.isVerticalWritingMode()
          ? $(document.scrollingElement).scrollLeft()
          : $(document.scrollingElement).scrollTop();
      }
      // 固定されていない場合はbodyのinset-block-startの値を整数で返す
      return parseInt($("body").css("inset-block-start") || "0", 10);
    },

    /**
     * スクロール位置に基づいてスタイルを適用または削除する関数
     * @param {number} scrollPosition - スクロール位置の数値
     * @param {boolean} apply - スタイルを適用するかどうかの真偽値
     */
    applyStyles: function (scrollPosition, apply) {
      // スタイル設定オブジェクト
      const styles = {
        blockSize: "100dvb", // ブロックサイズ
        insetInlineStart: "0", // インライン開始位置
        position: "fixed", // 位置固定
        insetBlockStart: this.isVerticalWritingMode() // ブロック開始位置
          ? `${scrollPosition}px`
          : `${scrollPosition * -1}px`,
        inlineSize: "100dvi", // インラインサイズ
      };
      // スタイルを適用または削除
      Object.keys(styles).forEach(function(key) {
        $("body").css(key, apply ? styles[key] : "");
      });
    },

    /**
     * スクロール位置を元に戻す関数
     * @param {number} scrollPosition - 元に戻すスクロール位置
     */
    restorePosition: function (scrollPosition) {
      // スクロールオプションを設定
      const options = {
        behavior: "instant", // スクロール動作を即時に設定
        [this.isVerticalWritingMode() ? "left" : "top"]: this.isVerticalWritingMode()
          ? scrollPosition // 垂直書きの場合は左スクロール位置を設定
          : scrollPosition * -1, // 水平書きの場合は上スクロール位置を設定（逆方向）
      };
      // スクロール位置を設定したオプションで更新
      window.scrollTo(options);
    },

    /**
     * 固定された背面のスクロールバーの幅を調整し、スタイルを適用または削除します。
     * @param {boolean} fixed - 固定するかどうかの真偽値
     */
    backfaceFixed: function (fixed) {
      // スクロールバーの幅を取得
      const scrollBarWidth = this.getScrollBarSize();
      // 現在のスクロール位置を取得
      const scrollPosition = this.getScrollPosition(fixed);
      // bodyのpadding-inline-endを設定（固定時はスクロールバーの幅、非固定時は0）
      $("body").css("padding-inline-end", fixed ? `${scrollBarWidth}px` : "");
      // スクロール位置に基づいてスタイルを適用または削除
      this.applyStyles(scrollPosition, fixed);
      // 固定が解除された場合、スクロール位置を元に戻す
      if (!fixed) {
        this.restorePosition(scrollPosition);
      }
    },
  };

  /**
   * jQueryプラグインとしてモーダル機能を初期化します。
   * @param {Object|string} options - モーダルの設定オプションまたはアクション文字列。
   *                                  openプロパティがtrueの場合、モーダルを自動的に開きます。
   *                                  'close'を指定した場合、モーダルを閉じます。
   */
  $.fn.modal = function (options) {

    // オプションが文字列の場合はアクションとして処理
    if (typeof options === 'string') {
      const action = options;

      // 各要素に対して処理を行います。
      return this.each(function () {
        // 現在の要素からモーダルデータを取得します。
        let modal = $(this).data("modal");

        // モーダルデータが存在する場合にのみアクションを実行
        if (modal) {
          if (action === 'close') {
            modal.close(); // モーダルを閉じる
          }
        }
      });
    }

    // デフォルトオプションを設定
    options = $.extend({
      open: false, // デフォルトではモーダルを自動的に開かない
    }, options);

    // 各要素に対して処理を行います。
    return this.each(function () {
      // 現在の要素からモーダルデータを取得します。
      let modal = $(this).data("modal");

      // モーダルデータが存在しない場合、新たに作成してデータを設定します。
      if (!modal) {
        modal = new Modal(this); // 新しいモーダルインスタンスを作成
        $(this).data("modal", modal); // 作成したモーダルインスタンスを要素に紐付け
      }

      // openオプションがtrueの場合、モーダルを自動的に開きます。
      if (options.open) {
        modal.open(); // モーダルを開く
      }
    });
  };

  /**
   * モーダルダイアログを持つ要素に対してモーダル機能を適用します。
   */
  $("[data-modal-dialog]").each(function () {
    // 各要素にモーダル機能を適用
    $(this).modal();
  });
})(jQuery);
