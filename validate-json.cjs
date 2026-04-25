const fs = require('fs');
const dir = 'C:/Users/Z/Documents/GitHub/Regression-Equation-Calculator1/src/i18n';
fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'en.json').forEach(f => {
  try {
    JSON.parse(fs.readFileSync(dir + '/' + f, 'utf8'));
    console.log('OK ' + f);
  } catch (e) {
    console.log('BROKEN ' + f + ': ' + e.message.split('\n')[0]);
  }
});
const sdir = dir + '/shared';
fs.readdirSync(sdir).filter(f => f.endsWith('.json')).forEach(f => {
  try {
    JSON.parse(fs.readFileSync(sdir + '/' + f, 'utf8'));
    console.log('OK shared/' + f);
  } catch (e) {
    console.log('BROKEN shared/' + f + ': ' + e.message.split('\n')[0]);
  }
});
