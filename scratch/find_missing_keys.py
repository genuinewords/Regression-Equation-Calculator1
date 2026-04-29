import json
import os

en_path = r'c:\Users\Z\Documents\GitHub\Regression-Equation-Calculator1\src\i18n\en.json'
hi_path = r'c:\Users\Z\Documents\GitHub\Regression-Equation-Calculator1\src\i18n\hi.json'

with open(en_path, 'r', encoding='utf-8') as f:
    en_data = json.load(f)

with open(hi_path, 'r', encoding='utf-8') as f:
    hi_data = json.load(f)

def find_missing_keys(en, target, prefix=''):
    missing = []
    for key, value in en.items():
        full_key = f"{prefix}.{key}" if prefix else key
        if key not in target:
            missing.append(full_key)
        elif isinstance(value, dict) and isinstance(target[key], dict):
            missing.extend(find_missing_keys(value, target[key], full_key))
    return missing

missing_keys = find_missing_keys(en_data, hi_data)
print(f"Missing keys in hi.json: {len(missing_keys)}")
for key in missing_keys[:50]:
    print(key)
