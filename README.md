# LINE Plan Doctor

LINE Plan Doctor is a CLI that checks LINE Official Account and L Step project plans for missing operational details.

It is built for small businesses and non-engineer operators who need to review marketing automation plans before launch. The tool reads Markdown project notes and flags missing goals, audiences, tags, custom fields, scenarios, branching logic, rich menus, forms, QA checks, owners, and done conditions.

In short: it catches the boring mistakes that usually become painful right before a LINE campaign goes live.

日本語で言うと、LINE/Lステップ案件資料の抜け漏れを診断するCLIです。小規模店舗のLINE導線は、文面より先に設計の抜け漏れで崩れます。タグ、友だち情報、フォーム、分岐、QA、完了条件が薄いまま進むと、公開直前にだいたい燃えます。LINE Plan Doctor は、その地味な事故を早めに見つけるための小さいOSSです。

## できること

- Markdownの案件資料を読む
- LINE/Lステップ構築で必要な項目をチェックする
- `error` / `warn` / `info` で抜け漏れを出す
- スコアを出す
- JSONで出力する

## チェックする項目

- 目的
- 対象者
- 商品、サービス、予約導線
- タグ
- 友だち情報欄
- シナリオ、ステップ配信
- 分岐条件
- リッチメニュー
- フォーム
- 公開前QA
- 担当者
- 完了条件
- 未確定語、全員配信、本番送信の注意

## 使い方

```bash
node src/cli.js examples/restaurant-plan.md
```

JSONで見る:

```bash
node src/cli.js examples/restaurant-plan.md --json
```

合格ラインを変える:

```bash
node src/cli.js examples/restaurant-plan.md --min-score 75
```

## 出力例

```text
LINE Plan Doctor
対象: missing-plan.md
スコア: 28/100  合格ライン: 80
結果: 要修正
内訳: error 3, warn 4, info 0
```

## なぜ作るか

LINE/Lステップ案件では、非エンジニアでも設計、文面、フォーム、タグ、実機QAを同時に扱います。ここを人力だけで見ると抜けます。

このツールは、AIエージェントや人間のレビュー前に、まず機械的に見つけられる穴を潰すためのものです。

## ロードマップ

- チェックルールの追加
- 日本語表記ゆれへの対応
- Obsidian Vault内の複数ファイル診断
- Codex用レビュー指示テンプレート
- GitHub ActionsでPR時に案件資料を診断

## 開発

```bash
npm test
npm run check
```

依存ライブラリはありません。Node.js 20以上で動きます。

## ライセンス

MIT
