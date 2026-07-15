import { writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  Referer: 'https://www.linkedin.com/',
};

const diagramUrl =
  'https://media.licdn.com/dms/image/v2/D4E12AQHo_fvKBV_chA/article-inline_image-shrink_400_744/B4EZ7RdkP7IkAM-/0/1781630650095?e=2147483647&v=beta&t=eYHRD4orvmBFd2tZeAWK4U5fRUV5bKmF663ZOTV_1Yk';

const outDir = path.resolve('public/images');
const tempPath = path.join(outDir, 'career-model-canvas-diagram-source.png');
const outPath = path.join(outDir, 'career-model-canvas-diagram.png');

const res = await fetch(diagramUrl, { headers });
if (!res.ok) throw new Error(`Download failed: ${res.status}`);
const source = Buffer.from(await res.arrayBuffer());
await writeFile(tempPath, source);

const meta = await sharp(source).metadata();
console.log('Source:', `${meta.width}x${meta.height}`, `${source.length} bytes`);

const targetWidth = 1890;
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

await unlink(tempPath);
