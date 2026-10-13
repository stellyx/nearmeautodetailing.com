from pathlib import Path
from lxml import html
import json,re,subprocess
root=Path(__file__).resolve().parents[1]
s=(root/'index.html').read_text();d=html.fromstring(s)
old=html.fromstring(subprocess.check_output(['git','show','HEAD:index.html'],cwd=root).decode())
assert len(d.xpath('//h1'))==1
ids=d.xpath('//@id');assert len(ids)==len(set(ids))
for n in d.xpath('//*[@href or @src or @data-src]'):
 for attr in ['href','src','data-src']:
  u=n.get(attr,'').split('?')[0]
  if not u:continue
  if u.startswith('#'):assert u[1:] in ids,u
  elif not re.match(r'\w+:|//',u):assert (root/u).exists(),u
for node in d.xpath('//script[@type="application/ld+json"]'):json.loads(node.text)
for name in ['description','robots','twitter:title','twitter:description']:
 assert d.xpath(f'//meta[@name="{name}"]/@content')==old.xpath(f'//meta[@name="{name}"]/@content')
assert d.xpath('//link[@rel="canonical"]/@href')==old.xpath('//link[@rel="canonical"]/@href')
assert d.xpath('//title/text()')==old.xpath('//title/text()')
assert d.xpath('//script[@type="application/ld+json"]/text()')==old.xpath('//script[@type="application/ld+json"]/text()')
for u in d.xpath('//a/@href'):
 if u.startswith('tel:') or u.startswith('sms:'):assert u in ['tel:+15125532552','sms:+15125532552']
assert not re.search(r'buy now|buy this|checkout|FormSubmit|topazcandy',s,re.I)
assert len(d.xpath('//details'))==3
for el in d.xpath('//input|//select|//textarea'):assert d.xpath('//label[@for="'+el.get('id')+'"]')
script=(root/'assets/customer-experience.js').read_text()
assert not re.search(r'fetch\(|XMLHttpRequest|localStorage|sessionStorage|\.innerHTML',script)
for f in root.glob('assets/*.js'):subprocess.run(['node','--check',str(f)],check=True)
print('PASS: links/assets, IDs, schema, metadata preservation, contact routes, FAQ, field labels, no sales code/storage/transmission, JavaScript syntax')
