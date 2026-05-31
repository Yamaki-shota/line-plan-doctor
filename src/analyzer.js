import { requiredRules, riskyPatterns, severityWeights } from "./rules.js";

export function analyzeText(text, options = {}) {
  const findings = [];
  const matchedRuleIds = [];

  for (const rule of requiredRules) {
    const matched = rule.includeAny.some((pattern) => pattern.test(text));
    if (matched) {
      matchedRuleIds.push(rule.id);
      continue;
    }

    findings.push({
      id: rule.id,
      category: rule.category,
      severity: rule.severity,
      title: rule.title,
      recommendation: rule.recommendation
    });
  }

  for (const risky of riskyPatterns) {
    if (!risky.pattern.test(text)) continue;

    findings.push({
      id: risky.id,
      category: risky.category,
      severity: risky.severity,
      title: risky.title,
      recommendation: risky.recommendation
    });
  }

  const score = calculateScore(findings);
  const minScore = Number.isFinite(options.minScore) ? options.minScore : 80;

  return {
    score,
    minScore,
    passed: score >= minScore && !findings.some((finding) => finding.severity === "error"),
    summary: summarize(findings),
    matchedRuleIds,
    findings
  };
}

export function analyzeDocuments(documents, options = {}) {
  const combined = documents.map((document) => document.text).join("\n\n");
  const result = analyzeText(combined, options);

  return {
    ...result,
    files: documents.map((document) => document.path)
  };
}

function calculateScore(findings) {
  const penalty = findings.reduce((total, finding) => {
    return total + (severityWeights[finding.severity] ?? severityWeights.info);
  }, 0);

  return Math.max(0, 100 - penalty);
}

function summarize(findings) {
  return findings.reduce(
    (summary, finding) => {
      summary[finding.severity] += 1;
      return summary;
    },
    { error: 0, warn: 0, info: 0 }
  );
}
