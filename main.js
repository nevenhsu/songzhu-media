// 松竹媒體首頁原型：段落導覽、頁首明暗、版位說明面板、表單示範
(() => {
document.documentElement.classList.add('js');

// 各服務的說明（內容整理自既有業務資料，數字與範圍上線前需確認）
const SERVICES = {
  station: {
    title: '台北車站', img: 'assets/station.jpg',
    lead: '高鐵、臺鐵、捷運、機場捷運與客運在這裡交會。版位沿著旅客動線配置，一個檔期就能接觸到全台往來的旅客。',
    items: ['燈箱廣告', '壁貼與地貼', '數位燈箱', '大廳大型吊掛版位'],
    area: '高鐵臺鐵台北站 1F 大廳與 B1 層'
  },
  metro: {
    title: '捷運', img: 'assets/metro.jpg',
    lead: '通勤族每天經過兩次，看久了就記得。從單一燈箱到整站包覆都能安排。',
    items: ['站體包站', '彩繪列車', '車廂內海報', '閘門貼、電梯貼、壁貼', '數位屏與裸眼 3D 動態屏'],
    area: '台北捷運、台中捷運綠線'
  },
  bus: {
    title: '公車', img: 'assets/bus.jpg',
    lead: '依商圈、行政區或通勤動線選線，小預算也能做出聲量。',
    items: ['車身側面廣告', '車尾廣告', '全車包覆'],
    area: '台北市、新北市、台中市、高雄市'
  },
  decker: {
    title: '雙層觀光巴士', img: 'assets/decker.jpg',
    lead: '紅線東西串聯台北 101 與西門町，藍線南北連結故宮、士林官邸與中山商圈。',
    items: ['全車包覆', '紅線、藍線可分開選擇'],
    area: '台北市觀光路線，獨家代理'
  },
  airport: {
    title: '國際機場', img: 'assets/airport.jpg',
    lead: '手推車從報到櫃台一路推到入境大廳，品牌跟著旅客移動。適合想接觸商務客與出國旅客的品牌。',
    items: ['行李手推車廣告'],
    area: '桃園國際機場、高雄國際機場'
  },
  cinema: {
    title: '影城', img: 'assets/cinema.jpg',
    lead: '燈暗下來，手機收起來，整個影廳只看一個畫面。',
    items: ['電影映前廣告', '可依片型與地區選廳'],
    area: '全台合作連鎖影城'
  }
};

const header = document.getElementById('header');
const dots = document.getElementById('dots');
const sections = [...document.querySelectorAll('[data-label]')];

// 右側段落點
sections.forEach((sec, i) => {
  if (!sec.id) sec.id = 'sec-' + (sec.dataset.service || i);
  const a = document.createElement('a');
  a.href = '#' + sec.id;
  a.setAttribute('aria-label', sec.dataset.label);
  a.innerHTML = '<span>' + sec.dataset.label + '</span>';
  dots.appendChild(a);
});
const dotLinks = [...dots.children];

// 目前所在段落：更新段落點、頁首與段落點的明暗
function setActive(sec) {
  const i = sections.indexOf(sec);
  dotLinks.forEach((d, n) => d.classList.toggle('on', n === i));
  dots.dataset.tone = sec.dataset.tone;
}
const mid = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) setActive(e.target); });
}, { rootMargin: '-50% 0px -50% 0px' });
const topObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) header.dataset.tone = e.target.dataset.tone; });
}, { rootMargin: '0px 0px -96% 0px' });
const reveal = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.35 });
sections.forEach(s => { mid.observe(s); topObs.observe(s); });
document.querySelectorAll('.scene').forEach(s => reveal.observe(s));
document.getElementById('hero').classList.add('in');

// 舞台：主視覺與六個場域疊在同一個固定畫面，依捲動進度淡入淡出
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const wrap = document.getElementById('showcase');
const servicesAnchor = document.getElementById('services');
const scenes = [...wrap.querySelectorAll('.scene')];
if (!reduce && scenes.length > 1) {
  const n = scenes.length;
  const stage = document.createElement('div');
  stage.className = 'stage';
  scenes.forEach(s => { mid.unobserve(s); topObs.unobserve(s); reveal.unobserve(s); s.classList.add('in'); stage.appendChild(s); });
  const counter = document.createElement('div');
  counter.className = 'counter';
  counter.innerHTML = '<span></span><i></i><span>' + String(n - 1).padStart(2, '0') + '</span>';
  stage.appendChild(counter);
  wrap.appendChild(stage);
  wrap.classList.add('staged');
  wrap.style.setProperty('--n', n);
  // 「服務項目」錨點改指向舞台裡第一個服務的位置
  servicesAnchor.className = 'snap-mark';
  servicesAnchor.style.top = 'calc(1 * 100svh)';
  for (let i = 0; i < n; i++) {
    const m = document.createElement('div');
    m.className = 'snap-mark';
    m.style.top = 'calc(' + i + ' * 100svh)';
    wrap.appendChild(m);
  }
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const smooth = (a, b, v) => { const x = clamp((v - a) / (b - a), 0, 1); return x * x * (3 - 2 * x); };
  let active = -1, ticking = false;
  function render() {
    ticking = false;
    const vh = stage.offsetHeight;
    const raw = (window.scrollY - wrap.offsetTop) / vh;
    const p = clamp(raw, 0, n - 1);
    scenes.forEach((s, i) => {
      const d = p - i, ad = Math.abs(d);
      const o = 1 - smooth(0.3, 0.7, ad);           // 圖片：中段交疊淡入淡出
      const co = 1 - smooth(0.12, 0.42, ad);        // 文字：比圖片早一步退場
      s.style.setProperty('--o', o.toFixed(3));
      s.style.setProperty('--co', co.toFixed(3));
      s.style.setProperty('--ty', (-d * 48).toFixed(1) + 'px');
      s.style.setProperty('--sc', (1.04 + d * 0.05).toFixed(4));  // 圖片緩慢推近
      s.style.visibility = o > 0.001 ? 'visible' : 'hidden';
      s.style.pointerEvents = ad < 0.5 ? 'auto' : 'none';
      s.style.zIndex = ad < 0.5 ? 1 : 0;
    });
    const idx = Math.round(p);
    // 計數只算六個服務，停在主視覺時隱藏
    counter.firstChild.textContent = String(Math.max(idx, 1)).padStart(2, '0');
    counter.style.setProperty('--p', (clamp(p, 0, n - 1) / (n - 1)).toFixed(3));
    counter.style.opacity = smooth(0.45, 0.8, p).toFixed(3);
    const inside = raw > -0.5 && raw < n - 0.5;
    if (inside && idx !== active) { active = idx; setActive(scenes[idx]); }
    if (!inside) active = -1;
    if (raw >= 0 && raw <= n - 1) header.dataset.tone = 'dark';
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(render); } }, { passive: true });
  addEventListener('resize', render);
  render();
  // 捲動停下時自動對齊到最近的一個畫面，不會卡在兩張圖中間
  document.documentElement.classList.add('staged-page');
  let settleTimer = 0, touching = false;
  function settle() {
    if (touching) return;
    const vh = stage.offsetHeight;
    const raw = (window.scrollY - wrap.offsetTop) / vh;
    if (raw <= 0 || raw >= n - 1) return;              // 舞台以外的區域照常捲動
    const target = wrap.offsetTop + Math.round(raw) * vh;
    if (Math.abs(target - window.scrollY) > 2) window.scrollTo({ top: target, behavior: 'smooth' });
  }
  const queueSettle = () => { clearTimeout(settleTimer); settleTimer = setTimeout(settle, 140); };
  addEventListener('scroll', queueSettle, { passive: true });
  addEventListener('touchstart', () => { touching = true; clearTimeout(settleTimer); }, { passive: true });
  addEventListener('touchend', () => { touching = false; queueSettle(); }, { passive: true });

  // 段落點與網址錨點：跳到舞台中對應的位置
  const go = i => window.scrollTo({ top: wrap.offsetTop + i * stage.offsetHeight, behavior: 'smooth' });
  scenes.forEach((s, i) => {
    const link = dotLinks[sections.indexOf(s)];
    link.addEventListener('click', e => { e.preventDefault(); go(i); });
  });
}

// 手機選單
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menuBtn');
function closeMenu() { nav.classList.remove('open'); menuBtn.setAttribute('aria-expanded', 'false'); menuBtn.textContent = '選單'; }
menuBtn.addEventListener('click', () => {
  nav.classList.add('anim');
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
  menuBtn.textContent = open ? '關閉' : '選單';
});
nav.addEventListener('click', e => { if (e.target.tagName === 'A') closeMenu(); });

// 版位說明面板
const sheet = document.getElementById('sheet');
let current = null;
document.querySelectorAll('[data-open]').forEach(btn => btn.addEventListener('click', () => {
  const s = SERVICES[btn.dataset.open];
  current = s;
  document.getElementById('sheetTitle').textContent = s.title;
  document.getElementById('sheetLead').textContent = s.lead;
  document.getElementById('sheetArea').textContent = s.area;
  document.getElementById('sheetList').innerHTML = s.items.map(t => '<li>' + t + '</li>').join('');
  const img = document.getElementById('sheetImg');
  img.style.backgroundImage = 'url(' + s.img + ')';
  img.setAttribute('aria-label', s.title + '實景');
  sheet.showModal();
}));
document.getElementById('sheetClose').addEventListener('click', () => sheet.close());
sheet.addEventListener('click', e => { if (e.target === sheet) sheet.close(); });
document.getElementById('sheetCta').addEventListener('click', () => { if (current) pick(current.title === '國際機場' ? '機場' : current.title); sheet.close(); });

// 「索取方案」會先幫你勾好對應的服務
function pick(name) {
  document.querySelectorAll('input[name="svc"]').forEach(c => { if (c.value === name) c.checked = true; });
}
document.querySelectorAll('[data-pick]').forEach(a => a.addEventListener('click', () => pick(a.dataset.pick)));

// 表單示範：原型尚未連接寄信服務
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');
form.addEventListener('submit', e => {
  e.preventDefault();
  let firstBad = null;
  form.querySelectorAll('[required]').forEach(el => {
    const bad = !el.value.trim();
    el.classList.toggle('bad', bad);
    if (bad && !firstBad) firstBad = el;
  });
  note.hidden = false;
  if (firstBad) {
    note.className = 'form-note err';
    note.textContent = '請填寫公司名稱、聯絡人與電話。';
    firstBad.focus();
    return;
  }
  note.className = 'form-note';
  note.textContent = '這是原型，資料沒有送出。正式版會在這裡顯示「已收到，我們會盡快與你聯絡」。';
});
})();
