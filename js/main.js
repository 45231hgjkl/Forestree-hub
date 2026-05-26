/**
 * Forestree Hub — 从 config/links.json 读取链接并渲染卡片
 * 配合 GitHub Pages 使用时，把仓库设为 Pages 源即可
 */

const CONFIG_PATH = 'config/links.json';

(async () => {
  const grid = document.getElementById('cardGrid');
  if (!grid) return;

  let links = [];

  try {
    const res = await fetch(CONFIG_PATH, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (Array.isArray(data)) links = data;
    else throw new Error('config 格式错误，应为 JSON 数组');
  } catch (err) {
    console.warn('加载 links.json 失败:', err.message);
    grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;color:var(--text-muted);padding:3rem 0;">
        暂无链接配置 · 请编辑 <code style="background:var(--surface);padding:2px 6px;border-radius:4px;">config/links.json</code>
      </div>`;
    return;
  }

  if (links.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;color:var(--text-muted);">暂无链接</div>`;
    return;
  }

  // 渲染卡片，逐张错开入场动画
  links.forEach((item, i) => {
    const card = document.createElement('a');
    card.href = item.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.className = 'card';
    // stagger 动画延迟
    card.style.animationDelay = `${0.35 + i * 0.1}s`;

    // 去掉 http:// 或 https:// 前缀，只显示域名 + 路径
    const displayUrl = item.url
      .replace(/^https?:\/\//, '')
      .replace(/\/$/, '');

    card.innerHTML = `
      <div class="card-icon">${item.icon || '🔗'}</div>
      <div class="card-name">${escapeHtml(item.name)}</div>
      <div class="card-url">${escapeHtml(displayUrl)}</div>
      <div class="card-desc">${escapeHtml(item.description || '')}</div>
    `;

    grid.appendChild(card);
  });
})();

/** 简单的 XSS 防护 */
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
