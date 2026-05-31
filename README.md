# 🚐 九州キャンピングカー旅しおり

ふたりとコロ（ヨーキー）の九州キャンピングカー2週間旅のデジタルしおりサイト。

## プロジェクト構成

```
kyushu-trip/
├── index.html          # メインHTMLページ
├── css/
│   └── style.css       # スタイルシート
├── js/
│   └── main.js         # JavaScript（スクロール・チェックリスト）
├── MEMO.md             # 旅メモ（追加したい場所・グルメ・温泉を書く）
├── package.json        # devサーバー設定
├── README.md           # このファイル
├── HOWTO.md            # 使い方ガイド
└── .claude/
    └── skills/
        └── trip-update/
            └── SKILL.md    # /trip-update スキル定義
```

## ローカルプレビュー

```bash
npm run dev
```

ブラウザで `http://localhost:3000` が自動で開きます。  
ファイルを保存すると**自動でリロード**されます（live-server）。

```bash
# live-server が使えない場合の代替
npm run preview
# または
python3 -m http.server 3000
```

## しおりの更新方法

`MEMO.md` に行きたい場所・食べたいもの・気になる温泉を書いて、Claude Code で `/trip-update` を実行すると `index.html` に自動反映されます。

詳しい手順は [HOWTO.md](./HOWTO.md) を参照してください。

## 旅の概要

- **期間**: 2週間 / 6月後半
- **メンバー**: 夫婦 ＋ コロ（ヨーキー）
- **ルート**: 反時計回り（福岡 → 唐津 → 長崎 → 熊本 → 阿蘇 → 鹿児島 → 宮崎 → 大分 → 福岡）
- **テーマ**: 温泉・絶景ドライブ・九州グルメ・犬連れ旅
