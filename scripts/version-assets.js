const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');

function versionAssets(directory) {
  const root = path.resolve(directory);
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  if (measurementId && !/^G-[A-Z0-9]+$/.test(measurementId)) {
    throw new Error('GA4_MEASUREMENT_ID must be a Google Analytics 4 ID starting with G-.');
  }

  for (const file of fs.readdirSync(root).filter((name) => name.endsWith('.html'))) {
    const filename = path.join(root, file);
    let html = fs.readFileSync(filename, 'utf8');
    html = html.replace(/\b(src|href)=("|')([^"']+)\2/g, (match, attribute, quote, url) => {
      if (/^(?:[a-z]+:|\/\/)/i.test(url)) return match;
      const [resource, fragment] = url.split('#');
      const [assetPath, query = ''] = resource.split('?');
      if (!/\.(?:css|js)$/i.test(assetPath)) return match;
      const asset = path.resolve(root, assetPath.replace(/^\//, ''));
      if (!asset.startsWith(root + path.sep) || !fs.existsSync(asset)) {
        throw new Error(`${file} references a missing asset: ${assetPath}`);
      }
      const hash = crypto.createHash('sha256').update(fs.readFileSync(asset)).digest('hex').slice(0, 12);
      const parameters = new URLSearchParams(query);
      parameters.set('v', hash);
      return `${attribute}=${quote}${assetPath}?${parameters}${fragment ? '#' + fragment : ''}${quote}`;
    });
    if (measurementId) {
      html = html.replace(/(<meta name="ga4-measurement-id" content=")[^"]*(">)/, `$1${measurementId}$2`);
    }
    fs.writeFileSync(filename, html);
  }
}

module.exports = { versionAssets };
