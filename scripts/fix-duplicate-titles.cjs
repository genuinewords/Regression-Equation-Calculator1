const fs = require('fs');
const path = require('path');

const i18nDir = path.join(__dirname, '..', 'src', 'i18n');

const toolTranslations = {
  hi: {
    expCalc: { title: "घातांतीय प्रतिगमन कैलकुलेटर", description: "घातांतीय प्रतिगमन समीकरण (y = a · e^(bx)) की गणना करें" },
    lsrlCalc: { title: "न्यूनतम वर्ग प्रतिगमन रेखा कैलकुलेटर", description: "न्यूनतम वर्ग प्रतिगमन रेखा (y = mx + b) की गणना करें" },
    rcCalc: { title: "प्रतिगमन वक्र कैलकुलेटर", description: "बहुत प्रतिगमन मॉडल प्रकारों से संबंधों का विश्लेषण करें" },
    assumptionsChecker: { title: "प्रतिगमन अनुमान परीक्षक", description: "अपने डेटा के लिए चार रैखिक प्रतिगमन अनुमानों की जाँच करें" }
  },
  es: {
    expCalc: { title: "Calculadora de Regresión Exponencial", description: "Calcule la ecuación de regresión exponencial (y = a · e^(bx))" },
    lsrlCalc: { title: "Calculadora de Recta de Mínimos Cuadrados", description: "Calcule la recta de regresión por mínimos cuadrados (y = mx + b)" },
    rcCalc: { title: "Calculadora de Curva de Regresión", description: "Analice relaciones con múltiples tipos de modelos de regresión" },
    assumptionsChecker: { title: "Verificador de Supuestos de Regresión", description: "Verifique los cuatro supuestos de regresión lineal para sus datos" }
  },
  ru: {
    expCalc: { title: "Калькулятор экспоненциальной регрессии", description: "Рассчитайте уравнение экспоненциальной регрессии (y = a · e^(bx))" },
    lsrlCalc: { title: "Калькулятор МНК линии регрессии", description: "Рассчитайте линию регрессии методом наименьших квадратов (y = mx + b)" },
    rcCalc: { title: "Калькулятор кривой регрессии", description: "Анализируйте зависимости с помощью нескольких типов регрессионных моделей" },
    assumptionsChecker: { title: "Проверка предпосылок регрессии", description: "Проверьте четыре предпосылки линейной регрессии для ваших данных" }
  },
  fr: {
    expCalc: { title: "Calculateur de Régression Exponentielle", description: "Calculez l'équation de régression exponentielle (y = a · e^(bx))" },
    lsrlCalc: { title: "Calculateur de Droite des Moindres Carrés", description: "Calculez la droite de régression des moindres carrés (y = mx + b)" },
    rcCalc: { title: "Calculateur de Courbe de Régression", description: "Analysez les relations avec plusieurs types de modèles de régression" },
    assumptionsChecker: { title: "Vérificateur des Hypothèses de Régression", description: "Vérifiez les quatre hypothèses de régression linéaire pour vos données" }
  },
  de: {
    expCalc: { title: "Exponentieller Regressionsrechner", description: "Berechnen Sie die exponentielle Regressionsgleichung (y = a · e^(bx))" },
    lsrlCalc: { title: "Kleinste-Quadrate-Regressionsrechner", description: "Berechnen Sie die Kleinste-Quadrate-Regressionsgerade (y = mx + b)" },
    rcCalc: { title: "Regressionskurvenrechner", description: "Analysieren Sie Beziehungen mit mehreren Regressionsmodelltypen" },
    assumptionsChecker: { title: "Regressionsvoraussetzungsprüfer", description: "Prüfen Sie die vier Voraussetzungen der linearen Regression für Ihre Daten" }
  },
  it: {
    expCalc: { title: "Calcolatore di Regressione Esponenziale", description: "Calcola l'equazione di regressione esponenziale (y = a · e^(bx))" },
    lsrlCalc: { title: "Calcolatore della Retta dei Minimi Quadrati", description: "Calcola la retta di regressione dei minimi quadrati (y = mx + b)" },
    rcCalc: { title: "Calcolatore di Curva di Regressione", description: "Analizza le relazioni con più tipi di modelli di regressione" },
    assumptionsChecker: { title: "Verifica delle Ipotesi di Regressione", description: "Verifica le quattro ipotesi di regressione lineare per i tuoi dati" }
  },
  pt: {
    expCalc: { title: "Calculadora de Regressão Exponencial", description: "Calcule a equação de regressão exponencial (y = a · e^(bx))" },
    lsrlCalc: { title: "Calculadora de Regressão por Mínimos Quadrados", description: "Calcule a linha de regressão por mínimos quadrados (y = mx + b)" },
    rcCalc: { title: "Calculadora de Curva de Regressão", description: "Analise relações com vários tipos de modelos de regressão" },
    assumptionsChecker: { title: "Verificador de Pressupostos de Regressão", description: "Verifique os quatro pressupostos de regressão linear para seus dados" }
  },
  bn: {
    expCalc: { title: "সূচকীয় নিগমন ক্যালকুলেটর", description: "সূচকীয় নিগমন সমীকরণ (y = a · e^(bx)) গণনা করুন" },
    lsrlCalc: { title: "ন্যূনতম বর্গ নিগমন রেখা ক্যালকুলেটর", description: "ন্যূনতম বর্গ নিগমন রেখা (y = mx + b) গণনা করুন" },
    rcCalc: { title: "নিগমন বক্ররেখা ক্যালকুলেটর", description: "একাধিক নিগমন মডেল প্রকারের সাথে সম্পর্ক বিশ্লেষণ করুন" },
    assumptionsChecker: { title: "নিগমন অনুমান পরীক্ষক", description: "আপনার ডেটার জন্য চারটি রৈখিক নিগমন অনুমান পরীক্ষা করুন" }
  },
  ja: {
    expCalc: { title: "指数回帰計算機", description: "指数回帰方程式 (y = a · e^(bx)) を計算" },
    lsrlCalc: { title: "最小二乗回帰直線計算機", description: "最小二乗回帰直線 (y = mx + b) を計算" },
    rcCalc: { title: "回帰曲線計算機", description: "複数の回帰モデルタイプで関係を分析" },
    assumptionsChecker: { title: "回帰仮定チェッカー", description: "データの4つの線形回帰仮定を確認" }
  },
  ko: {
    expCalc: { title: "지수 회귀 계산기", description: "지수 회귀 방정식 (y = a · e^(bx)) 계산" },
    lsrlCalc: { title: "최소제곱 회귀선 계산기", description: "최소제곱 회귀선 (y = mx + b) 계산" },
    rcCalc: { title: "회귀 곡선 계산기", description: "여러 회귀 모델 유형으로 관계 분석" },
    assumptionsChecker: { title: "회귀 가정 검사기", description: "데이터의 4개 선형 회귀 가정 확인" }
  },
  ms: {
    expCalc: { title: "Kalkulator Regresi Eksponen", description: "Kira persamaan regresi eksponen (y = a · e^(bx))" },
    lsrlCalc: { title: "Kalkulator Garis Regresi Kuasa Dua Terkecil", description: "Kira garis regresi kuasa dua terkecil (y = mx + b)" },
    rcCalc: { title: "Kalkulator Lengkung Regresi", description: "Analisis hubungan dengan pelbagai jenis model regresi" },
    assumptionsChecker: { title: "Pemeriksa Andaian Regresi", description: "Periksa empat andaian regresi linear untuk data anda" },
    contact: { title: "Hubungi Kami" },
    home: { title: "Kalkulator Persamaan Regresi" },
    quadCalc: { title: "Kalkulator Regresi Kuadratik" },
    pearson: { title: "Kalkulator Korelasi Pearson" }
  },
  pl: {
    expCalc: { title: "Kalkulator Regresji Wykładniczej", description: "Oblicz równanie regresji wykładniczej (y = a · e^(bx))" },
    lsrlCalc: { title: "Kalkulator Regresji MNK", description: "Oblicz linię regresji metodą najmniejszych kwadratów (y = mx + b)" },
    rcCalc: { title: "Kalkulator Krzywej Regresji", description: "Analizuj zależności wieloma typami modeli regresji" },
    assumptionsChecker: { title: "Sprawdzacz Założeń Regresji", description: "Sprawdź cztery założenia regresji liniowej dla swoich danych" },
    contact: { title: "Skontaktuj się" }
  },
  id: {
    expCalc: { title: "Kalkulator Regresi Eksponensial", description: "Hitung persamaan regresi eksponensial (y = a · e^(bx))" },
    lsrlCalc: { title: "Kalkulator Garis Regresi Kuadrat Terkecil", description: "Hitung garis regresi kuadrat terkecil (y = mx + b)" },
    rcCalc: { title: "Kalkulator Kurva Regresi", description: "Analisis hubungan dengan berbagai jenis model regresi" },
    assumptionsChecker: { title: "Pemeriksa Asumsi Regresi", description: "Periksa empat asumsi regresi linear untuk data Anda" },
    contact: { title: "Hubungi Kami" },
    home: { title: "Kalkulator Persamaan Regresi" },
    quadCalc: { title: "Kalkulator Regresi Kuadratik" },
    pearson: { title: "Kalkulator Korelasi Pearson" }
  },
  ar: {
    expCalc: { title: "حاسبة الانحدار الأسي", description: "احسب معادلة الانحدار الأسي (y = a · e^(bx))" },
    lsrlCalc: { title: "حاسبة خط الانحدار بالمربعات الصغرى", description: "احسب خط الانحدار بالمربعات الصغرى (y = mx + b)" },
    rcCalc: { title: "حاسبة منحنى الانحدار", description: "حلل العلاقات بأنواع متعددة من نماذج الانحدار" },
    assumptionsChecker: { title: "مدقق افتراضات الانحدار", description: "تحقق من افتراضات الانحدار الخطي الأربعة لبياناتك" }
  },
  bg: {
    expCalc: { title: "Калкулатор за експоненциална регресия", description: "Изчислете уравнението на експоненциална регресия (y = a · e^(bx))" },
    lsrlCalc: { title: "Калкулатор за регресия по най-малки квадрати", description: "Изчислете линията на регресия по най-малки квадрати (y = mx + b)" },
    rcCalc: { title: "Калкулатор за регресионна крива", description: "Анализирайте зависимости с множество типове регресионни модели" },
    assumptionsChecker: { title: "Проверка на предпоставки на регресията", description: "Проверете четирите предпоставки за линейна регресия за вашите данни" }
  },
  tr: {
    expCalc: { title: "Üstel Regresyon Hesaplayıcı", description: "Üstel regresyon denklemini (y = a · e^(bx)) hesaplayın" },
    lsrlCalc: { title: "En Küçük Kareler Regresyon Hesaplayıcı", description: "En küçük kareler regresyon doğrusunu (y = mx + b) hesaplayın" },
    rcCalc: { title: "Regresyon Eğrisi Hesaplayıcı", description: "Birden fazla regresyon modeli türüyle ilişkileri analiz edin" },
    assumptionsChecker: { title: "Regresyon Varsayımları Denetleyicisi", description: "Verileriniz için dört doğrusal regresyon varsayımını denetleyin" }
  },
  sv: {
    expCalc: { title: "Exponentiell Regressionskalkylator", description: "Beräkna exponentiell regressionsekvation (y = a · e^(bx))" },
    lsrlCalc: { title: "Minsta-Kvadrat-Regressionskalkylator", description: "Beräkna minsta-kvadrat-regressionslinjen (y = mx + b)" },
    rcCalc: { title: "Regressionskurvkalkylator", description: "Analysera relationer med flera regressionstyper" },
    assumptionsChecker: { title: "Regressionsantagandekontroll", description: "Kontrollera fyra linjära regressionsantaganden för dina data" }
  }
};

const locales = Object.keys(toolTranslations);
let modified = 0;

locales.forEach(locale => {
  const filePath = path.join(i18nDir, `${locale}.json`);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const updates = toolTranslations[locale];

  Object.entries(updates).forEach(([key, value]) => {
    if (!json[key]) {
      json[key] = value;
    } else {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (json[key][subKey] === undefined) {
          json[key][subKey] = subValue;
        }
      });
    }
  });

  const newContent = JSON.stringify(json, null, 2) + '\n';
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated ${locale}.json`);
  modified++;
});

console.log(`\nDone. Modified ${modified} locale files.`);
