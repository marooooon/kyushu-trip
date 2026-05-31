# 九州キャンピングカー旅しおり — Claude Code ガイド

## プロジェクト概要

夫婦＋愛犬コーラ（ヨーキー）の九州キャンピングカー2週間旅（6月後半）のデジタルしおりサイト。
静的HTMLサイト（フレームワーク・ビルドツールなし）。

## ファイル構成

```
kyushu-trip/
├── index.html          # メインページ（全セクションを含む）
├── css/
│   └── style.css       # CSS変数・全スタイル定義
├── js/
│   └── main.js         # スクロールハイライト・チェックリスト保存
├── MEMO.md             # ユーザーが旅メモを書くファイル
├── package.json        # devサーバー（npm run dev）
├── README.md           # プロジェクト概要
└── HOWTO.md            # エンドユーザー向け使い方ガイド
```

## 開発サーバー

```bash
npm run dev        # live-server（自動リロード付き） → http://localhost:3000
npm run preview    # serve（シンプルなHTTPサーバー）
python3 -m http.server 3000  # Python代替
```

**重要**: `index.html` をそのままダブルクリックして開いても正しく動作します（外部CSSとJSを参照しているため、ファイルパスが正しければOK）。ただしLocalhostで開くのを推奨。

## CSS 設計

`css/style.css` の冒頭に CSS カスタムプロパティ（変数）を定義。

```css
:root {
  --green-dark / --green-main / --green-light / --green-pale  /* メインカラー系統 */
  --brown-dark / --brown-main / --brown-light                  /* アクセントカラー */
  --cream / --cream-dark / --sand                              /* 背景系 */
  --text-dark / --text-mid / --text-light                      /* テキスト */
  --shadow / --shadow-strong                                    /* 影 */
}
```

新しいスタイルを追加する場合は必ずこれらの変数を使うこと。

## index.html のセクション構造

| セクションID | 内容 | HTML要素 |
|-------------|------|---------|
| `#concept` | コンセプト・ハイライト | `<section>` |
| `#rvparks` | 都道府県別RVパーク一覧 | `<section>` |
| `#rental` | レンタルショップ3社 | `<div class="section-full">` |
| `#dogtips` | 犬連れTips・チェックリスト | `<div>` (緑背景) |
| `#gourmet` | 県別グルメカード | `<section>` |

※ `#itinerary` セクションは将来追加予定（現在はHTMLコメントとして残存）。

## /trip-update スキル

MEMO.md に書いた旅メモを index.html に自動反映するスキル。  
定義: `.claude/skills/trip-update/SKILL.md`

### 対応するMEMO.mdセクション → 反映先

| MEMO.md セクション | 反映先 |
|-------------------|--------|
| `## 🚐 キャンピングカーレンタルショップ` | `#rental` の `.rental-grid` |
| `## 🗺️ 行きたい場所・観光スポット` | `#itinerary` の `.timeline` 末尾 |
| `## 🍽️ 食べたいもの・グルメ` | `#gourmet` の `.gourmet-grid` |
| `## ♨️ 行きたい温泉` | 新規 `#onsen` セクション（初回のみ作成） |

### スキップされるエントリ
- `### （例）` で始まる見出し（サンプル）
- `<!-- 反映済 -->` タグ付きの見出し（重複防止）

## コーディングガイドライン

- **CSSの追加**: `css/style.css` に追記。`style=""` のインラインスタイルは最小限に
- **JSの追加**: `js/main.js` に追記。ページ全体に影響するロジックのみ
- **HTML構造の変更**: 既存のクラス名・セクションIDは `/trip-update` スキルが参照しているため変更不可
  - 変更する場合は `SKILL.md` も合わせて更新すること
- **外部ライブラリ**: Google Fonts（Noto Sans JP / Noto Serif JP / Caveat）と Font Awesome 6.4.0 を CDN で読み込み
- **ビルドプロセスなし**: コンパイル・バンドル不要。ファイルを編集したら即反映

## チェックリスト保存の仕組み

`js/main.js` で `.check-item input` の状態を `localStorage` に保存（キー: `checklist_0` 〜）。  
ブラウザをまたいでチェック状態が保持される。

## ローカルプレビューの確認手順

HTML/CSS を変更した後は必ず `npm run dev` でブラウザ確認すること。  
特に以下は実機で確認:
- ナビゲーションのスクロールハイライト
- モバイル幅（480px以下）のレイアウト
- チェックリストのLocalStorage保存
