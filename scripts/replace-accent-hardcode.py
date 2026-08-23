#!/usr/bin/env python3
"""Replace all hardcoded rgba(52, 211, 153, X) with rgba(var(--accent-rgb), X) in globals.css
Also replace key hardcoded hex values with CSS variables."""

import re

filepath = "/home/z/my-project/src/app/globals.css"
with open(filepath, "r") as f:
    content = f.read()

# 1. Replace rgba(52, 211, 153, X) → rgba(var(--accent-rgb), X)
# Handle spaces: "rgba(52, 211, 153, 0.45)" and "rgba(52,211,153,0.45)"
content = re.sub(
    r'rgba\(\s*52\s*,\s*211\s*,\s*153\s*,\s*([0-9.]+)\s*\)',
    r'rgba(var(--accent-rgb), \1)',
    content
)

# 2. Replace remaining hardcoded hex colors in key places
# #a7f3d0 (emerald-200) → var(--accent-light)
# #6ee7b7 (emerald-300) → var(--accent-2)  
# #34d399 (emerald-400) → var(--accent)
# #022c22 (emerald-950) → var(--accent-dark)
# #059669 (emerald-600) → var(--accent-deep)
# #10b981 (emerald-500) → var(--accent)  (close enough)
# #047857 (emerald-700) → var(--accent-deep) (close enough)

# Terminal prompt
content = content.replace(
    '.terminal-block .terminal-prompt { color: #34d399; }',
    '.terminal-block .terminal-prompt { color: var(--accent); }'
)

# Star filled
content = content.replace(
    '.star-filled { color: #34d399; fill: #34d399; }',
    '.star-filled { color: var(--accent); fill: var(--accent); }'
)

# Hero ring
content = content.replace(
    'border: 1px solid rgba(var(--accent-rgb), 0.08);',
    'border: 1px solid rgba(var(--accent-rgb), 0.08);'  # already replaced by step 1
)

# Replace #a7f3d0 → var(--accent-light) in remaining non-comment, non-variable lines
# Be careful: don't replace the :root variable definition itself
lines = content.split('\n')
new_lines = []
skip_next_hex_replacements = False
for i, line in enumerate(lines):
    # Skip lines that are CSS variable definitions
    if '--accent-light:' in line or '--accent-2:' in line or '--accent:' in line:
        new_lines.append(line)
        continue
    
    # Replace in gradient stops and color values
    # Only replace hex values that appear in property values (after a colon)
    if '#' in line and not line.strip().startswith('/*') and not line.strip().startswith('--'):
        # #a7f3d0 → var(--accent-light)  
        line = re.sub(r'#a7f3d0(?![0-9a-fA-F])', 'var(--accent-light)', line)
        # #6ee7b7 → var(--accent-2) (only in property values, not in comments about the variable)
        line = re.sub(r'#6ee7b7(?![0-9a-fA-F])', 'var(--accent-2)', line)
        # #34d399 → var(--accent)
        line = re.sub(r'#34d399(?![0-9a-fA-F])', 'var(--accent)', line)
        # #022c22 → var(--accent-dark)
        line = re.sub(r'#022c22(?![0-9a-fA-F])', 'var(--accent-dark)', line)
        # #059669 → var(--accent-deep)
        line = re.sub(r'#059669(?![0-9a-fA-F])', 'var(--accent-deep)', line)
        # #10b981 → var(--accent)
        line = re.sub(r'#10b981(?![0-9a-fA-F])', 'var(--accent)', line)
        # #047857 → var(--accent-deep)
        line = re.sub(r'#047857(?![0-9a-fA-F])', 'var(--accent-deep)', line)
    
    new_lines.append(line)

content = '\n'.join(new_lines)

with open(filepath, "w") as f:
    f.write(content)

print("Done! Replaced hardcoded emerald values with CSS variables.")
