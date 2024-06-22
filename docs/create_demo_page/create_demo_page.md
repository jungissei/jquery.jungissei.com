# デモページ作成手順

```bash
# gitのルートディレクトリに移動
cd $(git rev-parse --show-toplevel)

# DEST_DIRに {demo_category_slug}と{demo_page_slug}をセットしてコマンド実行
DEST_DIR="html/{demo_category_slug}/{demo_page_slug}"
mkdir -p $DEST_DIR && cp -r docs/create_demo_page/demo/* $DEST_DIR
```

デモページ名とデモカテゴリ名を変更
<title>デモページ名 | デモカテゴリ名 | jQuery UI LIST / Jung Issei</title>

<!--#include virtual="/{demo_category}/lib/head_close.shtml" -->
<!--#include virtual="/{demo_category}/lib/body_close.shtml" -->


コミットする
デモページテンプレート追加 #0000

## デモページ作ったあとは
- デモページ実装
- READMEに実装手順、メモ、テスト項目記載
