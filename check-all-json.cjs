const fs = require('fs');
const path = require('path');
function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file.endsWith('.json')) {
      results.push(filePath);
    }
  }
  return results;
}
const base = 'C:/Users/Z/Documents/GitHub/Regression-Equation-Calculator1/src';
walkDir(base).forEach(f => {
  try {
    JSON.parse(fs.readFileSync(f, 'utf8'));
  } catch (e) {
    console.log('BROKEN ' + f + ': ' + e.message.substring(0, 120));
  }
});
console.log('Done checking all JSON files');
