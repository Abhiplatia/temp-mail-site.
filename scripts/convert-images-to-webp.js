import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputDir = path.join(__dirname, '../attached_assets/stock_images');
const outputDir = inputDir;

async function convertImagesToWebP() {
  const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.jpg'));
  
  console.log(`Found ${files.length} JPG images to convert...`);
  
  let totalOriginalSize = 0;
  let totalWebPSize = 0;
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace('.jpg', '.webp'));
    
    const originalStats = fs.statSync(inputPath);
    totalOriginalSize += originalStats.size;
    
    try {
      await sharp(inputPath)
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
      
      const webpStats = fs.statSync(outputPath);
      totalWebPSize += webpStats.size;
      
      const reduction = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);
      console.log(`✓ ${file} -> ${file.replace('.jpg', '.webp')} (${reduction}% smaller)`);
    } catch (error) {
      console.error(`✗ Failed to convert ${file}:`, error.message);
    }
  }
  
  const totalReduction = ((1 - totalWebPSize / totalOriginalSize) * 100).toFixed(1);
  console.log(`\n✓ Conversion complete!`);
  console.log(`Original size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`WebP size: ${(totalWebPSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Total reduction: ${totalReduction}%`);
}

convertImagesToWebP().catch(console.error);
