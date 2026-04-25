const fs = require('fs');
const path = require('path');
const i18nDir = path.join(__dirname, '..', 'src', 'i18n');
['id', 'ms', 'de', 'pl'].forEach(function(l) {
  const j = JSON.parse(fs.readFileSync(path.join(i18nDir, l + '.json'), 'utf8'));
  console.log(l + ': contact.title=' + j.contact.title + ', expCalc.title=' + j.expCalc.title + ', lsrlCalc.title=' + j.lsrlCalc.title + ', rcCalc.title=' + j.rcCalc.title + ', assumptionsChecker.title=' + j.assumptionsChecker.title);
});
