<!DOCTYPE html>
<html lang="ja">

<head>
  <!--#include virtual="/lib/inc/head_begin.shtml" -->
  <meta charset="UTF-8">
  <title>jQuery Creations / Jung Issei</title>
  <meta name="description" content="jQueryを活用したシンプルなUIデモの一覧。基本的なモーダルウィンドウやスライダーなど、学習目的で作成したデモの実例を探索。">

  <!--#include virtual="/lib-index/inc/head_close.shtml" -->
</head>

<body class="dark:bg-gray-900">
  <!--#include virtual="/lib/inc/body_begin.shtml" -->

  <div id="wrapper">

    <header>
      <div id="part_header" class="page_layout layout1">
        <div class="layout_inner">
          <div class="layout_container">
            <div class="layout_width">

              <div class="header_row">
                <h1 class="header_site_title">
                  <!--#include virtual="/lib-index/inc/site_title_link.shtml" -->
                </h1>

                <!--#include virtual="/lib-index/inc/header_github_logo.shtml" -->
              </div>

            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div id="top_ui" class="page_layout layout2">
        <div class="layout_inner">
          <div class="layout_container">
            <div class="layout_width">

              <nav aria-label="メインナビゲーション">

                <h2 class="index_common_ttl1">jQuery Creations Categories</h2>

                <p class="index_common_txt1">このサイトは、学習目的で作成している、jQueryを中心に利用したUIのデモページを探索できます。</p>

                <?php
                (function () {
                  // 現在のディレクトリを習得
                  $current_dir = __DIR__;
                  $json_url = $current_dir . '/url.json';
                  $json_data = file_get_contents($json_url);
                  $categories = json_decode($json_data, true);

                  if ($categories):
                ?>
                    <ul class="top_category_items">
                      <?php
                      foreach ($categories as $category):
                        $category_name = $category['category_name'];
                        $category_slug = $category['category_slug'];
                      ?>

                        <li class="category_item">
                          <a href="/<?php echo $category_slug; ?>" class="item_link">
                            <?php echo $category_name; ?>
                          </a>
                        </li>

                      <?php endforeach; ?>
                    </ul>
                <?php
                  endif;
                })();

                ?>

              </nav>

            </div>
          </div>
        </div>
      </div>

    </main>


    <footer>
      <!--#include virtual="/lib-index/inc/part_copyright.shtml" -->
    </footer>
  </div>

  <!--#include virtual="/lib-index/inc/body_close.shtml" -->
</body>

</html>
