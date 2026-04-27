const fs = require('fs');
const file = 'src/i18n/en.json';
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = {
    home: "Free Regression Tool Online",
    about: "About Us \u2013 View Our Mission!",
    contact: "Contact Us \u2013 Get Support Now",
    terms: "Terms of Service \u2013 Our Rules",
    privacy: "Privacy Policy \u2013 Data Safety",
    blog: "Statistics & Math Guide Blog",
    calculator: "Linear Regression Calculator",
    pearson: "Pearson Correlation Calculator",
    grubbs: "Grubbs' Test Calculator: Fast",
    assumptionsChecker: "Regression Assumptions Checker",
    notFound: "404 Error - Page Not Found!",
    expCalc: "Exponential Regression Solvers",
    lsrlCalc: "Least Squares Regression Line",
    rcCalc: "Regression Curve Calculator",
    quadCalc: "Quadratic Regression Calculator",
    multiCalc: "Multiple Regression Calculator"
};

for (const key of Object.keys(updates)) {
    if (data[key]) {
        data[key].title = updates[key];
    }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
