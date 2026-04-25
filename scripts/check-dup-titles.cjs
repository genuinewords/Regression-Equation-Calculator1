const fs = require('fs');
const path = require('path');
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(f) {
    const fp = path.join(dir, f);
    if (fs.statSync(fp).isDirectory()) {
      results = results.concat(walk(fp));
    } else if (f === 'index.html') {
      results.push(fp);
    }
  });
  return results;
}
const files = walk('C:/Users/Z/Documents/GitHub/Regression-Equation-Calculator1/dist');
const titles = {};
files.forEach(function(f) {
  const html = fs.readFileSync(f, 'utf8');
  const m = html.match(/<title>([^<]+)<\/title>/);
  if (m) {
    const t = m[1];
    if (!titles[t]) titles[t] = [];
    titles[t].push(f.replace('C:/Users/Z/Documents/GitHub/Regression-Equation-Calculator1/dist', ''));
  }
});
const dups = Object.entries(titles).filter(function(e) { return e[1].length > 1; }).sort(function(a,b) { return b[1].length - a[1].length; });
console.log('Total duplicate titles: ' + dups.length);
console.log('Total pages affected: ' + dups.reduce(function(s,e) { return s + e[1].length; }, 0));
dups.forEach(function(e) {
  console.log('\n[' + e[1].length + 'x] ' + e[0]);
  e[1].forEach(function(p) { console.log('  ' + p); });
});
