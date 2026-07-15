import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const url =
  'https://media.licdn.com/dms/image/v2/D4E12AQGHWZtEPACU1g/article-inline_image-shrink_1000_1488/B4EZVMmddxHUAY-/0/1740746905888?e=2147483647&v=beta&t=QJHtgGv4ORshlraigHHS4Adm8RhOv_UB0IqoBrp9zew';

const outPath = path.resolve('public/images/self-appreciation-template.png');
const res = await fetch(url);
if (!res.ok) throw new Error(`Failed: ${res.status}`);
const buf = Buffer.from(await res.arrayBuffer());
await writeFile(outPath, buf);
console.log(`saved ${outPath} (${buf.length} bytes)`);
