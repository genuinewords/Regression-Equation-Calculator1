const fs = require('fs');
const path = 'src/pages';
const files = fs.readdirSync(path).filter(f => f.endsWith('.astro') && !f.startsWith('['));
let totalFixed = 0;
files.forEach(f => {
  const fp = path + '/' + f;
  let content = fs.readFileSync(fp, 'utf8');
  const original = content;
  content = content.replace(
    /<span class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed( pt-0\.5)?" set:html=\{point\}/g,
    '<div class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed" set:html={point}'
  );
  if (content !== original) {
    fs.writeFileSync(fp, content);
    const count = (original.match(/<span class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed/g) || []).length
      - (content.match(/<span class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed/g) || []).length;
    totalFixed += count;
    console.log('Fixed ' + count + ' spans in ' + f);
  }
});
console.log('Total spans converted to divs:', totalFixed);
