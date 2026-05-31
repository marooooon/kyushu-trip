// ===== フォトギャラリー ランダム順 =====
const track = document.querySelector('.photo-track');
if (track) {
  const origImgs = Array.from(track.querySelectorAll('.photo-slide:not([aria-hidden]) img'));
  const dupImgs  = Array.from(track.querySelectorAll('.photo-slide[aria-hidden] img'));
  const srcs = origImgs.map(img => img.getAttribute('src'));
  for (let i = srcs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [srcs[i], srcs[j]] = [srcs[j], srcs[i]];
  }
  origImgs.forEach((img, i) => img.setAttribute('src', srcs[i]));
  dupImgs.forEach((img, i)  => img.setAttribute('src', srcs[i]));
}

// ===== RVパーク マップ =====
const rvMap = L.map('map-rvparks').setView([32.6, 130.9], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(rvMap);

const rvIcon = L.divIcon({
  className: '',
  html: '<div style="background:var(--green-main,#4a7c2f);color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid white;">🅿️</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -16]
});

[
  { name: 'RVパークsmart 糸島ファームハウスUOVO', lat: 33.565, lng: 130.200, pet: '🐾 ペット可', pref: '福岡県' },
  { name: 'RVパーク 直方・遠賀川', lat: 33.740, lng: 130.730, pet: '🐾 ペット可', pref: '福岡県' },
  { name: 'RVパーク ドームハウス唐津', lat: 33.445, lng: 129.965, pet: '🐾 ペット可', pref: '佐賀県' },
  { name: 'RVパーク させぼ海道', lat: 33.180, lng: 129.720, pet: '🐾 ペット可', pref: '長崎県' },
  { name: 'RVパーク 雲仙・小地獄温泉', lat: 32.750, lng: 130.275, pet: '⚠️ ペット可（要確認）', pref: '長崎県' },
  { name: 'RVパーク ASO（阿蘇）', lat: 32.935, lng: 131.050, pet: '🐾 ペット可', pref: '熊本県' },
  { name: 'RVパーク 天草・牛深', lat: 32.200, lng: 130.030, pet: '🐾 ペット可', pref: '熊本県' },
  { name: 'RVパーク 霧島', lat: 31.900, lng: 130.850, pet: '🐾 ペット可', pref: '鹿児島県' },
  { name: 'RVパーク 桜島・溶岩なぎさ公園前', lat: 31.590, lng: 130.670, pet: '🐾 ペット可', pref: '鹿児島県' },
  { name: 'RVパーク SUZU（宮崎）', lat: 31.895, lng: 131.395, pet: '🐾 ペット可', pref: '宮崎県' },
  { name: 'RVパーク 高千穂', lat: 32.710, lng: 131.305, pet: '🐾 ペット可', pref: '宮崎県' },
  { name: 'RVパーク べっぷ地獄温泉', lat: 33.290, lng: 131.490, pet: '🐾 ペット可', pref: '大分県' },
  { name: 'RVパーク 湯布院', lat: 33.270, lng: 131.365, pet: '🐾 ペット可', pref: '大分県' }
].forEach(rv => {
  L.marker([rv.lat, rv.lng], { icon: rvIcon })
    .addTo(rvMap)
    .bindPopup(`<strong>${rv.name}</strong><br><small>${rv.pref}</small><br>${rv.pet}`);
});

// ===== グルメ おすすめ店 マップ =====
const gourmetMap = L.map('map-gourmet').setView([32.5, 130.9], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(gourmetMap);

const gourmetIcon = L.divIcon({
  className: '',
  html: '<div style="background:#c0392b;color:white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:14px;box-shadow:0 2px 6px rgba(0,0,0,0.3);border:2px solid white;">🍴</div>',
  iconSize: [28, 28],
  iconAnchor: [14, 14],
  popupAnchor: [0, -16]
});

[
  { name: '一蘭 本社総本店', dish: '博多ラーメン', lat: 33.592, lng: 130.413, pref: '福岡県' },
  { name: 'もつ鍋 一藤', dish: 'もつ鍋', lat: 33.582, lng: 130.400, pref: '福岡県' },
  { name: '河太郎 呼子店', dish: '活きイカ刺し', lat: 33.520, lng: 129.850, pref: '佐賀県（呼子）' },
  { name: '四海楼', dish: '長崎ちゃんぽん', lat: 32.740, lng: 129.868, pref: '長崎県' },
  { name: '岩崎本舗 大浦本店', dish: '角煮まんじゅう', lat: 32.730, lng: 129.868, pref: '長崎県' },
  { name: '福砂屋 本店', dish: '長崎カステラ', lat: 32.745, lng: 129.878, pref: '長崎県' },
  { name: '菅乃屋 熊本駅店', dish: '馬刺し', lat: 32.793, lng: 130.691, pref: '熊本県' },
  { name: 'あか牛の館', dish: 'あか牛丼', lat: 32.933, lng: 131.105, pref: '熊本県（阿蘇）' },
  { name: '天文館むじゃき', dish: '白熊かき氷', lat: 31.593, lng: 130.553, pref: '鹿児島県' },
  { name: '黒べぇ', dish: '黒豚しゃぶしゃぶ', lat: 31.595, lng: 130.555, pref: '鹿児島県' },
  { name: '丸万焼鳥 本店', dish: '宮崎地鶏炭火焼（もも焼き発祥）', lat: 31.912, lng: 131.423, pref: '宮崎県' },
  { name: '関あじ関さば館', dish: '関あじ・関さば', lat: 33.125, lng: 131.800, pref: '大分県（臼杵）' }
].forEach(r => {
  L.marker([r.lat, r.lng], { icon: gourmetIcon })
    .addTo(gourmetMap)
    .bindPopup(`<strong>${r.name}</strong><br><small>${r.pref}</small><br>🍽️ ${r.dish}`);
});

// ===== コーラと行くスポット マップ =====
const dogMap = L.map('map-dogtips').setView([32.4, 130.9], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(dogMap);

const dogSpotIcon = L.divIcon({
  className: '',
  html: '<div style="background:#2d8b2d;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 2px 6px rgba(0,0,0,0.35);border:2px solid white;">🐾</div>',
  iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -18]
});

const onsenIcon = L.divIcon({
  className: '',
  html: '<div style="background:#7b3fa0;color:white;border-radius:50%;width:30px;height:30px;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 2px 6px rgba(0,0,0,0.35);border:2px solid white;">♨️</div>',
  iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -18]
});

[
  { name: '草千里ヶ浜', note: '広大な草原を一緒に走る！', lat: 32.882, lng: 131.003 },
  { name: '桜島・溶岩なぎさ公園', note: '岩場散策・足湯も犬OK', lat: 31.588, lng: 130.672 },
  { name: '湯布院・湯の坪街道', note: '犬連れOK店多数', lat: 33.266, lng: 131.370 },
  { name: '糸島・芥屋海岸', note: '早朝のビーチ散歩', lat: 33.572, lng: 130.175 },
  { name: 'えびの高原', note: 'ハイキングコース犬OK', lat: 31.983, lng: 130.872 },
  { name: '日南海岸・鬼の洗濯岩', note: '岩場散策', lat: 31.708, lng: 131.379 },
  { name: '唐津城・城内公園', note: '犬連れOK', lat: 33.456, lng: 129.969 }
].forEach(s => {
  L.marker([s.lat, s.lng], { icon: dogSpotIcon })
    .addTo(dogMap)
    .bindPopup(`<strong>🐾 ${s.name}</strong><br>${s.note}`);
});

[
  { name: '桜島溶岩なぎさ公園・足湯', note: '無料・犬OK', lat: 31.591, lng: 130.675 },
  { name: '湯布院・駅前足湯', note: 'ペット連れ利用可', lat: 33.262, lng: 131.362 },
  { name: '霧島温泉郷・路地足湯', note: '一部ペット可', lat: 31.900, lng: 130.868 },
  { name: '指宿・砂むし温泉エリアの足湯', note: '外OK', lat: 31.237, lng: 130.660 }
].forEach(s => {
  L.marker([s.lat, s.lng], { icon: onsenIcon })
    .addTo(dogMap)
    .bindPopup(`<strong>♨️ ${s.name}</strong><br>${s.note}`);
});

// ===== スムーズスクロールと現在地ハイライト =====
const sections = document.querySelectorAll('section, [id]');
const navLinks = document.querySelectorAll('nav a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.background = '';
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.background = 'var(--green-light)';
          link.style.color = 'white';
        }
      });
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('[id]').forEach(el => observer.observe(el));

// チェックリストの状態をローカルストレージに保存
document.querySelectorAll('.check-item input').forEach((cb, i) => {
  const key = 'checklist_' + i;
  cb.checked = localStorage.getItem(key) === 'true';
  cb.addEventListener('change', () => localStorage.setItem(key, cb.checked));
});
