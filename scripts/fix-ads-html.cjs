const fs = require('fs');
const glob = require('glob');

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
let count = 0;

files.forEach(filepath => {
  let content = fs.readFileSync(filepath, 'utf8');
  let modified = false;
  
  // Add Header Ad after <body> if not present
  if (!content.includes('<!-- HEADER AD -->') && content.includes('<body>')) {
    content = content.replace('<body>', '<body>\n' + headerAd);
    modified = true;
  }
  
  // Add Footer Ad before </body> if not present
  if (!content.includes('<!-- FOOTER AD -->') && content.includes('</body>')) {
    content = content.replace('</body>', footerAd + '</body>');
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filepath, content, 'utf8');
    count++;
    console.log(`✓ Fixed: ${filepath}`);
  }
});

console.log(`\n✅ Done! Fixed ${count} HTML files.`);
