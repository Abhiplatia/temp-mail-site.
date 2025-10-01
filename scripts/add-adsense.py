#!/usr/bin/env python3
import os
import glob

adsense_head = '''    <!-- Google AdSense -->
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
            crossorigin="anonymous"></script>
'''

header_ad = '''    <!-- HEADER AD -->
    <ins class="adsbygoogle"
         style="display:block"
         data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
         data-ad-slot="1234567890"
         data-ad-format="horizontal"
         data-full-width-responsive="true"></ins>
    <script>
         (adsbygoogle = window.adsbygoogle || []).push({});
    </script>

'''

footer_ad = '''
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
'''

# Process all HTML files
for filepath in glob.glob('public/*.html'):
    print(f"Processing: {filepath}")
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check if already has AdSense
    if 'pagead2.googlesyndication.com' in content:
        print(f"  - Already has AdSense, skipping")
        continue
    
    # Add AdSense script to <head>
    if '</head>' in content and 'pagead2.googlesyndication.com' not in content:
        content = content.replace('</head>', adsense_head + '</head>')
    
    # Add Header Ad after <body>
    if '<body>' in content and '<!-- HEADER AD -->' not in content:
        content = content.replace('<body>', '<body>\n' + header_ad)
    
    # Add Footer Ad before </body>
    if '</body>' in content and '<!-- FOOTER AD -->' not in content:
        content = content.replace('</body>', footer_ad + '</body>')
    
    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"  ✓ AdSense added")

print("\n✅ Done! AdSense added to all HTML files.")
