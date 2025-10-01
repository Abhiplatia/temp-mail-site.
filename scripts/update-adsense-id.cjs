const fs = require('fs');
const glob = require('glob');

const oldPublisherId = 'ca-pub-XXXXXXXXXXXXXXXXX';
const newPublisherId = 'ca-pub-6097791887535573';

// Get all files that might contain AdSense code
const patterns = [
  'public/*.html',
  'client/index.html',
  'client/src/components/adsense.tsx',
  'client/src/pages/home.tsx'
];

let totalUpdated = 0;

patterns.forEach(pattern => {
  const files = glob.sync(pattern);
  
  files.forEach(filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    
    if (content.includes(oldPublisherId)) {
      content = content.replace(new RegExp(oldPublisherId, 'g'), newPublisherId);
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`✓ Updated: ${filepath}`);
      totalUpdated++;
    }
  });
});

console.log(`\n✅ Done! Updated ${totalUpdated} files with your actual AdSense Publisher ID.`);
console.log(`Publisher ID: ${newPublisherId}`);
