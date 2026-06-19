const http = require('http');
const fs = require('fs');
const path = require('path');

const MIME = {
  '.html':'text/html; charset=utf-8',
  '.css':'text/css',
  '.js':'text/javascript',
  '.png':'image/png',
  '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg',
  '.webp':'image/webp',
  '.gif':'image/gif',
  '.mp4':'video/mp4',
  '.mp3':'audio/mpeg',
  '.wav':'audio/wav',
  '.m4a':'audio/mp4',
  '.aac':'audio/aac',
};

http.createServer((req, res) => {
  const url = req.url === '/' ? '/index.html' : req.url.split('?')[0];
  const filePath = '.' + decodeURIComponent(url);
  try {
    const data = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': data.length,
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    });
    res.end(data);
  } catch(e) {
    res.writeHead(404);
    res.end('404');
  }
}).listen(8081, () => console.log('http://localhost:8081'));
