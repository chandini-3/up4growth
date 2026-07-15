import path from 'node:path';
import sharp from 'sharp';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  Referer: 'https://www.linkedin.com/',
};

const scheduleUrl =
  'https://media.licdn.com/dms/image/v2/D5612AQG8wNh-2Vc-Yw/article-inline_image-shrink_1500_2232/B56ZaFlvIDGQAU-/0/1745997988487?e=2147483647&v=beta&t=H-rGBPc1TfOsJKtfL2hWxTeo_bG867Fsy-WGsdD9X_c';

const outPath = path.resolve('public/images/amazing-day-schedule.png');

const res = await fetch(scheduleUrl, { headers });
if (!res.ok) throw new Error(`Download failed: ${res.status}`);

const source = Buffer.from(await res.arrayBuffer());
const meta = await sharp(source).metadata();
console.log('Source:', `${meta.width}x${meta.height}`, `${source.length} bytes`);

const targetWidth = 1500;
const targetHeight = Math.round((meta.height / meta.width) * targetWidth);

await sharp(source)
  .resize(targetWidth, targetHeight, {
    kernel: sharp.kernel.lanczos3,
    withoutEnlargement: false,
  })
  .sharpen({ sigma: 0.8, m1: 1.0, m2: 0.4 })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(outPath);

const outMeta = await sharp(outPath).metadata();
const outStat = await import('node:fs/promises').then((fs) => fs.stat(outPath));
console.log('Saved:', outPath);
console.log('Output:', `${outMeta.width}x${outMeta.height}`, `${outStat.size} bytes`);
