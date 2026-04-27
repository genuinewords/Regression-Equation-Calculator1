import json
import os
import glob
import re

# English target descriptions (carefully crafted to 140-155 chars)
en_targets = {
    "home": "Calculate regression equations in seconds. Our free calculator finds linear, quadratic, and exponential regression models. Perfect for data analysis.",
    "about": "Learn about the Regression Equation Calculator. We provide a free online tool to compute regression equations quickly with step-by-step math solutions.",
    "contact": "Get in touch with the Regression Equation Calculator team. Fill out our contact form for questions, feedback, or support regarding our statistical tool.",
    "terms": "Review the Terms of Service for using the Regression Equation Calculator. Understand our rules, data usage policies, and educational service guidelines.",
    "privacy": "Read our Privacy Policy to understand how we handle your data. The Regression Equation Calculator runs locally in your browser to ensure complete privacy.",
    "blog": "Read our Statistics & Math Guide Blog for comprehensive articles about regression analysis, statistics, data modeling, and practical math applications.",
    "calculator": "Enter your data points to calculate the regression equation. Our tool provides linear, polynomial, and exponential regression results with full statistics.",
    "pearson": "Enter your data points to calculate the Pearson correlation coefficient. Get r, r-squared, p-values, and step-by-step solutions instantly in your browser.",
    "grubbs": "Detect outliers in your dataset using Grubbs' test. Our calculator provides the G statistic, critical value, and step-by-step mathematical computations.",
    "assumptionsChecker": "Check all four linear regression assumptions for your data. Test for linearity, independence, homoscedasticity, and normality with detailed diagnostics.",
    "notFound": "The page you are looking for does not exist. Navigate back to the Regression Equation Calculator homepage to access our free statistical analysis tools.",
    "expCalc": "Calculate exponential regression equations with our free online tool. Enter your data points to find the equation y = a*e^(bx) with full step-by-step math.",
    "lsrlCalc": "Compute the least squares regression line instantly. Enter your data to find the OLS best-fit line equation y = mx + b with comprehensive math solutions.",
    "rcCalc": "Compare linear, quadratic, exponential, and logarithmic regression models side by side. Find the best fit curve for your data with our free online tool.",
    "quadCalc": "Calculate quadratic regression equations (y = ax² + bx + c) instantly. Enter your data points for a free, step-by-step mathematical breakdown and analysis.",
    "multiCalc": "Calculate multiple regression equations with two or more predictors. Find the best model for your data using our free online statistical analysis tool.",
    "sitemap": "Explore the complete Regression Equation Calculator sitemap. Find all our statistical tools, calculators, blog posts, and educational mathematics resources."
}

def fix_json_file(filepath, is_en=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    changed = False
    
    site_title = data.get("siteTitle", "Regression Equation Calculator")
    
    # Check siteDescription
    if "siteDescription" in data:
        desc = data["siteDescription"]
        if is_en:
            data["siteDescription"] = "Free online regression equation calculator. Compute linear, polynomial, and multiple regression equations instantly with step-by-step solutions."
            changed = True
        else:
            if len(desc) > 155:
                # truncate cleanly
                truncated = desc[:152]
                last_space = truncated.rfind(' ')
                if last_space > 100:
                    truncated = truncated[:last_space]
                data["siteDescription"] = truncated + "..."
                changed = True
            elif len(desc) < 140:
                pad = f" - {site_title}"
                if len(desc) + len(pad) <= 155:
                    data["siteDescription"] = desc + pad
                    changed = True
                else:
                    data["siteDescription"] = desc + pad[:155-len(desc)-3] + "..."
                    changed = True

    for key, value in data.items():
        if isinstance(value, dict) and "description" in value:
            desc = value["description"]
            
            if is_en and key in en_targets:
                value["description"] = en_targets[key]
                changed = True
            else:
                if len(desc) > 155:
                    truncated = desc[:152]
                    last_space = truncated.rfind(' ')
                    if last_space > 100:
                        truncated = truncated[:last_space]
                    value["description"] = truncated + "..."
                    changed = True
                elif len(desc) < 140:
                    pad = f" - {site_title}"
                    if len(desc) + len(pad) <= 155:
                        value["description"] = desc + pad
                        changed = True
                    else:
                        value["description"] = desc + pad[:155-len(desc)-3] + "..."
                        changed = True

    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

def fix_shared_json(filepath, is_en=False):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    changed = False
    if "description" in data:
        desc = data["description"]
        if is_en:
            data["description"] = "Free online regression equation calculator with step-by-step solutions for students, researchers, and professionals. Compute your models instantly today."
            changed = True
        else:
            if len(desc) > 155:
                truncated = desc[:152]
                last_space = truncated.rfind(' ')
                if last_space > 100:
                    truncated = truncated[:last_space]
                data["description"] = truncated + "..."
                changed = True
            elif len(desc) < 140:
                pad = " - Regression Equation Calculator"
                if len(desc) + len(pad) <= 155:
                    data["description"] = desc + pad
                    changed = True
                else:
                    data["description"] = desc + pad[:155-len(desc)-3] + "..."
                    changed = True
    
    if changed:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

def fix_mdx():
    blog_dir = r"c:\Users\Z\Documents\GitHub\Regression-Equation-Calculator1\src\blog"
    blog_targets = {
        "simple-linear-regression-step-by-step.mdx": "Learn simple linear regression with a step-by-step walkthrough. Calculate slope, intercept, and R² by hand using real data to avoid common mistakes.",
        "multiple-regression-explained.mdx": "A comprehensive guide to multiple regression analysis. Learn the equation, assumptions, real-world applications, and process with an interactive demo.",
        "linear-regression-basics.mdx": "A comprehensive guide to linear regression. Learn the equation, least squares method, assumptions, and real-world applications with step-by-step examples."
    }
    
    for filename, new_desc in blog_targets.items():
        filepath = os.path.join(blog_dir, filename)
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # replace description: "..." with new description
            new_content = re.sub(r'description:\s*".*?"', f'description: "{new_desc}"', content, count=1)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

# Process all i18n files
i18n_dir = r"c:\Users\Z\Documents\GitHub\Regression-Equation-Calculator1\src\i18n"
for filepath in glob.glob(os.path.join(i18n_dir, "*.json")):
    is_en = os.path.basename(filepath) == "en.json"
    fix_json_file(filepath, is_en)

# Process all shared i18n files
shared_dir = os.path.join(i18n_dir, "shared")
for filepath in glob.glob(os.path.join(shared_dir, "*.json")):
    is_en = os.path.basename(filepath) == "en.json"
    fix_shared_json(filepath, is_en)

# Process MDX files
fix_mdx()

print("All descriptions updated successfully.")
