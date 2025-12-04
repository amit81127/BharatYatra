const fs = require('fs');
const filePath = 'd:\\major project\\BharatYatra\\bharat-yatra\\data\\states.js';

try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\n');
    console.log(`Total lines: ${lines.length}`);

    // Check around line 30 for empty id
    console.log('\n--- Lines 25-35 ---');
    for (let i = 25; i < 35; i++) {
        if (i < lines.length) console.log(`${i+1}: ${lines[i]}`);
    }

    // Check around line 1500 for trailing comma and comment
    console.log('\n--- Lines 1490-1510 ---');
    for (let i = 1490; i < 1510; i++) {
        if (i < lines.length) console.log(`${i+1}: ${lines[i]}`);
    }

    // Check last 20 lines
    console.log('\n--- Last 20 lines ---');
    const start = Math.max(0, lines.length - 20);
    for (let i = start; i < lines.length; i++) {
        console.log(`${i+1}: ${lines[i]}`);
    }

} catch (err) {
    console.error('Error:', err);
}
