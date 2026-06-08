const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.wasm': 'application/wasm',
  '.map': 'application/json',
};

function tryResolveFile(filePath) {
  if (!filePath.startsWith(BUILD)) {
    return null;
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return filePath;
  }
  return null;
}

function resolveRequest(urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const normalized =
    decoded === '/' || decoded === ''
      ? '/index.html'
      : decoded.endsWith('/')
        ? decoded + 'index.html'
        : decoded;

  let filePath = path.normalize(path.join(BUILD, normalized));

  let found = tryResolveFile(filePath);
  if (found) {
    return found;
  }

  if (path.extname(filePath) === '') {
    found = tryResolveFile(filePath + '.html');
    if (found) {
      return found;
    }
  }

  found = tryResolveFile(path.join(BUILD, path.basename(filePath)));
  if (found) {
    return found;
  }

  if (normalized.startsWith('/dist/')) {
    found = tryResolveFile(path.join(BUILD, 'dist', path.basename(filePath)));
    if (found) {
      return found;
    }
  }

  return null;
}

let serverStarted = false;

function startServer() {
  if (serverStarted) {
    return;
  }
  serverStarted = true;

  const server = http.createServer((req, res) => {
    const filePath = resolveRequest(req.url || '/');

    if (!filePath) {
      res.writeHead(404);
      res.end();
      return;
    }

    const ext = path.extname(filePath);
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream(filePath).pipe(res);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(
        `Port ${PORT} is already in use. Stop the other process or set PORT to another value.`
      );
    } else {
      console.error(err);
    }
    parcel.kill('SIGINT');
    process.exit(1);
  });

  server.listen(PORT, () => {
    const url = `http://localhost:${PORT}/`;
    console.log(`Dev server: ${url}`);
    openBrowser(url);
  });
}

function openBrowser(url) {
  const cmd =
    process.platform === 'win32'
      ? `start "" "${url}"`
      : process.platform === 'darwin'
        ? `open "${url}"`
        : `xdg-open "${url}"`;
  spawn(cmd, { shell: true, stdio: 'ignore' });
}

const parcelBin = path.join(
  ROOT,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'parcel.cmd' : 'parcel'
);

const parcelArgs = [
  'watch',
  './src/index.pug',
  './src/achievements/*.pug',
  './src/projects/*.pug',
  '--out-dir',
  'build',
  '--public-url',
  '/',
  '--no-cache',
];

const parcel = spawn(parcelBin, parcelArgs, {
  cwd: ROOT,
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: process.platform === 'win32',
});

parcel.stdout.on('data', (chunk) => {
  process.stdout.write(chunk);
  if (!serverStarted && /Built in/.test(chunk.toString())) {
    startServer();
  }
});

parcel.stderr.on('data', (chunk) => {
  process.stderr.write(chunk);
});

parcel.on('exit', (code) => {
  process.exit(code ?? 1);
});

process.on('SIGINT', () => {
  parcel.kill('SIGINT');
  process.exit(0);
});
