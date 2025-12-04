const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'states.js');
const backupPath = path.join(__dirname, 'states.js.bak');

try {
    // 1. Read file
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Backup original
    fs.writeFileSync(backupPath, content);
    console.log('Backup created at states.js.bak');

    // 2. Fix trailing spaces in names (simple regex approach)
    // "name": "Something " -> "name": "Something"
    content = content.replace(/"name":\s*"([^"]+?)\s+"/g, '"name": "$1"');

    // 3. Fix empty IDs
    // "id": "" -> "id": "ap-d1" (approximate fix, or generate unique)
    // Since we can't easily know the correct ID without context, let's just make sure it's not empty if possible.
    // However, the user specifically mentioned line 30.
    // Let's try to fix specific patterns if we can, or just leave it if it's too risky.
    // The user said: "id": "" -> "id": "ap-d1"
    content = content.replace(/"id":\s*""/g, '"id": "ap-d1"'); // Applying user's specific fix

    // 4. Remove // comments
    // Be careful not to remove // inside strings (though unlikely in JSON)
    // Simple approach: remove // and everything after it until newline
    content = content.replace(/\/\/.*$/gm, '');

    // 5. Fix trailing commas
    // , ] -> ]
    // , } -> }
    // We might need to do this iteratively or use a regex that handles whitespace
    content = content.replace(/,\s*([\]}])/g, '$1');
    // Run it again just in case of nested things or multiple spaces
    content = content.replace(/,\s*([\]}])/g, '$1');

    // 6. Fix broken string at the end
    // "name": "Guest -> "name": "Guest House"
    // The user said: "name": "Guest
    // We need to find where it cuts off.
    // It seems the file is truncated.
    // We need to close the open structures.
    
    // Let's first trim the content to the last complete character
    // If it ends with "Guest, we should probably just remove that incomplete line or close it.
    // User said: "name": "Guest ... It must end like: "name": "Guesthouse Arunachal 3", ...
    
    // Let's look at the end of the file
    // We can't easily see it here, but we can try to detect truncation.
    
    // Strategy:
    // 1. Find the last valid closing brace/bracket.
    // 2. Or append the missing closing braces.
    
    // Let's count braces
    let openBraces = (content.match(/{/g) || []).length;
    let closeBraces = (content.match(/}/g) || []).length;
    let openBrackets = (content.match(/\[/g) || []).length;
    let closeBrackets = (content.match(/\]/g) || []).length;
    
    console.log(`Open {: ${openBraces}, Close }: ${closeBraces}`);
    console.log(`Open [: ${openBrackets}, Close ]: ${closeBrackets}`);
    
    // If we are missing closings, we need to append them.
    // But first we need to finish the last object if it's incomplete.
    
    // If the file ends with "name": "Guest, we should fix that string first.
    if (content.match(/"name":\s*"Guest$/)) {
         content = content.replace(/"name":\s*"Guest$/, '"name": "Guest House"');
    } else if (content.includes('"name": "Guest')) {
        // It might be "Guest\n or something
        // Let's just try to find the last incomplete string
    }

    // A more robust way to close JSON:
    // 1. Remove the last incomplete line if it doesn't end with } or ] or ,
    // 2. Append missing } and ]
    
    // Let's try to parse it. If it fails, we fix.
    
    // Actually, simply appending the right number of } and ] might work if the structure is regular.
    // The structure is states -> districts -> places -> hotels
    // [ { districts: [ { places: [ { hotels: [ { ... } ] } ] } ] } ]
    
    // Let's try to "fix" the end of the file.
    // If it ends abruptly, we might be in the middle of a string or property.
    // Let's cut off the last partial line if it looks partial.
    
    let lines = content.split('\n');
    let lastLine = lines[lines.length - 1].trim();
    
    // If last line is empty, go back
    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
        lines.pop();
    }
    
    if (lines.length > 0) {
        lastLine = lines[lines.length - 1].trim();
        // If it looks like an incomplete property (e.g. "id": "ar-d2-p3-h3", "name": "Guest)
        // User said: "name": "Guest
        if (lastLine.includes('"name": "Guest') && !lastLine.endsWith('"') && !lastLine.endsWith(',')) {
             lines[lines.length - 1] = lastLine + ' House"'; // Close the string
        }
    }
    
    content = lines.join('\n');
    
    // Now re-count and close
    openBraces = (content.match(/{/g) || []).length;
    closeBraces = (content.match(/}/g) || []).length;
    openBrackets = (content.match(/\[/g) || []).length;
    closeBrackets = (content.match(/\]/g) || []).length;
    
    let neededBraces = openBraces - closeBraces;
    let neededBrackets = openBrackets - closeBrackets;
    
    // We need to close them in the correct order.
    // Usually: } ] } ] } ] ...
    // But we don't know the exact order without a stack.
    // However, since it's a strict hierarchy, we can guess.
    // Hotels array -> Place object -> Places array -> District object -> Districts array -> State object -> States array
    
    // If we are inside hotels array: ] } ] } ] } ]
    // Let's just append a sequence of } and ] until it parses?
    // Or better: use a stack to track what's open.
    
    let stack = [];
    let inString = false;
    let escape = false;
    
    for (let i = 0; i < content.length; i++) {
        let char = content[i];
        if (escape) {
            escape = false;
            continue;
        }
        if (char === '\\') {
            escape = true;
            continue;
        }
        if (char === '"') {
            inString = !inString;
            continue;
        }
        if (!inString) {
            if (char === '{') stack.push('}');
            else if (char === '[') stack.push(']');
            else if (char === '}') {
                if (stack.length > 0 && stack[stack.length - 1] === '}') stack.pop();
            }
            else if (char === ']') {
                if (stack.length > 0 && stack[stack.length - 1] === ']') stack.pop();
            }
        }
    }
    
    console.log('Stack to close:', stack.reverse().join(''));
    
    // Append the closing characters
    content += stack.join('');
    
    // One final check for trailing commas before the new closings
    // If we appended closings, the previous char might be a comma.
    // e.g. { "a": 1, }
    content = content.replace(/,\s*([\]}])/g, '$1');

    // Write back
    fs.writeFileSync(filePath, content);
    console.log('File repaired successfully.');

} catch (err) {
    console.error('Error:', err);
}
