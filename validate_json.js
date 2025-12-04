const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'data', 'states.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    // Remove "export const states = "
    content = content.replace(/^export const states = /, '');
    // Remove trailing ";" if present
    content = content.trim().replace(/;$/, '');

    // Try to parse
    JSON.parse(content);
    console.log("JSON is valid!");
} catch (e) {
    console.error("JSON Error:", e.message);
    // If possible, show context
    if (e.message.includes('position')) {
        const match = e.message.match(/position (\d+)/);
        if (match) {
            const pos = parseInt(match[1]);
            // Get context around pos
            // We need to read the file again or use the content string
            // But content string is modified.
            // Let's just use the position from the modified content.
            // It should be close enough.
            
            // Re-read modified content to be sure
            let content = fs.readFileSync(filePath, 'utf8');
            content = content.replace(/^export const states = /, '');
            content = content.trim().replace(/;$/, '');
            
            const start = Math.max(0, pos - 50);
            const end = Math.min(content.length, pos + 50);
            console.log("Context:", content.substring(start, end));
        }
    }
}
