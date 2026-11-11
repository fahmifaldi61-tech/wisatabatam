'use strict';
// Read-only repository contract checks: no live APIs, no secrets, no database changes.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const appRoot = __dirname;
const root = path.resolve(appRoot,'..');
const read = p => fs.readFileSync(path.join(root,p),'utf8');
const html = read('wisata_batam_project/index.html');
const appConfig = JSON.parse(read('wisata_batam_project/vercel.json'));
const functionCode = read('supabase/functions/chat/index.ts');
const functionConfig = read('supabase/config.toml');
const photosLocal = JSON.parse(read('wisata_batam_project/destination-photo-sources.json'));
const photosRemote = JSON.parse(read('wisata_batam_project/remote-destination-photo-sources.json'));

const apiMatch = html.match(/const API_URL\s*=\s*["'](https:\/\/[^"']+)["']/);
assert.ok(apiMatch,'Frontend API_URL must be present and HTTPS');
const endpoint = new URL(apiMatch[1]);
assert.equal(endpoint.hostname,'eucjlbumklqhmscwixvr.supabase.co','Frontend must target the confirmed Hallo Batam Supabase project');
assert.equal(endpoint.pathname,'/functions/v1/chat','Frontend must target the live chat Edge Function');
const policy = appConfig.headers.find(x=>x.source==='/(.*)')?.headers.find(x=>x.key==='Content-Security-Policy')?.value;
assert.ok(policy && policy.includes(apiMatch[1]),'CSP must permit the expected Edge Function');
assert.ok(policy.includes("connect-src 'self'"),'CSP must allow local photo catalog loading');
assert.match(functionConfig,/\[functions\.chat\]\s*[\s\S]*?verify_jwt\s*=\s*false\b/,'JWT setting must match live function');
assert.match(functionCode,/\bDeno\.serve\(handler\)/,'Edge Function must have its runtime handler');
assert.match(functionCode,/\bhb_claim_session\b/,'Custom bearer session validation must remain');
assert.match(functionCode,/\bhb_take_limit\b/,'Rate limiting must remain');
assert.match(functionCode,/\bhb_documents\b/,'Verified document table access must remain');
assert.match(functionCode,/\bhb_discover_places\b/,'Destination discovery must remain');
assert.match(functionCode,/\bhb_finish_grounded_turn\b/,'Chat persistence must remain');
assert.match(functionCode,/\bOPENAI_KEY\b/,'Server-side OpenAI integration expected');
assert.match(html,/\brenderReplyPhotos\b/,'Destination photos must be rendered in chat');
assert.match(html,/\bfetchChat\b/,'Frontend must retain chat fetcher');
assert.match(html,/\bgetApiSession\b/,'Frontend must retain session flow');
assert.doesNotMatch(html,/\b(?:django|gunicorn|chroma_db_local|localhost:8000)\b/i,'Legacy endpoints must not appear in frontend');
assert.doesNotMatch(html,/\b(?:SUPABASE_SERVICE_ROLE_KEY|SUPABASE_SECRET_KEYS|OPENAI_API_KEY)\b/,'Server keys must not appear in frontend');
assert.doesNotMatch(html,/sk-(?:proj-)?[A-Za-z0-9_-]{20,}/,'No hardcoded OpenAI secrets in frontend');
assert.doesNotMatch(functionCode,/sk-(?:proj-)?[A-Za-z0-9_-]{20,}/,'No hardcoded OpenAI secrets in tracked backend');
assert.doesNotMatch(functionCode,/sb_secret_[A-Za-z0-9_-]{16,}/,'No hardcoded Supabase secret in tracked backend');
assert.equal(photosLocal.length,39,'Unexpected count of locally reviewed photos');
assert.equal(photosRemote.length,30,'Unexpected count of additional remote photos');
const start=html.indexOf('const places = [');
const end=html.indexOf('\n];',start);
assert.ok(start>0 && end>start,'Destinations array not found');
const places=JSON.parse(html.slice(start+'const places = '.length,end+2));
assert.equal(places.length,69,'Unexpected destinations count');
const all = new Set(places.map(p=>p.name[0]));
const mapped=new Set();
for(const item of [...photosLocal,...photosRemote]){
  assert.ok(all.has(item.name),'Unknown destination in image catalog: '+item.name);
  assert.ok(!mapped.has(item.name),'Duplicate destination photo: '+item.name);
  mapped.add(item.name);
  assert.ok(item.url.startsWith('https://'),'Photo source must be HTTPS: '+item.name);
  assert.ok(item.source.startsWith('https://'),'Attribution URL must be HTTPS: '+item.name);
}
assert.equal(mapped.size,69,'Missing a destination photo mapping');
for(const file of ['docs/ARCHITECTURE.md','docs/CODE_GUIDE.md','docs/DATABASE.md','docs/INTEGRATION_AUDIT.md','README.md']){
  assert.ok(fs.existsSync(path.join(root,file)),'Missing repository documentation: '+file);
}
console.log('PASS: frontend/API/CSP/database-contract/source/photo catalog (69/69), backend source tracked.');
