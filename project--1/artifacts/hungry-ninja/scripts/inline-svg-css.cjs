const fs = require('fs');
const path = require('path');

const svgPath = path.resolve(__dirname, '../public/logo.svg');
let c = fs.readFileSync(svgPath, 'utf8');

// Decode the base64 CSS import
const b64Match = c.match(/@import\s+"data:text\/css;base64,([^"]+)"/);
if (!b64Match) { console.log('No base64 CSS found'); process.exit(0); }

const css = Buffer.from(b64Match[1], 'base64').toString('utf8');

// Extract @keyframes blocks with proper brace matching
function extractBracedBlocks(text, startIdx) {
  const blocks = [];
  let i = startIdx;
  while (i < text.length) {
    // Find next @keyframes
    const kfStart = text.indexOf('@keyframes', i);
    if (kfStart === -1) break;

    // Find the opening brace
    const braceOpen = text.indexOf('{', kfStart);
    if (braceOpen === -1) break;

    // Count braces to find the matching close
    let depth = 1;
    let j = braceOpen + 1;
    while (j < text.length && depth > 0) {
      if (text[j] === '{') depth++;
      else if (text[j] === '}') depth--;
      j++;
    }

    const block = text.substring(kfStart, j);
    blocks.push(block);
    i = j;
  }
  return blocks;
}

const keyframes = extractBracedBlocks(css, 0);

// Extract animation rules with simple IDs
const animRules = [];
// Match patterns like: `} #elementId {animation: value}` after a keyframe or another rule
const animMatches = css.matchAll(/#(\S+)\s*\{animation:\s*([^;}]+)/g);
for (const m of animMatches) {
  animRules.push('#' + m[1] + ' { animation: ' + m[2] + ' }');
}

// Extract !important style rules (for base element styles like display, fill, etc.)
const styleMatches = css.matchAll(/#(\S+)\s*(\{[^}]*!important[^}]*\})/g);
const styleRules = [];
for (const m of styleMatches) {
  styleRules.push('#' + m[1] + ' ' + m[2]);
}

const newCSS = [
  ...keyframes,
  ...animRules,
  ...styleRules
].join('\n');

console.log('Keyframes extracted:', keyframes.length);
console.log('Animation rules:', animRules.length);
console.log('Style rules:', styleRules.length);

// Replace the old <style> block (with CDATA + @import) with the new inline CSS
c = c.replace(
  /<style>[\s\S]*?<\/style>/,
  '<style>\n' + newCSS + '\n</style>'
);

fs.writeFileSync(svgPath, c, 'utf8');
console.log('Done - inlined CSS animations into SVG');
