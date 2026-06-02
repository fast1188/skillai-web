const fs = require('fs');
const path = require('path');
const b = 'C:\\Users\\Administrator\\Documents\\Codex\\\u7f51\u7ad9\u7ba1\u5bb6\\dist';
const fixes = [
  ['about.html', '关于 OpenClaw Hermes Codex —— 我们致力于让每个人都能拥有自己的AI私人助理，一键部署，24小时自动化工作。'],
  ['skills.html', 'ClawHub 技能工厂 —— 100+ 热门 AI 技能包，一键安装，让 AI 助手拥有网页浏览、文件处理、数据分析等能力。'],
  ['community.html', 'OpenClaw Hermes Codex AI 社区 —— 最新 AI 资讯、使用教程、变现案例分享。'],
  ['top-models.html', 'OpenClaw 支持的主流 AI 模型排行榜 —— DeepSeek、GLM、豆包、Claude、GPT 等模型对比。'],
  ['top-agents.html', 'AI Agent 应用排行榜 —— 50+ 智能体推荐，涵盖办公、编程、创作、数据分析等场景。']
];
for (const [f, d] of fixes) {
  const fp = path.join(b, f);
  let c = fs.readFileSync(fp, 'utf8');
  if (c.includes('name="description"')) {
    console.log(f + ': already has desc');
    continue;
  }
  const vi = c.indexOf('name="viewport"');
  if (vi >= 0) {
    const ei = c.indexOf('>', vi) + 1;
    c = c.slice(0, ei) + '\n<meta name="description" content="' + d + '">' + c.slice(ei);
    fs.writeFileSync(fp, c, 'utf8');
    console.log('FIXED: ' + f);
  } else {
    console.log('SKIP: ' + f);
  }
}