import re

with open('/home/z/my-project/src/app/globals.css', 'r') as f:
    content = f.read()

# Don't touch the :root defaults block (lines ~13-44)
lines = content.split('\n')
root_end = 0
for i, line in enumerate(lines):
    if line.strip().startswith('--accent-deep-50:'):
        root_end = i + 1
        break

before = '\n'.join(lines[:root_end])
after = '\n'.join(lines[root_end:])

# Replace in 'after' only

# #a7f3d0 (emerald-200) → lighter accent
after = after.replace('#a7f3d0', 'var(--accent-2)')

# Broad rgba replacements with flexible spacing
after = re.sub(r'rgba\(\s*52\s*,\s*211\s*,\s*153\s*,\s*(0\.\d+)\s*\)', lambda m: f'var(--accent-{int(float(m.group(1))*100)})', after)
after = re.sub(r'rgba\(\s*110\s*,\s*231\s*,\s*183\s*,\s*(0\.\d+)\s*\)', lambda m: f'var(--accent-2-{int(float(m.group(1))*100)})', after)
after = re.sub(r'rgba\(\s*5\s*,\s*150\s*,\s*105\s*,\s*(0\.\d+)\s*\)', lambda m: f'var(--accent-deep-{int(float(m.group(1))*100)})', after)

with open('/home/z/my-project/src/app/globals.css', 'w') as f:
    f.write(before + '\n' + after)

print('done')
