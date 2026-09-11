# Arco V&S Consulting — bilingual SEO redesign

This revision includes separate, indexable Spanish and English versions.

## Language URLs
- Spanish: `https://arcovysconsulting.com/`
- English: `https://arcovysconsulting.com/en/`

## SEO included
- Unique Spanish and English `<title>` and meta descriptions
- Self-referencing canonical URLs
- Reciprocal `hreflang` (`es-CO`, `en`, and `x-default`)
- `robots` directives
- Open Graph and Twitter/X social metadata
- 1200×630 social sharing image
- Schema.org JSON-LD using `AccountingService`, `WebSite`, `WebPage`, `Service` catalog and `FAQPage`
- `robots.txt`
- XML sitemap with language alternates
- Semantic heading structure, descriptive service copy and accessible language navigation
- Existing scroll reveal animations and interactive margin calculator retained

## Files
- `index.html` — Spanish homepage
- `en/index.html` — English homepage
- `styles.css` — shared responsive styles and animation
- `script.js` — shared interactions, now language-aware
- `assets/arcovys-social.jpg` — social sharing image
- `robots.txt` — crawler rules
- `sitemap.xml` — bilingual sitemap

## Deployment notes
Upload the entire folder contents to the web root, preserving the `/en/` and `/assets/` directories. The live server should return HTTP 200 for both `/` and `/en/`.

After deployment, add the domain to Google Search Console, submit `https://arcovysconsulting.com/sitemap.xml`, and inspect both language URLs. If old WordPress URLs are being replaced, map useful old URLs to their closest new equivalents with 301 redirects rather than sending every old page to the homepage.

The contact form still opens the visitor's email app. For production lead capture, connect it to a backend, WordPress form plugin, CRM, or form service.
