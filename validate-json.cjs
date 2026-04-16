const fs = require('fs');
const locales = ['hi','es','ru','fr','de','it','pt','bn','ja','ko','ms','pl','id','ar','bg','tr','sv'];
for (const loc of locales) {
  try {
    JSON.parse(fs.readFileSync('src/i18n/' + loc + '.json', 'utf8'));
    console.log(loc + '.json: VALID');
  } catch (e) {
    console.log(loc + '.json: INVALID - ' + e.message);
  }
}
