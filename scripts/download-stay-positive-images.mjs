import path from 'node:path';
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  Referer: 'https://www.linkedin.com/',
};

const images = [
  {
    name: 'stay-positive-cover.png',
    urls: [
      'https://media.licdn.com/dms/image/v2/D4E12AQEvrM_yyWQZ5Q/article-cover_image-shrink_720_1280/B4EaBxuuC5G4AQ-/0/1788614468702?e=2147483647&v=beta&t=_FsO607xSeZKz_olcDMB7MgQpfgr-uo8RjDweVpThqI',
      'https://media.licdn.com/dms/image/v2/D4E12AQEvrM_yyWQZ5Q/article-cover_image-shrink_1280_720/B4EaBxuuC5G4AQ-/0/1788614468702?e=2147483647&v=beta&t=_FsO607xSeZKz_olcDMB7MgQpfgr-uo8RjDweVpThqI',
    ],
  },
  {
    name: 'stay-positive-hot-stove.png',
    urls: [
      'https://media.licdn.com/dms/image/v2/D4E12AQGK2DslE-wWWQ/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1788678875538?e=2147483647&v=beta&t=IBMS4lOZcsFEgPZ-1kOAWLL5-B0EnFHi92J3vI6RmNI',
      'https://media.licdn.com/dms/image/v2/D4E12AQGK2DslE-wWWQ/article-inline_image-shrink_400_744/B4EaB1kaQlKAAM-/0/1788678875538?e=2147483647&v=beta&t=IBMS4lOZcsFEgPZ-1kOAWLL5-B0EnFHi92J3vI6RmNI',
    ],
  },
  {
    name: 'stay-positive-brain-dump-notes.png',
    urls: [
      'https://media.licdn.com/dms/image/v2/D4E12AQH1XCrRBdjDBA/article-inline_image-shrink_1000_1488/B4EaB1wkz4GgAM-/0/1788682063513?e=2147483647&v=beta&t=geaclWsFctxmDeE40zHsiGOG4eMdNTL6Xdo8H1robpc',
      'https://media.licdn.com/dms/image/v2/D4E12AQH1XCrRBdjDBA/article-inline_image-shrink_1500_2232/B4EaB1wkz4GgAM-/0/1788682063513?e=2147483647&v=beta&t=geaclWsFctxmDeE40zHsiGOG4eMdNTL6Xdo8H1robpc',
    ],
  },
];

const outDir = path.resolve('public/images');

async function download(urls) {
  for (const url of urls) {
    const res = await fetch(url, { headers });
    if (res.ok) return Buffer.from(await res.arrayBuffer());
    console.warn('Failed', res.status, url.slice(0, 90));
  }
  throw new Error('All URLs failed');
}

for (const item of images) {
  const buf = await download(item.urls);
  const outPath = path.join(outDir, item.name);
  const meta = await sharp(buf).metadata();
  console.log(`${item.name} source: ${meta.width}x${meta.height} ${buf.length} bytes format=${meta.format}`);

  // Save as PNG for consistency; upscale modestly if under 1200px wide for clarity
  let pipeline = sharp(buf);
  if (meta.width && meta.width < 1200) {
    const targetWidth = Math.min(1600, meta.width * 2);
    const targetHeight = Math.round((meta.height / meta.width) * targetWidth);
    pipeline = pipeline.resize(targetWidth, targetHeight, {
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    }).sharpen({ sigma: 0.6, m1: 1.0, m2: 0.3 });
  }

  await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(outPath);
  const outMeta = await sharp(outPath).metadata();
  console.log(`saved ${item.name}: ${outMeta.width}x${outMeta.height}`);
}
