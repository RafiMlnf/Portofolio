const fs = require('fs');
const https = require('https');
const path = require('path');

const fontsDir = path.join(__dirname, '..', 'public', 'fonts');
if (!fs.existsSync(fontsDir)) {
  fs.mkdirSync(fontsDir, { recursive: true });
}

const fonts = [
  { name: 'SSBroad.woff', url: 'https://fonts.cdnfonts.com/s/114672/SSBroad.woff' },
  { name: 'reverie-regular.woff', url: 'https://fonts.cdnfonts.com/s/107506/reverie-regular-personal-use-only.woff' },
  { name: 'Tanamera.woff', url: 'https://fonts.cdnfonts.com/s/105684/Tanamera-RpY4W.woff' },
  { name: 'Wendy-Neue.woff', url: 'https://fonts.cdnfonts.com/s/105487/Wendy-Neue.woff' },
  { name: 'Glasfur-trial.woff', url: 'https://fonts.cdnfonts.com/s/105417/GlasfurtrialRegular-X3wnj.woff' }
];

fonts.forEach(font => {
  const filePath = path.join(fontsDir, font.name);
  const file = fs.createWriteStream(filePath);
  
  // Set User-Agent in case the CDN blocks generic scripts
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
    }
  };
  
  https.get(font.url, options, response => {
    if (response.statusCode !== 200) {
      console.error(`Failed to download ${font.name}: Status code ${response.statusCode}`);
      return;
    }
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${font.name}`);
    });
  }).on('error', err => {
    fs.unlink(filePath, () => {});
    console.error(`Error downloading ${font.name}:`, err.message);
  });
});
