# Connect Agency: OpenLiteSpeed deployment

The live response identifies CyberPanel/OpenLiteSpeed. OpenLiteSpeed reads rewrite rules from `.htaccess`, but it ignores Apache header, MIME, expiry and error-page directives there. The release therefore needs the native virtual-host settings below as well as the updated site files. [OpenLiteSpeed rewrite documentation](https://docs.openlitespeed.org/config/rewriterules/)

These settings have not been applied to production. The Apache configuration was exercised locally with HTTP and TLS; the native OpenLiteSpeed fragment was checked against its official documentation and configuration parser, but needs the installed server's configuration test and response checks.

## Apply the release and virtual-host settings

1. Build and upload the contents of `dist/` into the website's existing document root, including the hidden `.htaccess` file and `404.html`. Keep the server's private `.env` file in place. The rewrite rules consolidate HTTP and www into HTTPS on the apex host, redirect `/index.html` to `/`, and redirect old `.html` page URLs to extensionless paths such as `/about-us`. Clean page requests serve the existing HTML files internally. Query strings are preserved.
2. In OpenLiteSpeed WebAdmin, find the website's virtual host through the listener's host mappings, then open its **Basic → Config File** value. Use that actual config path; CyberPanel installations may name it differently from the example `vhconf.conf`. Preserve the existing PHP application, SSL, user, logging and document-root settings.
3. Merge [openlitespeed-vhost.conf](openlitespeed-vhost.conf) into that config. Update an existing `rewrite` or `context /` block instead of adding a second copy. Preserve existing header operations when adding the two security-header lines. Replace any existing `errorpage 404` with `/404.html`. If an equivalent asset context already exists, update it rather than creating overlapping matches.

The fragment uses the server's `$DOC_ROOT` variable, so no site path needs to be hardcoded. OpenLiteSpeed supports static contexts for headers and caching, and virtual-host `errorpage` blocks for a custom 404. [Custom header settings](https://docs.openlitespeed.org/config/headers/), [custom error pages](https://docs.openlitespeed.org/config/advanced/errorpages/)

| Context | Result |
| --- | --- |
| `/` | HSTS `max-age=31536000`, plus `X-Content-Type-Options: nosniff` |
| CSS and JavaScript | Explicit `Cache-Control: public, max-age=604800` and matching one-week expiry |
| WebP and AVIF | Correct MIME types, `Cache-Control: public, max-age=2592000` and matching 30-day expiry |
| Missing URLs | Serve `/404.html` internally and retain HTTP status 404 |

HSTS covers this website's apex and www hosts. Both already support HTTPS. The policy excludes `includeSubDomains` and `preload`; browsers ignore HSTS received through HTTP. Add it to this website's virtual host, rather than a global server context. Context headers are the native OpenLiteSpeed mechanism for this setting. [OpenLiteSpeed security headers](https://docs.openlitespeed.org/security/headers/), [HSTS rules](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Strict-Transport-Security)

For WebAdmin editing, the fragment's `extraHeaders` lines are the **Header Operations** field; `allowBrowse 1` means **Accessible: Yes**; `enableExpires 1` means **Enable Expires: Yes**. Use the exact regex URI and `$DOC_ROOT/$0` location shown for each asset context. Keep HTML out of these asset contexts. [OpenLiteSpeed custom headers](https://docs.openlitespeed.org/config/headers/)

## Validate and load the server config

Run on the hosting server after saving its configuration:

```sh
sudo /usr/local/lsws/bin/openlitespeed -t
```

After the configuration test passes, use WebAdmin's **Graceful Restart**, or:

```sh
sudo systemctl restart lsws
```

OpenLiteSpeed requires a restart to reload rewrite/config changes. These are its documented configuration-test and restart commands. [OpenLiteSpeed commands](https://docs.openlitespeed.org/commands/), [rewrite reload behavior](https://docs.openlitespeed.org/config/rewriterules/)

## Check the resulting responses

```sh
curl -sS -D - -o /dev/null 'http://theconnectagency.in/'
curl -sS -D - -o /dev/null 'https://www.theconnectagency.in/about-us.html?utm_source=review'
curl -sS -D - -o /dev/null 'http://www.theconnectagency.in/index.html?utm_source=review'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/about-us'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/work.html?utm_source=review'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/contact/'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/services.html'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/js/libs.min.js?v=review'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/js/libs.min.js'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/css/main.css?v=review'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/img/backgrounds/contact-hero-premium.webp'
curl -sS -D /tmp/connect-404-headers.txt -o /tmp/connect-404-body.html 'https://theconnectagency.in/nested/review-missing-page'
curl -sS -D - -o /dev/null 'https://theconnectagency.in/review-missing-page.html'
```

Check that:

- The first three requests return 301 directly to the corresponding clean HTTPS apex URL. The about request ends at `https://theconnectagency.in/about-us?utm_source=review` and the index request ends at `https://theconnectagency.in/?utm_source=review`, each in one hop.
- The HTTPS homepage returns 200 with `Strict-Transport-Security: max-age=31536000`.
- `/about-us` returns 200 without redirecting to `.html`. `/work.html?utm_source=review`, `/contact/`, and `/services.html` return 301 to `/work?utm_source=review`, `/contact`, and `/expertise` respectively. Check all navigation uses clean URLs, including after a direct page load or refresh.
- Both versioned and unversioned JavaScript, and the CSS request, receive a single `Cache-Control` header with `max-age=604800` and a matching `Expires` value. JavaScript must have a JavaScript MIME type.
- The WebP response has `Content-Type: image/webp` and `max-age=2592000`. Check `image/avif` similarly when an AVIF asset is deployed.
- `/tmp/connect-404-headers.txt` shows status 404. The body contains the branded “This page left” content. Missing `.html` URLs also retain status 404 without redirecting to `/404`. Open the nested URL in a browser and confirm its styles, logos, menu, Home and Work links load from the root paths.

If redirects work but headers or the custom 404 do not, verify that the edited native config belongs to the listener mapping serving this domain, then inspect the OpenLiteSpeed error log. Uploading `.htaccess` alone will not apply these native settings.

## Syntax references

The native keys and multiline header syntax were checked against the official OpenLiteSpeed source at commit `e6fb64773431146e137d713377fdd1c160a60a7b`: [plain config parser](https://github.com/litespeedtech/openlitespeed/blob/e6fb64773431146e137d713377fdd1c160a60a7b/src/main/plainconf.cpp), [context MIME/header configuration](https://github.com/litespeedtech/openlitespeed/blob/e6fb64773431146e137d713377fdd1c160a60a7b/src/http/httpcontext.cpp), [expiry parsing](https://github.com/litespeedtech/openlitespeed/blob/e6fb64773431146e137d713377fdd1c160a60a7b/src/http/expiresctrl.cpp), and [example virtual host](https://github.com/litespeedtech/openlitespeed/blob/e6fb64773431146e137d713377fdd1c160a60a7b/dist/conf/vhosts/Example/vhconf.conf).
