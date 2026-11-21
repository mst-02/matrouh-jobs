const fs = require('fs');

const yacht = fs.readFileSync('d:/AI mouse/app_02/yacht_tiny.b64', 'utf8').trim();
const safari = fs.readFileSync('d:/AI mouse/app_02/safari.b64', 'utf8').trim();
const qr = fs.readFileSync('d:/AI mouse/app_02/qr.b64', 'utf8').trim();
const avatar = fs.readFileSync('d:/AI mouse/app_02/avatar.b64', 'utf8').trim();

console.log('Image lengths:', { yacht: yacht.length, safari: safari.length, qr: qr.length, avatar: avatar.length });
