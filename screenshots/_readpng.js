const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const filePath = path.resolve(__dirname, 'ninja-logo-ref.png');
const data = fs.readFileSync(filePath);
const w = data.readUInt32BE(16);
const h = data.readUInt32BE(20);
console.log('Size:', w, 'x', h);
console.log('File size:', data.length, 'bytes');

// Find IDAT chunk
let pos = 33; // after IHDR (8 sig + 13 IHDR + 4 CRC = 25, but 33 to be safe)
while (pos < data.length - 4) {
  const len = data.readUInt32BE(pos);
  const type = data.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') {
    const chunkData = data.slice(pos + 8, pos + 8 + len);
    try {
      const decompressed = zlib.inflateSync(chunkData);
      console.log('Decompressed pixel data length:', decompressed.length);
      // First row of pixels (filter byte + w*4 RGBA bytes)
      const rowSize = 1 + w * 4;
      console.log('Row size (filter + pixels):', rowSize);
      // Sample a few rows
      for (let row = 0; row < Math.min(10, h); row++) {
        const offset = row * rowSize;
        const filter = decompressed[offset];
        const r = decompressed[offset + 1];
        const g = decompressed[offset + 2];
        const b = decompressed[offset + 3];
        const a = decompressed[offset + 4];
        console.log(`Row ${row}: filter=${filter}, first pixel RGBA(${r},${g},${b},${a})`);
      }
      // Sample center pixel
      const midRow = Math.floor(h / 2);
      const midOffset = midRow * rowSize;
      const r2 = decompressed[midOffset + 1];
      const g2 = decompressed[midOffset + 2];
      const b2 = decompressed[midOffset + 3];
      console.log(`\nCenter pixel (row ${midRow}): RGBA(${r2},${g2},${b2},${decompressed[midOffset + 4]})`);
    } catch(e) {
      console.log('Decompress error:', e.message);
    }
    break;
  }
  pos += 12 + len;
}
