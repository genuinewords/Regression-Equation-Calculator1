const fs = require('fs');
const path = require('path');

// Check all locale JSON files for validity
const locales = ['en','hi','es','ru','fr','de','it','pt','bn','ja','ko','ms','pl','id','ar','bg','tr','sv'];
let issues = 0;

// Check main locale files
for (const loc of locales) {
  try {
    const data = JSON.parse(fs.readFileSync(path.join('src/i18n', loc + '.json'), 'utf8'));
    // Check for any key that's referenced in page templates but missing
    // Quick scan for common missing keys
    const sections = ['home', 'about', 'contact', 'terms', 'privacy', 'blog', 'calculator', 'pearson', 'grubbs', 'assumptionsChecker', 'linearCalc', 'quadCalc', 'multiCalc', 'notFound', 'sitemap'];
    for (const s of sections) {
      if (!data[s]) { console.log(loc + ': MISSING section ' + s); issues++; }
    }
  } catch (e) { console.log(loc + ': INVALID JSON - ' + e.message); issues++; }
}

// Check FAQ files
for (const loc of locales) {
  try {
    JSON.parse(fs.readFileSync(path.join('src/i18n/faq', loc + '.json'), 'utf8'));
  } catch (e) { console.log('faq/' + loc + ': INVALID JSON'); issues++; }
}

// Check shared files
for (const loc of locales) {
  try {
    JSON.parse(fs.readFileSync(path.join('src/i18n/shared', loc + '.json'), 'utf8'));
  } catch (e) { console.log('shared/' + loc + ': INVALID JSON'); issues++; }
}

console.log('Total issues: ' + issues);
