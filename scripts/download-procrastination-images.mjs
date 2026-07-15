import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const articleUrl =
  'https://medium.com/@gade.madhu/breaking-through-procrastination-unlock-your-productivity-potential-74db2e4ce211?format=json';

const res = await fetch(articleUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
});
let text = await res.text();
const jsonStart = text.indexOf('{');
text = text.slice(jsonStart);
const data = JSON.parse(text);

const paragraphs = data.payload.value.content.bodyModel.paragraphs;
const images = paragraphs
  .filter((p) => p.type === 4 && p.metadata?.id)
  .map((p) => ({
    id: p.metadata.id,
    width: p.metadata.originalWidth,
    height: p.metadata.originalHeight,
    caption: p.text || '',
  }));

// Skip featured hero image; keep only inline article figures.
const articleImages = images.slice(1);

console.log('Found', articleImages.length, 'article images:');
articleImages.forEach((img, i) => console.log(i, img));

const names = [
  'procrastination-common-triggers.png',
  'procrastination-productivity-techniques.png',
  'procrastination-focus-framework.png',
];

const outDir = path.resolve('public/images');

for (let i = 0; i < articleImages.length; i++) {
  const img = articleImages[i];
  const url = `https://miro.medium.com/v2/resize:fit:${img.width}/${img.id}`;
  console.log(`Downloading ${names[i] || `image-${i}`} from ${url}`);

  const imgRes = await fetch(url);
  if (!imgRes.ok) {
    console.error('Failed:', imgRes.status);
    continue;
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  const name = names[i] || `procrastination-extra-${i}.png`;
  await writeFile(path.join(outDir, name), buf);

  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  console.log(`saved ${name} (${w}x${h}, ${buf.length} bytes)`);
}
