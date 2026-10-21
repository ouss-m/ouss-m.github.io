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

## Mobile update

Based on the latest user-supplied HTML and CSS, preserving the revised introduction and wider desktop layout. The mobile hero places a compact portrait beneath the name. Navigation now has a contrasting panel, animated hamburger/close button, backdrop and keyboard dismissal. Only the availability dot glows green. Mobile orbit motion is restored, with a darker background and more vivid name gradient. Motion controls and reduced-motion preferences remain supported.

This update changes index.html, style.css and script.js. Publish all three together. The CSS and script URLs include a version tag to refresh cached assets. The latest reviewed CV is unchanged and included. Validated at 320px and 390px mobile widths plus desktop, including menu and motion controls and CV generation.

## Portrait motion refinement

The orbiting dot is replaced with a subtle blue highlight following the inside of the portrait card border. It scales with the card, stays clipped within its rounded frame, and respects the Motion toggle and reduced-motion preferences. This refinement changes index.html and style.css.

## Electron orbit update

Replaced the portrait-border highlight with three elliptical electron tracks. Each moving electron uses the exact same SVG ellipse as its track, so the dot cannot drift away from the ring. The SVG scales as a single unit and stays within the portrait column. Pause and reduced-motion controls are preserved. Changed files: index.html and style.css.

## Symmetric atom refinement

Three identical elliptical tracks now share one center and are spaced at 0, 60 and 120 degrees. All electrons move together on a slow 24-second cycle, with matching muted blue styling to reduce distraction.
