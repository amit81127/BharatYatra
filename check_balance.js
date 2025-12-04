const fs = require('fs');
const content = fs.readFileSync('d:\\major project\\BharatYatra\\bharat-yatra\\data\\states.js', 'utf8');

let openBraces = 0;
let openBrackets = 0;
let line = 1;

for (let i = 0; i < content.length; i++) {
  const char = content[i];
  if (char === '\n') line++;
  if (char === '{') openBraces++;
  if (char === '}') openBraces--;
  if (char === '[') openBrackets++;
  if (char === ']') openBrackets--;

  if (openBraces < 0) {
    console.log(`Error: Unexpected '}' at line ${line}`);
    process.exit(1);
  }
  if (openBrackets < 0) {
    console.log(`Error: Unexpected ']' at line ${line}`);
    process.exit(1);
  }
}

console.log(`Final balance: Braces: ${openBraces}, Brackets: ${openBrackets}`);
