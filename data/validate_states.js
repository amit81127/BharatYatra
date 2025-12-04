const fs = require('fs');
const path = require('path');

try {
    const content = fs.readFileSync(path.join(__dirname, 'states.js'), 'utf8');
    // It's an export const states = [...], so we can't JSON.parse directly.
    // We need to strip the "export const states = " and maybe the trailing ";"
    
    let jsonStr = content.replace(/^export const states = /, '').trim();
    if (jsonStr.endsWith(';')) {
        jsonStr = jsonStr.slice(0, -1);
    }
    
    // Also, the file might use single quotes or other JS features if it's a JS file, not pure JSON.
    // But the user said it's JSON structure.
    // Let's try to eval it or use a loose parser if JSON.parse fails.
    
    try {
        JSON.parse(jsonStr);
        console.log("Valid JSON!");
    } catch (e) {
        console.error("Invalid JSON:", e.message);
        // Print context around error
        const match = e.message.match(/position (\d+)/);
        if (match) {
            const pos = parseInt(match[1]);
            console.log("Context:", jsonStr.substring(pos - 50, pos + 50));
        }
    }
    
} catch (err) {
    console.error("File error:", err);
}
