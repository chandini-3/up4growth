const url = process.argv[2];
if (!url) {
  console.error('Usage: node fetch-linkedin-images.mjs <url>');
  process.exit(1);
}

const res = await fetch(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  },
});
const html = await res.text();
const matches = [...html.matchAll(/https:\/\/media\.licdn\.com\/[^"'\s<>\\]+/g)].map((m) => m[0]);
const unique = [...new Set(matches)];
console.log(unique.join('\n'));
