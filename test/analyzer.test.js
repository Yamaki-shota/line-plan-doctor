import test from "node:test";
import assert from "node:assert/strict";
import { analyzeText } from "../src/analyzer.js";

test("必要項目がそろっている資料は合格する", () => {
  const text = `
目的: 再来店予約を月10件増やす
対象: 既存顧客と新規友だち
商品: 季節メニューの予約
タグ: 流入元、興味、予約済み、配信除外
友だち情報: 氏名、希望日、来店頻度
シナリオ: 友だち追加直後、3日後、7日後に配信
分岐条件: フォーム回答あり、未回答
リッチメニュー: 予約、FAQ、相談、店舗情報
フォーム: 希望日、悩み、電話番号を回答保存
QA: 実機で友だち追加、フォーム送信、タグ付与、配信をテスト
担当: 文面承認は店主、設定は運用担当
完了条件: 本番公開後、初回配信と予約導線の到達を確認
`;

  const result = analyzeText(text);

  assert.equal(result.passed, true);
  assert.equal(result.findings.length, 0);
  assert.equal(result.score, 100);
});

test("タグとQAがない資料は重大な指摘を出す", () => {
  const text = `
目的: 新規予約を増やす
対象: 新規友だち
商品: 初回相談
シナリオ: 友だち追加後にメッセージを送る
`;

  const result = analyzeText(text);
  const ids = result.findings.map((finding) => finding.id);

  assert.equal(result.passed, false);
  assert.ok(ids.includes("line.tags"));
  assert.ok(ids.includes("line.qa"));
  assert.ok(result.summary.error >= 2);
});

test("未確定語と全員配信を警告する", () => {
  const text = `
目的: 再来店を増やす
対象: 既存顧客
商品: 季節メニュー
タグ: 既存顧客
友だち情報: 氏名
シナリオ: 一斉配信をする
分岐条件: クリックあり
リッチメニュー: 予約ボタン
フォーム: 希望日
QA: 実機テスト
担当: 山田
完了条件: 公開
文面: TODO あとで決める
`;

  const result = analyzeText(text, { minScore: 60 });
  const ids = result.findings.map((finding) => finding.id);

  assert.ok(ids.includes("placeholder.todo"));
  assert.ok(ids.includes("broadcast.all"));
});
