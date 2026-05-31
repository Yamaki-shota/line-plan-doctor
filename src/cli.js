#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { analyzeDocuments } from "./analyzer.js";

const args = process.argv.slice(2);

async function main() {
  const parsed = parseArgs(args);

  if (parsed.help || parsed.files.length === 0) {
    printHelp();
    process.exit(parsed.files.length === 0 && !parsed.help ? 1 : 0);
  }

  const documents = await readDocuments(parsed.files);
  const result = analyzeDocuments(documents, { minScore: parsed.minScore });

  if (parsed.json) {
    console.log(JSON.stringify(result, null, 2));
  } else {
    printHuman(result);
  }

  process.exit(result.passed ? 0 : 1);
}

function parseArgs(rawArgs) {
  const parsed = {
    files: [],
    json: false,
    help: false,
    minScore: 80
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === "--help" || arg === "-h") {
      parsed.help = true;
      continue;
    }

    if (arg === "--json") {
      parsed.json = true;
      continue;
    }

    if (arg === "--min-score") {
      const value = Number(rawArgs[index + 1]);
      if (!Number.isFinite(value) || value < 0 || value > 100) {
        throw new Error("--min-score は 0 から 100 の数値で指定する");
      }

      parsed.minScore = value;
      index += 1;
      continue;
    }

    parsed.files.push(arg);
  }

  return parsed;
}

async function readDocuments(files) {
  return Promise.all(
    files.map(async (file) => {
      const absolute = path.resolve(file);
      return {
        path: absolute,
        text: await readFile(absolute, "utf8")
      };
    })
  );
}

function printHuman(result) {
  console.log("LINE Plan Doctor");
  console.log(`対象: ${result.files.map((file) => path.basename(file)).join(", ")}`);
  console.log(`スコア: ${result.score}/100  合格ライン: ${result.minScore}`);
  console.log(`結果: ${result.passed ? "OK" : "要修正"}`);
  console.log(`内訳: error ${result.summary.error}, warn ${result.summary.warn}, info ${result.summary.info}`);

  if (result.findings.length === 0) {
    console.log("\n抜け漏れは見つかりませんでした。");
    return;
  }

  console.log("\n指摘:");
  for (const finding of result.findings) {
    console.log(`- [${finding.severity}] ${finding.category}: ${finding.title}`);
    console.log(`  修正: ${finding.recommendation}`);
  }
}

function printHelp() {
  console.log(`LINE Plan Doctor

LINE/Lステップ案件資料の抜け漏れを診断するCLI。

使い方:
  line-plan-doctor <file...>
  line-plan-doctor <file...> --json
  line-plan-doctor <file...> --min-score 75

例:
  node src/cli.js examples/restaurant-plan.md
`);
}

main().catch((error) => {
  console.error(`エラー: ${error.message}`);
  process.exit(1);
});
