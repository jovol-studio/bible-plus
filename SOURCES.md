# Bible Plus — 典外書卷來源與資料說明

以下保留 Bible Extension 的來源、版本及翻譯覆蓋說明。Bible Plus 的使用與測試指令請參閱 [README.md](README.md)。

## Rights and software-license boundary

The application-code license does not license the bundled scripture texts. See [NOTICE.md](NOTICE.md). Source credits do not by themselves authorize full-text redistribution. Existing public-domain status and third-party rights remain unchanged.

Edition copyright notices and permission-record limitations for CUV, RCUV and
CNV are detailed in [NOTICE.md](NOTICE.md#chinese-bible-edition-notices) and shown
in the Info dialog using `static/js/content-rights.js`. The inherited files have
not been modified or authenticated against original copyright pages. This
project has no documented full-text redistribution grant for RCUV or CNV.
Each bundled extension language file has a `source.rightsNotice`; the validator
requires it. Info displays the notice with translator/edition credits and
available rights links. Unprepared titles do not claim a content licence.

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
新約次經. 水徒行紀採 Dowling 1908 年英文版；埃及人福音採希臘文作品的歷史引文殘篇。Baruch and 2 Baruch,
and the Epistle of Barnabas and Gospel of Barnabas, remain distinct works.
These are navigation categories, not a universal judgment of canonical status.
The two denominational groups precede the remaining apocrypha groups and are
relative to the existing 66-book collection, not complete denominational Bibles.
Shared books appear once. No texts were downloaded for this regrouping.

### Ordering review (2026-10-26)

- Shared additional books follow the relative order in the [Catholic canon list](https://www.usccb.org/sites/default/files/flipbooks/catechism/36/index.html): Tobit, Judith, Esther additions, 1–2 Maccabees, Wisdom, Sirach, Baruch (followed here by the separately selectable Letter of Jeremiah), then Daniel additions. Daniel additions follow the Catholic sequence: Prayer/Song in chapter 3, Susanna in 13, Bel and the Dragon in 14; Greek arrangements can differ.
- The Orthodox group is an editorial history → psalm/prayer → appendix sequence, not a universal Orthodox table of contents. [OCA’s canon discussion](https://www.oca.org/questions/scripture/canon-of-scripture) and [Essential Orthodox Christian Beliefs, pp. 100–102](https://www.oca.org/cdn/PDFs/2023-0609-EOCB.pdf) document the broader collection and variations. 4 Maccabees is marked as an appendix and placed last. Keeping 2 Esdras under 舊約次經 does not imply it is absent from every Orthodox Bible; Esdras numbering also varies by tradition.
- The nine 新約次經 entries are principally [Apostolic Fathers writings](https://www.oca.org/orthodoxy/the-orthodox-faith/church-history/second-century/the-apostolic-fathers), not additional Catholic/Orthodox New Testament canonical books. The list groups Clement together, Ignatius and Polycarp next (with Polycarp’s martyrdom), then Didache, Barnabas, Hermas and Papias. This is editorial navigation, not a prescribed reading sequence or chronological order.
- Pseudepigrapha keep Enoch 1–3 together, then related patriarchal narratives/testaments, prophetic material, psalms/oracles/War Scroll, and gospels. 水徒行紀 remains last as a modern work. This broad category includes writings from different periods and traditions, not a single canon or literary series.

There are 49 readable extension entries. The 2026-10-27 import added 30 English works and six existing Chinese editions, without generating translations. See [the per-book source audit](CONTENT_STATUS.md) for all 49 entries.

## Current translation coverage

**Seventeen bundled extension books have Traditional Chinese AI/machine-translation drafts matching the available text of the bundled English sections.** Structural validation passes, but the full bilingual completeness check does not: 26 readable books still lack Chinese. This confirms coverage and passage alignment, not independent scholarly review. The reader retains its missing-content fallback if a translation cannot be loaded.

| Work                                               | English sections | Chinese sections saved |
| -------------------------------------------------- | ---------------: | ---------------------: |
| Tobit / 多比傳                                     |               14 |                     14 |
| Judith / 猶滴傳                                    |               16 |                     16 |
| Additions to Esther / 以斯帖記補編                 |                6 |                      6 |
| 1 Maccabees / 馬加比一書                           |               16 |                     16 |
| 2 Maccabees / 馬加比二書                           |               15 |                     15 |
| Wisdom of Solomon / 所羅門智訓                     |               19 |                     19 |
| Sirach / 便西拉智訓                                |               51 |                     51 |
| Book of Jubilees / 禧年書                          |               50 |                     50 |
| 1 Enoch / 以諾一書                                 |              109 |                    109 |
| 2 Enoch / 以諾二書                                 |               68 |                     68 |
| 3 Enoch / 以諾三書                                 |               54 |                     54 |
| Apocalypse of Abraham / 亞伯拉罕啟示錄             |               33 |                     33 |
| Life of Adam and Eve / 亞當和夏娃生平              |               64 |                     64 |
| Testaments of the Twelve Patriarchs / 十二族長遺訓 |              142 |                    142 |
| 1 Esdras / 以斯拉續篇上卷                          |                9 |                      9 |
| 2 Esdras / 以斯拉續篇下卷                          |               16 |                     16 |
| 2 Baruch / 巴錄二書                                |               87 |                     87 |

The machine-readable current counts are in `static/data/coverage.json`. Sections are not always canonical chapter numbers: see edition notes below. The seventeen existing Chinese drafts are AI translations of the cited English, **not** a published translation, not translated directly from ancient manuscripts, and not independently scholarly reviewed. Proper-name transliterations and difficult textual readings need review.

## Sources and editions

Eight English works were extracted from [StudyLight's Pseudepigrapha collection](https://www.studylight.org/historical-writings/pseudepigrapha.html), retaining only the historical translation and its source attribution in the distributable JSON, not the site's modern introductions. Each book JSON carries its exact URL, edition credit, retrieval date and raw source SHA-256.

| Work                  | English edition                                                                                            |
| --------------------- | ---------------------------------------------------------------------------------------------------------- |
| Tobit                 | [World English Bible Classic, Tobit 1–14](https://ebible.org/eng-web/TOB01.htm)                            |
| Judith                | [World English Bible Classic, Judith 1–16](https://ebible.org/eng-web/JDT01.htm)                           |
| Additions to Esther   | [World English Bible Classic, Esther (Greek), extracted additions A–F](https://ebible.org/eng-web/ESG.htm) |
| 1 Maccabees           | [WEB Classic, 1 Maccabees 1–16](https://ebible.org/eng-web/1MA01.htm)                                      |
| 2 Maccabees           | [WEB Classic, 2 Maccabees 1–15](https://ebible.org/eng-web/2MA01.htm)                                      |
| Wisdom of Solomon     | [WEB Classic, Wisdom 1–19](https://ebible.org/eng-web/WIS01.htm)                                           |
| Sirach                | [WEB Classic, Sirach 1–51 with prologue](https://ebible.org/eng-web/SIR01.htm)                             |
| Jubilees              | R. H. Charles, APOT vol. 2, 1913                                                                           |
| 1 Enoch               | R. H. Charles, APOT vol. 2, 1913                                                                           |
| 2 Enoch               | W. R. Morfill, edited by R. H. Charles, 1896                                                               |
| 3 Enoch               | Hugo Odeberg, 1928                                                                                         |
| Apocalypse of Abraham | G. H. Box with J. I. Landsman, 1918                                                                        |
| Life of Adam and Eve  | L. S. A. Wells, APOT vol. 2, 1913                                                                          |
| Twelve Patriarchs     | R. H. Charles, APOT vol. 2, 1913                                                                           |
| 1 Esdras              | [World English Bible Classic, 1 Esdras 1–9](https://ebible.org/eng-web/1ES01.htm)                          |
| 2 Esdras              | [World English Bible Classic, 2 Esdras 1–16](https://ebible.org/eng-web/2ES01.htm)                         |
| 2 Baruch              | R. H. Charles, APOT vol. 2, 1913                                                                           |

The historical English editions are presented by the hosts as public domain; that designation should not be read as a worldwide rights opinion. In particular, the 1928 Odeberg edition can have different status in countries using the translator's life plus a term. [WEB's publisher explicitly dedicates its text to the public domain](https://ebible.org/eng-web/copyright.htm); the new Chinese translation is not called the World English Bible.

Published Traditional Chinese editions were found in Christian Literature Council's _基督教典外文獻：舊約篇_, including [volume 1 (Enoch)](https://www.cclc.org.hk/product/基督教典外文獻：舊約篇-第一冊/) and [volume 4 (Jubilees and Testaments)](https://www.cclc.org.hk/product/基督教典外文獻：舊約篇-第四冊/). No permission to reproduce those modern translations was established, so their full text is not bundled. The user's approved fallback is an explicitly labelled AI translation.

### Editorial details and known limitations

- 1 Enoch follows the source's split 91a / 91b, so it has 109 reader sections covering the 108 numbered chapters.
- 2 Enoch uses the 68-chapter Morfill text as transcribed by the host, not later 73-chapter arrangements. The original 1896 edition places 22:1–3 in manuscript A’s apparatus on printed page 27, so the main text begins chapter 22 at verse 4. This is an editorial arrangement, not a lost download; see the [original edition](https://archive.org/details/bookofsecretsofe00morf/page/27). Other gaps and manuscript distinctions remain as printed, not silently renumbered.
- 3 Enoch includes lettered sections and 48 A–D. All 54 sections (408 passages, including headings) now have Chinese drafts. Source order, repeated verse numbers, and the alternative passages in 48 C are retained. The divine-name lists in 48 B and 48 D retain their source transliterations, with surrounding explanations translated. Conflicting numerical readings are not silently reconciled. The host transcription is not Odeberg’s entire critical apparatus.
- Apocalypse of Abraham includes a title section plus chapters 1–32. Its source is unversed prose; the reader labels it as text, not invented Bible verse numbers.
- Life of Adam and Eve is the 51-chapter **Latin Life** plus the source's Slavonic appendix, chapters 28–40. It is not the distinct _Conflict of Adam and Eve with Satan_. Some source combined verse numbers remain within a passage.
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

## Tobit / 多比傳 (2026-10-27)

Added all 14 chapters and 244 verses from the [official WEB Classic verse-per-line archive](https://ebible.org/Scriptures/eng-web_vpl.zip), preserving every English verse verbatim. Per-chapter verse counts: 22, 14, 17, 21, 22, 17, 18, 21, 6, 12, 19, 22, 18, 15. Archive and extracted-text SHA-256 values are stored in both reading files. The source text is [public domain](https://ebible.org/eng-web/copyright.htm); WEB branding identifies only the unchanged English. The import excludes footnotes.

The Traditional Chinese text is a new AI translation draft of this specific English edition, not the Sigao Bible or another published Chinese translation. Its 244 verses align one-to-one with the English, with short editorial Chinese chapter headings for navigation. Source wording, names, numbers, and narrative differences are retained rather than silently harmonized to other Tobit editions. Independent scholarly review remains outstanding. Both language files include source, edition and rights notices displayed in Info. No separate content licence is granted for the Chinese draft.

## Judith / 猶滴傳 (2026-10-27)

English: all 16 chapters and 339 verses are imported verbatim from the [official WEB Classic verse-per-line archive](https://ebible.org/Scriptures/eng-web_vpl.zip). The [publisher dedicates this translation to the public domain](https://ebible.org/eng-web/copyright.htm); the WEB name identifies the unchanged English only. The source archive and text hashes are stored in both JSON files. Footnotes are not included. Per-chapter verse counts: 16, 28, 10, 15, 24, 21, 32, 36, 14, 23, 23, 20, 20, 19, 13, 25.

Chinese-source search found the [online Sigao text, 友弟德傳](https://www.ccreadbible.org/chinesebible/sigao/Judith_bible_Ch_1_.html) and the [Catholic Taiwan PDF](https://www.catholic.org.tw/about/Bible/Old/Giuditta_zh-t.pdf). No clear permission for this project to redistribute that full Chinese book was established, so neither Chinese text was imported or used as the translation base. The bundled Traditional Chinese is a new AI translation draft from the cited public-domain English, aligned verse by verse. It is not the Sigao version or an independently scholarly-reviewed translation. Short Chinese chapter headings are editorial navigation aids. Both files carry edition and rights notices for Info; no separate content licence is granted for the Chinese draft.

## Additions to Esther / 以斯帖記補編 (2026-10-27)

English is excerpted from the public-domain [WEB Classic Esther (Greek)](https://ebible.org/eng-web/ESG.htm) in the official `eng-web_vpl.zip` archive. The unchanged English excerpts are regrouped as six additions, in narrative order A–F. [USCCB’s introduction and mapping](https://bible.usccb.org/bible/esther/0) were consulted for the arrangement only; no USCCB translation text is bundled. The edition includes the expanded royal-audience narrative and the final translator’s colophon. It does not duplicate the complete ten-chapter Esther narrative.

| Reader chapter | Addition | WEB ESG source location                                                        | Reader paragraphs |
| -------------- | -------- | ------------------------------------------------------------------------------ | ----------------: |
| 1              | A / 甲   | Bracketed text within 1:1                                                      |                21 |
| 2              | B / 乙   | Bracketed text within 3:13, followed by the speech beginning “Remember” in 4:8 |                 6 |
| 3              | C / 丙   | 4:18–47                                                                        |                30 |
| 4              | D / 丁   | Expanded narrative in 5:1–2                                                    |                18 |
| 5              | E / 戊   | Bracketed text within 8:13                                                     |                15 |
| 6              | F / 己   | 10:4–14, including the final colophon                                          |                11 |

The 101 paragraph numbers are editorial reading aids, **not** WEB, Sigao, Vulgate, or standard A–F verse numbers. Long source entries in A, B, D, and E are split at sentence boundaries; C and F preserve source-entry boundaries. Joining each source-reference group with a space reconstructs the corresponding English excerpt verbatim, including punctuation and source brackets. Each paragraph stores `sourceReference`; chapter metadata and `source.sectionMappings` retain the mapping. Both files retain the archive and full VPL-text SHA-256 values. Footnotes are not imported.

Chinese sources located include [the Sigao text](https://www.ccreadbible.org/chinesebible/sigao/Esther_bible_Ch_1_.html) and [the Vatican-hosted Traditional Chinese PDF](https://www.vatican.va/chinese/bibbia/antico-testamento/Ester_zh-t.pdf). [The online Sigao edition’s copyright notice](https://www.ccreadbible.org/chinesebible/otherbible-1/htmtr/bible_21_Ch_2_esther.html) reserves rights. No full-text redistribution permission for this project was established, so these Chinese texts were not imported or used as the translation base.

Chinese is a new Traditional Chinese AI translation draft of the selected WEB excerpts, with short editorial headings. It is not a published Chinese edition and has not received independent scholarly review. The unusual English word `affection` in ESG 1:1 is retained in English; the Chinese draft provisionally interprets it as 苦況 in the calamity context, explicitly flagged for review in `source.translationNote`. English-source public-domain status and trademark conditions, Chinese draft status, and the numbering explanation appear in Info. The project grants no separate content licence for the Chinese draft.

## 1–2 Maccabees, Wisdom of Solomon, and Sirach

English is imported verbatim from the [official WEB Classic verse-per-line archive](https://ebible.org/Scriptures/eng-web_vpl.zip), whose [publisher dedicates the translation to the public domain](https://ebible.org/eng-web/copyright.htm). Original chapter/verse numbers and wording are retained. The JSON metadata records the download date, archive/text SHA-256 hashes, rights notice, and source links. Footnotes are not included. Chinese short chapter headings are editorial navigation aids, not part of the source scripture.

| Work              | Chapters | Numbered verse entries | Nonempty numbered verses |
| ----------------- | -------: | ---------------------: | -----------------------: |
| 1 Maccabees       |       16 |                    924 |                      924 |
| 2 Maccabees       |       15 |                    555 |                      555 |
| Wisdom of Solomon |       19 |                    436 |                      436 |
| Sirach            |       51 |                  1,383 |                    1,359 |

Chinese editions were found in the [Chinese Bible Reading Association's Sigao collection](https://www.ccreadbible.org/chinesebible/sigao), including [Wisdom](https://www.ccreadbible.org/chinesebible/sigao/Wisdom_bible_Ch_1_.html) and [Sirach](https://www.ccreadbible.org/chinesebible/sigao/Sirach_bible_Ch_1_.html); the Vatican also hosts [2 Maccabees in Chinese](https://www.vatican.va/chinese/bibbia/antico-testamento/II-Maccabei_zh-t.pdf). Availability online is not permission to redistribute these modern translations. No suitable permission was established, so none of their Chinese text is bundled.

Instead, these four Chinese texts are new **machine-translation drafts from the cited public-domain English**, produced sequentially with Google Translate, normalized to Traditional Chinese with OpenCC, and edited with AI assistance. Wisdom 1–4 and the Sirach prologue were translated directly by AI. Checks cover reference alignment, missing content, chapter counts, and selected corrections to dates, names, and wording; they do **not** constitute a full independent translation or scholarly review. Difficult readings and translation errors may remain. This provenance and draft status are included in each book's Info metadata. The Chinese drafts are not Sigao, not an official Chinese WEB edition, and not translations directly from ancient manuscripts. The software AGPL does not automatically license these content files.

Sirach also includes the ancient translator's prologue from the [official first-chapter page](https://ebible.org/eng-web/SIR01.htm), with that HTML's hash recorded separately. It appears before chapter 1 as `preface`, outside numbered verse counts and numeric input choices; the publisher's modern introductory note is not imported.

The WEB Classic verse-per-line source has 24 empty Sirach references: 1:5, 1:7, 1:21, 3:19, 10:21, 11:15, 13:14, 16:15, 17:5, 17:9, 17:16, 17:18, 17:21, 18:3, 19:18, 19:21, 20:3, 20:32, 22:9, 23:28, 24:18, 24:24, 25:12, 26:19. Both language files retain these as empty strings, so the reader displays its missing-text message. They are not invented or filled from another edition. Validation explicitly allows only this exact set and checks that Chinese preserves the same gaps.

Sirach also omits 12 verse entries entirely: 11:16, 16:16, 19:19, 22:10, and 26:20–27. These are recorded as `source.omittedVerses`; both files preserve the source numbering gaps without manufacturing text or renumbering. They are distinct from the 24 explicit empty entries above. Validation checks the exact expected numbering including these gaps.

## Letter of Jeremiah / 耶利米書信

English: all 73 verses of [WEB Classic Baruch 6](https://ebible.org/eng-web/BAR06.htm), extracted unchanged from the official VPL archive already used above. The app presents the independently selectable letter as chapter 1; each verse retains a `sourceReference` to BAR 6 and its source verse. Archive and text hashes are recorded. The short chapter title is editorial.

Chinese: all 73 verses of the 1933 Chinese Anglican edition hosted by [FHL](https://bible.fhl.net/new/readsub.php?chineses=%E8%80%B6%E4%BF%A1&chap=1&VERSION1=c1933&TABFLAG=0), imported unchanged. The source text and verse references were checked against the downloaded page. This replaces the earlier metadata-only Chinese file, without generating a translation.

## 2026-10-27 imported editions

The [source audit](CONTENT_STATUS.md) lists every current source. Six missing Chinese works use the 1933 Chinese Anglican edition hosted by FHL, whose [source notice](https://fhl.net/main/fhl/fhl8.html) identifies that edition as out of copyright. Chinese is copied unchanged, not generated. The Prayer of Azariah has 68 Chinese source verses against 67 WEB verses: reordered praise lines are aligned by subject, Chinese 47–48 share reading entry 49, and every original reference is retained in `sourceReferences`. The editions differ in wording; this alignment is not a claim of textual identity.

New English editions include WEB Classic, Lightfoot’s Apostolic Fathers, historical Charles/ANF/James/Terry/Ragg translations, Dowling’s 1908 work, and Mattison’s explicitly public-domain gospel translations. Psalms of Solomon uses the Wesley Center transcription and retains its noncommercial reuse notice; it is not represented as unrestricted modern text. Source hashes and edition limits are stored per book. `import-manifest.json` records the imported editions’ chapter IDs and entry counts; counts alone do not establish fidelity.

The War Scroll is now imported from a user-supplied HTML file, with 19 columns and 362 line entries. Text and gaps are preserved; two apparent source numbering errors are normalized for navigation with the original numbers recorded. No new translation was produced and no public-domain or redistribution grant is asserted. Modern Chinese source links are recorded where found, without bundling protected full translations. Existing AI drafts remain identified as such; none were newly generated in this import.

## Short navigation titles for imported books

Added concise Traditional Chinese `shortSection` labels for 689 sections across 19 previously unlabeled books. These are editorial navigation summaries of the bundled text or its source headings, not translated scripture or claims of canonical authority. Original source headings, verse text, references, numbering and gaps are preserved. The Info dialog identifies their editorial status.

## 逐卷中文翻譯更新（2026-10-28）

依使用者最新指示，開始逐卷製作缺少的正體中文，並保留原英文。《馬加比三書》（7 章、228 節）、《詩篇第 151 篇》（7 節）及《馬加比四書》（18 章、484 節）已依 App 所收錄的公版 WEB Classic 英文逐節翻譯。中文為 AI 初稿，尚待獨立學術審校，並非官方中文 WEB 或既有出版譯本，也不是從古代原文直接翻譯。資料 source 欄位及 Info 均提供此說明；底本網址與版本記錄保留。

目前 49 部擴充書卷中，45 部已有對應中文（6 部現成舊譯、39 部 AI 初稿），4 部尚待翻譯。詳見 [翻譯進度](TRANSLATION_PROGRESS.md)。

《革利免前書》（65 章及序文）亦已完成正體中文 AI 初稿，直接依 App 收錄的 J. B. Lightfoot《使徒教父》英文、CCEL 轉錄本逐段翻譯。中文不是既有出版譯本，也不是希臘原文直譯；尚待獨立學術審校。原段落定位、底本引文差異及方括號保留；資料中的英文底本雜湊另標為 `englishBaseSha256`，不作中文檔案雜湊使用。

《革利免後書》（20 章、118 段）已依同一 Lightfoot／CCEL 英文底本完成正體中文 AI 初稿，尚待獨立審校，並非已出版中文譯本或希臘原文直譯。第 13 章第 4 段英文句意不完整，中文及 Info 明示；第 11 章第 7 段重複語句保留，第 14 章第 4 段及第 16 章第 4 段的 HTML 殘留標記不當作正文翻譯。英文檔案未改動。

《依格那丟七書》（7 封信、91 個閱讀章、206 段，含序文）已依 App 所收錄 Lightfoot／CCEL 英文逐段完成正體中文 AI 初稿，非既有出版中文譯本或希臘原文直譯，尚待獨立學術審校。七封信的原章號、序文及段落對應均保留。閱讀章 30 第 2 段的英文語句缺誤、閱讀章 73 第 2 段的未閉合方括號均已註明；英文正文未修改。

《波利甲書》（14 章、38 段，含序文）已依 App 收錄的 Lightfoot／CCEL 英文完成正體中文 AI 初稿，非既有出版中文譯本或古代原文直譯，尚待獨立學術審校。原章序、序文及段落對應均保留；第 12 章第 2 段英文轉錄未閉合的方括號已註明。英文正文未修改。

《波利甲殉道記》（22 章，含序文）、《十二使徒遺訓》（16 章）及《巴拿巴書》（21 章）的中文，按本地收錄的 Lightfoot 英文底本逐段翻譯，為尚待獨立審校的 AI 初稿；英文及段落定位保留原狀。異讀、傳抄題記與需註明的轉錄問題記於各書來源說明。

《黑馬牧人書》中文已完成 27 個閱讀單元、723 段（五個異象、十二誡命、十個比喻），按收錄的 Lightfoot 英文逐段製作 AI 初稿，尚待獨立審校。

《帕皮亞殘篇》已依收錄的 Roberts、Donaldson 歷史英譯完成十則殘篇的中文 AI 初稿（12 個閱讀段），保留編者轉述、異讀標記與未完句；尚待獨立審校，不代表失傳原著五卷全文。

2026-10-29：依使用者指定，完成《以賽亞殉道記》（Charles，4 章／42 段）、《西卜神諭篇卷三》（Terry，986 行）、《多馬福音》（Mattison，序言及 114 則）、《猶大福音》（Mattison，7 單元／66 段）、《埃及人福音》（James，14 段引文與說明）、《抹大拉的馬利亞福音》（Mattison，5 單元／35 段）的正體中文 AI 初稿。均依本地收錄英文翻譯，未改動英文；保留缺文、手稿頁碼及特殊章序，尚待獨立審校。來源及版本限制亦記於各卷 Info。

2026-10-29：完成《亞伯拉罕遺訓》正體中文 AI 初稿，依本地 W. A. Craigie／Ante-Nicene Fathers 英文底本翻譯，共 35 個閱讀單元（長本 20 章、短本 15 單元）。保留短本重複及移位章號、英文缺詞及末尾省略號；英文未改動，中文尚待獨立審校。

2026-10-29：完成《摩西遺訓》正體中文 AI 初稿，依本地收錄的 R. H. Charles（1913）英文底本逐段翻譯，共 12 章、134 個編號段落。保留校勘符號、缺文、底本年代及殘缺結尾，未改動英文或補寫佚失內容；中文尚待獨立審校。

2026-10-29：完成《所羅門詩篇》正體中文 AI 初稿，依本地 G. Buchanan Gray（1913）／Wesley Center（George Lyons，2000）英文轉錄本翻譯，共 18 篇、605 個編號段落。保留來源節號、缺文及版本標記；英文和原有來源使用條件保留，中文尚待獨立審校。

2026-10-29：完成《戰卷》正體中文 AI 初稿，依使用者提供 HTML 所匯入的本地英文逐行翻譯，共 19 欄、362 個編號行（含純缺文行）。保留欄號、原行號、來源定位與缺文、補字標記；兩處先前修正的閱讀定位及原印號不變。中文不是希伯來文原卷直譯，尚待獨立審校；原英文及權利說明保留。
