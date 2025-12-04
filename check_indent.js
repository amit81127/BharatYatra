const fs = require('fs');

const content = fs.readFileSync('d:\\major project\\BharatYatra\\bharat-yatra\\data\\states.js', 'utf8');
const lines = content.split('\n');

let level = 0; // 0 means inside states array (after [) ? No, start at 0.
// Line 1: export const states = [ -> level becomes 1.

let violations = 0;
const MAX_VIOLATIONS = 20;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const trimmed = line.trim();
  if (!trimmed) continue;

  // Calculate indentation
  let indent = 0;
  while (indent < line.length && line[indent] === ' ') {
    indent++;
  }

  // Determine expected level for this line
  let expectedLevel = level;
  if (trimmed.startsWith('}') || trimmed.startsWith(']')) {
    // If multiple closing, e.g. "}]", it matches the outermost closure of that line?
    // It matches the closure that brings us down.
    // Generally, closing brace is at level-1.
    expectedLevel = level - 1;
  }

  const expectedIndent = expectedLevel * 2;
  
  // Check violation (allow some slack, e.g. +/- 2)
  if (Math.abs(indent - expectedIndent) > 2) {
    console.log(`Line ${i + 1}: Indent ${indent}, Expected ${expectedIndent} (Level ${level}). Content: ${trimmed.substring(0, 50)}`);
    violations++;
    if (violations >= MAX_VIOLATIONS) break;
  }

  // Update level for next line
  for (const char of line) {
    if (char === '{' || char === '[') level++;
    if (char === '}' || char === ']') level--;
  }
}
