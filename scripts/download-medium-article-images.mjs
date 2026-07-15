import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const slug = process.argv[2];
if (!slug) {
  console.error('Usage: node download-medium-article-images.mjs <medium-url-or-slug> [--names=name1.png,name2.png]');
  process.exit(1);
}

const articleUrl = slug.startsWith('http')
  ? slug.includes('?format=json')
    ? slug
    : `${slug}${slug.endsWith('/') ? '' : ''}?format=json`
  : `https://medium.com/@gade.madhu/${slug}?format=json`;

const namesArg = process.argv.find((a) => a.startsWith('--names='));
const names = namesArg ? namesArg.slice('--names='.length).split(',') : [];
const skipHero = !process.argv.includes('--include-hero');

const res = await fetch(articleUrl, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
});
let text = await res.text();
const jsonStart = text.indexOf('{');
if (jsonStart < 0) {
  console.error('No JSON found in response');
  process.exit(1);
}
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
    featured: Boolean(p.metadata.isFeatured),
  }));

const articleImages = skipHero ? images.filter((img) => !img.featured) : images;
if (skipHero && articleImages.length === images.length && images.length > 1) {
  articleImages.splice(0, 1);
}

console.log('Article:', data.payload.value.title);
console.log('Found', articleImages.length, 'images:');
articleImages.forEach((img, i) => console.log(i, img));

const outDir = path.resolve('public/images');

for (let i = 0; i < articleImages.length; i++) {
  const img = articleImages[i];
  const url = `https://miro.medium.com/v2/resize:fit:${img.width}/${img.id}`;
  const name = names[i] || `article-image-${i}.png`;
  console.log(`Downloading ${name} from ${url}`);

  const imgRes = await fetch(url);
  if (!imgRes.ok) {
    console.error('Failed:', imgRes.status);
    continue;
  }
  const buf = Buffer.from(await imgRes.arrayBuffer());
  await writeFile(path.join(outDir, name), buf);

  const w = buf.readUInt32BE(16);
  const h = buf.readUInt32BE(20);
  console.log(`saved ${name} (${w}x${h}, ${buf.length} bytes)`);
}
