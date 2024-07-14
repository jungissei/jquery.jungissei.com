# デモカテゴリページ作成手順


----------------------------------------------------------------------------
## デモカテゴリテンプレート追加

### テンプレート複製
```bash
# gitのルートディレクトリに移動
cd $(git rev-parse --show-toplevel)

# DEST_DIRに {demo_category_slug}と{demo_page_slug}をセットしてコマンド実行
DEST_DIR="html/{demo_category_slug}"
mkdir -p $DEST_DIR && cp -r docs/create_demo_category_page/demo/* $DEST_DIR
```
### コミット
```
デモカテゴリページテンプレート追加 #0000
```


## TOPインデックスページ修正

### デモカテゴリjsonに追加。
html/url.json
```
{
  "category_name" : "{demo_category_name}",
  "category_slug" : "{demo_category_slug}"
}
```

### サムネイル画像設置
html/{demo_category_slug}/thumb.png


### コミット
```
TOP : インデックスにデモカテゴリ追加 #0000
```


----------------------------------------------------------------------------
## デモカテゴリページ修正

### 置換
`html/{demo_category_slug}`内を置換

{demo_category_name}
{demo_category_slug}


### コミット
```
TOP : デモカテゴリページ修正 #0000
```
