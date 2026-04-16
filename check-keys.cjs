const fs = require('fs');
const path = require('path');

function getKeys(obj, prefix = '') {
  let keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const full = prefix ? prefix + '.' + k : k;
    if (typeof v === 'object' && v !== null && !Array.isArray(v)) {
      keys = keys.concat(getKeys(v, full));
    } else {
      keys.push(full);
    }
  }
  return keys;
}

const enData = JSON.parse(fs.readFileSync('src/i18n/en.json', 'utf8'));
const enKeys = new Set(getKeys(enData));

const locales = ['hi','es','ru','fr','de','it','pt','bn','ja','ko','ms','pl','id','ar','bg','tr','sv'];
let totalMissing = 0;

for (const loc of locales) {
  const locData = JSON.parse(fs.readFileSync(path.join('src/i18n', loc + '.json'), 'utf8'));
  const locKeys = new Set(getKeys(locData));
  const missing = [...enKeys].filter(k => !locKeys.has(k));
  totalMissing += missing.length;
  console.log(loc + ': ' + missing.length + ' missing keys');
  if (missing.length > 0 && missing.length <= 20) {
    console.log('  ' + missing.join(', '));
  } else if (missing.length > 20) {
    console.log('  First 20: ' + missing.slice(0, 20).join(', '));
  }
}

console.log('\nTotal missing across all locales: ' + totalMissing);
