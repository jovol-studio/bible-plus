# Bible Plus (Bible+) by JovoL Studio. Copyright (c) 2026 JovoL Studio (its contributions).
# AGPL-3.0-only with Section 7(b) attribution term; see NOTICE.md and LICENSE.
# Original source: https://github.com/jovol-studio/bible-plus
"""Validate imported texts and translations. --require-complete enforces release readiness."""
import json,re,sys
from pathlib import Path
R=Path(__file__).resolve().parents[1]
expected={'jubilees':50,'1-enoch':109,'2-enoch':68,'3-enoch':54,'apocalypse-of-abraham':33,'life-of-adam-and-eve':64,'testaments-of-the-twelve-patriarchs':142,'1-esdras':9,'2-esdras':16,'2-baruch':87}
rows=[]; incomplete=[]
for slug,n in expected.items():
 en=json.loads((R/'static/data'/f'{slug}.en.json').read_text());assert en['language']=='en'
 assert len(en['chapters'])==n,(slug,'sections')
 ids=[c['id'] for c in en['chapters']];assert len(set(ids))==n
 for c in en['chapters']:
  assert c['verses']
  for v in c['verses']: assert isinstance(v['text'],str) and v['text'].strip(),(slug,c['id'])
 zp=R/'static/data'/f'{slug}.zh-Hant.json';zh=json.loads(zp.read_text()) if zp.exists() else {'chapters':[]}
 zi=[c['id'] for c in zh['chapters']];assert len(zi)==len(set(zi))
 assert zi==[i for i in ids if i in zi],(slug,'chapter order')
 for z in zh['chapters']:
  e=next(c for c in en['chapters'] if c['id']==z['id'])
  assert [v['number'] for v in z['verses']]==[v['number'] for v in e['verses']],(slug,z['id'],'verse alignment')
  for v in z['verses']:
   assert re.search('[\u3400-\u9fff]',v['text']),(slug,z['id'],v['number'],'missing Chinese')
   assert not re.search(r'\b(TODO|PLACEHOLDER|TBD)\b',v['text'])
 if zh['chapters']:
  assert zh['language']=='zh-Hant' and 'AI-generated' in zh['source']['translationNote']
 complete=len(zi)==n
 if not complete:incomplete.append(slug)
 row={'book':slug,'englishSections':n,'chineseSections':len(zi),'complete':complete};rows.append(row)
 print(f'{slug}: Chinese {len(zi)}/{n} sections')
for slug,verse_counts in [('1-esdras',[58,30,24,63,73,34,15,96,55]),('2-esdras',[40,48,36,52,56,59,140,63,47,59,46,51,58,48,63,78])]:
 data=json.loads((R/'static/data'/f'{slug}.en.json').read_text())
 assert [c['id'] for c in data['chapters']]==list(map(str,range(1,len(verse_counts)+1)))
 for c,count in zip(data['chapters'],verse_counts):
  assert [v['number'] for v in c['verses']]==list(map(str,range(1,count+1))),(slug,c['id'],'verse sequence')
pat=json.loads((R/'static/data/testaments-of-the-twelve-patriarchs.en.json').read_text());assert len(set(c['section'] for c in pat['chapters']))==12
assert next(v for v in pat['chapters'][134]['verses'] if v['number']=='5')['text'].endswith('as was Joseph my brother.')
(R/'static/data/coverage.json').write_text(json.dumps({'books':rows,'allChineseComplete':not incomplete},ensure_ascii=False,indent=2)+'\n')
print('Structural validation passed. Full bilingual release ready:',not incomplete)
if '--require-complete' in sys.argv and incomplete:sys.exit(1)
