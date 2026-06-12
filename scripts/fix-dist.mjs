#!/usr/bin/env node
// fix-dist.mjs - 2026-06-13 Codex 全面接管第 8 轮
// 修复 D:\token中转站和网站\skillai.top网站\dist 内容站死链 + 品牌残留
// 用法: node fix-dist.mjs --dry-run   只报告, 不改
//       node fix-dist.mjs --apply     真改, 先备份

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.argv[2] === '--root' ? process.argv[3] : 'D:/token中转站和网站/skillai.top网站/dist';
const APPLY = process.argv.includes('--apply');
const BACKUP = 'D:/token中转站和网站/缓存/dist-backup-2026-06-13';

// 死链修复规则 (按之前扫描结果)
const DEADLINK_FIXES = [
  // [from, to (空 = 删 attribute)]
  ['/assets/logo-192.png', '/favicon-192.png'],
  ['/assets/css/main.css', null],
  ['/assets/js/main.js', null],
  ['/assets/qrcode-our.png', '/cooperation/'],
  ['/assets/qq-group-qr.jpg', '/community/'],
  ['/downloads/SkillAI-Windows-Setup.bat', '/download/'],
  ['/download.html', '/download/'],
  ['/community.html', '/community/'],
  ['/top-models.html', '/top-models/'],
  ['/top-agents.html', '/top-agents/'],
  ['/about.html', '/about/'],
  ['/skills.html', '/skills/'],
];

// 品牌残留清理
const BRAND_FIXES = [
  // [from, to, 是 in attribute?]
  [/openclaw/gi, 'skillai'],
  [/OpenClaw/g, 'SkillAI'],
  [/ClawHub/g, 'SkillAI'],
  [/clawhub/gi, 'skillai'],
];

// 收集所有 HTML 文件
function walk(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === '.git' || e.name === 'node_modules' || e.name === '.vercel') continue;
      out.push(...walk(p));
    } else if (e.name.endsWith('.html') || e.name.endsWith('.htm')) {
      out.push(p);
    }
  }
  return out;
}

// 修复 HTML
function fixHtml(content, rel) {
  let html = content;
  let changes = [];

  // 1) 死链修复
  for (const [from, to] of DEADLINK_FIXES) {
    // 匹配 href="from" 或 src="from"
    const re = new RegExp('(href|src)="' + from.replace(/[/.*+?^${}()|[\]\\]/g, '\\$&') + '"', 'g');
    if (re.test(html)) {
      const replacement = to === null
        ? ''  // 删除 attribute
        : '$1="' + to + '"';
      html = html.replace(re, replacement);
      changes.push(`deadlink ${from} -> ${to || 'DEL'}`);
    }
  }

  // 2) 品牌残留
  for (const [re, to] of BRAND_FIXES) {
    const matches = html.match(re);
    if (matches) {
      const before = html.length;
      html = html.replace(re, to);
      const n = matches.length;
      changes.push(`brand ${re} x${n} -> ${to}`);
    }
  }

  return { html, changes };
}

// 主流程
function main() {
  console.log(`ROOT: ${ROOT}`);
  console.log(`MODE: ${APPLY ? 'APPLY (will write)' : 'DRY-RUN (read-only)'}`);
  console.log('');

  if (!fs.existsSync(ROOT)) {
    console.error(`ERR: dist not found: ${ROOT}`);
    process.exit(1);
  }

  const files = walk(ROOT);
  console.log(`HTML files: ${files.length}`);
  console.log('');

  let totalChanges = 0;
  let fileWithChanges = 0;
  const summary = [];

  for (const f of files) {
    const orig = fs.readFileSync(f, 'utf8');
    const { html, changes } = fixHtml(orig, path.relative(ROOT, f));
    if (changes.length === 0) continue;

    fileWithChanges++;
    totalChanges += changes.length;
    summary.push({ file: path.relative(ROOT, f), changes, beforeSize: orig.length, afterSize: html.length });

    if (APPLY) {
      fs.writeFileSync(f, html, 'utf8');
    }
  }

  // 输出
  for (const s of summary) {
    console.log(`\n=== ${s.file} (${s.changes.length} changes) ===`);
    for (const c of s.changes) console.log(`  - ${c}`);
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log(`TOTAL: ${fileWithChanges} files / ${totalChanges} changes`);
  console.log(`MODE: ${APPLY ? 'APPLIED ✅' : 'DRY-RUN (no changes written)'}`);

  if (!APPLY && fileWithChanges > 0) {
    console.log(`\nRun with --apply to apply changes.`);
    console.log(`Backup will be created at: ${BACKUP}`);
  }
}

main();