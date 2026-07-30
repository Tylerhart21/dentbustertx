import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..');
const OUT = path.join(REPO, 'media', 'wraps');
fs.mkdirSync(OUT, { recursive: true });

const DL = 'C:/Users/Tyler (VisoryAI)/Downloads';
const JOBS = [
  { src: 'BFCF8C4D-28D5-4AC2-985D-DFEA6AE9C52C.jpeg', out: 'stormz.jpg' },
  { src: '62908A5F-5668-447D-ABD0-A162363AA433.jpeg', out: 'troop221.jpg' },
  { src: '9C8AC4F9-E199-4F97-B239-58A5EFC94FD8.jpeg', out: 'heyday.jpg' },
  { src: '22252489-ADAD-4337-A127-CF92C55A4A22.jpeg', out: 'zoomin.jpg' },
];

for (const j of JOBS) {
  const info = await sharp(path.join(DL, j.src))
    .rotate()                                   // bake in EXIF orientation
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(OUT, j.out));
  console.log(j.out, '->', info.width + 'x' + info.height, Math.round(fs.statSync(path.join(OUT, j.out)).size / 1024) + 'KB');
}
