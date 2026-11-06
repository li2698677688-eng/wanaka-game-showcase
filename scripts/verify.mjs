import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { once } from 'node:events';
const root = new URL('../public/', import.meta.url);
const games = JSON.parse(await readFile(new URL('games.json', root), 'utf8'));
assert.equal(games.length, 4, 'Expected all four supplied game pairs');
assert.equal(new Set(games.map(g => g.id)).size, games.length);
for (const game of games) {
  assert.match(game.id, /^[a-z0-9-]+$/);
  if (game.url !== null) assert.ok(['http:', 'https:'].includes(new URL(game.url).protocol), 'Game link must be an HTTP(S) URL');
  for (const type of ['original', 'wanaka']) {
    assert.ok((await stat(new URL(`assets/videos/${game.id}-${type}.mp4`, root))).size > 0);
    assert.ok((await stat(new URL(`assets/posters/${game.id}-${type}.jpg`, root))).size > 0);
  }
}
process.env.PORT = '0';
const { server } = await import('./serve.mjs');
if (!server.listening) await once(server, 'listening');
const base = `http://127.0.0.1:${server.address().port}`;
try {
  assert.equal((await fetch(base)).status, 200);
  const video = `${base}/assets/videos/tiny-planet-original.mp4`;
  const head = await fetch(video, { method: 'HEAD' });
  assert.equal(head.headers.get('content-type'), 'video/mp4');
  const range = await fetch(video, { headers: { Range: 'bytes=0-1023' } });
  assert.equal(range.status, 206);
  assert.equal((await range.arrayBuffer()).byteLength, 1024);
  const suffix = await fetch(video, { headers: { Range: 'bytes=-256' } });
  assert.equal(suffix.status, 206);
  assert.equal((await suffix.arrayBuffer()).byteLength, 256);
  assert.equal((await fetch(video, { headers: { Range: 'bytes=999999999999-' } })).status, 416);
  assert.equal((await fetch(`${base}/missing.mp4`)).status, 404);
  assert.equal((await fetch(`${base}/games.json`, { method: 'POST' })).status, 405);
  assert.equal((await fetch(`${base}/%2e%2e%2fpackage.json`)).status, 403);
  console.log('PASS: four complete video pairs, game links, media seeking, missing files, and path protection.');
} finally { server.close(); server.closeAllConnections(); }
