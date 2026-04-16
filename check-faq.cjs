const fs = require('fs');
const enFaq = JSON.parse(fs.readFileSync('src/i18n/faq/en.json', 'utf8'));
const enCount = enFaq.faqs.length;
const locales = ['hi', 'es', 'ru', 'fr', 'de'];
let issues = 0;

for (const loc of locales) {
  try {
    const data = JSON.parse(fs.readFileSync('src/i18n/faq/' + loc + '.json', 'utf8'));
    const count = data.faqs.length;
    let englishAnswers = 0;
    for (let i = 0; i < count; i++) {
      const a = data.faqs[i].answer;
      if (/^[A-Z]/.test(a) && /\b(the|is|are|and|that|this|for|with|from)\b/i.test(a)) {
        if (loc === 'hi' && !/[\u0900-\u097F]/.test(a)) englishAnswers++;
        if (loc === 'es' && !/[áéíóúñ¿¡]/i.test(a) && !/[\u00C0-\u024F]/.test(a)) englishAnswers++;
        if (loc === 'ru' && !/[\u0400-\u04FF]/.test(a)) englishAnswers++;
        if (loc === 'fr' && !/[àâéèêëîïôùûüç]/i.test(a) && !/[\u00C0-\u024F]/.test(a)) englishAnswers++;
        if (loc === 'de' && !/[äöüßÄÖÜ]/.test(a) && !/[\u00C0-\u024F]/.test(a)) englishAnswers++;
      }
      if (data.faqs[i].display !== enFaq.faqs[i].display) {
        console.log(loc + ': FAQ #' + (i+1) + ' display mismatch');
        issues++;
      }
    }
    const status = count === enCount ? 'OK' : 'MISMATCH';
    console.log(loc + ': ' + count + '/' + enCount + ' items [' + status + '], ~' + englishAnswers + ' English answers');
  } catch (e) {
    console.log(loc + ': INVALID JSON - ' + e.message);
    issues++;
  }
}
console.log('Issues: ' + issues);
