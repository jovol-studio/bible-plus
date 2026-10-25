"""Import/verify the official WEBPB verse-per-line archive without changing text."""
# Bible Plus by JovoL Studio. AGPL-3.0-only; see LICENSE and NOTICE.md.
import argparse
import hashlib
import json
import re
from pathlib import Path
from zipfile import ZipFile

ROOT = Path(__file__).resolve().parents[1]
CODES = 'GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH EST JOB PSA PRO ECC SOL ISA JER LAM EZE DAN HOS JOE AMO OBA JON MIC NAH HAB ZEP HAG ZEC MAL MAT MAR LUK JOH ACT ROM 1CO 2CO GAL EPH PHI COL 1TH 2TH 1TI 2TI TIT PHM HEB JAM 1PE 2PE 1JO 2JO 3JO JUD REV'.split()

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check', action='store_true', help='Verify saved JSON against the original archive without writing.')
    args = parser.parse_args()
    archive = ROOT / 'sources/web/engwebpb_vpl.zip'
    source = json.loads((ROOT / 'sources/web/source.json').read_text())
    assert hashlib.sha256(archive.read_bytes()).hexdigest() == source['archiveSha256'], 'Archive checksum mismatch'
    with ZipFile(archive) as z:
        raw = z.read('engwebpb_vpl.txt')
    assert hashlib.sha256(raw).hexdigest() == source['textSha256'], 'Text checksum mismatch'
    catalog = json.loads((ROOT / 'static/js/books.js').read_text().split('const books = ', 1)[1].strip().removesuffix(';'))[:66]
    corpus = {}
    seen = set()
    blanks = []
    for line in raw.decode('utf-8-sig').splitlines():
        match = re.fullmatch(r'(\w+) (\d+):(\d+) (.*)', line)
        assert match, f'Invalid verse line: {line[:80]}'
        code, chapter, verse, text = match.groups()
        key = (code, chapter, verse)
        assert key not in seen, f'Duplicate reference: {key}'
        seen.add(key)
        corpus.setdefault(code, {}).setdefault(chapter, []).append({'number': verse, 'text': text})
        if not text.strip():
            blanks.append(':'.join(key))
    assert list(corpus) == CODES and len(catalog) == 66
    assert len(seen) == source['verseCount']
    assert blanks == source['emptyVerses']
    total_chapters = 0
    destination = ROOT / 'static/data/web'
    if not args.check:
        destination.mkdir(parents=True, exist_ok=True)
    for i, code in enumerate(CODES):
        assert catalog[i]['index'] == i
        chapters = corpus[code]
        assert list(chapters) == [str(n) for n in range(1, len(chapters) + 1)]
        total_chapters += len(chapters)
        for verses in chapters.values():
            numbers = [int(v['number']) for v in verses]
            assert numbers == sorted(numbers)
        data = {'id': catalog[i]['id'], 'title': {'zh-Hant': catalog[i]['name'], 'en': catalog[i]['english']},
                'language': 'en', 'translation': 'WEBPB', 'source': source,
                'chapters': [{'id': c, 'label': f'Chapter {c}', 'section': '', 'verses': verses} for c, verses in chapters.items()]}
        path = destination / f"{catalog[i]['id']}.en.json"
        if args.check:
            assert json.loads(path.read_text()) == data, f'Text or provenance mismatch: {path}'
        else:
            path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')
    assert total_chapters == 1189
    print(f'WEBPB: 66 books, {total_chapters} chapters, {len(seen)} verse entries; {len(blanks)} source blanks preserved. All text matches the official archive.')

if __name__ == '__main__':
    main()
