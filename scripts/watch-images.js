const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const WATCH_DIR = path.resolve(__dirname, '../images');
const OUT_DIR   = path.resolve(__dirname, '../images/opt');
const SUPPORTED = new Set(['.heic', '.jpg', '.jpeg', '.png', '.webp']);

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function nextPhotoName() {
  const existing = fs.readdirSync(OUT_DIR).filter(f => /^photo-\d+\.jpg$/.test(f));
  const nums = existing.map(f => parseInt(f.match(/\d+/)[0]));
  const max = nums.length ? Math.max(...nums) : 0;
  return `photo-${String(max + 1).padStart(2, '0')}.jpg`;
}

function optimize(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!SUPPORTED.has(ext)) return;
  if (filePath.startsWith(OUT_DIR)) return;

  // ファイル書き込み完了を少し待つ
  setTimeout(() => {
    if (!fs.existsSync(filePath)) return;
    const outName = nextPhotoName();
    const outFile = path.join(OUT_DIR, outName);
    const label = `\x1b[36m[画像最適化]\x1b[0m`;
    console.log(`${label} ${path.basename(filePath)} → ${outName} 変換中...`);
    try {
      execSync(`magick "${filePath}" -resize 1200x900\\> -quality 78 -strip "${outFile}"`);
      console.log(`${label} ✓ ${outName} 保存完了`);
    } catch (e) {
      console.error(`${label} ✗ 変換失敗: ${e.message}`);
    }
  }, 800);
}

const processing = new Set();

fs.watch(WATCH_DIR, (event, filename) => {
  if (!filename || event !== 'rename') return;
  const filePath = path.join(WATCH_DIR, filename);
  if (processing.has(filePath)) return;
  processing.add(filePath);
  setTimeout(() => processing.delete(filePath), 3000);
  optimize(filePath);
});

console.log('\x1b[32m[画像ウォッチ]\x1b[0m images/ フォルダを監視中 — HEIC/JPG/PNG を追加すると自動でopt/に変換されます');
