import sys

try:
    with open(r'd:\major project\BharatYatra\bharat-yatra\data\states.js', 'r', encoding='utf-8') as f:
        content = f.read()
except Exception as e:
    print(f"Error reading file: {e}")
    sys.exit(1)

open_braces = 0
open_brackets = 0
line = 1

for i, char in enumerate(content):
    if char == '\n':
        line += 1
    if char == '{':
        open_braces += 1
    elif char == '}':
        open_braces -= 1
    elif char == '[':
        open_brackets += 1
    elif char == ']':
        open_brackets -= 1

    if open_braces < 0:
        print(f"Error: Unexpected '}}' at line {line}")
        sys.exit(1)
    if open_brackets < 0:
        print(f"Error: Unexpected ']' at line {line}")
        sys.exit(1)

print(f"Final balance: Braces: {open_braces}, Brackets: {open_brackets}")
