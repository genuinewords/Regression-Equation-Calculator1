const fs = require('fs');
const enFaq = JSON.parse(fs.readFileSync('src/i18n/faq/en.json', 'utf8'));
const enCount = enFaq.faqs.length;
const locales = ['hi','es','ru','fr','de','it','pt','bn','ja','ko','ms','pl','id','ar','bg','tr','sv'];
let issues = 0;
for (const loc of locales) {
  try {
    const data = JSON.parse(fs.readFileSync('src/i18n/faq/' + loc + '.json', 'utf8'));
    const count = data.faqs.length;
    let englishAnswers = 0;
    for (let i = 0; i < count; i++) {
      const a = data.faqs[i].answer;
      if (/^[A-Za-z]/.test(a) && /\b(the|is|are|and|that|this|for|with|from|which|can|you)\b/i.test(a) && a.split(/\s+/).length > 4) {
        if (!/[\u0900-\u097F\u0400-\u04FF\u0530-\u058F\u0600-\u06FF\u0980-\u09FF\u3000-\u9FFF\uAC00-\uD7AF]/.test(a)) englishAnswers++;
      }
      if (data.faqs[i].display !== enFaq.faqs[i].display) { console.log(loc + ': FAQ #' + (i+1) + ' display mismatch'); issues++; }
    }
    const status = count === enCount ? 'OK' : 'MISMATCH';
    console.log(loc + ': ' + count + '/' + enCount + ' items [' + status + '], ~' + englishAnswers + ' English answers');
  } catch (e) { console.log(loc + ': INVALID - ' + e.message); issues++; }
}
console.log('Issues: ' + issues);
