"""Import Whiston's Antiquities from Gutenberg #2848; preserve source wording."""
# Bible Plus by JovoL Studio. AGPL-3.0-only; see LICENSE and NOTICE.md.
import argparse
import hashlib
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
COUNTS = [22, 16, 15, 8, 11, 14, 15, 15, 14, 11, 8, 11, 16, 16, 11, 11, 13, 9, 9, 11]
ROMANS = 'I II III IV V VI VII VIII IX X XI XII XIII XIV XV XVI XVII XVIII XIX XX'.split()

def normalize(text):
    return re.sub(r'\s+', ' ', text).strip()

def parse(raw):
    chapter_titles = json.loads((ROOT / 'scripts/antiquities-chapter-titles.zh-Hant.json').read_text())
    text = raw.decode('utf-8-sig').replace('\r\n', '\n')
    text = text.split('PREFACE.1', 1)[1].split('*** END OF THE PROJECT GUTENBERG')[0]
    preface = text.split('FOOTNOTES', 1)[0].strip()
    assert re.findall(r'^(\d+)\. ', preface, re.M) == ['1', '2', '3', '4']
    books = list(re.finditer(r'^BOOK ([IVX]+)\.', text, re.M))
    chapters = []
    seen = []
    for i, book in enumerate(books):
        block = text[book.start():books[i+1].start() if i+1 < len(books) else len(text)].split('FOOTNOTES')[0]
        # Volume VIII repeats its table of contents before the actual text.
        if not re.search(r'^1\. ', block, re.M):
            assert book[1] == 'VIII'
            continue
        volume = ROMANS.index(book[1]) + 1
        seen.append(volume)
        headers = list(re.finditer(r'^CHAPTER (\d+)\b[^\n]*', block, re.M))
        assert [int(h[1]) for h in headers] == list(range(1, COUNTS[volume-1]+1))
        for j, header in enumerate(headers):
            number = int(header[1])
            chunk = block[header.start():headers[j+1].start() if j+1 < len(headers) else len(block)]
            title, body = re.split(r'\n\s*\n', chunk, maxsplit=1)
            # Four source headings contain an internal blank line.
            if (volume, number) in {(13, 2), (13, 13), (16, 3), (16, 11)}:
                continuation, body = re.split(r'\n\s*\n', body.strip(), maxsplit=1)
                title += ' ' + continuation
            markers = list(re.finditer(r'^(\d+)\. ', body, re.M))
            verses = []
            prefix = body[:markers[0].start()] if markers else body
            if prefix.strip():
                assert not markers or markers[0][1] == '2', (volume, number)
                verses.append({'number': '1', 'text': normalize(prefix), 'sourceNumber': None})
            for k, marker in enumerate(markers):
                content = body[marker.end():markers[k+1].start() if k+1 < len(markers) else len(body)]
                verses.append({'number': marker[1], 'text': normalize(content)})
            assert verses and all(v['text'] for v in verses)
            assert [int(v['number']) for v in verses] == sorted({int(v['number']) for v in verses}), (volume, number)
            if volume == number == 1:
                verses.insert(0, {'number': 'preface', 'text': normalize(preface)})
            chapters.append({'id': f'{volume}-{number}', 'label': f'第 {volume} 卷 第 {number} 章',
                             'section': normalize(title), 'shortSection': f"第 {volume} 卷 · 第 {number} 章｜{chapter_titles[f'{volume}-{number}']}",
                             'sourceHeading': normalize(title), 'sourceBook': volume, 'sourceChapter': number,
                             'verses': verses})
    assert list(chapter_titles) == [chapter['id'] for chapter in chapters]
    assert seen == list(range(1, 21))
    return chapters

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    parser.add_argument('--check', action='store_true')
    args = parser.parse_args()
    raw = args.source.read_bytes()
    chapters = parse(raw)
    path = ROOT / 'static/data/antiquities-of-the-jews.en.json'
    source = {
        'url': 'https://www.gutenberg.org/ebooks/2848',
        'downloadUrl': 'https://www.gutenberg.org/ebooks/2848.txt.utf-8',
        'credit': 'Flavius Josephus, Antiquities of the Jews. English translation by William Whiston; transcription by David Reed and David Widger, Project Gutenberg #2848.',
        'rightsNotice': 'William Whiston 歷史英譯本；Project Gutenberg 標示為美國公版。經文／歷史正文不受本應用程式的 AGPL 授權涵蓋。',
        'rightsUrl': 'https://www.gutenberg.org/ebooks/2848',
        'retrieved': '2026-11-01',
        'sha256': hashlib.sha256(raw).hexdigest(),
        'editionNote': '收錄作者序言及 20 卷全部 256 章正文；不含重複目錄及譯者註腳，原註號保留，可於來源全文查閱。保留底本拼字、轉錄缺誤和括注，不另行改寫。章欄採 1–256 連續閱讀編號；標題保留原卷、章。節欄是 Whiston 版章內段號，不是其他版本的連續節號；八個未印首段號的章以 1 定位。第 2 卷第 6 章底本段號由 8 跳至 10，照錄不補造。',
        'navigationNote': '選章標籤保留卷與章定位，並附中文內容短題；短題為編輯導讀，完整英文標題保留於 sourceHeading。序言附於第 1 卷第 1 章之前。'
    }
    assert len(chapters) == 256
    data = {'id': 'antiquities-of-the-jews', 'title': {'en': 'Antiquities of the Jews', 'zh-Hant': '猶太古史'}, 'language': 'en', 'source': source, 'chapters': chapters}
    if args.check:
        assert json.loads(path.read_text()) == data, 'Imported data differs from source'
    else:
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2)+'\n')
        manifest_path = ROOT / 'static/data/import-manifest.json'
        manifest = json.loads(manifest_path.read_text())
        manifest[data['id']] = {'chapterIds': [c['id'] for c in chapters], 'entryCounts': [len(c['verses']) for c in chapters]}
        manifest_path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2)+'\n')
    print(f'Verified 20 volumes, {len(chapters)} chapters, {sum(len(c["verses"]) for c in chapters)} entries including preface.')

if __name__ == '__main__':
    main()
