#!/usr/bin/env node
// backup-dist.mjs - 2026-06-13 备份 dist
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'D:/token中转站和网站/skillai.top网站/dist';
const DST = 'D:/token中转站和网站/缓存/dist-backup-2026-06-13';

if (fs.existsSync(DST)) {
  console.error('ERR: backup already exists at ' + DST);
  process.exit(1);
}

function copyDir(s, d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  for (const e of fs.readdirSync(s, { withFileTypes: true })) {
    const sp = path.join(s, e.name);
    const dp = path.join(d, e.name);
    if (e.isDirectory()) copyDir(sp, dp);
    else fs.copyFileSync(sp, dp);
  }
}

console.log('Backing up ' + SRC + ' to ' + DST + '...');
copyDir(SRC, DST);
console.log('OK. Files: ' + fs.readdirSync(DST).length);