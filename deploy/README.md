# Website deployment

Run `npm ci` and `npm run build`, then upload the contents of `dist/` to the website document root, including the hidden `.htaccess` file. The release includes the sitemap, robots file, custom 404 page, contact and subscription endpoints, and their PHP dependencies. Keep the existing server-side `.env` containing SMTP settings; it is intentionally excluded from the release.

The production build compresses the current CSS and JavaScript and gives local stylesheet and script URLs content-based cache versions. Current CSS includes custom sections not fully mirrored in Sass, so the production build optimizes CSS directly.

For the current OpenLiteSpeed host, apply the native settings described in [OPENLITESPEED.md](OPENLITESPEED.md). OpenLiteSpeed does not apply Apache header and error-page directives from `.htaccess`.

## Google Analytics

Google Analytics is configured with measurement ID `G-P69RQDL9LW` on every public page. To override it during the build:

```sh
GA4_MEASUREMENT_ID=G-YOUR_REAL_ID npm run build
```

Alternatively, set the `ga4-measurement-id` meta tag on each page. Empty IDs cause no Google Analytics requests. Keep the privacy policy and the site's required consent settings aligned with the analytics configuration. The shared integration is in `app/js/site.js`.

## Release checks

After uploading, run the HTTP checks in [OPENLITESPEED.md](OPENLITESPEED.md), open the main pages on desktop and mobile, test the menu and rotating report covers, and confirm form delivery with the hosting SMTP configuration. When GA4 is enabled, confirm page views arrive in its Realtime report.
