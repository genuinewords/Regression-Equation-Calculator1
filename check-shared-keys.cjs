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

const enShared = JSON.parse(fs.readFileSync('src/i18n/shared/en.json', 'utf8'));
const enSharedKeys = new Set(getKeys(enShared));

const locales = ['hi','es','ru','fr','de','it','pt','bn','ja','ko','ms','pl','id','ar','bg','tr','sv'];
let totalMissing = 0;

for (const loc of locales) {
  try {
    const locData = JSON.parse(fs.readFileSync(path.join('src/i18n/shared', loc + '.json'), 'utf8'));
    const locKeys = new Set(getKeys(locData));
    const missing = [...enSharedKeys].filter(k => !locKeys.has(k));
    totalMissing += missing.length;
    console.log(loc + ': ' + missing.length + ' missing keys');
    if (missing.length > 0) console.log('  ' + missing.join(', '));
  } catch (e) {
    console.log(loc + ': INVALID JSON - ' + e.message);
  }
}

console.log('\nTotal missing across all shared locales: ' + totalMissing);
