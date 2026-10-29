const fs = require('node:fs');
const path = require('node:path');

// BrowserSync does not read .htaccess. Mirror the flat HTML routes locally.
function cleanUrls(directory) {
  const root = path.resolve(directory);
  return (request, response, next) => {
    const url = new URL(request.url, 'http://localhost');
    const match = url.pathname.match(/^\/([a-z0-9-]+)(?:\.html)?\/?$/);
    if (!match) return next();

    const slug = match[1];
    const page = slug === 'services' ? 'expertise' : slug;
    if (!fs.existsSync(path.join(root, `${page}.html`))) return next();

    const canonical = page === 'index' ? '/' : `/${page}`;
    if (url.pathname !== canonical) {
      response.writeHead(301, { Location: canonical + url.search });
      response.end();
      return;
    }

    request.url = `/${page}.html${url.search}`;
    next();
  };
}

module.exports = { cleanUrls };
