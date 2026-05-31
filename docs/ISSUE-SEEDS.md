# 最初に作るIssue案

GitHub公開後、最初にこの3件をIssue化すると動き出して見えます。

## 1. `good first issue`: 表記ゆれを追加する

現在のルールは、`タグ`、`友だち情報`、`QA` などの素直な表現を見ています。

追加したい表記:

- `ラベル`
- `顧客属性`
- `テスト配信`
- `動作確認`
- `お客様情報`

完了条件:

- 表記ゆれを追加
- テストを追加
- `npm test` が通る

## 2. `good first issue`: チェック結果のMarkdown出力を追加する

今は通常表示とJSONだけです。案件ノートに貼れるMarkdown出力を追加します。

想定:

```bash
node src/cli.js examples/missing-plan.md --markdown
```

完了条件:

- Markdown出力ができる
- サンプル出力をREADMEに追加
- テストを追加

## 3. `enhancement`: Obsidian案件フォルダ診断

単一ファイルだけでなく、案件フォルダ内のMarkdownをまとめて読むモードを追加します。

想定:

```bash
node src/cli.js ./project-folder --recursive
```

完了条件:

- フォルダ指定ができる
- `.md` だけ読む
- `node_modules`、`.git`、添付ファイルを無視する
- 複数ファイル名を結果に出す
