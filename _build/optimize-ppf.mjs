import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..');
const OUT = path.join(REPO, 'media', 'ppf');
fs.mkdirSync(OUT, { recursive: true });

const DL = 'C:/Users/Tyler (VisoryAI)/Downloads';
const JOBS = [
  { src: 'IMG_2798.png', out: 'tesla.jpg' },
  { src: 'IMG_2797.png', out: 'audi.jpg' },
  { src: 'IMG_2796.png', out: 'civic.jpg' },
  { src: 'IMG_2795.png', out: 'truck.jpg' },
];

for (const j of JOBS) {
  const info = await sharp(path.join(DL, j.src))
    .rotate()
    .trim({ background: '#000000', threshold: 30 })   // strip the black letterbox bars
    .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(OUT, j.out));
  console.log(j.out, '->', info.width + 'x' + info.height,
    Math.round(fs.statSync(path.join(OUT, j.out)).size / 1024) + 'KB');
}
