const fs = require('fs');
const dir = 'C:/Users/Z/Documents/GitHub/Regression-Equation-Calculator1/src/i18n/shared';
fs.readdirSync(dir).filter(f => f.endsWith('.json') && f !== 'en.json').forEach(f => {
  let c = fs.readFileSync(dir + '/' + f, 'utf8');
  const broken = '"expCalc": "Exponential Regression"`n    "lsrlCalc": "Least Squares Line"`n    "rcCalc": "Regression Curve",';
  const fixed = '"expCalc": "Exponential Regression",\n    "lsrlCalc": "Least Squares Line",\n    "rcCalc": "Regression Curve",';
  if (c.includes(broken)) {
    c = c.replace(broken, fixed);
    fs.writeFileSync(dir + '/' + f, c);
    console.log('Fixed ' + f);
  } else {
    console.log('OK ' + f);
  }
});
