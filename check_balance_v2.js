const fs = require('fs');
const content = fs.readFileSync('d:\\major project\\BharatYatra\\bharat-yatra\\data\\states.js', 'utf8');

let openBraces = 0;
let openBrackets = 0;
let line = 1;
let log = '';

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (char === '\n') line++;
  if (char === '{') openBraces++;
  if (char === '}') openBraces--;
  if (char === '[') openBrackets++;
  if (char === ']') openBrackets--;

  if (openBraces < 0) {
    log += `Error: Unexpected '}' at line ${line}\n`;
    fs.writeFileSync('balance_log.txt', log);
    process.exit(1);
  }
  if (openBrackets < 0) {
    log += `Error: Unexpected ']' at line ${line}\n`;
    fs.writeFileSync('balance_log.txt', log);
    process.exit(1);
  }
}

log += `Final balance: Braces: ${openBraces}, Brackets: ${openBrackets}\n`;
fs.writeFileSync('balance_log.txt', log);
