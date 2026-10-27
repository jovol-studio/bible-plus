# Bible Plus (Bible+) by JovoL Studio. Copyright (c) 2026 JovoL Studio (its contributions).
# AGPL-3.0-only with Section 7(b) attribution term; see NOTICE.md and LICENSE.
# Original source: https://github.com/jovol-studio/bible-plus
"""Validate imported texts and translations. --require-complete enforces release readiness."""
import json,re,sys
from pathlib import Path
R=Path(__file__).resolve().parents[1]
expected={'letter-of-jeremiah':1,'1-maccabees':16,'2-maccabees':15,'wisdom-of-solomon':19,'sirach':51,'tobit':14,'judith':16,'additions-to-esther':6,'jubilees':50,'1-enoch':109,'2-enoch':68,'3-enoch':54,'apocalypse-of-abraham':33,'life-of-adam-and-eve':64,'testaments-of-the-twelve-patriarchs':142,'1-esdras':9,'2-esdras':16,'2-baruch':87}
sirach_empty=set('1:5 1:7 1:21 3:19 10:21 11:15 13:14 16:15 17:5 17:9 17:16 17:18 17:21 18:3 19:18 19:21 20:3 20:32 22:9 23:28 24:18 24:24 25:12 26:19'.split())
sirach_omitted=set('11:16 16:16 19:19 22:10 26:20 26:21 26:22 26:23 26:24 26:25 26:26 26:27'.split())
rows=[]; incomplete=[]
for slug,n in expected.items():
 en=json.loads((R/'static/data'/f'{slug}.en.json').read_text());assert en['language']=='en'
 assert en.get('source',{}).get('rightsNotice'),(slug,'missing English rights notice')
 assert len(en['chapters'])==n,(slug,'sections')
 ids=[c['id'] for c in en['chapters']];assert len(set(ids))==n
 allowed_empty=sirach_empty if slug=='sirach' else set()
 actual_empty={c['id']+':'+v['number'] for c in en['chapters'] for v in c['verses'] if v['text']==''}
 assert actual_empty==allowed_empty,(slug,'unexpected source blanks')
 if slug=='sirach': assert set(en['source']['emptyVerses'])==allowed_empty
 for c in en['chapters']:
  assert c['verses']
  for v in c['verses']: assert isinstance(v['text'],str) and (v['text'].strip() or c['id']+':'+v['number'] in allowed_empty),(slug,c['id'])
 zp=R/'static/data'/f'{slug}.zh-Hant.json';zh=json.loads(zp.read_text()) if zp.exists() else {'chapters':[]}
 zi=[c['id'] for c in zh['chapters']];assert len(zi)==len(set(zi))
 assert zi==[i for i in ids if i in zi],(slug,'chapter order')
 for z in zh['chapters']:
  e=next(c for c in en['chapters'] if c['id']==z['id'])
  assert [v['number'] for v in z['verses']]==[v['number'] for v in e['verses']],(slug,z['id'],'verse alignment')
  for v in z['verses']:
   if z['id']+':'+v['number'] in allowed_empty:
    assert v['text']=='',(slug,z['id'],v['number'],'source blank changed')
    continue
   assert re.search('[\u3400-\u9fff]',v['text']),(slug,z['id'],v['number'],'missing Chinese')
   assert not re.search(r'\b(TODO|PLACEHOLDER|TBD)\b',v['text'])
 if zh['chapters']:
  assert zh['language']=='zh-Hant' and 'AI-generated' in zh['source']['translationNote']
  assert zh['source'].get('rightsNotice'),(slug,'missing Chinese rights notice')
 complete=len(zi)==n
 if not complete:incomplete.append(slug)
 row={'book':slug,'englishSections':n,'chineseSections':len(zi),'complete':complete};rows.append(row)
 print(f'{slug}: Chinese {len(zi)}/{n} sections')
for slug,verse_counts in [('letter-of-jeremiah',[73]),('1-maccabees', [64, 70, 60, 61, 68, 63, 50, 32, 73, 89, 74, 53, 53, 49, 41, 24]), ('2-maccabees', [36, 32, 40, 50, 27, 31, 42, 36, 29, 38, 38, 45, 26, 46, 39]), ('wisdom-of-solomon', [16, 24, 19, 20, 23, 25, 30, 21, 18, 21, 26, 27, 19, 31, 19, 29, 21, 25, 22]), ('sirach', [30, 18, 31, 31, 15, 37, 36, 19, 18, 31, 33, 18, 26, 27, 20, 29, 32, 33, 29, 32, 28, 26, 28, 34, 26, 21, 30, 26, 28, 25, 31, 24, 33, 26, 20, 26, 31, 34, 35, 30, 24, 25, 33, 23, 26, 20, 25, 25, 16, 29, 30])]+[('tobit',[22,14,17,21,22,17,18,21,6,12,19,22,18,15]),('judith',[16,28,10,15,24,21,32,36,14,23,23,20,20,19,13,25]),('additions-to-esther',[21,6,30,18,15,11]),('1-esdras',[58,30,24,63,73,34,15,96,55]),('2-esdras',[40,48,36,52,56,59,140,63,47,59,46,51,58,48,63,78])]:
 data=json.loads((R/'static/data'/f'{slug}.en.json').read_text())
 assert [c['id'] for c in data['chapters']]==list(map(str,range(1,len(verse_counts)+1)))
 for c,count in zip(data['chapters'],verse_counts):
  numbers=[v['number'] for v in c['verses'] if v['number']!='preface']
  omitted={ref.split(':')[1] for ref in sirach_omitted if ref.split(':')[0]==c['id']} if slug=='sirach' else set()
  assert len(numbers)==count and numbers==[str(i) for i in range(1,count+len(omitted)+1) if str(i) not in omitted],(slug,c['id'],'verse sequence')
for lang in ['en','zh-Hant']:
 sir=json.loads((R/'static/data'/f'sirach.{lang}.json').read_text())
 assert [(c['id'],v['number']) for c in sir['chapters'] for v in c['verses'] if v['number']=='preface']==[('1','preface')]
 assert set(sir['source']['omittedVerses'])==sirach_omitted
 assert sir['source']['prologueUrl']=='https://ebible.org/eng-web/SIR01.htm'
for lang in ['en','zh-Hant']:
 est=json.loads((R/'static/data'/f'additions-to-esther.{lang}.json').read_text())
 refs=[['ESG 1:1'],['ESG 3:13','ESG 4:8'],[f'ESG 4:{v}' for v in range(18,48)],['ESG 5:1','ESG 5:2'],['ESG 8:13'],[f'ESG 10:{v}' for v in range(4,15)]]
 assert [c['addition'] for c in est['chapters']]==list('ABCDEF')
 for c,rs in zip(est['chapters'],refs):
  assert c['sourceReferences']==rs
  assert list(dict.fromkeys(v['sourceReference'] for v in c['verses']))==rs
pat=json.loads((R/'static/data/testaments-of-the-twelve-patriarchs.en.json').read_text());assert len(set(c['section'] for c in pat['chapters']))==12
assert next(v for v in pat['chapters'][134]['verses'] if v['number']=='5')['text'].endswith('as was Joseph my brother.')
(R/'static/data/coverage.json').write_text(json.dumps({'books':rows,'allChineseComplete':not incomplete},ensure_ascii=False,indent=2)+'\n')
print('Structural validation passed. Full bilingual release ready:',not incomplete)
if '--require-complete' in sys.argv and incomplete:sys.exit(1)
