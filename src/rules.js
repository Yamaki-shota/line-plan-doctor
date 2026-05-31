export const requiredRules = [
  {
    id: "project.goal",
    category: "案件前提",
    severity: "error",
    title: "目的が書かれていない",
    includeAny: [/目的/u, /ゴール/u, /KPI/u, /目標/u, /成果/u],
    recommendation: "このLINE施策で何を増やすのかを1文で書く。例: 再来店予約を月10件増やす。"
  },
  {
    id: "project.audience",
    category: "案件前提",
    severity: "error",
    title: "対象者が書かれていない",
    includeAny: [/対象/u, /ターゲット/u, /誰に/u, /顧客/u, /来店/u, /友だち/u],
    recommendation: "誰に送るLINEなのかを先に固定する。全員向けは最初の仮説として弱い。"
  },
  {
    id: "project.offer",
    category: "案件前提",
    severity: "warn",
    title: "売るもの・案内するものが薄い",
    includeAny: [/商品/u, /サービス/u, /メニュー/u, /予約/u, /申込/u, /購入/u, /オファー/u],
    recommendation: "最終的に案内する商品、予約、相談、来店導線を書いておく。"
  },
  {
    id: "line.tags",
    category: "LINE設計",
    severity: "error",
    title: "タグ設計がない",
    includeAny: [/タグ/u, /セグメント/u, /属性/u, /興味/u],
    recommendation: "最低でも流入元、興味、状態、配信除外のタグを決める。"
  },
  {
    id: "line.fields",
    category: "LINE設計",
    severity: "warn",
    title: "友だち情報欄・カスタム項目がない",
    includeAny: [/友だち情報/u, /カスタム項目/u, /回答保存/u, /氏名/u, /電話/u, /希望日/u, /来店頻度/u],
    recommendation: "フォーム回答やヒアリング結果をどの項目に保存するか書く。"
  },
  {
    id: "line.scenario",
    category: "シナリオ",
    severity: "error",
    title: "シナリオ・ステップ配信がない",
    includeAny: [/シナリオ/u, /ステップ/u, /配信/u, /メッセージ/u, /リマインド/u],
    recommendation: "初回、分岐、リマインド、終了条件までを短くてもよいので書く。"
  },
  {
    id: "line.branching",
    category: "シナリオ",
    severity: "warn",
    title: "分岐条件がない",
    includeAny: [/分岐/u, /条件/u, /クリック/u, /回答/u, /未回答/u, /診断/u],
    recommendation: "誰に次の配信を出すか、出さないかの条件を書く。"
  },
  {
    id: "line.richMenu",
    category: "LINE設計",
    severity: "warn",
    title: "リッチメニュー設計がない",
    includeAny: [/リッチメニュー/u, /メニュー/u, /ボタン/u, /タップ/u],
    recommendation: "最低限、予約、FAQ、相談、店舗情報などのボタン名と遷移先を書く。"
  },
  {
    id: "line.form",
    category: "フォーム",
    severity: "warn",
    title: "フォーム・回答導線がない",
    includeAny: [/フォーム/u, /アンケート/u, /問診/u, /回答/u, /入力/u],
    recommendation: "入力してほしい項目、保存先、回答後メッセージをセットで書く。"
  },
  {
    id: "line.qa",
    category: "公開前QA",
    severity: "error",
    title: "公開前QAがない",
    includeAny: [/QA/u, /テスト/u, /チェック/u, /実機/u, /検証/u],
    recommendation: "友だち追加、フォーム送信、タグ付与、分岐、リッチメニュー、配信停止を実機で見る。"
  },
  {
    id: "line.owner",
    category: "運用",
    severity: "warn",
    title: "運用担当・確認者がない",
    includeAny: [/担当/u, /確認者/u, /承認/u, /誰が/u, /オーナー/u],
    recommendation: "文面承認、配信実行、問い合わせ対応の担当を決める。"
  },
  {
    id: "line.done",
    category: "完了条件",
    severity: "warn",
    title: "完了条件がない",
    includeAny: [/完了条件/u, /Done/u, /納品/u, /公開/u, /本番/u],
    recommendation: "何ができたら完了かを書く。公開しただけでは運用案件は終わらない。"
  }
];

export const riskyPatterns = [
  {
    id: "placeholder.todo",
    category: "未確定",
    severity: "warn",
    title: "未確定のプレースホルダーが残っている",
    pattern: /TODO|TBD|未定|あとで|仮|要確認|xxx|XXX|\?\?\?/u,
    recommendation: "本番前に未確定語を潰す。仮のまま配信文へ流すと事故る。"
  },
  {
    id: "broadcast.all",
    category: "配信安全",
    severity: "warn",
    title: "全員配信の匂いがある",
    pattern: /全員配信|一斉配信|全友だち|全体配信/u,
    recommendation: "全員配信なら、除外条件、対象人数、配信目的、送信前確認を明記する。"
  },
  {
    id: "production.send",
    category: "配信安全",
    severity: "info",
    title: "本番送信の前提がある",
    pattern: /本番配信|送信する|公開する|配信予約/u,
    recommendation: "本番操作の前に、テスト友だち、対象人数、送信時刻、配信停止導線を見る。"
  }
];

export const severityWeights = {
  error: 14,
  warn: 7,
  info: 3
};
