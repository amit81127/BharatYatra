const fs = require('fs');
const filePath = 'd:\\major project\\BharatYatra\\bharat-yatra\\data\\states.js';

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    console.log(`Total lines: ${lines.length}`);
    
    if (lines.length > 30) {
        console.log('--- Lines around 30 ---');
        for (let i = 28; i < 33; i++) console.log(`${i+1}: ${lines[i]}`);
    }

    if (lines.length > 1500) {
        console.log('--- Lines around 1500 ---');
        for (let i = 1498; i < 1505; i++) console.log(`${i+1}: ${lines[i]}`);
    }

    console.log('--- Last 10 lines ---');
    const start = Math.max(0, lines.length - 10);
    for (let i = start; i < lines.length; i++) {
        console.log(`${i+1}: ${lines[i]}`);
    }

} catch (err) {
    console.error('Error reading file:', err);
}
