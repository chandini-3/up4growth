import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const urls = [
  {
    name: 'constructive-feedback-workshop-responses.png',
    url: 'https://media.licdn.com/dms/image/v2/D4E12AQG1YqA-L4YfOg/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1725795117554?e=2147483647&v=beta&t=AWDrR2QGfd3fqblylkRoZRyWA-pIbX1a6C3AC4ubTIU',
  },
  {
    name: 'constructive-feedback-johari-window.png',
    url: 'https://media.licdn.com/dms/image/v2/D4E12AQETyFSfJui2GA/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1725795376649?e=2147483647&v=beta&t=_iR8GqPfiryz5VipxgiCrWQ5i2v-nxgfnlkU6npN8LY',
  },
  {
    name: 'constructive-feedback-clear-model.png',
    url: 'https://media.licdn.com/dms/image/v2/D4E12AQFH8hIy2Seskg/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1725796185147?e=2147483647&v=beta&t=3agwxQFd-7Zkn2puhtBbDAkxzkexy-4COkah5te36jY',
  },
  {
    name: 'constructive-feedback-inline-4.png',
    url: 'https://media.licdn.com/dms/image/v2/D4E12AQEeGwKwief9Tw/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1725966607478?e=2147483647&v=beta&t=fzPHObZ4DenPGhp9I1XxgUHfYArL1yfBa8ltuGvp2UI',
  },
];

const outDir = path.resolve('public/images');

for (const item of urls) {
  const res = await fetch(item.url);
  if (!res.ok) {
    throw new Error(`Failed ${item.name}: ${res.status}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(path.join(outDir, item.name), buf);
  console.log(`saved ${item.name} (${buf.length} bytes)`);
}
