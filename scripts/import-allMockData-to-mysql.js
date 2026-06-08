/*
  Kept for backwards compatibility.
  The old version dropped category tables before importing, so use the safe
  schema-and-seed sync script instead.
*/

const { spawn } = require('node:child_process');
const path = require('node:path');

const scriptPath = path.join(__dirname, 'sync-static-db.mjs');
const child = spawn(process.execPath, [scriptPath], { stdio: 'inherit' });

child.on('exit', (code) => {
  process.exitCode = code || 0;
});

