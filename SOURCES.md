# Bible Plus — 典外書卷來源與資料說明

以下保留 Bible Extension 的來源、版本及翻譯覆蓋說明。Bible Plus 的使用與測試指令請參閱 [README.md](README.md)。

## Rights and software-license boundary

The application-code license does not license the bundled scripture texts. See [NOTICE.md](NOTICE.md). Source credits do not by themselves authorize full-text redistribution. Existing public-domain status and third-party rights remain unchanged.

## Dropdown catalog

The extension dropdown follows the user-requested categories and the main book
lists in Wikipedia’s [聖經](https://zh.wikipedia.org/zh-tw/聖經), [次經](https://zh.wikipedia.org/wiki/次經) and
[偽典](https://zh.wikipedia.org/wiki/偽典), consulted 2026-10-26.

- 天主教及東正教增收書卷: 12 entries for shared additional books and separately navigable additions (including the Letter of Jeremiah, incorporated into Catholic Baruch).
- 東正教增收書卷: five additional entries — 1 Esdras, 3 and 4 Maccabees, Psalm 151 and the Prayer of Manasseh. Orthodox traditions differ; 4 Maccabees can be an appendix.
- 舊約次經: the remaining 2 Esdras entry. This is a navigation placement, not a claim that every Orthodox tradition excludes it.
- 新約次經: the nine listed works/collections, retaining the seven Ignatian letters as one collection.
- 典外書卷 / 偽經: 22 entries, retaining existing readable works and adding the named works in the main pseudepigrapha lists. The War Scroll represents the explicitly named Dead Sea Scrolls example; the whole manuscript collection is not duplicated as a book.

The source’s 黑馬福音 link redirects to 黑馬牧人書, so it appears only once under
新約次經. 水徒行紀 is retained as an unprepared entry with its English title and
text identity explicitly unverified; “Shuitu Xingji” is a transliteration. The
Egyptian Gospel’s specific edition is also not selected yet. Baruch and 2 Baruch,
and the Epistle of Barnabas and Gospel of Barnabas, remain distinct works.
These are navigation categories, not a universal judgment of canonical status.
The two denominational groups precede the remaining apocrypha groups and are
relative to the existing 66-book collection, not complete denominational Bibles.
Shared books appear once. No texts were downloaded for this regrouping.

### Ordering review (2026-10-26)

- Shared additional books follow the relative order in the [Catholic canon list](https://www.usccb.org/sites/default/files/flipbooks/catechism/36/index.html): Tobit, Judith, Esther additions, 1–2 Maccabees, Wisdom, Sirach, Baruch (followed here by the separately selectable Letter of Jeremiah), then Daniel additions. Daniel additions follow the Catholic sequence: Prayer/Song in chapter 3, Susanna in 13, Bel and the Dragon in 14; Greek arrangements can differ.
- The Orthodox group is an editorial history → psalm/prayer → appendix sequence, not a universal Orthodox table of contents. [OCA’s canon discussion](https://www.oca.org/questions/scripture/canon-of-scripture) and [Essential Orthodox Christian Beliefs, pp. 100–102](https://www.oca.org/cdn/PDFs/2023-0609-EOCB.pdf) document the broader collection and variations. 4 Maccabees is marked as an appendix and placed last. Keeping 2 Esdras under 舊約次經 does not imply it is absent from every Orthodox Bible; Esdras numbering also varies by tradition.
- The nine 新約次經 entries are principally [Apostolic Fathers writings](https://www.oca.org/orthodoxy/the-orthodox-faith/church-history/second-century/the-apostolic-fathers), not additional Catholic/Orthodox New Testament canonical books. The list groups Clement together, Ignatius and Polycarp next (with Polycarp’s martyrdom), then Didache, Barnabas, Hermas and Papias. This is editorial navigation, not a prescribed reading sequence or chronological order.
- Pseudepigrapha keep Enoch 1–3 together, then related patriarchal narratives/testaments, prophetic material, psalms/oracles/War Scroll, and gospels. The unverified 水徒行紀 title remains last as a placeholder. This broad category includes writings from different periods and traditions, not a single canon or literary series.

There are 39 catalog-only entries marked `available: false` in `books.js`. No
scripture text was downloaded for these entries. Selecting them displays a
not-ready message and does not request a data file. Coverage validation below
applies to the ten bundled works, not these placeholders.

## Current translation coverage

**All ten bundled extension books have complete Traditional Chinese AI drafts matching the bundled English sections.** The full structural completeness check passes. This confirms coverage and passage alignment, not independent scholarly review. The reader retains its missing-content fallback if a translation cannot be loaded.

| Work | English sections | Chinese sections saved |
| --- | ---: | ---: |
| Book of Jubilees / 禧年書 | 50 | 50 |
| 1 Enoch / 以諾一書 | 109 | 109 |
| 2 Enoch / 以諾二書 | 68 | 68 |
| 3 Enoch / 以諾三書 | 54 | 54 |
| Apocalypse of Abraham / 亞伯拉罕啟示錄 | 33 | 33 |
| Life of Adam and Eve / 亞當和夏娃生平 | 64 | 64 |
| Testaments of the Twelve Patriarchs / 十二族長遺訓 | 142 | 142 |
| 1 Esdras / 以斯拉續篇上卷 | 9 | 9 |
| 2 Esdras / 以斯拉續篇下卷 | 16 | 16 |
| 2 Baruch / 巴錄二書 | 87 | 87 |

The machine-readable current counts are in `static/data/coverage.json`. Sections are not always canonical chapter numbers: see edition notes below. Chinese is a newly produced AI translation of the cited English, **not** a published translation, not translated directly from ancient manuscripts, and not independently scholarly reviewed. Proper-name transliterations and difficult textual readings need review.

## Sources and editions

Eight English works were extracted from [StudyLight's Pseudepigrapha collection](https://www.studylight.org/historical-writings/pseudepigrapha.html), retaining only the historical translation and its source attribution in the distributable JSON, not the site's modern introductions. Each book JSON carries its exact URL, edition credit, retrieval date and raw source SHA-256.

| Work | English edition |
| --- | --- |
| Jubilees | R. H. Charles, APOT vol. 2, 1913 |
| 1 Enoch | R. H. Charles, APOT vol. 2, 1913 |
| 2 Enoch | W. R. Morfill, edited by R. H. Charles, 1896 |
| 3 Enoch | Hugo Odeberg, 1928 |
| Apocalypse of Abraham | G. H. Box with J. I. Landsman, 1918 |
| Life of Adam and Eve | L. S. A. Wells, APOT vol. 2, 1913 |
| Twelve Patriarchs | R. H. Charles, APOT vol. 2, 1913 |
| 1 Esdras | [World English Bible Classic, 1 Esdras 1–9](https://ebible.org/eng-web/1ES01.htm) |
| 2 Esdras | [World English Bible Classic, 2 Esdras 1–16](https://ebible.org/eng-web/2ES01.htm) |
| 2 Baruch | R. H. Charles, APOT vol. 2, 1913 |

The historical English editions are presented by the hosts as public domain; that designation should not be read as a worldwide rights opinion. In particular, the 1928 Odeberg edition can have different status in countries using the translator's life plus a term. [WEB's publisher explicitly dedicates its text to the public domain](https://ebible.org/eng-web/copyright.htm); the new Chinese translation is not called the World English Bible.

Published Traditional Chinese editions were found in Christian Literature Council's *基督教典外文獻：舊約篇*, including [volume 1 (Enoch)](https://www.cclc.org.hk/product/基督教典外文獻：舊約篇-第一冊/) and [volume 4 (Jubilees and Testaments)](https://www.cclc.org.hk/product/基督教典外文獻：舊約篇-第四冊/). No permission to reproduce those modern translations was established, so their full text is not bundled. The user's approved fallback is an explicitly labelled AI translation.

### Editorial details and known limitations

- 1 Enoch follows the source's split 91a / 91b, so it has 109 reader sections covering the 108 numbered chapters.
- 2 Enoch uses the 68-chapter Morfill text as transcribed by the host, not later 73-chapter arrangements. The original 1896 edition places 22:1–3 in manuscript A’s apparatus on printed page 27, so the main text begins chapter 22 at verse 4. This is an editorial arrangement, not a lost download; see the [original edition](https://archive.org/details/bookofsecretsofe00morf/page/27). Other gaps and manuscript distinctions remain as printed, not silently renumbered.
- 3 Enoch includes lettered sections and 48 A–D. All 54 sections (408 passages, including headings) now have Chinese drafts. Source order, repeated verse numbers, and the alternative passages in 48 C are retained. The divine-name lists in 48 B and 48 D retain their source transliterations, with surrounding explanations translated. Conflicting numerical readings are not silently reconciled. The host transcription is not Odeberg’s entire critical apparatus.
- Apocalypse of Abraham includes a title section plus chapters 1–32. Its source is unversed prose; the reader labels it as text, not invented Bible verse numbers.
- Life of Adam and Eve is the 51-chapter **Latin Life** plus the source's Slavonic appendix, chapters 28–40. It is not the distinct *Conflict of Adam and Eve with Satan*. Some source combined verse numbers remain within a passage.
- The Twelve Patriarchs have twelve separately titled testaments with their own chapter numbering. Source manuscript gaps in Zebulun 4, Gad 2 and Joseph 19 are retained. Benjamin 5:5's truncated ending was restored from the [parallel Charles transcription](https://www.earlychristianwritings.com/text/patriarchs-charles.html) and recorded in `source.repairs`.
- 1 Esdras is a separate nine-chapter work (448 verses), not the canonical book of Ezra. Its own wording, names and verse divisions are preserved rather than harmonized with Ezra, Nehemiah or Chronicles.
- 2 Esdras combines the existing 5 Ezra (chapters 1–2), 4 Ezra (3–14) and 6 Ezra (15–16) files in chapter order, preserving every English and Chinese passage unchanged, including all 140 verses of chapter 7. The old book IDs redirect to the corresponding chapter of `2-esdras`. These naming conventions do not rename canonical Ezra or Nehemiah. Source URLs, credits and original download hashes remain in the reading JSON files. Downloaded source snapshots have been removed; the app uses the prepared reading files.
- 2 Baruch includes all 87 source chapters, including the letter.
- Source headings, bracketed readings and editorial marks are retained where available. These editions differ from modern critical editions. Structural validation is not a scholarly verification of every reading.

## Data and maintenance

`static/data/<book>.en.json` and `<book>.zh-Hant.json` contain:

- `id`, bilingual `title`, `language`, and `source` provenance;
- `chapters`: ordered objects with stable `id`, display `label`, `section`, and `verses`;
- `verses`: source `number` and plain `text`; `preface` and `paragraph` are special labels, not invented verse numbers.

Chinese chapter IDs and passage numbers must match the corresponding English chapter exactly. Partial translations include only finished chapters and carry `translationStatus`; never insert empty placeholders. The JSON files in `static/data/` are the authoritative saved translation progress. Resume missing chapters by comparing Chinese chapter IDs with the English files; retain existing translated chapters.

```sh
python3 scripts/validate_data.py
node --check static/js/main.js
# Release gate: deliberately fails while any Chinese book is incomplete.
python3 scripts/validate_data.py --require-complete
```

Temporary HTML downloads, translation batch copies, and one-time import/assembly scripts were removed after verifying that every saved translation passage was already present in `static/data/`. Source URLs, edition credits, original download hashes, and documented corrections remain in the book JSON files. Keep `scripts/validate_data.py` for ongoing data and translation checks.

Browser visual/interaction testing has not been completed: the Browser runtime reported no connected browsers. JavaScript syntax and corpus alignment checks are available independently.

## Canonical English translation: WEB British Edition

The 66 canonical books use World English Bible British Edition (WEBPB), the
Protestant edition distributed by [eBible.org](https://ebible.org/find/show.php?id=engwebpb).
The publisher dedicates the text to the public domain and permits redistribution.
The World English Bible name remains a trademark identifying faithful copies.

The official verse-per-line archive was downloaded on 2026-10-25. Its source
notice identifies the 2020 stable text edition. Source metadata and SHA-256
checksums remain in each reading file under `static/data/web/`; the downloaded
archive and publisher-page snapshot have been removed. For archive verification
or reimport, supply an official [WEBPB VPL archive](https://ebible.org/Scriptures/engwebpb_vpl.zip)
to `scripts/import_web.py --archive /path/to/engwebpb_vpl.zip` (add `--check`
to verify without writing). The importer checks the retained hashes.
All 66 books and 1,189 chapters are included. The 31,103 verse entries preserve
five blank source entries (Luke 17:36; Acts 8:37, 15:34, 24:7; Romans 16:25),
which the app marks as unavailable rather than filling or silently renumbering.
The VPL export excludes notes, formatting and noncanonical headings.

Chapter-picker labels in `static/data/chapter-labels.zh-Hant.json` are Bible+
editorial navigation summaries for all 1,189 canonical chapters, not headings
from the Bible editions. Related chapters may share a topic label. Extension
books store their concise navigation labels in chapter `shortSection` metadata;
these labels do not replace or modify scripture text or source headings.

Chinese and English passages are paired by chapter/verse identifier, with a
union of references so neither edition's extra verses disappear. Identical
reference numbers do not guarantee identical verse boundaries across editions.
WEB is an independent English translation, not an English edition of CUV, RCUV,
or CNV. Extension-book English editions remain unchanged. NIV is not bundled.
