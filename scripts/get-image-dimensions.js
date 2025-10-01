import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const imagesDir = 'attached_assets/stock_images';

async function getImageDimensions() {
  const files = await readdir(imagesDir);
  const webpFiles = files.filter(f => f.endsWith('.webp')).sort();
  
  console.log('Image Dimensions:\n');
  
  for (const file of webpFiles) {
    const filePath = join(imagesDir, file);
    const metadata = await sharp(filePath).metadata();
    console.log(`${file}: ${metadata.width}x${metadata.height}`);
  }
}

getImageDimensions().catch(console.error);
