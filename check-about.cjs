const fs = require('fs');
const en = JSON.parse(fs.readFileSync('src/i18n/en.json', 'utf8'));
console.log('en.json about keys:', Object.keys(en.about));

const enAbout = en.about;
const missingFromEn = ['mission', 'missionText', 'values', 'valuesText', 'team', 'teamText'];
for (const k of missingFromEn) {
  console.log(k, 'in en.json:', enAbout[k] !== undefined ? 'YES' : 'NO');
}
