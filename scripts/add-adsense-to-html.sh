#!/bin/bash

# Script to add AdSense code to all HTML files in public/

for file in public/*.html; do
    # Skip if file doesn't exist
    [ -e "$file" ] || continue
    
    echo "Processing: $file"
    
    # Check if AdSense script already exists
    if grep -q "pagead2.googlesyndication.com" "$file"; then
        echo "  - AdSense already added, skipping"
        continue
    fi
    
    # Add AdSense script before </head>
    sed -i 's|</head>|    <!-- Google AdSense -->\n    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"\n            crossorigin="anonymous"></script>\n</head>|' "$file"
    
    # Add Header Ad after <body>
    sed -i 's|<body>|<body>\n    <!-- HEADER AD -->\n    <ins class="adsbygoogle"\n         style="display:block"\n         data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"\n         data-ad-slot="1234567890"\n         data-ad-format="horizontal"\n         data-full-width-responsive="true"></ins>\n    <script>\n         (adsbygoogle = window.adsbygoogle || []).push({});\n    </script>\n|' "$file"
    
    # Add Footer Ad before </body>
    sed -i 's|</body>|    <!-- FOOTER AD -->\n    <ins class="adsbygoogle"\n         style="display:block"\n         data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"\n         data-ad-slot="4567890123"\n         data-ad-format="horizontal"\n         data-full-width-responsive="true"></ins>\n    <script>\n         (adsbygoogle = window.adsbygoogle || []).push({});\n    </script>\n</body>|' "$file"
    
    echo "  - AdSense code added"
done

echo "Done! AdSense added to all HTML files."
