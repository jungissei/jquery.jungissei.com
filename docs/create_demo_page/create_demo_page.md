# デモページ作成手順


## デモカテゴリページ

### テンプレート複製
```bash
# gitのルートディレクトリに移動
cd $(git rev-parse --show-toplevel)

# DEST_DIRに {demo_category_slug}と{demo_page_slug}をセットしてコマンド実行
DEST_DIR="html/{demo_category_slug}/{demo_page_slug}"
mkdir -p $DEST_DIR && cp -r docs/create_demo_page/demo/* $DEST_DIR
```


### コミット
```
デモページテンプレート追加 #0000
```


### 変数置換
```
{demo_category_slug}
{demo_page_slug}
{demo_page_name}
{demo_category_name}
```

### デモページjsonに追加。
`{demo_category_slug}/demos.json`


### コミット
```
デモページテンプレート追加 #0000
```


## デモページ作ったあとは
- デモページ実装
- READMEに実装手順、メモ、テスト項目記載
