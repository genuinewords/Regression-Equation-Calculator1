const fs = require('fs');
const path = require('path');
const en = JSON.parse(fs.readFileSync('src/i18n/en.json', 'utf8'));
const enAboutKeys = Object.keys(en.about);
console.log('en.json about keys:', enAboutKeys.join(', '));
const required = ['mission', 'missionText', 'values', 'valuesText', 'team', 'teamText'];
const locales = ['en','hi','es','ru','fr','de','it','pt','bn','ja','ko','ms','pl','id','ar','bg','tr','sv'];
let issues = 0;
for (const loc of locales) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join('src/i18n', loc + '.json'), 'utf8'));
    const aboutKeys = Object.keys(data.about);
    const missing = required.filter(k => !aboutKeys.includes(k));
    if (missing.length > 0) { console.log(loc + ': MISSING ' + missing.join(', ')); issues++; }
    else { console.log(loc + ': OK (' + aboutKeys.length + ' keys)'); }
  } catch (e) { console.log(loc + ': INVALID - ' + e.message); issues++; }
}
console.log('Issues: ' + issues);
