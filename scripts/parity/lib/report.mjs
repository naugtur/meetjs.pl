// Renders compare results as a self-contained HTML page and a Markdown summary.

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const truncate = (value, length = 300) => {
  const text =
    typeof value === 'string' ? value : JSON.stringify(value ?? null);
  return text.length > length ? `${text.slice(0, length)}…` : text;
};

const STATUS_ORDER = { unexpected: 0, info: 1, expected: 2 };

export const summarize = (diffs) => {
  const byStatus = { unexpected: 0, expected: 0, info: 0 };
  const byArea = {};
  for (const diff of diffs) {
    byStatus[diff.status]++;
    byArea[diff.area] ??= { unexpected: 0, expected: 0, info: 0 };
    byArea[diff.area][diff.status]++;
  }
  return { byStatus, byArea };
};

const describe = (diff) => {
  if (diff.op === 'changed') {
    return `${truncate(diff.baseline)} → ${truncate(diff.candidate)}`;
  }
  if (diff.op === 'block') {
    return `${diff.value}: ${diff.percent === null ? diff.note : `${diff.percent.toFixed(2)}% pixels differ`}`;
  }
  if (diff.op === 'visual') {
    return `${diff.percent.toFixed(2)}% pixels differ, height ${diff.baselineHeight} → ${diff.candidateHeight}`;
  }
  return `${diff.op === 'added' ? '+' : '−'} ${truncate(diff.value)}`;
};

export const renderMarkdown = ({ baseline, candidate, diffs, visuals }) => {
  const { byStatus, byArea } = summarize(diffs);
  const lines = [
    `# Parity report: ${baseline.meta.name} → ${candidate.meta.name}`,
    '',
    `- Baseline: ${baseline.meta.base} (${baseline.meta.dataSource}, ${baseline.meta.createdAt})`,
    `- Candidate: ${candidate.meta.base} (${candidate.meta.dataSource}, ${candidate.meta.createdAt})`,
    `- Unexpected: **${byStatus.unexpected}**, expected: ${byStatus.expected}, informational: ${byStatus.info}`,
    '',
    '| Area | Unexpected | Expected | Info |',
    '| --- | --- | --- | --- |',
    ...Object.entries(byArea).map(
      ([area, counts]) =>
        `| ${area} | ${counts.unexpected} | ${counts.expected} | ${counts.info} |`,
    ),
    '',
  ];
  if (visuals.length > 0) {
    lines.push(
      '## Visual',
      '',
      '| Route | Locale | Viewport | Mismatch | Height | Status |',
      '| --- | --- | --- | --- | --- | --- |',
      ...visuals.map(
        (visual) =>
          `| ${visual.route} | ${visual.locale} | ${visual.viewport} | ${visual.percent.toFixed(2)}% | ${visual.baselineHeight} → ${visual.candidateHeight} | ${visual.status} |`,
      ),
      '',
    );
  }
  const unexpected = diffs.filter((diff) => diff.status === 'unexpected');
  if (unexpected.length > 0) {
    lines.push('## Unexpected differences', '');
    for (const diff of unexpected.slice(0, 500)) {
      lines.push(
        `- \`${diff.route}\`${diff.locale ? ` [${diff.locale}]` : ''} **${diff.area} · ${diff.key}**: ${describe(diff).replace(/\n/g, ' ')}`,
      );
    }
    if (unexpected.length > 500) {
      lines.push(`- … ${unexpected.length - 500} more`);
    }
  }
  return `${lines.join('\n')}\n`;
};

export const renderHtml = ({ baseline, candidate, diffs, visuals }) => {
  const { byStatus, byArea } = summarize(diffs);
  const groups = new Map();
  for (const diff of [...diffs].sort(
    (a, b) => STATUS_ORDER[a.status] - STATUS_ORDER[b.status],
  )) {
    const key = `${diff.route}${diff.locale ? ` [${diff.locale}]` : ''}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(diff);
  }
  const visualsByGroup = new Map();
  for (const visual of visuals) {
    const key = `${visual.route} [${visual.locale}]`;
    if (!visualsByGroup.has(key)) visualsByGroup.set(key, []);
    visualsByGroup.get(key).push(visual);
    if (!groups.has(key)) groups.set(key, []);
  }

  const badge = (status) => `<span class="badge ${status}">${status}</span>`;

  const sections = [...groups.entries()]
    .map(([group, items]) => {
      const counts = summarize(items).byStatus;
      const visualItems = visualsByGroup.get(group) ?? [];
      const hasProblem =
        counts.unexpected > 0 ||
        visualItems.some((visual) => visual.status === 'unexpected');
      return `
<details ${hasProblem ? 'open' : ''} class="group ${hasProblem ? 'problem' : ''}">
  <summary><code>${escapeHtml(group)}</code> ${badge('unexpected')} ${counts.unexpected} ${badge('expected')} ${counts.expected} ${badge('info')} ${counts.info}</summary>
  ${
    items.length > 0
      ? `<table><thead><tr><th>Status</th><th>Area</th><th>Key</th><th>Difference</th></tr></thead><tbody>
  ${items
    .map(
      (diff) =>
        `<tr><td>${badge(diff.status)}${diff.rule ? `<div class="rule">${escapeHtml(diff.rule)}</div>` : ''}</td><td>${escapeHtml(diff.area)}</td><td><code>${escapeHtml(diff.key)}</code></td><td><pre>${escapeHtml(describe(diff))}</pre></td></tr>`,
    )
    .join('\n')}
  </tbody></table>`
      : ''
  }
  ${visualItems
    .map(
      (visual) => `
  <div class="visual">
    <h4>${escapeHtml(visual.viewport)} — ${visual.percent.toFixed(2)}% · height ${visual.baselineHeight} → ${visual.candidateHeight} ${badge(visual.status)}</h4>
    ${
      visual.blocks?.length
        ? `<ul class="blocks">${visual.blocks
            .map(
              (block) =>
                `<li>${badge(block.status)} <code>${escapeHtml(block.key)}</code> ${block.percent === null ? escapeHtml(block.note) : `${block.percent.toFixed(2)}%`}</li>`,
            )
            .join('')}</ul>`
        : ''
    }
    <div class="shots">
      ${['baseline', 'candidate', 'diff']
        .map((kind) =>
          visual.images?.[kind]
            ? `<figure><figcaption>${kind}</figcaption><a href="${visual.images[kind]}" target="_blank"><img loading="lazy" src="${visual.images[kind]}"></a></figure>`
            : '',
        )
        .join('')}
    </div>
  </div>`,
    )
    .join('')}
</details>`;
    })
    .join('\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Parity: ${escapeHtml(baseline.meta.name)} → ${escapeHtml(candidate.meta.name)}</title>
<style>
  :root { color-scheme: light dark; --bad: #dc2626; --ok: #16a34a; --info: #2563eb; }
  body { font: 14px/1.45 system-ui, sans-serif; margin: 0 auto; padding: 16px; max-width: 1600px; }
  h1 { font-size: 20px; } code, pre { font-size: 12px; } pre { margin: 0; white-space: pre-wrap; word-break: break-word; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; } td, th { border-bottom: 1px solid #8884; padding: 4px 6px; text-align: left; vertical-align: top; }
  .badge { display: inline-block; padding: 0 6px; border-radius: 8px; color: #fff; font-size: 11px; }
  .badge.unexpected { background: var(--bad); } .badge.expected { background: var(--ok); } .badge.info { background: var(--info); }
  .group { border: 1px solid #8884; border-radius: 8px; padding: 8px 12px; margin: 8px 0; } .group.problem { border-color: var(--bad); }
  summary { cursor: pointer; } .rule { font-size: 11px; opacity: .7; }
  .shots { display: flex; gap: 8px; overflow-x: auto; } figure { margin: 0; } figure img { width: 320px; border: 1px solid #8884; }
  .blocks { columns: 2; font-size: 12px; }
</style>
</head>
<body>
<h1>Parity report: ${escapeHtml(baseline.meta.name)} → ${escapeHtml(candidate.meta.name)}</h1>
<p>Baseline <code>${escapeHtml(baseline.meta.base)}</code> (${escapeHtml(baseline.meta.dataSource)}, ${escapeHtml(baseline.meta.createdAt)}) · Candidate <code>${escapeHtml(candidate.meta.base)}</code> (${escapeHtml(candidate.meta.dataSource)}, ${escapeHtml(candidate.meta.createdAt)})</p>
<p>${badge('unexpected')} ${byStatus.unexpected} ${badge('expected')} ${byStatus.expected} ${badge('info')} ${byStatus.info}</p>
<table><thead><tr><th>Area</th><th>Unexpected</th><th>Expected</th><th>Info</th></tr></thead><tbody>
${Object.entries(byArea)
  .map(
    ([area, counts]) =>
      `<tr><td>${escapeHtml(area)}</td><td>${counts.unexpected}</td><td>${counts.expected}</td><td>${counts.info}</td></tr>`,
  )
  .join('')}
</tbody></table>
${sections}
</body>
</html>
`;
};
