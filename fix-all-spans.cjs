const fs = require('fs');
const dirs = ['src/pages', 'src/pages/[locale]'];
let totalFixed = 0;
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.astro'));
  files.forEach(f => {
    const fp = dir + '/' + f;
    let content = fs.readFileSync(fp, 'utf8');
    const original = content;
    // Fix ALL spans with set:html that contain dynamic content (step, note, text, point, etc.)
    content = content.replace(
      /<span class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed( pt-0\.5)?" set:html=\{(\w+)\}/g,
      '<div class="text-sm text-surface-600 dark:text-surface-400 leading-relaxed" set:html={$2}'
    );
    if (content !== original) {
      fs.writeFileSync(fp, content);
      console.log('Fixed spans in ' + dir + '/' + f);
      totalFixed++;
    }
  });
});
console.log('Total files fixed:', totalFixed);
