const fs = require('fs');
const path = require('path');

// Simple PNG generator for basic icons
// Creates valid PNG files with Mobility Free branding

function createPNG(width, height, color = '#FF4D00', text = 'MF') {
  // Create a simple valid PNG using a minimal approach
  // This creates a valid PNG file with solid color background

  const pngHeader = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // color type: truecolor
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk - simple solid color image
  const row = Buffer.alloc(width * 3 + 1);
  row[0] = 0; // filter type none
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);

  for (let x = 0; x < width; x++) {
    row[1 + x * 3] = r;
    row[1 + x * 3 + 1] = g;
    row[1 + x * 3 + 2] = b;
  }

  const imageData = Buffer.alloc((width * 3 + 1) * height);
  for (let y = 0; y < height; y++) {
    row.copy(imageData, y * (width * 3 + 1));
  }

  const zlib = require('zlib');
  const compressed = zlib.deflateSync(imageData);
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([pngHeader, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type);
  const crc = crc32(Buffer.concat([typeBuf, data]));
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc, 0);
  return Buffer.concat([length, typeBuf, data, crcBuf]);
}

function crc32(buf) {
  let crc = 0xffffffff;
  const table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

// Generate icons
const iconsDir = path.join(__dirname, '..', 'assets', 'icons');

// 1024x1024 foreground icon
const iconForeground = createPNG(1024, 1024, '#FF4D00');
fs.writeFileSync(path.join(iconsDir, 'icon-foreground.png'), iconForeground);

// 1284x2772 splash
const splash = createPNG(1284, 2772, '#0A0A0F');
fs.writeFileSync(path.join(iconsDir, 'splash.png'), splash);

// 32x32 favicon
const favicon = createPNG(32, 32, '#FF4D00');
fs.writeFileSync(path.join(iconsDir, 'favicon.png'), favicon);

// 96x96 notification icon
const notificationIcon = createPNG(96, 96, '#FF4D00');
fs.writeFileSync(path.join(iconsDir, 'notification-icon.png'), notificationIcon);

// 512x512 for general use
const icon512 = createPNG(512, 512, '#FF4D00');
fs.writeFileSync(path.join(iconsDir, 'icon.png'), icon512);

console.log('Icons generated successfully!');