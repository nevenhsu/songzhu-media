(() => {
  'use strict';
  const media = {
    station: { title: '台北車站', short: '車站', caption: 'Taipei Main Station', lead: '讓品牌，成為旅程的起點。', body: '高鐵、臺鐵、捷運與客運在這裡交會。沿著旅客動線配置燈箱、壁貼與大型版位，讓品牌走進往來的日常。', area: '高鐵臺鐵台北站大廳與 B1', formats: '大型吊掛、燈箱、壁貼、數位屏幕' },
    metro: { title: '捷運', short: '捷運', caption: 'Metro Media', lead: '把一座車站，變成品牌展場。', body: '從站體包覆、彩繪列車到車廂海報，把品牌訊息放進通勤動線。用連續的視覺，串起每一次經過。', area: '台北捷運、台中捷運', formats: '站體包覆、彩繪列車、車廂海報、數位屏幕' },
    bus: { title: '公車', short: '公車', caption: 'Bus Media', lead: '會自己跑遍全城的大看板。', body: '依商圈、行政區或通勤動線規劃路線。從車身側面到全車包覆，讓品牌跟著公車走進城市生活。', area: '台北、新北、台中、高雄', formats: '車身側面、車尾廣告、全車包覆' },
    decker: { title: '雙層觀光巴士', short: '雙層巴士', caption: 'Taipei Sightseeing Bus', lead: '把品牌，帶上城市風景線。', body: '串聯台北街景與觀光動線，以醒目的雙層車體呈現品牌。從西門町到信義商圈，讓每一次經過都成為相遇。', area: '台北市觀光路線', formats: '全車包覆、紅線與藍線路線規劃' },
    airport: { title: '國際機場', short: '機場', caption: 'Airport Media', lead: '跟著旅客，從出發到抵達。', body: '手推車從報到櫃台一路走進航廈動線，品牌跟著旅客移動。讓訊息在商務與旅行的途中自然出現。', area: '桃園國際機場、高雄國際機場', formats: '行李手推車廣告' },
    cinema: { title: '影城', short: '影城', caption: 'Cinema Media', lead: '燈暗下來，品牌亮起來。', body: '電影開始前，讓品牌故事在大銀幕展開。依地區、片型與檔期規劃映前廣告，接觸走進影廳的觀眾。', area: '合作連鎖影城，依地區與檔期規劃', formats: '電影映前廣告' }
  };
  const byId = id => document.getElementById(id);
  document.documentElement.classList.add('has-js');
  const menu = document.querySelector('.menu-toggle');
  const navigation = byId('navigation');
  menu.hidden = false;
  function closeMenu() { navigation.classList.remove('is-open'); menu.setAttribute('aria-expanded', 'false'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); navigation.classList.toggle('is-open', open);
  });
  navigation.addEventListener('click', e => { if (e.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
  const tabs = [...document.querySelectorAll('[data-media]')];
  document.querySelector('.media-tabs').hidden = false;
  let selected = 'station';
  function selectMedia(key) {
    if (!media[key]) return;
    selected = key;
    const entry = media[key];
    tabs.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.media === key)));
    byId('media-image').src = `assets/${key}-optimized.jpg`;
    byId('media-image').alt = `${entry.title}媒體場域，AI 優化版位示意`;
    for (const [id, value] of Object.entries({ 'media-title': entry.title, 'media-caption': entry.caption, 'media-lead': entry.lead, 'media-body': entry.body, 'media-area': entry.area, 'media-formats': entry.formats })) byId(id).textContent = value;
    byId('media-inquiry').firstChild.textContent = `規劃${entry.short}廣告 `;
  }
  tabs.forEach(button => button.addEventListener('click', () => selectMedia(button.dataset.media)));
  document.querySelectorAll('[data-select]').forEach(link => link.addEventListener('click', () => selectMedia(link.dataset.select)));
  function clearSummary() { byId('brief-result').hidden = true; byId('brief-status').textContent = ''; }
  byId('media-inquiry').addEventListener('click', () => { byId('brief-media').value = media[selected].title; clearSummary(); });
  document.querySelectorAll('[data-region]').forEach(link => link.addEventListener('click', () => { byId('brief-region').value = link.dataset.region; byId('brief-media').value = '公車'; clearSummary(); }));
  const form = byId('brief-form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    byId('brief-text').value = `松竹媒體｜媒體規劃需求\n想了解的媒體：${byId('brief-media').value}\n預計曝光地區：${byId('brief-region').value}\n需求說明：${byId('brief-message').value.trim() || '希望進一步討論媒體建議。'}`;
    byId('brief-result').hidden = false;
    byId('brief-status').textContent = '摘要已產生，可複製後提供給業務窗口。尚未送出任何資料。';
    byId('brief-text').focus();
  });
  form.querySelector('[type=submit]').disabled = false;
  form.addEventListener('input', e => {
    if (e.target.id !== 'brief-text') clearSummary();
  });
  byId('copy-brief').addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(byId('brief-text').value); byId('brief-status').textContent = '需求摘要已複製，尚未送出任何資料。'; }
    catch { byId('brief-text').focus(); byId('brief-text').select(); byId('brief-status').textContent = '請複製已選取的摘要文字。'; }
  });
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .15 });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  }
})();
