const fs = require('fs');
const path = require('path');
const glob = require('glob');

const adsenseHead = `    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
            crossorigin="anonymous"></script>
`;

const headerAd = `    <!-- HEADER AD -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
         data-ad-slot="1234567890"
         data-ad-format="horizontal"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>

`;

const footerAd = `
    <!-- FOOTER AD -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
         data-ad-slot="4567890123"
         data-ad-format="horizontal"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
`;

// Get all HTML files
const files = glob.sync('public/*.html');

files.forEach(filepath => {
  console.log(`Processing: ${filepath}`);
  
  let content = fs.readFileSync(filepath, 'utf8');
  
  // Check if already has AdSense
  if (content.includes('pagead2.googlesyndication.com')) {
    console.log(`  - Already has AdSense, skipping`);
    return;
  }
  
  // Add AdSense script to <head>
  if (content.includes('</head>')) {
    content = content.replace('</head>', adsenseHead + '</head>');
  }
  
  // Add Header Ad after <body>
  if (content.includes('<body>')) {
    content = content.replace('<body>', '<body>\n' + headerAd);
  }
  
  // Add Footer Ad before </body>
  if (content.includes('</body>')) {
    content = content.replace('</body>', footerAd + '</body>');
  }
  
  // Write back
  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`  ✓ AdSense added`);
});

console.log('\n✅ Done! AdSense added to all HTML files.');
