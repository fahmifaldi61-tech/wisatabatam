// Publish only the six explicitly reviewed application files below.
// Run --update-csp locally after editing inline JavaScript, then review both files.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=__dirname,configPath=path.join(root,'vercel.json');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),config=JSON.parse(fs.readFileSync(configPath,'utf8'));
const policy=config.headers.find(rule=>rule.source==='/(.*)').headers.find(h=>h.key==='Content-Security-Policy');
assert.ok(policy,'Missing CSP response header');
const scripts=[...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)],hashes=[];
for(const script of scripts){
  const src=script[1].match(/\bsrc="([^"]+)"/);
  if(src){
    assert.match(src[1],/^https:\/\/cdn\.jsdelivr\.net\/npm\/(?:marked|dompurify)@\d+\.\d+\.\d+\//,'Use exact library versions');
    const integrity=script[1].match(/\bintegrity="(sha384-[A-Za-z0-9+/=]+)"/);
    assert.ok(integrity,'Library integrity is required');assert.match(script[1],/crossorigin="anonymous"/);hashes.push(integrity[1]);
  }else hashes.push('sha256-'+crypto.createHash('sha256').update(script[2].replace(/\r\n?/g,'\n')).digest('base64'));
}
assert.equal(hashes.length,3,'Review CSP when adding scripts');
assert.ok(!/\son\w+\s*=/i.test(html.slice(0,html.indexOf('<script>'))),'Inline HTML event handlers are forbidden');
const directive=`script-src ${hashes.sort().map(h=>`'${h}'`).join(' ')} blob:`;
if(process.argv.includes('--update-csp')){
  policy.value=policy.value.replace(/script-src\s+[^;]+/,directive);
  fs.writeFileSync(configPath,JSON.stringify(config,null,2)+'\n');
  console.log('CSP hashes updated. Test and publish index.html and vercel.json together.');
  process.exit(0);
}
const actual=policy.value.split(';').map(s=>s.trim()).find(s=>s.startsWith('script-src '));
assert.equal(actual,directive,'CSP does not match app code. Run node build.cjs --update-csp locally, review and test before publishing.');
const assets=[
  {source:'index.html',output:'index.html'},
  {source:'image_02fa79.jpg',output:'image_02fa79.jpg'},
  {source:'telyu',output:'logo-telyu.png'},
  {source:'btp',output:'logo-btp.png'},
  {source:'greentech',output:'logo-greentech.png'},
  {source:'sth',output:'logo-sth.png'}
];
const allowed=assets.map(asset=>asset.output),output=path.join(root,'public');
// Never delete a computed directory; reject unexpected stale contents instead.
if(fs.existsSync(output)){
  assert.ok(fs.lstatSync(output).isDirectory()&&!fs.lstatSync(output).isSymbolicLink(),'Output must be a real directory');
  for(const file of fs.readdirSync(output))assert.ok(allowed.includes(file),'Unexpected file in public output: '+file);
}else fs.mkdirSync(output);
for(const asset of assets){
  const source=path.join(root,asset.source),target=path.join(output,asset.output);
  assert.ok(fs.lstatSync(source).isFile()&&!fs.lstatSync(source).isSymbolicLink(),'Source must be a regular file');
  if(fs.existsSync(target))assert.ok(fs.lstatSync(target).isFile()&&!fs.lstatSync(target).isSymbolicLink(),'Output must be a regular file');
  fs.copyFileSync(source,target);
}
console.log('Security checks passed; published output contains only the application, hero image and four contributor logos.');
