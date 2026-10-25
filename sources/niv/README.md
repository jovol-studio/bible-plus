# NIV source preparation

Status: superseded by WEBPB. NIV is not used by the app. **No NIV scripture text is included or downloaded.**

NIV (New International Version) is the requested English translation for the
66 canonical books. It would be shown beside the selected Chinese translation;
it is not an English edition of 和合本, 和修本, or 新譯本. Extension books keep
their existing historical English editions.

## Source and permission

- Rights holder: Biblica, Inc.
- Official permissions: https://www.biblica.com/permissions/
- Licensed-provider documentation: https://docs.api.bible/
- Terms checked: 2026-10-25.

Biblica requires appropriate licensing for app use. Its permission page directs
qualifying non-commercial apps to a partner licensing route. Provider access
does not by itself establish permission to download the complete text, ship it
offline, or publish it in an open repository. Attribution alone is insufficient.

## Import requirements

Before importing, obtain the licensed source and confirm permission for the
intended delivery method: local bundled files versus licensed online access.
Record the exact edition, attribution supplied by the licensor, and any limits
on caching, redistribution, public repositories, or offline use. Keep agreements
and credentials private; do not place API secrets in browser JavaScript.

Once the source is available, preserve original chapter and verse identifiers,
including omitted verses and combined verse ranges. Validate references against
each Chinese edition rather than aligning passages by array index. Show an
explicit missing-passage notice where editions do not align; do not fabricate,
translate, or silently renumber NIV text. Replace the pending info-dialog note
with the actual licensed source and its required acknowledgment after import.

The app's AGPL license does not grant rights to NIV content. This folder records
preparation only and is not evidence of permission or a completed integration.
