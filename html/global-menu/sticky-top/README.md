# グローバルメニュー 上にスクロールしたら追従

https://jquery.jungissei.com/global-menu/sticky-top

## テスト

### ヘッダーが上にスクロールした際に追従する機能
- [ ] 初期状態で#template_headerに固定用クラス（is_fixed）が付与されていないことを確認する。
- [ ] ページを下にスクロールし、header_offset_topを超えた時に#template_headerにis_fixedクラスが付与されることを確認する。
- [ ] is_fixedクラスが付与された時、#template_headerの高さが正しく設定されることを確認する。
- [ ] ページを上にスクロールし、header_offset_top未満になった時にis_fixedクラスが除去されることを確認する。
- [ ] is_fixedクラスが除去された時、#template_headerの高さが元に戻ることを確認する。
- [ ] 下方向へのスクロール時に#template_headerにis_hideクラスが付与されることを確認する。
- [ ] 上方向へのスクロール時に#template_headerのis_hideクラスが除去され、is_showクラスが付与されることを確認する。

### 固定ヘッダー横スクロール対応
- [ ] ウィンドウ幅が768px未満の場合に、スクロールイベントが発火しても処理が実行されないことを確認する。
- [ ] ウィンドウ幅が768px以上で、水平スクロールが0の状態では、#template_header > .layout_inner要素のleft属性が空文字列であることを確認する。
- [ ] ウィンドウ幅が768px以上で、右に水平スクロールした時、#template_header > .layout_inner要素のleft属性が適切な負の値に設定されることを確認する。
- [ ] ウィンドウ幅を768px未満から768px以上に変更した場合、水平スクロール時に正しく動作することを確認する。
- [ ] 高速でスクロールした場合でも、ヘッダーの位置が正しく調整されることを確認する。
- [ ] ブラウザウィンドウのリサイズ後も、スクロール時の動作が正常に機能することを確認する。
- [ ] 異なるデバイス（デスクトップ、タブレット、モバイル）で動作をテストし、ビューポート幅に応じて適切に機能することを確認する。
