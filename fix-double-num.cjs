const fs = require('fs');
const enPath = 'src/i18n/en.json';
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const sections = ['lsrlCalc','quadCalc','multiCalc','pearson','grubbs','assumptionsChecker','rcCalc','expCalc'];
let fixes = 0;

function fixArrayItems(arr, section, key) {
  if (!Array.isArray(arr)) return arr;
  return arr.map((item, i) => {
    if (typeof item !== 'string') return item;

    // Fix 1: Orphan </strong> — text starts with "Text.</strong>" meaning <strong>N. was stripped
    // Pattern: "Some text.</strong> rest" → "<strong>Some text.</strong> rest"
    const orphanMatch = item.match(/^([^<]+\.?)<\/strong>\s*(.*)/);
    if (orphanMatch) {
      fixes++;
      console.log(`FIX ORPHAN ${section}.${key}[${i}]: added <strong> before "${orphanMatch[1].substring(0,40)}..."`);
      return `<strong>${orphanMatch[1]}</strong> ${orphanMatch[2]}`;
    }

    // Fix 2: "Step N —" pattern — remove "Step N —" since template already numbers
    const stepMatch = item.match(/^<strong>\s*Step\s+\d+\s*[—\-–]\s*/);
    if (stepMatch) {
      const stripped = item.substring(stepMatch[0].length);
      fixes++;
      console.log(`FIX STEP ${section}.${key}[${i}]: stripped "${stepMatch[0].replace(/\s+/g,' ').trim()}"`);
      return `<strong>${stripped}`;
    }

    return item;
  });
}

function fixObject(obj, section) {
  for (const [k, v] of Object.entries(obj)) {
    if (Array.isArray(v)) {
      obj[k] = fixArrayItems(v, section, k);
    } else if (v && typeof v === 'object') {
      fixObject(v, section + '.' + k);
    }
  }
}

sections.forEach(s => {
  if (en[s]) fixObject(en[s], s);
});

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
console.log('\nTotal fixes:', fixes);
