// Remove transparent export margins so CSS can size each can proportionally.
// Run with: node scripts/prepare-can-images.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const assets = new URL('../public/assets/', import.meta.url);
await mkdir(new URL('cans/', assets), { recursive: true });
for (const [name, source] of [
  ['original', 'new-can-2.png'],
  ['mint', 'new-can-variant-1.png'],
  ['clove', 'clove_can_transparent_fixed.png'],
  ['athlete', 'black_can_extracted.png'],
]) {
  await sharp(fileURLToPath(new URL(source, assets)))
    .trim()
    .resize({ height: 1200, withoutEnlargement: true })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(fileURLToPath(new URL(`cans/${name}.webp`, assets)));
}
