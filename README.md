# Oussama Malass portfolio

## Publish on GitHub Pages

Copy all extracted files and folders into the directory your GitHub Pages site publishes, replacing the previous versions. Keep assets/ and vendor/ in place. Commit and push using your existing workflow. No build step or API key is needed.

## Included

- index.html: portfolio content and page metadata.
- style.css: responsive layout, dark hero, animation and accessibility styles.
- script.js: navigation, award viewer, motion controls and the latest CV generator.
- Oussama_Malass_CV.pdf: the latest reviewed two-page CV.
- assets/: local company logos and earned badge artwork.
- vendor/: jsPDF, embedded CV fonts and their license.
- Profile2.webp, Award.webp and the original training certificate.

This package includes the balanced desktop hero, green availability indicator, removed floating card, verified public testimonial and badge selection, and the revised CV without the platform-feedback bullet.

## CV updates

Edit generateCVPDF() in script.js to change CV content. Then use Download CV to regenerate Oussama_Malass_CV.pdf and replace the static copy too. Updating only the PDF will not change the website's CV buttons.

## Publishing settings

The original robots noindex directives are retained. People can visit the link directly, but search engines are asked not to index the site. This is not access control. Change the robots meta tag if you want search visibility. Google Fonts and Font Awesome load externally; the portrait, program logos, badges, CV generator and embedded CV fonts are included locally.

Badge cards are a manually maintained selection. The latest-badges link points to the public HackerOne profile; no automatic badge API integration is included.

## Validation

Desktop and 390px mobile layouts reviewed in Chrome. Mobile navigation, CV download, motion controls and award viewer checked. JavaScript syntax, local files, section anchors, unique IDs, image descriptions and structured data checked. The latest two-page CV was rendered and visually reviewed; 2024 training dates and the 2026 graduation year are retained. Checks do not constitute testing on every browser or physical device.

The live GitHub repository has not been modified.
