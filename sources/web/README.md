# World English Bible British Edition (WEBPB)

Official source: https://ebible.org/find/show.php?id=engwebpb
Download: https://ebible.org/Scriptures/engwebpb_vpl.zip
Retrieved: 2026-10-25

This is the 66-book Protestant British/International English edition, using LORD
and GOD. The archive identifies the 2020 stable text edition. The publisher
dedicates its text to the public domain. See publisher-about.html for the
original rights statement and source.json for provenance and SHA-256 hashes.
The name World English Bible is a trademark used to identify faithful copies.
The app's AGPL license does not change the text's public-domain status.

The original ZIP is retained unchanged. scripts/import_web.py parses its
engwebpb_vpl.txt and writes one JSON file per canonical book under static/data/web/.
Each verse's wording and source number are copied exactly. The VPL export
already omits formatting, paragraph breaks, footnotes and editorial headings;
this importer performs no translation or wording edits.

Counts: 66 books, 1,189 chapters, 31,103 verse entries. Five entries are empty in
the original export: Luke 17:36; Acts 8:37, 15:34, 24:7; Romans 16:25. They remain
empty in JSON, and the UI supplies a clearly separate missing-text notice.

Run `python3 scripts/import_web.py --check` from the repository root to compare
every generated verse and its metadata with the retained official archive.
Run without --check to regenerate. A future archive update requires reviewing
and updating the pinned hashes, counts, retrieval date and blank-reference list.

Pairing is by chapter and verse identifiers, never by array position. The reader
keeps references found in either language and labels absent text. Different
editions can divide verses differently; the app does not rewrite those divisions.
