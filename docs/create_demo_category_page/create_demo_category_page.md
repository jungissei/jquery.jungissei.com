# デモページ作成手順

```bash
# gitのルートディレクトリに移動
cd $(git rev-parse --show-toplevel)

# DEST_DIRに {demo_category_slug}と{demo_page_slug}をセットしてコマンド実行
DEST_DIR="html/{demo_category_slug}"
mkdir -p $DEST_DIR && cp -r docs/create_demo_category_page/demo/* $DEST_DIR
```


コミットする
デモカテゴリページテンプレート追加 #0000

## README修正
・変数
{デモカテゴリ名}

## index.html修正
・変数
{demo_category_name}
{demo_category_slug}
